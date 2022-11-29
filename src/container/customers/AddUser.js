import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch, Checkbox, Typography, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { customerMutation, customerQuery } from '../../apollo/customer';
import AddressTable from './AddressTable';
const { Paragraph, Text } = Typography;

const AddUser = () => {
  viewPermission('customer');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search)
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();

  const initialAddress = {
    "id": new Date().getTime(),
    "address1": '',
    "address2": '',
    "city": '',
    "country": '',
    "email": '',
    "fax": '',
    "isDefault": false,
    "phone": '',
    "state": '',
    "status": true,
    "zip_code": '',
  }
  const [shippingAddress, setShippingAddress] = useState([])
  const [billingAddress, setBillingAddress] = useState([])
  const [defaultShippingId, setDefaultShippingId] = useState(null)
  const [defaultBillingId, setDefaultBillingId] = useState(null)



  const handleSubmit = values => {
    console.log("🚀 ~ file: AddUser.js ~ line 61 ~ handleSubmit ~ values", values);


    // test
    // 10067


    setIsLoading(true);

    const variables = {
      data: { ...values, status: userStatus, send_mail: sendEmail }

    }
    apolloClient.mutate({
      mutation: customerMutation.ADD_CUSTOMER,
      variables,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: token
        }
      },
      refetchQueries: [
        {
          query: customerQuery.GET_ALL_CUSTOMER,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token
            }
          }
        },
        ['getAllCustomer']
      ],
    }).then(res => {
      const data = res?.data?.addCustomer
      if (!data.status) return toast.error(data.message)
      toast.success(data.message)
      history.push("/admin/customers/list");
    }).catch(err => {
      console.log("error on adding customer", err);
      toast.error(`Something went wrong!!`)
    }).finally(() => setIsLoading(false))



    let check_point = true

    // return
    shippingAddress.forEach(val => {
      const { id, ...rest } = val
      if (check_point && Object.values(rest).some(x => x === null || x === '')) {
        toast.info('Please Provide All Field Properly In Shipping Address Tab..');
        check_point = false
        return;
      }
    });
    if (!check_point) return

    return
    const parent_id = 10067

    if (shippingAddress.length) {
      const variables = {
        data: shippingAddress.map(add => {
          const { id, ...rest } = add
          return defaultShippingId === id ? { ...rest, isDefault: true, parent_id } : { ...rest, parent_id }
        })
      }
      console.log("shipping var", variables);
    }


    return
    apolloClient.mutate({
      mutation: customerMutation.ADD_CUSTOMER_BILLING_ADDRESS,
      variables,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: token
        }
      },
    }).then(res => {
      const data = res?.data?.addCustomerBillingAddress
      if (!data.status) return toast.error(data.message)
      toast.success(data.message)
      history.push("/admin/customers/list");
    }).catch(err => {
      console.log("error on adding customer", err);
      toast.error(`Something went wrong!!`)
    }).finally(() => setIsLoading(false))





  };


  return (
    <>
      <PageHeader
        title={params.uid ? `Manage User | Edit user (${params.email})` : "Add Customer"}
      />
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
                      rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
                      name="first_name"
                      label="First Name"
                    >
                      <Input placeholder='Enter First Name' />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true, message: "Please enter Last Name" }]}
                      name="last_name"
                      label="Last Name"
                    >
                      <Input placeholder='Enter Last Name' />
                    </Form.Item>
                    <Form.Item
                      rules={[{
                        required: true, message: "Please enter an email",
                        max: maxLength,
                      }]}
                      name="email" label="Email"
                    >
                      <Input type='email' placeholder='Enter Email Address' />
                    </Form.Item>


                    <Form.Item
                      label="User Status"
                    >
                      <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                    </Form.Item>

                    <Form.Item
                      label="Send Email"
                    >
                      <Checkbox
                        value={sendEmail}
                        onChange={e => setSendEmail(e.target.checked)}
                      ></Checkbox>
                    </Form.Item>

                  </Tabs.TabPane>


                  <Tabs.TabPane tab="Shipping Address" key="sAddress">
                    {/* <ShippingAddress {...{ initialData, shippingAddress, setShippingAddress }} /> */}
                    <AddressTable
                      initialData={initialAddress}
                      addresses={shippingAddress}
                      setAddresses={setShippingAddress}
                      defaultAddressId={defaultShippingId}
                      setDefaultAddressId={setDefaultShippingId}
                    />
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Billing Address" key="bAddress">
                    {/* <BillingAdderess {...{ initialData, billingAddress, setBillingAddress }} /> */}
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
                    marginTop: '3em'
                  }}
                >
                  <Form.Item>

                    <Button
                      loading={isLoading}
                      size="default" htmlType="submit" type="primary" raised>
                      {isLoading ? 'Processing' : 'Save'}
                    </Button>
                    <Link to="/admin/customers/list">
                      <Button
                        // className="btn-cancel"
                        type='white'
                        size="large"
                      // onClick={() => {
                      //     return form.resetFields();
                      // }}
                      >
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