import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Switch,
  Card,
  Table,
  Steps,
  Avatar,
  Typography,
  Upload,
  Divider,
  message,
} from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useHistory } from 'react-router-dom';
import apolloClient, { apolloUploadClient } from '../../utility/apollo';
import { productTotalAmount, productTotalQuantity, viewPermission } from '../../utility/utility';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { productSchema } from '../../apollo/product';
import { customerMutation } from '../../apollo/customer';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import { SelectOutlined, UploadOutlined } from '@ant-design/icons';
import { nameFormat } from '../../utility/stringModify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripeSchema } from '../../apollo/stripe';
import { useMemo } from 'react';
import Products from '../../components/products/Products';
import ProductSearch from '../../components/searchModule/ProductSearch';
import CustomerSearch from '../../components/searchModule/CustomerSearch';
import AddressList from '../../components/common-modal/AddressList';
import AddAddress from '../../components/common-modal/AddAddress';
import UpdateAddress from '../../components/common-modal/UpdateAddress';
import { poQuery } from '../../apollo/po';
import AddContactPerson from '../../components/contactPerson/AddContactPerson';
import ContactPersonList from '../../components/contactPerson/ContactPersonList';
import { contactPersonsSchema } from '../../apollo/contactPerson';
import ShippingTypeList from '../../components/common-modal/ShippingTypeList';
import ShippingAccountList from '../../components/common-modal/ShippingAccountList';
import PaymentMethodList from '../../components/common-modal/PaymentMethodList';
import { methodQuery } from '../../apollo/method';
import config from '../../config/config';
import CreditCard from '../../components/common-modal/CreditCard';
import CancelButton from '../../components/buttons/CancelButton';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const { Text, Paragraph } = Typography;

