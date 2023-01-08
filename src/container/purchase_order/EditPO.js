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

const EditPO = () => {
  viewPermission('purchase-order');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [vendors, setVendors] = useState([]);
  const [singlePO, setSinglePO] = useState({ data: [], isLoading: true });
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderInput, setOrderInput] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // ============+ for product START +====================
  const initialData = {
    key: new Date().getTime(),
    id: '',
    price: '',
    quantity: '',
    recieved_quantity: 0,
    isNew: true,
  };
  const [products, setProducts] = useState([]);
  const [productOption, setProductOption] = useState([]);

  // Get Order List with Address
  useEffect(() => {
    apolloClient
      .query({
        query: poQuery.GET_ORDER_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderlistAdmin;
        if (!data?.status) return;
        setOrderData(data?.data);
        const order_data = data?.data
          .filter(item => {
            const item_order_slug = item.orderStatus.slug;
            if (item_order_slug === 'pending' || item_order_slug === 'in-progress') return true;
            else return false;
          })
          .map(item => {
            return {
              value: item.id,
              label: 'Order No: ' + item.id,
            };
          });
        setOrderList(order_data);
      });
  }, []);

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
        setVendors(data?.data);
      });
  }, []);
  /* --------------------------- product list fetch start --------------------------- */
  useEffect(() => {
    apolloClient
      .query({
        query: productQuery.GET_PRODUCT_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res.data.getProductList;
        if (!data.status) return toast.error(data.message);
        const options = data?.data?.map(item => ({
          label: item.prod_name,
          value: item.id,
        }));
        setProductOption(options);
      })
      .catch(err => {});
  }, []);

  /* -------------------------- End of product fetch -------------------------- */

  /* ------------------------ Get Single PO Order Start ----------------------- */
  useEffect(() => {
    if (!params?.id) return history.push('/admin/po/list');
    apolloClient
      .query({
        query: poQuery.GET_SINGLE_PO,
        variables: {
          query: {
            id: parseInt(params?.id),
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
        const data = res?.data?.getSinglePurchaseOrder;
        if (!data.status) return;
        setSinglePO({ data: data?.data, isLoading: false, message: data?.message });
        setSelectedType(data?.data?.type);
        const po_order_type = data?.data?.type;
        if (data?.data?.type === 'drop_shipping') {
          setOrderInput(true);
          var po_selected_order = parseInt(data?.data?.order_id);
        }
        setSelectedOrder(parseInt(data?.data?.order_id));
        form.setFieldsValue({
          type: data?.data?.type,
          comment: data?.data?.comment,
          shipping_method_id: data?.data?.shipping_method_id,
          payment_method_id: data?.data?.paymentmethod?.id,
          status: data?.data?.status,
          tax_amount: data?.data?.tax_amount ?? 0,
          vendor_id: data?.data?.vendor?.id,
          vendor_billing_id: data?.data?.vendorBillingAddress?.id,
          vendor_shipping_id: data?.data?.vendorShippingAddress?.id,
          order_id: parseInt(data?.data?.order_id),
        });
        let new_product_list = [];
        new_product_list = data?.data?.poProductlist?.map(item => {
          return {
            key: new Date().getTime(),
            id: item.product.id,
            price: item.price,
            quantity: item.quantity,
            recieved_quantity: item.recieved_quantity,
            isNew: false,
          };
        });
        setProducts(new_product_list);
        /* ------------------------------- Set Address ------------------------------ */
        apolloClient
          .query({
            query: vendorQuery.GET_SINGLE_VENDOR,
            variables: {
              query: { id: data?.data?.vendor?.id },
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
            if (po_order_type === 'drop_shipping') {
              apolloClient
                .query({
                  query: poQuery.GET_COMPANY_BILLING,
                  context: {
                    headers: {
                      TENANTID: process.env.REACT_APP_TENANTID,
                      Authorization: token,
                    },
                  },
                })
                .then(res => {
                  const data = res?.data?.getCompanyInfo;
                  if (!data?.status) return;
                  setBillingAddresses(data?.data?.billingAddresses);
                });
              if (orderData.length > 0) {
                const get_actual_data = orderData.filter(item => item.id === po_selected_order);
                const customer_id = parseInt(get_actual_data[0]?.customer.id);
                apolloClient
                  .query({
                    query: poQuery.GET_ADDRESS_BY_CUSTOMER,
                    variables: {
                      query: {
                        customer_id,
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
                    const data = res?.data?.getAddressListByCustomerID;
                    if (!data?.status) return;
                    const shipping_address = data?.data.filter(item => item.type === 'shipping');
                    setShippingAddresses(shipping_address);
                  });
              }
            } else {
              data?.data?.addresses.forEach(item => {
                if (item.type === 'billing') new_billing.push(item);
                else if (item.type === 'shipping') new_shipping.push(item);
              });
              setBillingAddresses(new_billing);
              setShippingAddresses(new_shipping);
            }
          })
          .catch(err => {
            console.log(err);
          });
        /* ----------------------------- End set Address ---------------------------- */
      })
      .catch(err => {
        console.log(err);
        setSinglePO({ data: {}, isLoading: false, error: 'Something went worng' });
      })
      .finally(() => {
        setSinglePO(s => ({ ...s, isLoading: false }));
      });
  }, [orderData]);
  /* ------------------------- Get Single PO Order End ------------------------ */

  const handleSubmit = values => {
    if (values.vendor_billing_id === undefined || values.vendor_shipping_id === undefined)
      return toast.error('Please Select Billing and Shipping Address!'); // validate Products.
    const notValidate = products.find(item => {
      const { id, price, quantity, recieved_quantity } = item;
      const checkFalse = !(id && price && quantity && recieved_quantity !== '');
      return checkFalse;
    });
    if (notValidate?.key) return toast.warning('Please Fill Products All of Data!');
    const newProduct = products.map(item => {
      const { key, ...newItem } = item;
      return newItem;
    });
    const variables = {
      ...values,
      products: newProduct,
      tax_amount: parseFloat(values.tax_amount),
      id: singlePO.data.id,
      po_id: singlePO.data.po_id,
    };

    // ADD NEW Vendor
    setIsLoading(true);
    apolloClient
      .mutate({
        mutation: poQuery.UPDATE_PO,
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
          {
            query: poQuery.GET_SINGLE_PO,
            variables: {
              query: {
                id: parseInt(params?.id),
              },
            },
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
        ],
      })
      .then(res => {
        const data = res?.data?.updatePurchaseOrder;
        if (!data.status) return toast.error(data.message);
        setTimeout(() => {
          history.push('/admin/po/list');
        }, 1000);
        toast.success(data.message);
      })
      .catch(err => {
        console.log('got error on add vendor', err);
        return toast.error('Something Went wrong !!');
      });
  };

  const handleVendorChange = e => {
    setSinglePO(s => ({ ...s, isLoading: true }));
    if (selectedType === 'drop_shipping') {
      apolloClient
        .query({
          query: poQuery.GET_COMPANY_BILLING,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
        })
        .then(res => {
          const data = res?.data?.getCompanyInfo;
          if (!data?.status) return;
          setBillingAddresses(data?.data?.billingAddresses);
        })
        .finally(() => {
          setSinglePO(s => ({ ...s, isLoading: false }));
        });
      if (orderData.length > 0) {
        setSinglePO(s => ({ ...s, isLoading: true }));
        const get_actual_data = orderData.filter(item => item.id === selectedOrder);
        const customer_id = parseInt(get_actual_data[0]?.customer.id);
        apolloClient
          .query({
            query: poQuery.GET_ADDRESS_BY_CUSTOMER,
            variables: {
              query: {
                customer_id,
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
            const data = res?.data?.getAddressListByCustomerID;
            if (!data?.status) return;
            const shipping_address = data?.data.filter(item => item.type === 'shipping');
            setShippingAddresses(shipping_address);
          })
          .finally(() => {
            setSinglePO(s => ({ ...s, isLoading: false }));
          });
      }
    } else {
      if (singlePO?.data?.vendor?.id === e) {
        form.setFieldsValue({
          vendor_billing_id: singlePO?.data?.vendorBillingAddress?.id,
          vendor_shipping_id: singlePO?.data?.vendorShippingAddress?.id,
        });
      } else {
        form.setFieldsValue({
          vendor_billing_id: '',
          vendor_shipping_id: '',
        });
      }

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
          setSinglePO(s => ({ ...s, isLoading: false }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleTypeChange = type => {
    form.setFieldsValue({
      vendor_id: ''
    });

    setSelectedType(type);
    setBillingAddresses([]);
    setShippingAddresses([]);
    if (type === 'default') {
      setOrderInput(false);
    } else if (type === 'drop_shipping') {
      setOrderInput(true);
    }
  };

  const chageOrderIdHandler = val => {
    setSelectedOrder(val);
    setBillingAddresses([]);
    setShippingAddresses([]);
    form.setFieldsValue({
      vendor_id: '',
    });
  };
  return (
    <>
      <PageHeader title={`Manage Purchase Order | Edit Purchase Order `} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singlePO.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="editVendor"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="Vendor Info" key="vendor">
                      <Form.Item rules={[{ required: true, message: 'Please Select Type' }]} name="type" label="Type">
                        <Select
                          size="middle"
                          placeholder="Select Type"
                          onChange={handleTypeChange}
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key="default" value="default" label="Default">
                            <div className="demo-option-label-item">Default</div>
                          </Select.Option>
                          <Select.Option key="drop_shipping" value="drop_shipping" label="Drop Shipping">
                            <div className="demo-option-label-item">Drop Shipping</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      {orderInput && (
                        <Form.Item
                          rules={[{ required: true, message: 'Please Select Order' }]}
                          name="order_id"
                          label="Order"
                        >
                          <Select
                            size="middle"
                            showSearch
                            placeholder="Select a order"
                            style={{ width: '100%' }}
                            options={orderList}
                            onChange={e => chageOrderIdHandler(e)}
                          />
                        </Form.Item>
                      )}
                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Vendor' }]}
                        name="vendor_id"
                        label="Vendor"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Vendor"
                          onChange={handleVendorChange}
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          {vendors.map(val => {
                            return (
                              <Select.Option key={val.id} value={val.id} label={val.company_name}>
                                <div className="demo-option-label-item">
                                  {val.company_name} - {val.contact_person}{' '}
                                </div>
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
                                  <Radio
                                    style={{
                                      width: '100%',
                                      border: '1px solid #f0f0f0',
                                      fontSize: 12,
                                      marginBottom: 10,
                                      padding: 10,
                                      borderRadius: 5,
                                    }}
                                    value={item.id}
                                  >
                                    <p>
                                      <b>Email: </b>
                                      {item.email}
                                    </p>
                                    <p>
                                      <b>Phone: </b>
                                      {item.phone}
                                    </p>
                                    <p>
                                      <b>Address 1: </b>
                                      {item.address1 && ellipsis(item.address1, 35)}
                                    </p>
                                    <p>
                                      <b>Address 2: </b>
                                      {item.address2 && ellipsis(item.address2, 35)}
                                    </p>
                                    <p>
                                      <b>City: </b>
                                      {item.city}
                                    </p>
                                    <p>
                                      <b>State: </b>
                                      {item.state}
                                    </p>
                                    <p>
                                      <b>Zip Code: </b>
                                      {item.zip_code}
                                    </p>
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
                                  <Radio
                                    style={{
                                      width: '100%',
                                      border: '1px solid #f0f0f0',
                                      fontSize: 12,
                                      marginBottom: 10,
                                      padding: 10,
                                      borderRadius: 5,
                                    }}
                                    value={item.id}
                                  >
                                    <p>
                                      <b>Email: </b>
                                      {item.email}
                                    </p>
                                    <p>
                                      <b>Phone: </b>
                                      {item.phone}
                                    </p>
                                    <p>
                                      <b>Address 1: </b>
                                      {item.address1 && ellipsis(item.address1, 35)}
                                    </p>
                                    <p>
                                      <b>Address 2: </b>
                                      {item.address2 && ellipsis(item.address2, 35)}
                                    </p>
                                    <p>
                                      <b>City: </b>
                                      {item.city}
                                    </p>
                                    <p>
                                      <b>State: </b>
                                      {item.state}
                                    </p>
                                    <p>
                                      <b>Zip Code: </b>
                                      {item.zip_code}
                                    </p>
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
                        {isLoading ? 'Processing' : 'Update PO'}
                      </Button>
                      <Link to="/admin/po/list">
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
export default EditPO;
