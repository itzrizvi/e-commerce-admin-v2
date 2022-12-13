import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Checkbox, Typography, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { viewPermission } from '../../utility/utility';

import { customerMutation, customerQuery } from '../../apollo/customer';
import AddressTable from './AddressTable';
import { useEffect } from 'react';

const AddUser = () => {
  viewPermission('customer');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [operation, setOperation] = useState(false);
  const [user_id, setUserId] = useState(null);
  const [form] = Form.useForm();
  const [isError, setIsError] = useState(false);

  const initialAddress = {
    id: new Date().getTime(),
    address1: '',
    address2: '',
    city: '',
    country: '',
    email: '',
    fax: '',
    isDefault: false,
    phone: '',
    state: '',
    status: true,
    zip_code: '',
  };
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);
  const [defaultShippingId, setDefaultShippingId] = useState(null);
  const [defaultBillingId, setDefaultBillingId] = useState(null);

  const handleSubmit = values => {
    // validate billingAddresses.
    const notValidate = billingAddress.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone);
      return checkFalse;
    });
    if (notValidate?.id) return toast.warning('Enter Billing Address Correctly!');

    // validate shippingAddresses.
    const notValidate1 = shippingAddress.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone);
      return checkFalse;
    });
    if (notValidate1?.id) return toast.warning('Enter Shipping Address Correctly!');

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
        if (!data.status) return toast.error(data.message);
        setOperation(true);
        setUserId(data?.id);
      })
      .catch(err => {
        console.log('error on adding customer', err);
        toast.error(`Something went wrong!!`);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (operation && user_id) {
      const newBillingAddress = billingAddress.map(item => {
        const { parent_id, id, ...rest } = item;
        return {
          parent_id: user_id,
          ...rest,
        };
      });
      const newShippingAddress = shippingAddress.map(item => {
        const { parent_id, id, ...rest } = item;
        return {
          parent_id: user_id,
          ...rest,
        };
      });

      ['billing', 'shipping'].forEach(type => {
        setIsLoading(true);
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
            if (!data?.status) return;
          })
          .catch(err => {
            setIsError(true);
          })
          .finally(res => {
            setIsLoading(false);
            if (type === 'shipping') {
              if (!isError) {
                toast.success('User Created Successfully.');
                setTimeout(() => {
                  history.push('/admin/customers/list');
                }, [2000]);
              }
            }
          });
      });
    }
  }, [operation, user_id]);

  return (
    <>
      <PageHeader title={params.uid ? `Manage User | Edit user (${params.email})` : 'Add Customer'} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <Form
                style={{ width: '100%' }}
                form={form}
                name="addProduct"
                onFinish={handleSubmit}
                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                labelCol={{ span: 4 }}
                // wrapperCol={{ span: 14 }}
                // layout={'vertical'}
              >
                <Tabs>
                  <Tabs.TabPane tab="Information" key="general">
                    <Form.Item
                      rules={[{ required: true, max: maxLength, message: 'Please enter First Name' }]}
                      name="first_name"
                      label="First Name"
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true, message: 'Please enter Last Name' }]}
                      name="last_name"
                      label="Last Name"
                    >
                      <Input placeholder="Enter Last Name" />
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
                      <Input type="email" placeholder="Enter Email Address" />
                    </Form.Item>

                    <Form.Item label="User Status">
                      <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                    </Form.Item>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Shipping Address" key="sAddress">
                    <AddressTable
                      initialData={initialAddress}
                      addresses={shippingAddress}
                      setAddresses={setShippingAddress}
                      defaultAddressId={defaultShippingId}
                      setDefaultAddressId={setDefaultShippingId}
                    />
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Billing Address" key="bAddress">
                    <AddressTable
                      initialData={initialAddress}
                      addresses={billingAddress}
                      setAddresses={setBillingAddress}
                      defaultAddressId={defaultBillingId}
                      setDefaultAddressId={setDefaultBillingId}
                    />
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
                      {isLoading ? 'Processing' : 'Save'}
                    </Button>
                    <Link to="/admin/customers/list">
                      <Button style={{ marginLeft: 10 }} type="light" size="default">
                        Cancel
                      </Button>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddUser;
