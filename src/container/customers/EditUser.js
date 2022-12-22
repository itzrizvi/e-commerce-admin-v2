import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Tabs, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useParams } from 'react-router-dom';
import apolloClient, { customerQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { Button } from '../../components/buttons/buttons';
import { useSelector } from 'react-redux';
import { customerMutation } from '../../apollo/customer';

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

  const [singleUser, setSingleUser] = useState({ data: null, isLoading: true });
  const initialData = {
    address1: null,
    address2: null,
    phone: null,
    fax: null,
    email: null,
    city: null,
    state: null,
    zip_code: null,
    country: null,
    isDefault: false,
    isNew: true,
  };
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);

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
      })
      .then(res => {
        const data = res?.data?.getSingleCustomer;
        if (!data?.status) return;
        const shipping = [];
        const billing = [];
        setSingleUser({ data: data?.data, isLoading: false });
        setUserStatus(data?.data?.user_status);
        form.setFieldValue({
          first_name: data?.data?.first_name,
          last_name: data?.data?.last_name,
          email: data?.data?.email,
        });
        data?.data?.addresses?.forEach(address => {
          const { __typename, type, createdAt, updatedAt, ...rest } = address;
          if (address.type === 'shipping') {
            if (address.isDefault) setDefaultShipping(address.id);
            shipping.push(rest);
          }
          if (address.type === 'billing') {
            if (address.isDefault) setDefaultBilling(address.id);
            billing.push(rest);
          }
        });
        setShippingAddress(shipping);
        setBillingAddress(billing);
      })
      .catch(err => {
        console.log('🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err', err);
      });
  }, [params?.id]);

  const handleSubmit = values => {
    // validate billingAddresses.
    const notValidate = billingAddress.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2);
      return checkFalse;
    });
    if (notValidate?.id) return toast.warning('Enter Billing Address Correctly!');

    // validate shippingAddresses.
    const notValidate1 = shippingAddress.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2);
      return checkFalse;
    });
    if (notValidate1?.id) return toast.warning('Enter Shipping Address Correctly!');
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
            fetchPolicy: 'network-only',
          },
          ['getAllCustomer'],
        ],
      })
      .then(res => {
        const data = res?.data?.updateCustomer;
        if (!data.status) return toast.error(data.message);
        setOperation(true);
      })
      .catch(err => {
        console.log('error on adding customer', err);
        toast.error(`Something went wrong!!`);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (operation && params?.id) {
      const newBillingAddress = billingAddress.map(item => {
        const { parent_id, isNew, id, isDefault, ...rest } = item;
        return {
          isDefault: defaultBilling === id,
          parent_id: parseInt(params?.id),
          ...(isNew ? { isNew } : { isNew: false }),
          ...rest,
          ...(!isNew && { id }),
        };
      });
      const newShippingAddress = shippingAddress.map(item => {
        const { parent_id, isNew, isDefault, id, ...rest } = item;
        return {
          isDefault: defaultShipping === id,
          parent_id: parseInt(params?.id),
          ...(isNew ? { isNew } : { isNew: false }),
          ...rest,
          ...(!isNew && { id }),
        };
      });

      ['billing', 'shipping'].forEach(type => {
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
            if (!data?.status) return;
          })
          .catch(err => {
            setIsError(true);
          })
          .finally(res => {
            setIsLoading(false);
            if (type === 'shipping') {
              if (!isError) {
                toast.success('Customer Updated Successfully.');
                setTimeout(() => {
                  history.push('/admin/customers/list');
                }, [2000]);
              }
            }
          });
      });
    }
  }, [operation, params?.id]);

  return (
    <>
      <PageHeader title={`Manage Customer | Edit Customer ${singleUser.isLoading ? '' : `(${singleUser?.data?.email})`}`} />
      <Main>
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
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please Enter First Name' }]}
                        name="first_name"
                        label="First Name"
                        initialValue={singleUser?.data?.first_name}
                      >
                        <Input placeholder="Enter First Name" defaultValue={singleUser?.data?.first_name} />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please Enter Last Name' }]}
                        name="last_name"
                        label="Last Name"
                        initialValue={singleUser?.data?.last_name}
                      >
                        <Input placeholder="Enter Last Name" defaultValue={singleUser?.data?.last_name} />
                      </Form.Item>
                      <Form.Item label="Email">
                        <Input type="email" disabled defaultValue={singleUser?.data?.email} />
                      </Form.Item>

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
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default EditUser;
