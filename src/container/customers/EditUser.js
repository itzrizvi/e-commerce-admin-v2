import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Tabs, Spin, Modal, Alert, Card, Typography, Badge } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useParams } from 'react-router-dom';
import apolloClient, { customerQuery } from '../../utility/apollo';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { Button } from '../../components/buttons/buttons';
import { useSelector } from 'react-redux';
import { customerMutation } from '../../apollo/customer';
import { contactPersonsSchema } from '../../apollo/contactPerson';
import FeatherIcon from 'feather-icons-react';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const EditUser = () => {
  viewPermission('customer');
  const history = useHistory();
  const params = useParams();
  const token = useSelector(state => state.auth.token);
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [defaultBilling, setDefaultBilling] = useState(null);
  const [defaultShipping, setDefaultShipping] = useState(null);
  const [operation, setOperation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [personForm] = Form.useForm();

  const [singleUser, setSingleUser] = useState({ data: null, isLoading: true });
  const initialData = {
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip_code: null,
    country: null,
    isDefault: false,
    isNew: true,
  };
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);
  const [contactPersons, setContactPersons] = useState([]);
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [personType, setPersonType] = useState('Add');
  const [personCheckBox, setPersonCheckBox] = useState(true);
  const [selectedPersonID, setSelectedPersonID] = useState(null);
  // Message
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!params?.id) return;
    // load single customer
    apolloClient
      .query({
        query: customerQuery.GET_SINGLE_CUSTOMER,
        variables: { customer_id: parseInt(params?.id) },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getSingleCustomer;
        if (!data?.status) return InternalErrorMessage();
        const shipping = [];
        const billing = [];
        const contact_person = [];
        setSingleUser({ data: data?.data, isLoading: false });
        setUserStatus(data?.data?.user_status);
        form.setFieldsValue({
          first_name: data?.data?.first_name,
          last_name: data?.data?.last_name,
          email: data?.data?.email,
        });
        data?.data?.addresses?.forEach(address => {
          const { __typename, type, createdAt, updatedAt, ...rest } = address;
          if (address.type === 'shipping') {
            if (address.isDefault) setDefaultShipping(address.id);
            shipping.push({ ...rest, isNew: false });
          }
          if (address.type === 'billing') {
            if (address.isDefault) setDefaultBilling(address.id);
            billing.push({ ...rest, isNew: false });
          }
        });
        data?.data?.contactPersons.forEach(person => {
          contact_person.push({ ...person, isNew: false });
        });
        setContactPersons(contact_person);
        setShippingAddress(shipping);
        setBillingAddress(billing);
      })
  }, [params?.id]);

  const handleSubmit = values => {
    // validate billingAddresses.
    const notValidate = billingAddress.find(item => {
      const { id, address1, country, city, state, zip_code } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code);
      return checkFalse;
    });
    if (notValidate?.id) return setMessage({ type: 'warning', message: 'Enter Billing Address Correctly!' });

    // validate shippingAddresses.
    const notValidate1 = shippingAddress.find(item => {
      const { id, address1, country, city, state, zip_code } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code);
      return checkFalse;
    });
    if (notValidate1?.id) return setMessage({ type: 'warning', message: 'Enter Shipping Address Correctly!' });
    const variables = {
      data: { ...values, user_status: userStatus, send_mail: true, id: parseInt(params?.id) },
    };
    apolloClient
      .mutate({
        mutation: customerMutation.UPDATE_CUSTOMER,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: customerQuery.GET_ALL_CUSTOMER,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'no-cache',
          },
          ['getAllCustomer'],
        ],
      })
      .then(res => {
        const data = res?.data?.updateCustomer;
        if (!data?.status) return InternalErrorMessage();
        setOperation(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (operation && params?.id) {
      const newBillingAddress = billingAddress.map(item => {
        const { parent_id, isNew, id, isDefault, countryCode, states, ...rest } = item;
        return {
          isDefault: defaultBilling === id,
          parent_id: parseInt(params?.id),
          ...(isNew ? { isNew } : { isNew: false }),
          ...rest,
          ...(!isNew && { id }),
        };
      });
      const newShippingAddress = shippingAddress.map(item => {
        const { parent_id, isNew, isDefault, id, countryCode, states, ...rest } = item;
        return {
          isDefault: defaultShipping === id,
          parent_id: parseInt(params?.id),
          ...(isNew ? { isNew } : { isNew: false }),
          ...rest,
          ...(!isNew && { id }),
        };
      });

      ['person', 'billing', 'shipping'].forEach(type => {
        if (type === 'person') {
          apolloClient
            .mutate({
              mutation: contactPersonsSchema.UPDATE_CONTACT_PERSON,
              variables: {
                data: {
                  ref_id: parseInt(params?.id),
                  type: 'customer',
                  contact_persons: contactPersons.map(item => ({
                    ...(!item.isNew && { id: item.id }),
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    fax: item.fax,
                    status: item.status,
                    isNew: item.isNew,
                  })),
                },
              },
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            })
            .then(res => {
              const data = !params?.id ? res?.data?.createContactPerson : res?.data?.updateContactPerson;
              if (!data?.status) return InternalErrorMessage();
            })
        } else {
          setIsLoading(true);
          apolloClient
            .mutate({
              mutation: customerMutation.UPDATE_CUSTOMER_ADDRESSES,
              variables: {
                data: {
                  ref_id: parseInt(params?.id),
                  type,
                  addresses: [...(type === 'billing' ? newBillingAddress : newShippingAddress)],
                },
              },
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            })
            .then(res => {
              const data = res?.data?.updateCustomerAddress;
              if (!data?.status) return InternalErrorMessage();
            })
            .finally(res => {
              setIsLoading(false);
              if (type === 'shipping') {
                if (!isError) {
                  setMessage({ type: 'success', message: 'Customer Updated Successfully.' });
                  setTimeout(() => {
                    history.push('/admin/customers/list');
                  }, [2000]);
                }
              }
            });
        }
      });
    }
  }, [operation, params?.id]);

  const handleContactPerson = async () => {
    await personForm.validateFields(['email', 'name', 'phone']);
    const values = personForm.getFieldsValue();
    if (!selectedPersonID) {
      setContactPersons(prev => [...prev, { ...values, id: new Date().getTime(), isNew: true }]);
    } else {
      setContactPersons(prev =>
        prev.map(item => {
          if (item.id === selectedPersonID) {
            return { ...values, id: selectedPersonID, isNew: false };
          }
          return item;
        }),
      );
    }

    setPersonModalOpen(false);
    personForm.resetFields();
  };

  const handleAddPerson = () => {
    personForm.setFieldsValue({
      name: '',
      email: '',
      status: true,
      phone: '',
      fax: '',
    });
    setPersonType('Add');
    setPersonCheckBox(true);
    setPersonModalOpen(true);
  };

  const handleEditPerson = id => {
    setSelectedPersonID(id);
    const person = contactPersons.filter(item => item.id === id);
    if (person) {
      personForm.setFieldsValue({
        name: person[0].name,
        email: person[0].email,
        status: person[0].status,
        phone: person[0].phone,
        fax: person[0].fax,
      });
    }
    setPersonType('Update');
    setPersonCheckBox(person[0].status);
    setPersonModalOpen(true);
  };

  // const handleRemovePerson = id => {
  //   setContactPersons(prev => prev.filter(item => item.id !== id));
  // };

  return (
    <>
      <PageHeader
        title={`Manage Customer | Edit Customer ${singleUser.isLoading ? '' : `(${singleUser?.data?.email})`}`}
      />
      <Main>
        <Row align="middle" justify="center" style={{ margin: 0, padding: 0 }}>
          {message && (
            <Alert
              style={{ width: '50%', marginBottom: 10 }}
              message={message?.message}
              type={message?.type}
              showIcon
              closable
            />
          )}
        </Row>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleUser.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="editUser"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="Information" key="information">
                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            rules={[{ required: true, max: maxLength, message: 'Please Enter First Name' }]}
                            name="first_name"
                            label="First Name"
                            labelCol={{ style: { width: "40%" } }}
                            initialValue={singleUser?.data?.first_name}
                          >
                            <Row>
                              <Col span={20}>
                                <Input placeholder="Enter First Name" defaultValue={singleUser?.data?.first_name} />
                              </Col>
                            </Row>

                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            rules={[{ required: true, max: maxLength, message: 'Please Enter Last Name' }]}
                            name="last_name"
                            label="Last Name"
                            labelCol={{ style: { width: "40%" } }}
                            initialValue={singleUser?.data?.last_name}
                          >
                            <Row>
                              <Col span={20}>
                                <Input placeholder="Enter Last Name" defaultValue={singleUser?.data?.last_name} />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            label="Company Name"
                            name="company_name"
                            labelCol={{ style: { width: "40%" } }}>
                            <Row>
                              <Col span={20}>
                                <Input type="text" defaultValue={singleUser?.data?.company_name} placeholder="Enter Company Name" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            label="Email"
                            labelCol={{ style: { width: "40%" } }}>
                            <Row>
                              <Col span={20}>
                                <Input type="email" disabled defaultValue={singleUser?.data?.email} />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            label="Phone"
                            name="phone"
                            labelCol={{ style: { width: "40%" } }}>
                            <Row>
                              <Col span={20}>
                                <Input type="text" defaultValue={singleUser?.data?.phone} placeholder="Enter Phone Number" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={25}>
                        <Col span={10}>
                          <Form.Item
                            label="Fax"
                            name="fax"
                            labelCol={{ style: { width: "40%" } }}>
                            <Row>
                              <Col span={20}>
                                <Input type="text" defaultValue={singleUser?.data?.fax} placeholder="Enter Fax Number" />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="User Status">
                        <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                      </Form.Item>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                      <ShippingAddress
                        {...{ initialData, shippingAddress, setShippingAddress, defaultShipping, setDefaultShipping }}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Billing Address" key="billing_address">
                      <BillingAdderess
                        {...{ initialData, billingAddress, setBillingAddress, defaultBilling, setDefaultBilling }}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Contact Person" key="contact_person">
                      <Row gutter={25}>
                        <Col span={24}>
                          <Button
                            size="small"
                            style={{ float: 'right', marginBottom: 20 }}
                            title="Add Person"
                            htmlType="button"
                            type="primary"
                            onClick={handleAddPerson}
                          >
                            Add Person
                          </Button>
                        </Col>
                      </Row>
                      <Row gutter={25}>
                        {contactPersons.map(item => (
                          <Col key={item.id} sm={24} md={12} lg={8}>
                            {params?.id && (
                              <>
                                <Button
                                  size="small"
                                  style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                                  title="Edit Person"
                                  htmlType="button"
                                  type="info"
                                  onClick={() => handleEditPerson(item.id)}
                                >
                                  Edit
                                </Button>
                                {/* <Button
                                  size="small"
                                  style={{ position: 'absolute', right: 14, top: 40, zIndex: 1000 }}
                                  title="Remove Person"
                                  htmlType="button"
                                  type="danger"
                                  onClick={() => handleRemovePerson(item.id)}
                                >
                                  <FeatherIcon icon="trash-2" />
                                </Button> */}
                              </>
                            )}

                            <Card style={{ border: '1px solid #ddd' }}>
                              <Typography.Paragraph>{item.name}</Typography.Paragraph>
                              <Typography.Paragraph>{item.email}</Typography.Paragraph>
                              <Typography.Paragraph>{item.phone}</Typography.Paragraph>
                              <Typography.Paragraph>{item.fax}</Typography.Paragraph>
                              <Typography.Paragraph>
                                {
                                  <Badge
                                    color={item.status ? 'cyan' : 'orange'}
                                    count={item.status ? 'Active' : 'Inactive'}
                                  />
                                }
                              </Typography.Paragraph>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Tabs.TabPane>
                  </Tabs>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Update Customer'}
                      </Button>
                      <Link to="/admin/customers/list">
                        <Button style={{ marginLeft: 10 }} type="light" size="default">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
        <Modal
          title={`${personType} Person`}
          style={{ top: 20 }}
          width={600}
          open={personModalOpen}
          onOk={handleContactPerson}
          onCancel={() => setPersonModalOpen(false)}
          okText="Save"
        >
          <Form
            preserve={false}
            style={{ width: '100%' }}
            form={personForm}
            name="personForm"
            layout="horizontal"
          >
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: 'Please Enter Name' }]}
              name="name"
              label="Name"
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              rules={[{ required: true, message: 'Please Enter Email' }]}
              name="email"
              label="Email"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Please Enter Phone' }]}
              {...formItemLayout}
              name="phone"
              label="Phone"
            >
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item {...formItemLayout} name="fax" label="Fax">
              <Input placeholder="Fax" />
            </Form.Item>
            <Form.Item {...formItemLayout} name="status" label="Status" initialValue={personCheckBox}>
              <Switch checked={personCheckBox} onChange={checked => setPersonCheckBox(checked)} />
            </Form.Item>
          </Form>
        </Modal>
      </Main>
    </>
  );
};

export default EditUser;
