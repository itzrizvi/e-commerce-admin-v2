import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Typography, Select, Radio, Steps, Modal, Switch, Badge } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { vendorMutation, vendorQuery } from '../../utility/apollo';
import { poQuery } from '../../apollo/po';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import Products from './Products';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
import { orderQuery } from '../../apollo/order';
import { methodQuery } from '../../apollo/method';
import { strCamelCase } from '../../utility/stringModify';
import { addressSchema } from '../../apollo/address';
import SelectNotFound from '../../components/esential/SelectNotFound';

const AddPO = () => {
  viewPermission('purchase-order');
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const [vendors, setVendors] = useState({ data: [], isLoading: true });
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [shippingMethod, setShippingMethod] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [addressType, setAddressType] = useState(null);
  const [listAddressModalOpen, setListAddressModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const [shippingMethodAccountList, setShippingMethodAccountList] = useState([]);
  const [editSelectedAddress, setEditSelectedAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);
  const [contactPerson, setContactPerson] = useState([]);
  const [searchOrderOption, setSearchOrderOption] = useState(false);
  const [orderNotFoundContent, setOrderNotFoundContent] = useState('No Data!');
  const [changeAddress, setChangeAddress] = useState(false);


  // ============+ for product START +====================
  const initialData = {
    id: '',
    prod_name: '',
    quantity: 1,
    price: 0,
    recieved_quantity: 0,
  };
  const [products, setProducts] = useState([]);
  // ============+ for product END +====================

  let check_post = true;
  useEffect(() => {
    if (!params || !params.order_id) return;
    if (check_post) {
      check_post = false;
      setSelectedType('drop_shipping');
      form.setFieldsValue({
        type: 'drop_shipping',
        order_id: parseInt(params.order_id),
      });

      /* ------------------------- Get Single View Order ------------------------ */
      apolloClient
        .query({
          query: orderQuery.GET_SINGLE_ORDER_ADMIN,
          variables: {
            query: {
              order_id: parseInt(params.order_id),
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
          const data = res.data.getSingleOrderAdmin;
          if (!data.status) return;
          setSelectedOrder(data?.data);
          const prods = data.data?.orderitems?.map(item => {
            const {
              quantity,
              price,
              product: { id },
            } = item;
            return {
              key: new Date().getTime() + Math.floor(Math.random() * 10) + 1,
              id,
              price,
              quantity,
              recieved_quantity: 0,
            };
          });
          setProducts(prods);
        });
    }
  }, [params?.order_id]);

  // Get Order List with Address
  useEffect(() => {
    // Load Shipping Method
    apolloClient
      .query({
        query: methodQuery.GET_SHIPPING_METHOD_LIST_ADMIN,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getShippingMethodListAdmin;
        if (!data.status) return;
        setShippingMethod(data?.data);
        setSelectedShippingMethod(data?.data?.filter(item => item.isDefault === true)[0]?.id);
      })
      .catch(err => {
        console.log(err);
      });

    // Load Payment Mathod
    apolloClient
      .query({
        query: methodQuery.GET_PAYMENT_METHOD_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPaymentMethodListPublic;
        if (!data.status) return;
        setPaymentMethod(data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    apolloClient
      .query({
        query: addressSchema.GET_STATE_LISTS,
        variables: {
          query: {
            code: selectedCountryCode,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getStateList;
        if (!data?.status) return;
        setStates(data?.data);
      });
  }, [selectedCountryCode]);

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

    // Get Country List
    apolloClient
      .query({
        query: addressSchema.GET_COUNTRY_LIST,
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID },
        },
      })
      .then(res => {
        const data = res.data.getCountryList;
        if (!data.status) return true;
        setCountries(data?.data);
      });
    // Get Account List for Shipping Method
    apolloClient
      .query({
        query: orderQuery.GET_SHIPPING_ACCOUNT_LIST,
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID, Authorization: token },
        },
      })
      .then(res => {
        const data = res.data.getShippingAccountListAdmin;
        if (!data?.status) return true;
        setShippingMethodAccountList(data?.data);
      });
  }, []);

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    // validate Products.
    if(products.length === 0) return  toast.warning('Please Select at Least One Product!');
    const notValidate = products.find(item => {
      const { id, price, quantity, recieved_quantity } = item;
      const checkFalse = !(id && price && quantity && recieved_quantity !== '');
      return checkFalse;
    });
    if (notValidate) return toast.warning('Please Fill Products All of Data!');
    const newProduct = products.map(item => {
      const { key, ...newItem } = item;
      return newItem;
    });
    const variables = {
      ...values,
      products: newProduct,
      tax_amount: parseFloat(values.tax_amount),
      order_id: parseInt(values.order_id),
    };

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
        setTimeout(() => {
          history.push('/admin/po/list');
        }, 1000);
        toast.success(data.message);
      })
      .catch(err => {
        console.log('got error on add vendor', err);
        return toast.error('Something Went wrong !!');
      })
      .finally(() => setIsLoading(false));
  };

  const handleVendorChange = e => {
    setVendors(s => ({ ...s, isLoading: true }));
    const customer_id = selectedOrder?.customer?.id;
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
      .then(async res => {
        const data = res?.data?.getSingleVendor;
        if (!data?.status) return;        
        let new_billing = [];
        const contact_person = [];
        let new_shipping = [];
        data.data.contactPersons.forEach(person => {
          contact_person.push({ ...person, isNew: false, label: person.email, value: person.id  });
        });
        setContactPerson(contact_person);
        if (selectedType === 'drop_shipping') {
          await form.validateFields(['order_id']);
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
              setSelectedBillingAddress(data?.data?.billingAddresses.filter(item => item.isDefault));
              setBillingAddresses(data?.data?.billingAddresses);
            });
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
              setSelectedShippingAddress(shipping_address.filter(item => item.isDefault));
            });
        } else {
          data?.data?.addresses.forEach(item => {
            if (item.type === 'billing') new_billing.push(item);
            else if (item.type === 'shipping') new_shipping.push(item);
          });
          setBillingAddresses(new_billing);
          setSelectedBillingAddress(new_billing.filter(item => item.isDefault)[0] ?? []);
          setShippingAddresses(new_shipping);
          setSelectedShippingAddress(new_shipping.filter(item => item.isDefault)[0] ?? []);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setVendors(s => ({ ...s, isLoading: false }));
      });
  };

  const handleTypeChange = type => {
    form.setFieldsValue({
      vendor_id: '',
    });
    setSelectedOrder('');
    setSelectedType(type);
    setBillingAddresses([]);
    setShippingAddresses([]);
  };

  const chageOrderIdHandler = val => {
    setBillingAddresses([]);
    setShippingAddresses([]);
    form.setFieldsValue({
      vendor_id: '',
    });
  };

  // Add Edit Address Modal Open
  const addOrEditAddressHandler = (id, type) => {
    setAddressType(type);
    if (id) {
      setIsAddressEdit(true);
      if (type === 'billing') {
        setEditSelectedAddress(billingAddresses.filter(item => item.id === id)[0]);
        form.setFieldsValue({
          vendor_billing_id: id,
        });
      } else {
        setEditSelectedAddress(shippingAddresses.filter(item => item.id === id)[0]);
        form.setFieldsValue({
          vendor_shipping_id: id,
        });
      }
    } else {
      setEditSelectedAddress(null);
      addressForm.resetFields();
      setIsAddressEdit(false);
    }
    setAddressModalOpen(true);
  };

  // Trigger Function when select an address finally
  const selectAddressHandler = (type, id) => {
    if (!tempSelectedAddress) return;
    if (type === 'billing') {
      setSelectedBillingAddress(tempSelectedAddress);
      form.setFieldsValue({
        vendor_billing_id: id,
      });
    } else {
      setSelectedShippingAddress(tempSelectedAddress);
      form.setFieldsValue({
        vendor_shipping_id: id,
      });
    }
    setListAddressModalOpen(false);
    setTempSelectedAddress(null);
  };

  /* -------------------------- Step From Data Start -------------------------- */
  const steps = [
    {
      title: 'Vendor Info',
      percent: 30,
    },
    {
      title: 'Addresses',
      percent: 50,
    },
    {
      title: 'Other Info',
      percent: 80,
    },
    {
      title: 'Products',
      percent: 100,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = async () => {
    try {
      if (current === 0) {
        await form.validateFields(['type', 'vendor_id']);
      } else if (current === 2) {
        await form.validateFields(['tax_amount', 'shipping_method_id', 'payment_method_id']);
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
  // First Time Change address open Modal
  const changeAddressHandler = type => {
    setListAddressModalOpen(true);
    setAddressType(type);
  };


  // Handle Address Submit
  const handleAddressSubmit = type => {
    const values = addressForm.getFieldValue();
    const vendor_id = form.getFieldValue('vendor_id')
    setChangeAddress(false);
    let newBillingAddress = [];
    let newShippingAddress = [];
    if (editSelectedAddress) {
      if (type === 'billing') {
        newBillingAddress = billingAddresses.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, countryCode, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: vendor_id,
            isNew: false,
            isDefault: isDefault,
            id,
            ...rest,
          };
        });
      } else {
        newShippingAddress = shippingAddresses.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, countryCode, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: vendor_id,
            isDefault: isDefault,
            isNew: false,
            id,
            ...rest,
          };
        });
      }

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
          if (!data?.status) return;
          setChangeAddress(true);
          setAddressModalOpen(false);
        });
    } else {
      if (type === 'billing') newBillingAddress.push({ parent_id: vendor_id, ...values });
      else newShippingAddress.push({ parent_id: vendor_id, ...values });
      apolloClient
        .mutate({
          mutation:
            type === 'billing'
              ? vendorMutation.ADD_VENDOR_BILLING_ADDRESS
              : vendorMutation.ADD_VENDOR_SHIPPING_ADDRESS,
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
          const data =
            type === 'billing' ? res?.data?.addVendorBillingAddress : res?.data?.addVendorShippingAddress;
          if (!data?.status) return;
          setChangeAddress(true);
          setAddressModalOpen(false);
        });
    }
  };

  return (
    <>
      <PageHeader title="Add Purchase Order" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {vendors.isLoading && params?.order_id ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addPO"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 6 }}
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
                          <>
                            <Row gutter={25}>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  initialValue="default"
                                  rules={[{ required: true, message: 'Please Select Type' }]}
                                  name="type"
                                  label="Type"
                                >
                                  <Select
                                    size="middle"
                                    placeholder="Select Type"
                                    defaultValue="default"
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
                                <Form.Item
                                  name="order_id"
                                  label="Order"
                                  {...(selectedType === 'drop_shipping' && {
                                    rules: [{ required: true, message: 'Please Select Order' }],
                                  })}
                                >
                                  <Select
                                    size="middle"
                                    type="number"
                                    showSearch
                                    placeholder="Select an order (optional)"
                                    style={{ width: '100%' }}
                                    options={orderList}
                                    open={searchOrderOption}
                                    onSelect={e => {
                                      chageOrderIdHandler(e);
                                      setSearchOrderOption(false);
                                    }}
                                    onBlur={() => setSearchOrderOption(false)}
                                    onInputKeyDown={key => {
                                      setOrderNotFoundContent('No Data!');
                                      setSearchOrderOption(true);
                                      if (key.keyCode === 13) {
                                        const val = key.target.value;
                                        if (val.length >= 1) {
                                          apolloClient
                                            .query({
                                              query: orderQuery.GET_SEARCH_ORDER,
                                              variables: {
                                                query: {
                                                  searchQuery: parseInt(val),
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
                                              const data = res?.data?.getOrderBySearch;
                                              if (!data.status) return;
                                              if (data?.data.length === 0)
                                                return setOrderNotFoundContent('No Order Found!');
                                              setSelectedOrder(data?.data[0]);
                                              setOrderList(
                                                data.data.map(order => ({
                                                  label: order?.id,
                                                  value: order?.id,
                                                })),
                                              );
                                            });
                                        } else {
                                          setOrderList([]);
                                        }
                                      }
                                    }}
                                    notFoundContent={<SelectNotFound value={orderNotFoundContent} />}
                                  />
                                </Form.Item>
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
                                    {vendors.data.map(val => {
                                      return (
                                        <Select.Option key={val.id} value={val.id} label={val.company_name}>
                                          <div className="demo-option-label-item">
                                            {val.company_name} - {val.contact_person}
                                          </div>
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                {contactPerson.length > 0 && (
                                  <Form.Item name="contact_person_id" label="Contact Person">
                                    <Select placeholder="Contact Person (optional)" options={contactPerson} />
                                  </Form.Item>
                                )}
                              </Col>
                            </Row>
                          </>
                        )}
                        {current === 1 && (
                          <Row gutter={25}>
                            <Col sm={12}>
                              <Typography.Title level={5}>Shipping Address</Typography.Title>
                              <Form.Item
                                rules={[{ required: true, message: 'Please Select Shipping Address' }]}
                                name="vendor_shipping_id"
                                initialValue={selectedShippingAddress?.id}
                              >
                                {!selectedShippingAddress?.id && shippingAddresses.length > 0 ? (
                                  <Button
                                    size="small"
                                    style={{ position: 'absolute', right: 14, zIndex: 1000, top: -40 }}
                                    title="Change Shipping Address"
                                    htmlType="button"
                                    type="info"
                                    onClick={() => changeAddressHandler('shipping')}
                                  >
                                    Select Address
                                  </Button>
                                ) : (
                                  !selectedShippingAddress?.id && (
                                    <Button
                                      size="small"
                                      style={{ position: 'absolute', right: 14, zIndex: 1000, top: -40 }}
                                      title={`Add Shipping Address`}
                                      htmlType="button"
                                      type="primary"
                                      onClick={() => addOrEditAddressHandler(null, 'shipping')}
                                    >
                                      Add address
                                    </Button>
                                  )
                                )}

                                <Radio.Group style={{ width: '100%', padding: 10 }}>
                                  <Row gutter={25}>
                                    {selectedShippingAddress && (
                                      <Col key={selectedShippingAddress?.id} xs={24}>
                                        <Button
                                          size="small"
                                          style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                                          title="Change Shipping Address"
                                          htmlType="button"
                                          type="info"
                                          onClick={() => changeAddressHandler('shipping')}
                                        >
                                          Change
                                        </Button>
                                        <Radio
                                          style={{
                                            width: '100%',
                                            border: '1px solid #f0f0f0',
                                            fontSize: 12,
                                            marginBottom: 10,
                                            padding: 10,
                                            borderRadius: 5,
                                          }}
                                          defaultValue={selectedShippingAddress?.id}
                                        >
                                          <p>
                                            {selectedShippingAddress?.address1 &&
                                              ellipsis(selectedShippingAddress?.address1, 35)}
                                          </p>
                                          <p>
                                            {selectedShippingAddress?.address2 &&
                                              ellipsis(selectedShippingAddress?.address2, 35)}
                                          </p>
                                          <p>
                                            {selectedShippingAddress?.city}, {selectedShippingAddress?.state} -{' '}
                                            {selectedShippingAddress?.zip_code}
                                          </p>
                                          {/* Need To Add Country */}
                                        </Radio>
                                      </Col>
                                    )}
                                  </Row>
                                </Radio.Group>
                              </Form.Item>
                            </Col>
                            <Col sm={12}>
                              <Typography.Title level={5}>Billing Address</Typography.Title>
                              <Form.Item
                                rules={[{ required: true, message: 'Please Select Billing Address' }]}
                                name="vendor_billing_id"
                                initialValue={selectedBillingAddress?.id}
                              >
                                {!selectedBillingAddress?.id && billingAddresses.length > 0 ? (
                                  <Button
                                    size="small"
                                    style={{ position: 'absolute', right: 14, zIndex: 1000, top: -40 }}
                                    title="Change Billing Address"
                                    htmlType="button"
                                    type="info"
                                    onClick={() => changeAddressHandler('billing')}
                                  >
                                    Select Address
                                  </Button>
                                ) : (
                                  !selectedBillingAddress?.id && (
                                    <Button
                                      size="small"
                                      style={{ position: 'absolute', right: 14, zIndex: 1000, top: -40 }}
                                      title={`Add Billing Address`}
                                      htmlType="button"
                                      type="primary"
                                      onClick={() => addOrEditAddressHandler(null, 'billing')}
                                    >
                                      Add Address
                                    </Button>
                                  )
                                )}
                                <Radio.Group style={{ width: '100%', padding: 10 }}>
                                  <Row gutter={25}>
                                    {selectedBillingAddress && (
                                      <Col key={selectedBillingAddress?.id} xs={24}>
                                        <Button
                                          size="small"
                                          style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                                          title="Change Billing Address"
                                          htmlType="button"
                                          type="info"
                                          onClick={() => changeAddressHandler('billing')}
                                        >
                                          Change
                                        </Button>
                                        <Radio
                                          style={{
                                            width: '100%',
                                            border: '1px solid #f0f0f0',
                                            fontSize: 12,
                                            marginBottom: 10,
                                            padding: 10,
                                            borderRadius: 5,
                                          }}
                                          defaultValue={selectedBillingAddress?.id}
                                        >
                                          <p>
                                            {selectedBillingAddress?.address1 &&
                                              ellipsis(selectedBillingAddress?.address1, 35)}
                                          </p>
                                          <p>
                                            {selectedBillingAddress?.address2 &&
                                              ellipsis(selectedBillingAddress?.address2, 35)}
                                          </p>
                                          <p>
                                            {selectedBillingAddress?.city}, {selectedBillingAddress?.state} -{' '}
                                            {selectedBillingAddress?.zip_code}
                                          </p>
                                        </Radio>
                                      </Col>
                                    )}
                                  </Row>
                                </Radio.Group>
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        {current === 2 && (
                          <>
                            <Row gutter={25}>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  initialValue={selectedShippingMethod}
                                  rules={[{ required: true, message: 'Please Select Shipping Method' }]}
                                  name="shipping_method_id"
                                  label="Shipping Method"
                                >
                                  <Select
                                    size="middle"
                                    placeholder="Select Shipping Method"
                                    defaultValue={selectedShippingMethod}
                                    style={{ width: '100%' }}
                                    optionLabelProp="label"
                                  >
                                    {shippingMethod.map(item => (
                                      <Select.Option key={item.id} value={item.id} label={item.name}>
                                        <div className="demo-option-label-item">{item.name}</div>
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>

                                <Form.Item
                                  rules={[{ required: true, message: 'Please Select Shipping Account' }]}
                                  name="shipping_account_id"
                                  label="Shipping Account"
                                >
                                  <Select
                                    size="middle"
                                    placeholder="Select Shipping Account (optional)"
                                    style={{ width: '100%' }}
                                    optionLabelProp="label"
                                  >
                                    {shippingMethodAccountList.map(item => (
                                      <Select.Option key={item.id} value={item.id} label={item.name}>
                                        <div className="demo-option-label-item">{item.name}</div>
                                      </Select.Option>
                                    ))}
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
                                    style={{ width: '100%' }}
                                    optionLabelProp="label"
                                  >
                                    {paymentMethod.map(item => (
                                      <Select.Option key={item.id} value={item.id} label={item.name}>
                                        <div className="demo-option-label-item">{item.name}</div>
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>

                                <Form.Item
                                  label="Tax Amount"
                                  name="tax_amount"
                                  rules={[{ required: true, message: 'Please Input Tax Amount' }]}
                                >
                                  <Input placeholder="Enter Tax Amount" type="number" />
                                </Form.Item>
                                <Form.Item name="comment" label="Comment">
                                  <TextArea rows={4} placeholder="Enter Comment" />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={12}></Col>
                            </Row>
                          </>
                        )}
                        {current === 3 && (
                          <>
                            <Products {...{ initialData, products, setProducts }} />
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                      <div className="steps-action" style={{ float: 'right' }}>
                        <Link to="/admin/po/list">
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
                          <Button loading={isLoading} disabled={isLoading} htmlType="submit" type="primary" raised>
                            {isLoading ? 'Processing' : 'Create PO'}
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
        {/* Modal For Add / Update Address */}
        <Modal
          title={isAddressEdit ? `Update ${addressType} address` : `Add ${addressType} address`}
          style={{ top: 20 }}
          width={600}
          open={addressModalOpen}
          destroyOnClose={true}
          okText={isAddressEdit ? 'Update' : 'Save'}
          onOk={() => handleAddressSubmit(addressType)}
          onCancel={() => setAddressModalOpen(false)}
        >
          <Form
            preserve={false}
            style={{ width: '100%' }}
            form={addressForm}
            name="addressForm"
            layout="vertical"
            size="small"
          >
            <Row gutter={25}>
              <Col md={24}>
                <Row gutter={25}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="country"
                      initialValue={isAddressEdit ? editSelectedAddress?.countryCode?.code : 'US'}
                      label="Country"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        onChange={val => setSelectedCountryCode(val)}
                        defaultValue={isAddressEdit ? editSelectedAddress?.countryCode?.code : 'US'}
                        options={countries?.map(item => ({
                          label: item.name,
                          value: item.code,
                        }))}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  rules={[{ required: true, message: 'Please Enter Address 1' }]}
                  name="address1"
                  label="Address 1"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.address1 ?? ''}
                >
                  <Input placeholder="Address 1" />
                </Form.Item>
                <Form.Item
                  name="address2"
                  label="Address 2"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.address2}
                >
                  <Input placeholder="Address 2" />
                </Form.Item>
                <Row gutter={25}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      rules={[{ required: true, message: 'Please Enter City' }]}
                      name="city"
                      label="City"
                      style={{ marginBottom: 5 }}
                      initialValue={editSelectedAddress?.city}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="zip_code"
                      rules={[{ required: true, message: 'Please Enter Zip Code' }]}
                      label="Zip Code"
                      style={{ marginBottom: 5 }}
                      initialValue={editSelectedAddress?.zip_code}
                    >
                      <Input placeholder="Zip Code" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={{}}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="state"
                      rules={[{ required: true, message: 'Please Enter State' }]}
                      label="State"
                      style={{ marginBottom: 5 }}
                      initialValue={editSelectedAddress?.state}
                    >
                      <Select
                        style={{ width: '100%' }}
                        placeholder="State"
                        defaultValue={editSelectedAddress?.state}
                        options={states?.map(item => ({
                          label: item.state,
                          value: item.abbreviation,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} style={{ paddingLeft: 15 }}>
                    <Form.Item
                      name="isDefault"
                      label="Default"
                      style={{ marginBottom: 0 }}
                      initialValue={editSelectedAddress?.isDefault}
                    >
                      <Switch defaultChecked={editSelectedAddress?.isDefault} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal>
        {/* Modal For Add / Update Address */}
        {/* Modal For Add / Update Address */}
        <Modal
          title={`${strCamelCase(addressType)} addresses`}
          style={{ top: 20 }}
          width={600}
          open={listAddressModalOpen}
          className="orderAddressModal"
          footer={null}
          onCancel={() => setListAddressModalOpen(false)}
        >
          <Radio.Group style={{ width: '100%', padding: 10 }}>
            <Row gutter={25}>
              <Col span={24}>
                <Button
                  size="small"
                  style={{ float: 'right', zIndex: 1000, marginTop: -25, marginBottom: 10 }}
                  title={`Add ${addressType} address`}
                  htmlType="button"
                  type="primary"
                  onClick={() => addOrEditAddressHandler(null, addressType)}
                >
                  Add new address
                </Button>
              </Col>
              {addressType === 'billing'
                ? billingAddresses.map(item => (
                    <Col key={item.id} xs={24}>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                        title="Edit Billing Address"
                        htmlType="button"
                        type="info"
                        onClick={() => addOrEditAddressHandler(item.id, 'billing')}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000, top: 45 }}
                        title="Edit Shipping Address"
                        htmlType="button"
                        type="info"
                        onClick={() => selectAddressHandler(addressType, item.id)}
                      >
                        Select
                      </Button>

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
                        onChange={() => setTempSelectedAddress(item)}
                      >
                        <p>{item.address1 && ellipsis(item.address1, 35)}</p>
                        <p>{item.address2 && ellipsis(item.address2, 35)}</p>
                        <p>
                          {item.city}, {item.state} - {item.zip_code}
                        </p>
                        <p>{item?.countryCode?.name}</p>
                        {billingAddresses.filter(item => item.isDefault)[0]?.id === item.id && (
                          <Badge count="Default billing address" color="#ddd" style={{ color: '#000' }} />
                        )}
                      </Radio>
                    </Col>
                  ))
                : shippingAddresses.map(item => (
                    <Col key={item.id} xs={24}>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                        title="Edit Shipping Address"
                        htmlType="button"
                        type="info"
                        onClick={() => addOrEditAddressHandler(item.id, 'shipping')}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000, top: 45 }}
                        title="Edit Shipping Address"
                        htmlType="button"
                        type="info"
                        onClick={() => selectAddressHandler(addressType, item.id)}
                      >
                        Select
                      </Button>
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
                        onChange={() => setTempSelectedAddress(item)}
                      >
                        <p>{item.address1 && ellipsis(item.address1, 35)}</p>
                        <p>{item.address2 && ellipsis(item.address2, 35)}</p>
                        <p>
                          {item.city}, {item.state} - {item.zip_code}
                        </p>
                        <p>{item?.countryCode?.name}</p>
                        {shippingAddresses.filter(item => item.isDefault)[0]?.id === item.id && (
                          <Badge count="Default shipping address" color="#ddd" style={{ color: '#000' }} />
                        )}
                      </Radio>
                    </Col>
                  ))}
            </Row>
          </Radio.Group>
        </Modal>
        {/* Modal For Add / Update Address */}
      </Main>
    </>
  );
};

export default AddPO;
