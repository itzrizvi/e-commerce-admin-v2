import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Steps, Card, Modal, Typography, Badge, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient from '../../utility/apollo';
import { viewPermission } from '../../utility/utility';

import { customerMutation, customerQuery } from '../../apollo/customer';
import AddressTable from './AddressTable';
import { useEffect } from 'react';
import { contactPersonsSchema } from '../../apollo/contactPerson';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const AddUser = () => {
  viewPermission('customer');
  const history = useHistory();
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [operation, setOperation] = useState(false);
  const [user_id, setUserId] = useState(null);
  const [form] = Form.useForm();
  const [personForm] = Form.useForm();
  const [personType, setPersonType] = useState('Add');
  const [isError, setIsError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [contactPersons, setContactPersons] = useState([]);
  const [personCheckBox, setPersonCheckBox] = useState(true);
  const [personModalOpen, setPersonModalOpen] = useState(false);

  const initialAddress = {
    id: new Date().getTime(),
    address1: '',
    address2: '',
    city: '',
    country: '',
    isDefault: false,
    state: '',
    status: true,
    zip_code: '',
  };
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);
  const [defaultShippingId, setDefaultShippingId] = useState(null);
  const [defaultBillingId, setDefaultBillingId] = useState(null);

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    // validate billingAddresses.
    setIsLoading(true);
    const variables = {
      data: { ...values, status: userStatus, send_mail: true },
    };
    apolloClient
      .mutate({
        mutation: customerMutation.ADD_CUSTOMER,
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
            fetchPolicy: 'network-only',
          },
          ['getAllCustomer'],
        ],
      })
      .then(res => {
        const data = res?.data?.addCustomer;
        if (!data?.status) return InternalErrorMessage();

        setOperation(true);
        setUserId(data?.id);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (operation && user_id) {
      const newBillingAddress = billingAddress.map(item => {
        const { id, states, ...rest } = item;
        return {
          parent_id: user_id,
          ...rest,
        };
      });
      const newShippingAddress = shippingAddress.map(item => {
        const { id, states, ...rest } = item;
        return {
          ...rest,
          parent_id: user_id,
        };
      });

      ['person', 'billing', 'shipping'].forEach(type => {
        setIsLoading(true);
        if (type === 'person') {
          apolloClient
            .mutate({
              mutation: contactPersonsSchema.ADD_CONTACT_PERSON,
              variables: {
                data: {
                  ref_id: user_id,
                  type: 'customer',
                  contact_persons: [
                    ...contactPersons.map(item => ({
                      name: item.name,
                      email: item.email,
                      phone: item.phone,
                      fax: item.fax,
                      status: item.status,
                    })),
                  ],
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
              const data = res?.data?.createContactPerson;
              if (!data?.status) return setIsError(true);
            })
        } else {
          apolloClient
            .mutate({
              mutation:
                type === 'billing'
                  ? customerMutation.ADD_CUSTOMER_BILLING_ADDRESS
                  : customerMutation.ADD_CUSTOMER_SHIPPING_ADDRESS,
              variables: {
                data: {
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
                  message.success('User Created Successfully');
                  setTimeout(() => {
                    history.push('/admin/customers/list');
                  }, [2000]);
                }
              }
            });
        }
      });
    }
  }, [operation, user_id]);

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

  const next = async () => {
    try {
      if (current === 0) {
        await form.validateFields(['first_name', 'last_name', 'email']);
      } else if (current === 1) {
        // validate billingAddresses.
        const notValidate = billingAddress.find(item => {
          const { id, address1, country, city, state, zip_code } = item;
          const checkFalse = !(id && address1 && country && city && state && zip_code);
          return checkFalse;
        });
        if (notValidate?.id) return message.warning('Enter Billing Address Correctly.');
      } else if (current === 2) {
        // validate shippingAddresses.
        const notValidate1 = shippingAddress.find(item => {
          const { id, address1, country, city, state, zip_code } = item;
          const checkFalse = !(id && address1 && country && city && state && zip_code);
          return checkFalse;
        });
        if (notValidate1?.id) return message.warning('Enter Shipping Address Correctly.');
      } else if (current === 3) {
      }
      setCurrent(current + 1);
    } catch {}
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({
    key: item.title,
    title: item.title,
    percent: item.percent,
  }));
  /* ---------------------------- tep Form Data end --------------------------- */

  const handleContactPerson = async () => {
    await personForm.validateFields(['email', 'name', 'phone']);
    const values = personForm.getFieldsValue();
    const newData = { ...values, id: new Date().getTime(), isNew: true };
    setContactPersons(prev => [...prev, newData]);
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

  return (
    <>
      <PageHeader title="Add Customer" />
      <Main>
        <Form
          style={{ width: '100%' }}
          form={form}
          name="addProduct"
          onFinish={handleSubmit}
          onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
          labelCol={{ span: 4 }}
        >
          <Row gutter={25}>
            <Col sm={24} xs={24}>
              <Cards headless>
                <Row style={{ marginBottom: 20 }}>
                  <Steps
                    current={current}
                    items={items}
                    percent={items[current].percent}
                    responsive={true}
                    size="small"
                  />
                </Row>
                <Row gutter={25}>
                  <Col span={24}>
                    <div className="steps-content">
                      {current === 0 && (
                        <Row gutter={25}>
                          <Col sm={24}>
                            <Form.Item
                              rules={[{ required: true, max: maxLength, message: 'Please enter First Name' }]}
                              name="first_name"
                              label="First Name"
                            >
                              <Input style={{ width: '50%' }} placeholder="Enter First Name" />
                            </Form.Item>
                            <Form.Item
                              rules={[{ required: true, message: 'Please enter Last Name' }]}
                              name="last_name"
                              label="Last Name"
                            >
                              <Input style={{ width: '50%' }} placeholder="Enter Last Name" />
                            </Form.Item>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter an email',
                                  max: maxLength,
                                },
                              ]}
                              name="email"
                              label="Email"
                            >
                              <Input style={{ width: '50%' }} type="email" placeholder="Enter Email Address" />
                            </Form.Item>
                            <Form.Item label="User Status">
                              <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                      {current === 1 && (
                        <AddressTable
                          initialData={initialAddress}
                          addresses={billingAddress}
                          setAddresses={setBillingAddress}
                          defaultAddressId={defaultBillingId}
                          setDefaultAddressId={setDefaultBillingId}
                        />
                      )}
                      {current === 2 && (
                        <AddressTable
                          initialData={initialAddress}
                          addresses={shippingAddress}
                          setAddresses={setShippingAddress}
                          defaultAddressId={defaultShippingId}
                          setDefaultAddressId={setDefaultShippingId}
                        />
                      )}
                      {current === 3 && (
                        <>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Button
                                size="small"
                                style={{ float: 'right' }}
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
                              <Col key={item.id} sm={24} md={12} lg={8} style={{ marginTop: 20 }}>
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
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={24}>
              <div className="steps-action" style={{ float: 'right' }}>
                <Link to="/admin/customers/list">
                  <Button
                    type="light"
                    style={{
                      margin: '0 8px',
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                {current > 0 && (
                  <Button
                    type="light"
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    type="primary"
                    onClick={() => next()}
                  >
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    disabled={isLoading}
                    raised
                    htmlType="submit"
                    style={{
                      margin: '0 8px',
                    }}
                    type="primary"
                  >
                    {isLoading ? 'processing...' : 'Create Customer'}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>
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
              <Switch checked={personCheckBox} />
            </Form.Item>
          </Form>
        </Modal>
      </Main>
    </>
  );
};

export default AddUser;