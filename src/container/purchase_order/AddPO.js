import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Tabs, Select, Radio, Card } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { vendorMutation, vendorQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const AddPO = () => {
  viewPermission('purchase-order');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [vendors, setVendors] = useState({ data: [], isLoading: true });
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ============+ for product START +====================
  const initialData = {
    key: new Date().getTime(),
    id: '',
    price: '',
    quantity: '',
    country: '',
    recieved_quantity: '',
  };
  const [products, setProducts] = useState([initialData]);
  // ============+ for product END +====================

  // LOAD Vendor List
  useEffect(() => {
    apolloClient
      .query({
        query: vendorQuery.GET_ALL_VENDOR,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllVendor;
        if (!data?.status) return;
        setVendors(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setVendors(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setVendors(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    const variables = { ...values, status };
    // validate billingAddresses.
    const notValidate = billingAddresses.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2);
      return checkFalse;
    });
    if (notValidate?.id) return toast.warning('Enter Billing Address Correctly!');

    // ADD NEW Vendor
    setIsLoading(true);
    if (!params.id) {
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
        })
        .then(res => {
          const data = res?.data?.createVendor;
          if (!data.status) return toast.error(data.message);

          // add billing address
          const parent_id = data.id;
          billingAddresses.forEach((val, index) => {
            const { id, ...rest } = val;
            apolloClient
              .mutate({
                mutation: vendorMutation.ADD_VENDOR_BILLING_ADDRESS,
                variables: { data: { ...rest, parent_id } },
                context: {
                  headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token,
                  },
                },
              })
              .then(res => {
                const data = res?.data?.addVendorBillingAddress;
              })
              .catch(err => {
                console.log('error on add billing:\n', res);
                isLoading(false);
                return toast.error('Something went wrong');
              });
          });
        })
        .catch(err => {
          console.log('got error on add vendor', err);
          return toast.error('Something Went wrong !!');
        });
    }
    // UPDATE vendor
    else {
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
        })
        .then(res => {
          const data = res?.data?.updateVendor;
          if (!data.status) return toast.error(data.message);

          // add shipping address
          const addresses = [...billingAddresses];
          addresses.forEach((val, index) => {
            // const { __typename, updatedAt, createdAt, type, ...rest } = val
            apolloClient
              .mutate({
                mutation: vendorMutation.UPDATE_VENDOR_ADDRESS,
                variables: { data: val },
                context: {
                  headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t'),
                  },
                },
              })
              .then(res => {
                const data = res?.data?.addVendorShippingAddress;
                if (addresses.length === index + 1) {
                  setTimeout(() => {
                    history.push('/admin/vendor/list');
                    window.location.reload();
                  }, 2000);
                }
              })
              .catch(err => {
                isLoading(false);
                return toast.error('Something went wrong');
              });
          });
        })
        .catch(err => {
          console.log('got error on update vendor', err);
          return toast.error('Something Went wrong !!');
        });
    }
  };

  const handleVendorChange = e => {
    setVendors(s => ({ ...s, isLoading: true }));
    apolloClient
      .query({
        query: vendorQuery.GET_SINGLE_VENDOR,
        variables: {
          query: { id: e },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleVendor;
        if (!data?.status) return;
        let new_billing = [];
        let new_shipping = [];
        data?.data?.addresses.forEach(item => {
          if (item.type === 'billing') new_billing.push(item);
          else if (item.type === 'shipping') new_shipping.push(item);
        });
        setBillingAddresses(new_billing);
        setShippingAddresses(new_shipping);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setVendors(s => ({ ...s, isLoading: false }));
      });
  };

  return (
    <>
      <PageHeader title="Add Purchase Order" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {vendors.isLoading ? (
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
                >
                  <Tabs>
                    <Tabs.TabPane tab="General" key="general">
                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Vendor' }]}
                        name="vendor_id"
                        label="Vendor"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Vendor"
                          initialvalues=""
                          onChange={handleVendorChange}
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          {vendors.data.map(val => {
                            return (
                              <Select.Option key={val.id} value={val.id} label={val.company_name}>
                                <div className="demo-option-label-item">{val.company_name}</div>
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      {billingAddresses.length > 0 && (
                        <Form.Item
                          rules={[{ required: true, message: 'Please Select Billing Address' }]}
                          name="billing_address"
                          label="Billing Address"
                        >
                          <Radio.Group>
                            {billingAddresses.map(item => (
                              <Radio value={item.id}>
                                <Card
                                  style={{ width: 350, border: '1px solid #f0f0f0',fontSize:12, marginBottom: 10 }}
                                  size="small"
                                >
                                  <p>
                                    <b>Address 1: </b>
                                    {ellipsis(item.address1, 40)}
                                  </p>
                                </Card>
                              </Radio>
                            ))}
                          </Radio.Group>
                        </Form.Item>
                      )}

                      {shippingAddresses.length > 0 && (
                        <Form.Item
                          rules={[{ required: true, message: 'Please Select Shipping Address' }]}
                          name="shipping_address"
                          label="Shipping Address"
                        >
                          <Radio.Group>
                            {shippingAddresses.map(item => (
                              <Radio value={item.id}>
                                <Card
                                  style={{ width: 350, border: '1px solid #f0f0f0', fontSize:12, marginBottom: 10 }}
                                  size="small"
                                >
                                  <p>
                                    <b>Address 1: </b>
                                    {ellipsis(item.address1, 40)}
                                  </p>
                                </Card>
                              </Radio>
                            ))}
                          </Radio.Group>
                        </Form.Item>
                      )}

                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Shipping Method' }]}
                        name="shipping_method"
                        label="Shipping Method"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Shipping Method"
                          initialvalues=""
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key={1} value={1} label="Payment Method 1">
                            <div className="demo-option-label-item">Payment Method 1</div>
                          </Select.Option>

                          <Select.Option key={2} value={2} label="Payment Method 2">
                            <div className="demo-option-label-item">Payment Method 2</div>
                          </Select.Option>

                          <Select.Option key={3} value={3} label="Payment Method 3">
                            <div className="demo-option-label-item">Payment Method 3</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, message: 'Please Enter Tax Amount' }]}
                        label="Tax Amount"
                        name="tax_amount"
                      >
                        <Input placeholder="Enter Tax Amount" type="number" />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Order Placed Via' }]}
                        name="order_placed_via"
                        label="Order Placed Via"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Order Placed Via"
                          initialvalues=""
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key="email" value="email" label="Email">
                            <div className="demo-option-label-item">Email</div>
                          </Select.Option>

                          <Select.Option key="phone" value="phone" label="Phone">
                            <div className="demo-option-label-item">Phone</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Status' }]}
                        name="status"
                        label="Status"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Status"
                          initialvalues=""
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key="new" value="new" label="New">
                            <div className="demo-option-label-item">New</div>
                          </Select.Option>
                          <Select.Option key="submitted" value="submitted" label="Submitted">
                            <div className="demo-option-label-item">Submitted</div>
                          </Select.Option>
                          <Select.Option key="partially_received" value="partially_received" label="Partially Received">
                            <div className="demo-option-label-item">Partially Received</div>
                          </Select.Option>
                          <Select.Option key="received" value="received" label="Received">
                            <div className="demo-option-label-item">Received</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="comment" label="Comment">
                        <TextArea rows={4} placeholder="Enter Comment" />
                      </Form.Item>
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
                      <Link to="/admin/po/list">
                        <Button type="white" size="large">
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

export default AddPO;
