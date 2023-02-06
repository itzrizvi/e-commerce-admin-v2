import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Modal, Typography, Badge, Card, Tabs, Alert } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useParams } from 'react-router-dom';
import apolloClient, { vendorMutation, vendorQuery } from '../../utility/apollo';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { useSelector } from 'react-redux';
import { contactPersonsSchema } from '../../apollo/contactPerson';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const UpdateVendor = () => {
  viewPermission('vendor');
  const params = useParams();
  const history = useHistory();

  const [singleVendor, setSingleVendor] = useState({ data: [], isLoading: true });
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(null);
  const [defaultShipping, setDefaultShipping] = useState(null);
  const [form] = Form.useForm();
  const [personForm] = Form.useForm();
  const maxLength = 30;
  const [operation, setOperation] = useState(false);
  const [vendor_id, setVendorId] = useState(null);
  const [isError, setIsError] = useState(false);
  const [contactPersons, setContactPersons] = useState([]);
  const [personModalOpen, setPersonModalOpen] = useState(false);
  const [personType, setPersonType] = useState('Add');
  const token = useSelector(state => state.auth.token);
  const [personCheckBox, setPersonCheckBox] = useState(true);
  const [selectedPersonID, setSelectedPersonID] = useState(null);

  /* -------------------------- Step From Data Start -------------------------- */
  const steps = [
    {
      title: 'General',
      percent: 40,
    },
    {
      title: 'Billing Address',
      percent: 60,
    },
    {
      title: 'Shipping Address',
      percent: 80,
    },
    {
      title: 'Contact Persons',
      percent: 100,
    },
  ];

  /* ---------------------------- tep Form Data end --------------------------- */

  // ============+ for billing START +====================
  const initialAddressData = {
    id: new Date().getTime(),
    parent_id: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    status: true,
    isDefault: false,
    isNew: true,
  };
  const [billingAddresses, setBillingAddresses] = useState([]);
  // ============+ for billing END +====================

  const [shippingAddresses, setShippingAddresses] = useState([]);
  // ============+ for billing END +====================

  // LOAD SINGLE Vendor
  useEffect(() => {
    if (!params?.id) return;

    apolloClient
      .query({
        query: vendorQuery.GET_SINGLE_VENDOR,
        variables: { query: { id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getSingleVendor;
        if (!data?.status) return InternalErrorMessage();
        initialAddressData.parent_id = data?.data?.id;
        setSingleVendor(s => ({ ...s, data: data?.data, error: '' }));
        setStatus(data?.data?.status);
        let billings = [];
        let shippings = [];
        let contact_person = [];
        data?.data.addresses.forEach(address => {
          const { updatedAt, createdAt, __typename, type, isDefault, email, phone, fax, ...rest } = address;
          const item = {
            isDefault: false,
            isNew: false,
            parent_id: data?.data?.id,
            ...rest,
          };
          if (address.type === 'billing') {
            if (isDefault) setDefaultBilling(address.id);
            return billings.push(item);
          } else if (address.type === 'shipping') {
            if (isDefault) setDefaultShipping(address.id);
            return shippings.push(item);
          }
          return;
        });
        data?.data?.contactPersons.forEach(person => {
          contact_person.push({ ...person, isNew: false });
        });
        setContactPersons(contact_person);
        setBillingAddresses(billings);
        setShippingAddresses(shippings);
      })
      .finally(() => {
        setSingleVendor(s => ({ ...s, isLoading: false }));
      });
  }, [params?.id]);

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    delete values?.countryCode;
    const variables = { ...values, status };
    apolloClient
      .mutate({
        mutation: vendorMutation.UPDATE_VENDOR,
        variables: { data: { ...variables, id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: vendorQuery.GET_ALL_VENDOR,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getAllVendor'],
        ],
      })
      .then(res => {
        const data = res?.data?.updateVendor;
        if (!data?.status) return InternalErrorMessage();
        setVendorId(parseInt(params?.id));
        setOperation(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (operation && vendor_id) {
      const newBillingAddress = billingAddresses.map(item => {
        const { parent_id, isNew, states, id, isDefault, countryCode, ...rest } = item;
        return {
          isDefault: defaultBilling === id,
          parent_id: vendor_id,
          isNew,
          ...rest,
          ...(!isNew && { id }),
        };
      });
      const newShippingAddress = shippingAddresses.map(item => {
        const { parent_id, isNew, states, isDefault, id, countryCode, ...rest } = item;
        return {
          isDefault: defaultShipping === id,
          parent_id: vendor_id,
          isNew,
          ...rest,
          ...(!isNew && { id }),
        };
      });

      ['person', 'billing', 'shipping'].forEach(type => {
        setIsLoading(true);
        if (type === 'person') {
          apolloClient
            .mutate({
              mutation: !params?.id
                ? contactPersonsSchema.ADD_CONTACT_PERSON
                : contactPersonsSchema.UPDATE_CONTACT_PERSON,
              variables: {
                data: {
                  ref_id: vendor_id,
                  type: 'vendor',
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
            });
        } else {
          apolloClient
            .mutate({
              mutation: vendorMutation.UPDATE_VENDOR_ADDRESS,
              variables: {
                data: {
                  ref_id: vendor_id,
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
              const data = res?.data?.updateVendorAddress;
              if (!data?.status) return InternalErrorMessage();
            })
            .finally(res => {
              setIsLoading(false);
              if (type === 'shipping') {
                if (!isError) {
                  message.success(`Vendor ${params?.id ? 'Updated' : 'Added'} Successfully.`);
                  setTimeout(() => {
                    history.push('/admin/vendor/list');
                  }, [2000]);
                }
              }
            });
        }
      });
    }
  }, [operation, vendor_id]);

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

  const handleRemovePerson = id => {
    setContactPersons(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <PageHeader
        title={`Manage Vendor | Edit ${singleVendor.data.company_name ? `(${singleVendor.data.company_name})` : ''}`}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleVendor.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addVendor"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                  initialValues={
                    params.id
                      ? {
                          company_name: singleVendor.data.company_name,
                          contact_person: singleVendor.data.contact_person,
                          email: singleVendor.data.email,
                          description: singleVendor.data.description,
                          phone_number: singleVendor.data.phone_number,
                          EIN_no: singleVendor.data.EIN_no,
                          TAX_ID: singleVendor.data.TAX_ID,
                          FAX_no: singleVendor.data.FAX_no,
                        }
                      : null
                  }
                >
                  <Row style={{ marginTop: 40 }}>
                    <Col span={24}>
                      <Tabs>
                        <Tabs.TabPane tab="General" key="general">
                          <Row gutter={25}>
                            <Col sm={24}>
                              <Form.Item
                                rules={[
                                  { required: true, max: maxLength, message: 'Please enter Vendor Company Name' },
                                ]}
                                name="company_name"
                                label="Company Name"
                              >
                                <Input style={{ width: '50%' }} placeholder="Company Name" />
                              </Form.Item>

                              <Form.Item
                                rules={[
                                  { required: true, max: maxLength, message: 'Please enter Vendor Contact Person' },
                                ]}
                                label="Contact Person"
                                name="contact_person"
                              >
                                <Input style={{ width: '50%' }} placeholder="Contact Person" />
                              </Form.Item>

                              <Form.Item
                                rules={[{ required: true, max: maxLength, message: 'Please enter Email' }]}
                                name="email"
                                label="Email"
                              >
                                <Input style={{ width: '50%' }} placeholder="Email" type="email" />
                              </Form.Item>

                              <Form.Item name="phone_number" label="Phone">
                                <Input style={{ width: '50%' }} placeholder="Phone Number" />
                              </Form.Item>
                              <Form.Item name="FAX_no" label="Fax">
                                <Input style={{ width: '50%' }} placeholder="Fax" />
                              </Form.Item>
                              <Form.Item name="EIN_no" label="EIN">
                                <Input style={{ width: '50%' }} placeholder="EIN Number" />
                              </Form.Item>
                              <Form.Item name="TAX_ID" label="Tax Id">
                                <Input style={{ width: '50%' }} placeholder="Tax Id" />
                              </Form.Item>
                              <Form.Item name="description" label="Description">
                                <TextArea style={{ width: '60%' }} rows={4} placeholder="Description" />
                              </Form.Item>
                              <Form.Item label="Status">
                                <Switch checked={status} onChange={checked => setStatus(checked)} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Billing Address" key="billing_address">
                          <Row gutter={25}>
                            <Col sm={24}>
                              <BillingAdderess
                                {...{
                                  defaultBilling,
                                  initialAddressData,
                                  billingAddresses,
                                  setBillingAddresses,
                                  setDefaultBilling,
                                }}
                              />
                            </Col>
                          </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                          <Row gutter={25}>
                            <Col sm={24}>
                              <ShippingAddress
                                {...{
                                  defaultShipping,
                                  initialAddressData,
                                  shippingAddresses,
                                  setShippingAddresses,
                                  setDefaultShipping,
                                }}
                              />
                            </Col>
                          </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Contact Person" key="contact_person">
                          <Row gutter={25}>
                            <Col span={24}>
                              <Button
                                size="small"
                                style={{ float: 'right', marginBottom: 20, marginTop: -20 }}
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
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: '3em',
                        }}
                      >
                        <Form.Item>
                          <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                            {isLoading ? 'Processing' : 'Update Vendor'}
                          </Button>
                          <Link to="/admin/vendor/list">
                            <Button style={{ marginLeft: 10 }} type="light" size="default">
                              Cancel
                            </Button>
                          </Link>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
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
          <Form preserve={false} style={{ width: '100%' }} form={personForm} name="personForm" layout="horizontal">
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

export default UpdateVendor;
