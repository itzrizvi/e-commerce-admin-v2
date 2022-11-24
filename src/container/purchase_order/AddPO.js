import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Tabs, Select, Radio } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { productQuery, vendorQuery } from '../../utility/apollo';
import { poQuery } from '../../apollo/po';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import Products from './Products';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const AddPO = () => {
  viewPermission('purchase-order');
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
    recieved_quantity: 0,
  };
  const [products, setProducts] = useState([initialData]);
  const [productOption, setProductOption] = useState([]);
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
/* --------------------------- product list fetch start --------------------------- */
  useEffect(() => {
    apolloClient.query({
        query: productQuery.GET_PRODUCT_LIST,
        context: {
            headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token
            }
        }
    }).then(res => {
        const data = res.data.getProductList
        if (!data.status) return toast.error(data.message)
        const options = data?.data?.map(item => ({
            label: item.prod_name,
            value: item.id,
        }))
        setProductOption(options)
    }).catch(err => {

    })

}, [])

/* -------------------------- End of product fetch -------------------------- */


  const handleSubmit = values => {
    // validate Products.
    const notValidate = products.find(item => {
      const { id, price, quantity, recieved_quantity } = item;
      const checkFalse = !(id && price && quantity && recieved_quantity !== '');
      return checkFalse;
    });
    if (notValidate?.id) return toast.warning('Please Fill Products All of Data!');
    const newProduct = products.map((item) => {
      const {key, ...newItem} = item
      return newItem
    })
    const variables = { ...values, products: newProduct, tax_amount: parseFloat(values.tax_amount), };

    // ADD NEW Vendor
    setIsLoading(true);
      apolloClient
        .mutate({
          mutation: poQuery.CREATE_PURCHASE_ORDER,
          variables: { data: variables },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
          refetchQueries: [
            {
              query: poQuery.GET_ALL_PO,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            },
            ['getPurchaseOrderList'],
          ],
        })
        .then(res => {
          const data = res?.data?.createPurchaseOrder;
          if (!data.status) return toast.error(data.message);
          history.push('/admin/po/list');
          toast.success(data.message);
        })
        .catch(err => {
          console.log('got error on add vendor', err);
          return toast.error('Something Went wrong !!');
        });
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
                    <Tabs.TabPane tab="Vendor Info" key="vendor">
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
                                <div className="demo-option-label-item">{val.company_name} - {val.contact_person} </div>
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      {billingAddresses.length > 0 && (
                        <Form.Item
                          rules={[{ required: true, message: 'Please Select Billing Address' }]}
                          name="vendor_billing_id"
                          label="Billing Address"
                        >
                          <Radio.Group style={{ width: '100%', padding: 10 }}>
                            <Row gutter={25}>
                              {billingAddresses.map(item => (
                                <Col xs={24} md={12} lg={12}>
                                  <Radio style={{ width: '100%', border: '1px solid #f0f0f0', fontSize: 12, marginBottom: 10, padding: 10, borderRadius: 5 }} value={item.id}>
                                    <p><b>Email: </b>{item.email}</p>
                                    <p><b>Phone: </b>{item.phone}</p>
                                    <p><b>Address 1: </b>{item.address1 && ellipsis(item.address1, 35)}</p>
                                    <p><b>Address 2: </b>{item.address2 && ellipsis(item.address2, 35)}</p>
                                    <p><b>City: </b>{item.city}</p>
                                    <p><b>State: </b>{item.state}</p>
                                    <p><b>Zip Code: </b>{item.zip_code}</p>
                                  </Radio>
                                </Col>
                              ))}
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      )}

                      {shippingAddresses.length > 0 && (
                        <Form.Item
                          rules={[{ required: true, message: 'Please Select Shipping Address' }]}
                          name="vendor_shipping_id"
                          label="Shipping Address"
                        >
                          <Radio.Group style={{ width: '100%', padding: 10 }}>
                            <Row gutter={25}>
                              {shippingAddresses.map(item => (
                                <Col xs={24} md={12} lg={12}>
                                  <Radio style={{ width: '100%', border: '1px solid #f0f0f0', fontSize: 12, marginBottom: 10, padding: 10, borderRadius: 5 }} value={item.id}>
                                    <p><b>Email: </b>{item.email}</p>
                                    <p><b>Phone: </b>{item.phone}</p>
                                    <p><b>Address 1: </b>{item.address1 && ellipsis(item.address1, 35)}</p>
                                    <p><b>Address 2: </b>{item.address2 && ellipsis(item.address2, 35)}</p>
                                    <p><b>City: </b>{item.city}</p>
                                    <p><b>State: </b>{item.state}</p>
                                    <p><b>Zip Code: </b>{item.zip_code}</p>
                                  </Radio>
                                </Col>
                              ))}
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      )}
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Other Info" key="other">
                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Shipping Method' }]}
                        name="shipping_method_id"
                        label="Shipping Method"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Shipping Method"
                          initialvalues=""
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key={1} value={1} label="Shipping Method 1">
                            <div className="demo-option-label-item">Shipping Method 1</div>
                          </Select.Option>

                          <Select.Option key={2} value={2} label="Shipping Method 2">
                            <div className="demo-option-label-item">Shipping Method 2</div>
                          </Select.Option>

                          <Select.Option key={3} value={3} label="Shipping Method 3">
                            <div className="demo-option-label-item">Shipping Method 3</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Payment Method' }]}
                        name="payment_method_id"
                        label="Payment Method"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Payment Method"
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
                    <Tabs.TabPane tab="Products" key="products">
                    <Products {...{ initialData, products, setProducts, productOption }} />
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
