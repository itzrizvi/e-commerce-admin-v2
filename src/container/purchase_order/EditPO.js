import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Tabs, Select, Radio, Typography, Modal, Switch, Badge } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { vendorMutation, vendorQuery, productQuery } from '../../utility/apollo';
import { poQuery } from '../../apollo/po';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import Products from './Products';
import { useSelector } from 'react-redux';
import SelectNotFound from '../../components/esential/SelectNotFound';
import { strCamelCase } from '../../utility/stringModify';
import { addressSchema } from '../../apollo/address';
import { orderQuery } from '../../apollo/order';
import { methodQuery } from '../../apollo/method';
const { TextArea } = Input;

const EditPO = () => {
  viewPermission('purchase-order');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [vendors, setVendors] = useState([]);
  const [singlePO, setSinglePO] = useState({ data: [], isLoading: true });
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchOrderOption, setSearchOrderOption] = useState(false);
  const [orderNotFoundContent, setOrderNotFoundContent] = useState('No Data!');
  const [changeAddress, setChangeAddress] = useState(false);
  const [contactPerson, setContactPerson] = useState([]);
  const [shippingMethod, setShippingMethod] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [shippingMethodAccountList, setShippingMethodAccountList] = useState([]);
  const [addressType, setAddressType] = useState(null);
  const [listAddressModalOpen, setListAddressModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const [editSelectedAddress, setEditSelectedAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');

  // ============+ for product START +====================
  const initialData = {
    id: '',
    prod_name: '',
    quantity: 1,
    price: 0,
    recieved_quantity: 0,
    isNew: true,
  };
  const [products, setProducts] = useState([]);

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
          var po_selected_order = parseInt(data?.data?.order_id);
        }
        setSelectedOrder(parseInt(data?.data?.order_id));
        setSelectedBillingAddress(data?.data.vendorBillingAddress)
        setSelectedShippingAddress(data?.data.vendorShippingAddress)
        const contact_person = []
        data?.data?.vendor?.contactPersons?.forEach(person => {
          contact_person.push({ ...person, isNew: false, label: person.email, value: person.id  });
        });
        setContactPerson(contact_person);
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
          order_id: data?.data?.order_id,
          contact_person_id: data?.data?.contactPerson?.id,
          shipping_account_id: data?.data?.shippingAccount?.id,
        });
        let new_product_list = [];
        new_product_list = data?.data?.poProductlist?.map(item => {
          return {
            key: new Date().getTime(),
            id: item.product.id,
            price: item.price,
            quantity: item.quantity,
            prod_name: item.product.prod_name,
            received_quantity: item.received_quantity,
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

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    if (products.length === 0) return toast.warning('Please Select at Least One Product!');
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
      po_number: singlePO.data.po_number,
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

    setSelectedType(type);
    setBillingAddresses([]);
    setShippingAddresses([]);
  };

  const chageOrderIdHandler = val => {
    setSelectedOrder(val);
    setBillingAddresses([]);
    setShippingAddresses([]);
    form.setFieldsValue({
      vendor_id: '',
    });
  };

  // First Time Change address open Modal
  const changeAddressHandler = type => {
    setListAddressModalOpen(true);
    setAddressType(type);
  };

  // Handle Address Submit
  const handleAddressSubmit = type => {
    const values = addressForm.getFieldValue();
    const vendor_id = form.getFieldValue('vendor_id');
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
            type === 'billing' ? vendorMutation.ADD_VENDOR_BILLING_ADDRESS : vendorMutation.ADD_VENDOR_SHIPPING_ADDRESS,
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
          const data = type === 'billing' ? res?.data?.addVendorBillingAddress : res?.data?.addVendorShippingAddress;
          if (!data?.status) return;
          setChangeAddress(true);
          setAddressModalOpen(false);
        });
    }
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
                  labelCol={{ span: 6 }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="Vendor Info" key="vendor">
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
                                {vendors?.data?.map(val => {
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
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Addresses" key="address">
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
                                {selectedBillingAddress?.id && (
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
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Other Info" key="other">
                      <>
                        <Row gutter={25}>
                          <Col xs={24} md={16}>
                            <Form.Item
                              rules={[{ required: true, message: 'Please Select Shipping Method' }]}
                              name="shipping_method_id"
                              label="Shipping Method"
                            >
                              <Select
                                size="middle"
                                placeholder="Select Shipping Method"
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
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Products" key="products">
                      <Products {...{ initialData, products, setProducts }} />
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
export default EditPO;