const AddOrder = () => {
  viewPermission('order');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  // ===================== new =====================

  const formRef = useRef();
  const [discount, setDiscount] = useState('00.0');
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selctedCouponCode, setSelectedCouponCode] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [textExempt, setTextExempt] = useState(false);
  const [image, setImage] = useState(null);
  const [editSelectedAddress, setEditSelectedAddress] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [creditCardLast4, setCreditCardLast4] = useState('****');
  // Change State After Country Change
  const [cardHolderName, setCardHolderName] = useState('');

  // Stripe Code
  const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY), []);
  const finalPayment = useRef(null);

  // New State Assign Start Here
  const [products, setProducts] = useState([]);
  const [productSearchModalOpen, setProductSearchModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerSearchModalOpen, setCustomerSearchModalOpen] = useState(false);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [billingAddressListModalOpen, setBillingAddressListModalOpen] = useState(false);
  const [shippingAddressListModalOpen, setShippingAddressListModalOpen] = useState(false);
  const [contactPerson, setContactPerson] = useState([]);
  const [selectedContactPerson, setSelectedContactPerson] = useState(null);
  const [addAddressBillingModalOpen, setAddAddressBillingModalOpen] = useState(false);
  const [updateAddressBillingModalOpen, setUpdateAddressBillingModalOpen] = useState(false);
  const [addAddressShippingModalOpen, setAddAddressShippingModalOpen] = useState(false);
  const [updateAddressShippingModalOpen, setUpdateAddressShippingModalOpen] = useState(false);
  const [contactSelectModalOpen, setContactSelectModalOpen] = useState(false);
  const [contactPersonAddModalOpen, setContactPersonAddModalOpen] = useState(false);
  const [cpSuccess, setCPSuccess] = useState(false);

  // Shipping Method Select List State Start
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [shippingMethodSelectModalOpen, setShippingMethodSelectModalOpen] = useState(null);
  const [shippingMethod, setShippingMethod] = useState([]);
  // Shipping Method Select List State End

  //Shipping Account List State Start
  const [selectedShippingAccount, setSelectedShippingAccount] = useState(null);
  const [shippingAccountModalOpen, setShippingAccountModalOpen] = useState(null);
  const [shippingMethodAccountList, setShippingMethodAccountList] = useState([]);
  // Shipping Account List State End

  // Payment Method Select List State Start
  const [paymentMethodSelectModalOpen, setPaymentMethodSelectModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  // Payment Method Select List State END

  // Credit Card Modal State Start
  const [creditCardModalOpen, setCreditCardModalOpen] = useState(false);
  // Credit Card Modal State End

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // New State End Here

  useEffect(() => {
    if (selectedPaymentMethod?.name.toLowerCase() === 'credit card') {
      setCreditCardModalOpen(true);
    }
  }, [selectedPaymentMethod]);

  // LOAD Initial Data from API
  useEffect(() => {
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
        if (!data.status) return InternalErrorMessage();
        setShippingMethod(data?.data);
        setSelectedShippingMethod(data?.data?.filter(item => item.isDefault === true)[0]?.id);
      })
      .catch(err => {
        console.log(err);
      });

    // Load Payment Method
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
        if (!data.status) return InternalErrorMessage();
        setPaymentMethod(data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Need T Remove order_status_id from varibales after removing api

  const handleSubmit = () => {
    const form_data = form.getFieldsValue(true);
    const orderProducts = products.map(item => ({ product_id: item.id, quantity: item.quantity }));
    if (orderProducts.length === 0) return message.error('Please Select at Least One Product.');
    if (!form_data.billing_address_id) return message.error('Please Select Billing Address.');
    if (!form_data.shipping_address_id) return message.error('Please Select Shipping Address.');
    if (!form_data.customer_id) return message.error('Please Select Customer.');
    if (!form_data.payment_id) return message.error('Please Select Payment Method.');
    if (!form_data.shipping_method_id) return message.error('Please Select Shipping Method.');
    if (form_data?.tax_exempt && !image) return message.error('Please Upload Text Exempt File.');
    setIsLoading(true);
    apolloUploadClient
      .mutate({
        mutation: orderQuery.CREATE_ORDER,
        variables: {
          data: {
            tax_exempt: !form_data?.tax_exempt ? false : true,
            ...form_data,
            coupon_id: selctedCouponCode,
            taxexempt_file: image,
            orderProducts,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: orderQuery.GET_ALL_ORDER,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getOrderlistAdmin'],
        ],
      })
      .then(async res => {
        const data = res?.data?.createOrderByAdmin;
        if (!data?.status) return message.error(data?.message);
        if (selectedPaymentMethod?.name?.toLowerCase() === 'credit card') {
          const cardPayment = await finalPayment.current();
          if (cardPayment.error) {
            console.log('error', cardPayment.error);
          } else {
            if (cardPayment?.paymentIntent?.status === 'requires_capture') {
              apolloClient
                .mutate({
                  mutation: stripeSchema.STRIPE_PAYMENT_INTENT_FINALIZED,
                  variables: {
                    data: {
                      data: cardPayment?.paymentIntent,
                      order_id: data?.id,
                      provider_id: selectedPaymentMethod?.id,
                      user_id: selectedCustomer?.id,
                      card_holder: cardHolderName,
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
                  const data = res?.data?.stripePaymentIntentFinalized;
                  if (!data?.status) return;
                  message.success(data?.message);
                  setTimeout(() => {
                    history.push('/admin/order/list');
                  }, 3000);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        } else {
          message.success(data?.message);
          setTimeout(() => {
            history.push('/admin/order/list');
          }, 3000);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const overViewColumn = [
    {
      title: 'Item',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 110,
      align: 'right',
      ellipsis: true,
    },
    {
      title: 'Unit Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      align: 'right',
      render: val => `$${val}`,
    },
    {
      title: 'Line Total',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      align: 'right',
      render: (val, record) => `$${record.quantity * record.cost}`,
    },
  ];

  /* -------------------------- Step From Data Start -------------------------- */
  const steps = [
    {
      title: 'Order',
      percent: 50,
    },
    {
      title: 'OverView',
      percent: 100,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = async () => {
    try {
      if (current === 0) {
        if (products.length === 0) {
          return message.warn('Please Select at Least One Product.');
        } else if (products.some(item => item.prod_name === '' || item.cost === 0)) {
          return message.warn('Product input missing.');
        }
        await form.validateFields(['customer_id', 'payment_id', 'shipping_method_id']);
        if (!selectedBillingAddress) return message.warn('Please select billing address.');
        if (!selectedShippingAddress) return message.warn('Please select shipping address.');
        if (textExempt && !image) return message.warn('Please attach Tax Exempt file.');
        if (selectedPaymentMethod?.name?.toLowerCase() === 'credit card' && !paymentSuccess)
          return message.error('Credit card payment failed');
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

  const validateVoucher = voucher => {
    if (voucher.length === 0) {
      setSelectedCouponCode('');
      setDiscount(0);
    } else {
      apolloClient
        .query({
          query: productSchema.GET_COUPON_BY_CODE,
          variables: { query: { coupon_code: voucher } },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
            },
          },
        })
        .then(res => {
          const data = res?.data?.getSingleCouponByCode;
          if (data.status) {
            if (data.data.coupon_type === 'percentage') {
              setDiscount(
                (products.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0) / 100) *
                  data.data.coupon_amount,
              );
            } else {
              setDiscount(data.data.coupon_amount);
            }
            setSelectedCouponCode(data?.data?.id);
          } else {
            message.error(data.message);
          }
        });
    }
  };

  const beforeImageUpload = file => {
    setImage(file);
    return false;
  };

  // Add Edit Address Modal Open
  const addOrEditAddressHandler = (id, type) => {
    if (id) {
      if (type === 'billing') setUpdateAddressBillingModalOpen(true);
      else setUpdateAddressShippingModalOpen(true);

      setEditSelectedAddress(selectedCustomer?.addresses?.filter(item => item.id === id)[0]);
    } else {
      if (type === 'billing') setAddAddressBillingModalOpen(true);
      else setAddAddressShippingModalOpen(true);
    }
  };

  // Trigger Function when select an address finally
  // Select Billing Address Handler
  const selectBillingAddressHandler = (_, id) => {
    setSelectedBillingAddress(
      selectedCustomer.addresses.filter(item => item.type === 'billing' && item.id === id).shift(),
    );
    form.setFieldsValue({
      billing_address_id: id,
    });
    setBillingAddressListModalOpen(false);
  };
  // Select Shipping Address Handler
  const selectShippingAddressHandler = (_, id) => {
    setSelectedShippingAddress(
      selectedCustomer.addresses.filter(item => item.type === 'shipping' && item.id === id).shift(),
    );
    form.setFieldsValue({
      shipping_address_id: id,
    });
    setShippingAddressListModalOpen(false);
  };

  // Refetch query after adding or updating address
  useEffect(() => {
    if (!selectedCustomer?.id) return;
    apolloClient
      .query({
        query: poQuery.GET_ADDRESS_BY_CUSTOMER,
        variables: {
          query: {
            customer_id: selectedCustomer?.id,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getAddressListByCustomerID;
        if (!data?.status) return;
        setSelectedCustomer(prev => ({ ...prev, addresses: data?.data }));
        const selected_shipping_address = data?.data.filter(item => item.isDefault && item.type === 'shipping').shift();
        const selected_billing_address = data?.data.filter(item => item.isDefault && item.type === 'billing').shift();
        setSelectedShippingAddress(selected_shipping_address);
        setSelectedBillingAddress(selected_billing_address);
        form.setFieldsValue({
          shipping_address_id: selected_shipping_address?.id,
          billing_address_id: selected_shipping_address?.id,
        });
      });
  }, [changeAddress]);

  // Trigger After Contact Person Add
  useEffect(() => {
    if (!selectedCustomer?.id) return;
    apolloClient
      .query({
        query: contactPersonsSchema.GET_CONTACT_PERSON_BY_ID,
        variables: {
          query: {
            id: selectedCustomer?.id,
            type: 'customer',
            status: true,
          },
        },
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID, Authorization: token },
        },
      })
      .then(res => {
        const data = res.data.getContactPerson;
        if (!data.status) return InternalErrorMessage();
        setSelectedCustomer(prev => ({ ...prev, contactPersons: data?.data }));
      });
  }, [cpSuccess]);

  // Add Address Handler
  const addAddressHandler = (type, values) => {
    let newBillingAddress = [];
    let newShippingAddress = [];
    if (type === 'billing') newBillingAddress.push({ parent_id: selectedCustomer?.id, ...values });
    else newShippingAddress.push({ parent_id: selectedCustomer?.id, ...values });
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
        const data = type === 'billing' ? res?.data?.addCustomerBillingAddress : res?.data?.addCustomerShippingAddress;
        if (!data?.status) return;
        if (type === 'billing') setAddAddressBillingModalOpen(false);
        else setAddAddressShippingModalOpen(false);
        setChangeAddress(prev => !prev);
      });
  };

  // Update Address Handler
  const updateAddressHandler = (type, values) => {
    let newBillingAddress;
    let newShippingAddress;
    setEditSelectedAddress(null);

    if (type === 'billing') {
      newBillingAddress = selectedCustomer.addresses
        ?.filter(item => item.type === 'billing')
        ?.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, countryCode, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: selectedCustomer?.id,
            isNew: false,
            isDefault,
            id,
            ...rest,
          };
        });
    } else {
      newShippingAddress = selectedCustomer.addresses
        ?.filter(item => item.type === 'shipping')
        ?.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, countryCode, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: selectedCustomer?.id,
            isDefault: isDefault,
            isNew: false,
            id,
            ...rest,
          };
        });
    }

    apolloClient
      .mutate({
        mutation: customerMutation.UPDATE_CUSTOMER_ADDRESSES,
        variables: {
          data: {
            ref_id: selectedCustomer?.id,
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
        setChangeAddress(prev => !prev);
        if (type === 'billing') setUpdateAddressBillingModalOpen(false);
        else setUpdateAddressShippingModalOpen(false);
      });
  };

  // Trigger When Customer Select
  useEffect(() => {
    form.setFieldsValue({
      customer_id: selectedCustomer?.id,
      payment_id: selectedPaymentMethod?.id,
      shipping_method_id: selectedShippingMethod?.id,
      billing_address_id: selectedBillingAddress?.id,
      shipping_address_id: selectedShippingAddress?.id,
      person_id: selectedContactPerson?.id,
      shipping_account_id: selectedShippingAccount?.id,
    });
  }, [
    selectedCustomer?.id,
    selectedPaymentMethod?.id,
    selectedShippingMethod?.id,
    selectedBillingAddress?.id,
    selectedShippingAddress?.id,
    selectedContactPerson?.id,
    selectedShippingAccount?.id
  ]);

  return (
    <>
      <PageHeader title={'Add Order'} />
      <Elements stripe={stripePromise}>
        <Main>
          <Row gutter={25}>
            <Col sm={24} xs={24}>
              <Cards headless>
                <Form
                  ref={formRef}
                  style={{ width: '100%' }}
                  form={form}
                  name="addOrder"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ xl: 8, xxl: 6 }}
                  scrollToFirstError={true}
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
                            {/* New Code Start From Here */}
                            <Row>
                              <Col span={24}>
                                <div>
                                  <Products {...{ products, setProducts, setProductSearchModalOpen }} />
                                  <table className="table table-responsive purchase_order_vendor_table">
                                    <thead>
                                      <tr>
                                        <th>Customer</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td width="50%" style={{ borderRight: '1px solid #ddd' }}>
                                          <Form.Item
                                            label="Customer"
                                            name="customer_id"
                                            labelAlign="left"
                                            style={{ margin: 0 }}
                                            rules={[{ required: true, message: 'Customer is required' }]}
                                          >
                                            {selectedCustomer ? (
                                              nameFormat(selectedCustomer)
                                            ) : (
                                              <Typography.Text
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setCustomerSearchModalOpen(true)}
                                              >
                                                Select customer
                                              </Typography.Text>
                                            )}
                                            <SelectOutlined
                                              style={{
                                                cursor: 'pointer',
                                                color: 'var(--primary)',
                                                marginRight: 10,
                                                float: 'right',
                                              }}
                                              onClick={() => setCustomerSearchModalOpen(true)}
                                            />
                                          </Form.Item>
                                          {/* Customer Billing Address Start */}
                                          <Form.Item
                                            name="billing_address_id"
                                            label="Billing Address"
                                            labelAlign="left"
                                            style={{ margin: 0 }}
                                            rules={[{ required: true, message: 'Billing address is required' }]}
                                          >
                                            <Row gutter={25}>
                                              <Col xs={24}>
                                                <Card
                                                  style={{
                                                    border: '1px solid #ddd',
                                                  }}
                                                  className="billing_address_card"
                                                >
                                                  <SelectOutlined
                                                    style={{
                                                      cursor: 'pointer',
                                                      color: 'var(--primary)',
                                                      float: 'right',
                                                    }}
                                                    onClick={() => {
                                                      if (!selectedCustomer?.id) return;
                                                      setBillingAddressListModalOpen(true);
                                                    }}
                                                  />
                                                  <p className="mb-0">{selectedBillingAddress?.address1}</p>
                                                  {selectedBillingAddress?.address2 && (
                                                    <p className="mb-0">{selectedBillingAddress?.address2}</p>
                                                  )}
                                                  <p className="mb-0">
                                                    {selectedBillingAddress?.city &&
                                                      `${selectedBillingAddress.city}, ${selectedBillingAddress.state} - ${selectedBillingAddress.zip_code}`}
                                                  </p>
                                                  <p className="mb-0">{selectedBillingAddress?.countryCode.name}</p>
                                                </Card>
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                          {/* Customer Billing Address End */}
                                          {/* Customer Shipping Address Start */}
                                          <Form.Item
                                            name="shipping_address_id"
                                            label="Shipping Address"
                                            labelAlign="left"
                                            style={{ margin: 0, marginTop: 10 }}
                                            rules={[{ required: true, message: 'Shipping address is required' }]}
                                          >
                                            <Row gutter={25}>
                                              <Col xs={24}>
                                                <Card
                                                  style={{
                                                    border: '1px solid #ddd',
                                                  }}
                                                  className="billing_address_card"
                                                >
                                                  <SelectOutlined
                                                    style={{
                                                      cursor: 'pointer',
                                                      color: 'var(--primary)',
                                                      float: 'right',
                                                    }}
                                                    onClick={() => {
                                                      if (!selectedCustomer?.id) return;
                                                      setShippingAddressListModalOpen(true);
                                                    }}
                                                  />
                                                  <p className="mb-0">{selectedShippingAddress?.address1}</p>
                                                  {selectedShippingAddress?.address2 && (
                                                    <p className="mb-0">{selectedShippingAddress?.address2}</p>
                                                  )}
                                                  <p className="mb-0">
                                                    {selectedShippingAddress?.city &&
                                                      `${selectedShippingAddress.city}, ${selectedShippingAddress.state} - ${selectedShippingAddress.zip_code}`}
                                                  </p>
                                                  <p className="mb-0">{selectedShippingAddress?.countryCode.name}</p>
                                                </Card>
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                          {/* Customer Billing Address End */}
                                          <Form.Item name="person_id" label="Customer Contact" labelAlign="left" style={{ margin: 0 }}>
                                            <Row gutter={10}>
                                              <Col span={24}>
                                                {selectedContactPerson ? (
                                                  selectedContactPerson?.name
                                                ) : (
                                                  <Typography.Text
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                      if (!selectedCustomer?.id) return;
                                                      setContactSelectModalOpen(true);
                                                    }}
                                                  >
                                                    Select Contact
                                                  </Typography.Text>
                                                )}
                                                <SelectOutlined
                                                  style={{
                                                    cursor: 'pointer',
                                                    color: 'var(--primary)',
                                                    marginRight: 10,
                                                    float: 'right',
                                                  }}
                                                  onClick={() => {
                                                    if (!selectedCustomer?.id) return;
                                                    setContactSelectModalOpen(true);
                                                  }}
                                                />
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                        </td>
                                        <td width="50%">
                                          <Form.Item
                                            label="Payment Method"
                                            labelAlign="left"
                                            name="payment_id"
                                            style={{ margin: 0 }}
                                            rules={[{ required: true, message: 'Payment method is required' }]}
                                          >
                                            <Row gutter={10}>
                                              <Col span={24}>
                                                {selectedPaymentMethod ? (
                                                  selectedPaymentMethod?.name
                                                ) : (
                                                  <Typography.Text
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setPaymentMethodSelectModalOpen(true)}
                                                  >
                                                    Select Payment Method
                                                  </Typography.Text>
                                                )}
                                                <SelectOutlined
                                                  style={{
                                                    cursor: 'pointer',
                                                    color: 'var(--primary)',
                                                    marginRight: 10,
                                                    float: 'right',
                                                  }}
                                                  onClick={() => {
                                                    setPaymentMethodSelectModalOpen(true);
                                                  }}
                                                />
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                          <Form.Item
                                            label="Shipping Method"
                                            labelAlign="left"
                                            style={{ margin: 0 }}
                                            name="shipping_method_id"
                                            rules={[{ required: true, message: 'Shipping method is required' }]}
                                          >
                                            <Row gutter={10}>
                                              <Col span={24}>
                                                {selectedShippingMethod ? (
                                                  selectedShippingMethod?.name
                                                ) : (
                                                  <Typography.Text
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setShippingMethodSelectModalOpen(true)}
                                                  >
                                                    Select Shipping Method
                                                  </Typography.Text>
                                                )}
                                                <SelectOutlined
                                                  style={{
                                                    cursor: 'pointer',
                                                    color: 'var(--primary)',
                                                    marginRight: 10,
                                                    float: 'right',
                                                  }}
                                                  onClick={() => {
                                                    setShippingMethodSelectModalOpen(true);
                                                  }}
                                                />
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                          <Form.Item name="shipping_account_id" label="Shipping Account" labelAlign="left" style={{ margin: 0 }}>
                                            <Row gutter={10}>
                                              <Col span={24}>
                                                {selectedShippingAccount ? (
                                                  selectedShippingAccount?.name
                                                ) : (
                                                  <Typography.Text
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setShippingAccountModalOpen(true)}
                                                  >
                                                    Select Shipping Account
                                                  </Typography.Text>
                                                )}
                                                <SelectOutlined
                                                  style={{
                                                    cursor: 'pointer',
                                                    color: 'var(--primary)',
                                                    marginRight: 10,
                                                    float: 'right',
                                                  }}
                                                  onClick={() => {
                                                    setShippingAccountModalOpen(true);
                                                  }}
                                                />
                                              </Col>
                                            </Row>
                                          </Form.Item>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <div className="steps-content">
                                  <table className="table table-responsive purchase_order_vendor_table">
                                    <thead>
                                      <tr>
                                        <th>Voucher & Other</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td width="50%" style={{ borderRight: '1px solid #ddd' }}>
                                          <Form.Item labelAlign="left" label="Voucher Code" className="voucher_input">
                                            <Input.Search
                                              placeholder="Input Voucher Code"
                                              enterButton="Apply Voucher"
                                              size="large"
                                              onSearch={validateVoucher}
                                              defaultValue={selctedCouponCode}
                                              style={{ height: config.INPUT_HEIGHT }}
                                            />
                                          </Form.Item>
                                          <Form.Item labelAlign="left" name="po_number" label="PO Number">
                                            <Input placeholder="PO Number" style={{ height: config.INPUT_HEIGHT }} />
                                          </Form.Item>
                                          <Form.Item labelAlign="left" name="note" label="Note" style={{marginBottom: 10}}>
                                            <Input.TextArea  placeholder="Note" autoSize />
                                          </Form.Item>
                                        </td>
                                        <td width="50%">
                                          <Form.Item
                                            labelAlign="left"
                                            name="tax_exempt"
                                            defaultValue={false}
                                            label="Tax Exempt"
                                          >
                                            <Switch
                                              size="small"
                                              defaultChecked={textExempt}
                                              onChange={e => setTextExempt(e)}
                                            />
                                          </Form.Item>
                                          {textExempt && (
                                            <Form.Item labelAlign="left" label="Tax Exempt File">
                                              <Upload
                                                defaultFileList={image && [image]}
                                                beforeUpload={beforeImageUpload}
                                                name="tax_exempt_file"
                                              >
                                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                              </Upload>
                                            </Form.Item>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </Col>
                            </Row>
                            {/* New Code End Here */}
                          </>
                        )}
                        {current === 1 && (
                          <Row gutter={25} align="middle" justify="center">
                            <Col lg={24}>
                              <Row gutter={25} justify="space-between" style={{ marginBottom: 10 }}>
                                <Col lg={18} xs={24}>
                                  <Row>
                                    <Col>
                                      <Row gutter={25}>
                                        <Col>
                                          {selectedCustomer?.image ? (
                                            <Avatar
                                              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                              src={renderImage(
                                                selectedCustomer?.id,
                                                selectedCustomer?.image,
                                                'user',
                                                '',
                                                true,
                                              )}
                                            >
                                              <LazyLoadImage
                                                effect="blur"
                                                width={100}
                                                height={100}
                                                src={renderImage(
                                                  selectedCustomer?.id,
                                                  selectedCustomer?.image,
                                                  'user',
                                                  '',
                                                  true,
                                                )}
                                                onError={errorImageSrc}
                                                alt={selectedCustomer.id}
                                              />
                                            </Avatar>
                                          ) : (
                                            <Avatar
                                              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                              src={'/no-image.png'}
                                            />
                                          )}
                                        </Col>
                                        <Col>
                                          <Paragraph>
                                            <Text strong>ID: </Text>
                                            {selectedCustomer?.id ?? '...'}
                                          </Paragraph>
                                          <Paragraph>
                                            <Text strong>Name: </Text>
                                            {selectedCustomer?.first_name
                                              ? `${selectedCustomer?.first_name} ${selectedCustomer?.last_name}`
                                              : '...'}
                                          </Paragraph>
                                          <Paragraph>
                                            <Text strong>Email: </Text>
                                            {selectedCustomer?.email ?? '...'}
                                          </Paragraph>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col flex="auto"></Col>
                                    <Col>
                                      <Paragraph>
                                        <Text strong>Payment Method: </Text>
                                        {selectedPaymentMethod?.name}
                                      </Paragraph>
                                      {selectedPaymentMethod?.name?.toLowerCase() === 'credit card' && (
                                        <Paragraph>
                                          <Text strong>Card Number: </Text>
                                          *** *** *** *** {creditCardLast4}
                                        </Paragraph>
                                      )}
                                      {selectedShippingAccount?.name && (
                                        <Paragraph>
                                          <Text strong>Shipping Account: </Text>
                                          {selectedShippingAccount?.name}
                                        </Paragraph>
                                      )}
                                      <Paragraph>
                                        <Text strong>Delivery Option: </Text>
                                        {selectedShippingMethod?.name}
                                      </Paragraph>
                                      {textExempt && (
                                        <Paragraph>
                                          <Text strong>Tax Exempt: </Text>
                                          Attached
                                        </Paragraph>
                                      )}
                                    </Col>
                                  </Row>
                                  <Divider />
                                  <Row gutter={25} style={{ marginBottom: 20 }}>
                                    <Col>
                                      <p>
                                        <b>BILL TO:</b>
                                      </p>
                                      <p>{selectedBillingAddress?.address1}</p>
                                      <p>{selectedBillingAddress?.address2}</p>
                                      <p>
                                        {selectedBillingAddress?.city},{selectedBillingAddress?.state} -
                                        {selectedBillingAddress?.zip_code}
                                      </p>
                                      <p>{selectedBillingAddress?.country}</p>
                                    </Col>
                                    <Col flex="auto"></Col>
                                    <Col>
                                      <p>
                                        <b>SHIP TO:</b>
                                      </p>
                                      <p>{selectedShippingAddress?.address1}</p>
                                      <p>{selectedShippingAddress?.address2}</p>
                                      <p>
                                        {selectedShippingAddress?.city},{selectedShippingAddress?.state} -
                                        {selectedShippingAddress?.zip_code}
                                      </p>
                                      <p>{selectedShippingAddress?.country}</p>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col lg={6} md={8} sm={24}>
                                  <Card
                                    title="Summary"
                                    bordered={true}
                                    size="small"
                                    headStyle={{
                                      backgroundColor: '#5f63f24d',
                                      borderTopLeftRadius: 3,
                                      borderTopRightRadius: 3,
                                    }}
                                  >
                                    <Paragraph>
                                      <Text strong>Sub Total Price : </Text>$
                                      {productTotalAmount(products, shippingCost, discount)}
                                    </Paragraph>
                                    <Paragraph>
                                      <Text strong>Product Quantity : </Text>
                                      {productTotalQuantity(products)}
                                    </Paragraph>
                                    <Paragraph>
                                      <Text strong>Discount : </Text>${discount}
                                    </Paragraph>
                                    <Paragraph>
                                      <Text strong>Shipping Cost : </Text>${shippingCost}
                                    </Paragraph>{' '}
                                    <Paragraph>
                                      <Text strong>Total Price : </Text>$
                                      {productTotalAmount(products, shippingCost, discount)}
                                    </Paragraph>
                                  </Card>
                                </Col>
                              </Row>
                              <Row gutter={25}>
                                <Col lg={18} md={16} sm={24}>
                                  <span className={'psp_list'}>
                                    <Table
                                      className="table-responsive"
                                      columns={overViewColumn}
                                      dataSource={products}
                                      pagination={false}
                                      rowKey="id"
                                    />
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                      <div className="steps-action" style={{ float: 'right' }}>
                        <CancelButton url="/admin/order/list" title="Do you want to exit from order?" />

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
                            {isLoading ? 'processing...' : 'Create Order'}
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
          {/* Modal For Add / Update Address */}
          <ProductSearch {...{ productSearchModalOpen, setProductSearchModalOpen, products, setProducts }} />
          <CustomerSearch
            {...{
              customerSearchModalOpen,
              setCustomerSearchModalOpen,
              selectedCustomer,
              setSelectedCustomer,
              setSelectedBillingAddress,
              setSelectedShippingAddress,
              setContactPerson,
            }}
          />
          {/* Billing Address */}
          <AddressList
            {...{
              addresses: selectedCustomer?.addresses.filter(item => item.type === 'billing'),
              addressListModalOpen: billingAddressListModalOpen,
              setAddressListModalOpen: setBillingAddressListModalOpen,
              type: 'billing',
              handler: addOrEditAddressHandler,
              selectHandler: selectBillingAddressHandler,
            }}
          />
          {/* Shipping Address */}
          <AddressList
            {...{
              addresses: selectedCustomer?.addresses.filter(item => item.type === 'shipping'),
              addressListModalOpen: shippingAddressListModalOpen,
              setAddressListModalOpen: setShippingAddressListModalOpen,
              type: 'shipping',
              handler: addOrEditAddressHandler,
              selectHandler: selectShippingAddressHandler,
            }}
          />
          <AddAddress
            {...{
              type: 'billing',
              addressModalOpen: addAddressBillingModalOpen,
              setAddressModalOpen: setAddAddressBillingModalOpen,
              handleSubmit: addAddressHandler,
            }}
          />
          <UpdateAddress
            {...{
              type: 'billing',
              address: editSelectedAddress,
              addressModalOpen: updateAddressBillingModalOpen,
              setAddressModalOpen: setUpdateAddressBillingModalOpen,
              handleSubmit: updateAddressHandler,
            }}
          />
          <AddAddress
            {...{
              type: 'shipping',
              addressModalOpen: addAddressShippingModalOpen,
              setAddressModalOpen: setAddAddressShippingModalOpen,
              handleSubmit: addAddressHandler,
            }}
          />
          <UpdateAddress
            {...{
              type: 'shipping',
              address: editSelectedAddress,
              addressModalOpen: updateAddressShippingModalOpen,
              setAddressModalOpen: setUpdateAddressShippingModalOpen,
              handleSubmit: updateAddressHandler,
            }}
          />

          <ContactPersonList
            {...{
              contactPersons: contactPerson,
              setContactSelectModalOpen,
              contactSelectModalOpen,
              selectedContactPerson,
              setSelectedContactPerson,
              setContactPersonAddModalOpen,
            }}
          />
          <AddContactPerson
            {...{
              contactPersonAddModalOpen,
              setContactPersonAddModalOpen,
              parent: 'customer',
              id: selectedCustomer?.id,
              setCPSuccess,
            }}
          />
          <ShippingTypeList
            {...{
              shippingMethodSelectModalOpen,
              setShippingMethodSelectModalOpen,
              selectedShippingMethod,
              setSelectedShippingMethod,
              shippingMethod,
            }}
          />
          <ShippingAccountList
            {...{
              shippingAccountModalOpen,
              setShippingAccountModalOpen,
              selectedShippingAccount,
              setSelectedShippingAccount,
              shippingMethodAccountList,
            }}
          />
          <PaymentMethodList
            {...{
              paymentMethodSelectModalOpen,
              setPaymentMethodSelectModalOpen,
              selectedPaymentMethod,
              setSelectedPaymentMethod,
              paymentMethod,
            }}
          />
          <CreditCard
            {...{
              creditCardModalOpen,
              setCreditCardModalOpen,
              amount: productTotalAmount(products, shippingCost, discount),
              selectedCustomer,
              finalPayment,
              setCreditCardLast4,
              cardHolderName,
              setCardHolderName,
              setPaymentSuccess,
            }}
          />
        </Main>
      </Elements>
    </>
  );
};

export default AddOrder;
