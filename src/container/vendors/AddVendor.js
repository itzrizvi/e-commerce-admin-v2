import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Steps, Modal, Typography, Badge, Card, Alert } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
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

const AddVendor = () => {
  viewPermission('vendor');
  const history = useHistory();
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

  const [current, setCurrent] = useState(0);
  const next = async () => {
    try {
      if (current === 0) {
        await form.validateFields(['company_name', 'contact_person', 'email']);
      } else if (current === 1) {
        // validate billingAddresses.
        const notValidate = billingAddresses.find(item => {
          const { id, address1, country, city, state, zip_code } = item;
          const checkFalse = !(id && address1 && country && city && state && zip_code);
          return checkFalse;
        });
        if (notValidate?.id) return setMessage({ type: 'warning', message: 'Enter Billing Address Correctly.' });
      } else if (current === 2) {
        // validate shippingAddresses.
        const notValidate1 = shippingAddresses.find(item => {
          const { id, address1, country, city, state, zip_code } = item;
          const checkFalse = !(id && address1 && country && city && state && zip_code);
          return checkFalse;
        });
        if (notValidate1?.id) return setMessage({ type: 'warning', message: 'Enter Shipping Address Correctly.' });
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

  // Message
  const [message, setMessage] = useState(null);

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    const variables = { ...values, status };
    // ADD NEW Vendor
    setIsLoading(true);
    apolloClient
      .mutate({
        mutation: vendorMutation.CREATE_VENDOR,
        variables: { data: variables },
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
        const data = res?.data?.createVendor;
        if (!data.status) return InternalErrorMessage();
        setVendorId(data.id);
        setOperation(true);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('got error on add vendor', err);
        setIsError(true);
      });
  };

  useEffect(() => {
    if (operation && vendor_id) {
      const newBillingAddress = billingAddresses.map(item => {
        const { parent_id, isNew, states, id, isDefault, ...rest } = item;
        return {
          isDefault: defaultBilling === id,
          parent_id: vendor_id,
          isNew,
          ...rest,
          ...(!isNew && { id }),
        };
      });
      const newShippingAddress = shippingAddresses.map(item => {
        const { parent_id, isNew, states, isDefault, id, ...rest } = item;
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
              mutation: contactPersonsSchema.ADD_CONTACT_PERSON,
              variables: {
                data: {
                  ref_id: vendor_id,
                  type: 'vendor',
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
            .catch(err => {
              setIsError(true);
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
              if (!data?.status) return setIsError(true);
            })
            .catch(err => {
              setIsError(true);
            })
            .finally(res => {
              setIsLoading(false);
              if (type === 'shipping') {
                if (!isError) {
                  setMessage({ type: 'success', message: 'Vendor Added Successfully.' });
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
      <PageHeader title="Add Vendor" />
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
              <Form
                style={{ width: '100%' }}
                form={form}
                name="addVendor"
                onFinish={handleSubmit}
                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                labelCol={{ span: 4 }}
              >
                <Row style={{ marginBottom: 20 }}>
                  <Steps
                    current={current}
                    items={items}
                    percent={items[current].percent}
                    responsive={true}
                    size="small"
                  />
                </Row>
                <Row style={{ marginTop: 40 }}>
                  <Col span={24}>
                    <div className="steps-content">
                      {current === 0 && (
                        <Row gutter={25}>
                          <Col sm={24}>
                            <Form.Item
                              rules={[{ required: true, max: maxLength, message: 'Please enter Vendor Company Name' }]}
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
                      )}
                      {current === 1 && (
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
                      )}
                      {current === 2 && (
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
                      )}
                      {current === 3 && (
                        <>
                          <Row gutter={25}>
                            <Col span={24}>
                              <Button
                                size="small"
                                style={{ float: 'right', marginTop: -20 }}
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
                              <Col key={item.id} sm={24} md={12} lg={8} style={{marginTop: 20}}>
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
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <div className="steps-action" style={{ float: 'right' }}>
                      <Link to="/admin/vendor/list">
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
                          {isLoading ? 'processing...' : 'Create Vendor'}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
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

export default AddVendor;
