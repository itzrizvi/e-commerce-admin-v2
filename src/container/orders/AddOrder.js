import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Switch,
  Select,
  Card,
  Table,
  Steps,
  Avatar,
  Typography,
  Radio,
  Upload,
  Modal,
  Badge,
  Alert,
} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import apolloClient, { apolloUploadClient, customerQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { productSchema } from '../../apollo/product';
import { customerMutation } from '../../apollo/customer';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import { UploadOutlined } from '@ant-design/icons';
import getStripe from '../../utility/getStripe';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from './PayPalButton';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const { Text, Paragraph } = Typography;
const prod_initial = {
  id: '',
  prod_name: '',
  quantity: 1,
  price: 0,
};
const AddOrder = () => {
  viewPermission('order');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [customerData, setCustomerData] = useState([]);
  // ===================== new =====================
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const formRef = useRef();
  const [productOption, setProductOption] = useState([]);
  const [lastInitProductId, setLastInitProductId] = useState(null);
  const [discount, setDiscount] = useState('00.0');
  const [shippingMethod, setShippingMethod] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selctedCouponCode, setSelectedCouponCode] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [textExempt, setTextExempt] = useState(false);
  const [image, setImage] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [addressType, setAddressType] = useState(null);
  const [listAddressModalOpen, setListAddressModalOpen] = useState(false);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [editSelectedAddress, setEditSelectedAddress] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);
  const [selectedPaymentMethodSlug, setSelectedPaymentMethodSlug] = useState(null);

  const handleSubmit = () => {
    const form_data = form.getFieldsValue(true);
    const orderProducts = selectedProduct.map(item => ({ product_id: item.id, quantity: item.quantity }));
    if (orderProducts.length === 0) return toast.error('Please Select at Least One Product.');
    if (!form_data.billing_address_id) return toast.error('Please Select Billing Address.');
    if (!form_data.shipping_address_id) return toast.error('Please Select Shipping Address.');
    if (!form_data.customer_id) return toast.error('Please Select Customer.');
    if (!form_data.payment_id) return toast.error('Please Select Payment Method.');
    if (!form_data.shipping_method_id) return toast.error('Please Select Shipping Method.');
    if (form_data.tax_exempt && !image) return toast.error('Please Upload Text Exempt File.');
    setIsLoading(true);
    apolloUploadClient
      .mutate({
        mutation: orderQuery.CREATE_ORDER,
        variables: {
          data: {
            ...form_data,
            coupon_id: selctedCouponCode,
            payment_id: paymentMethod.filter(item => item.slug === form_data.payment_id)[0]?.id,
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
          },
          ['getOrderlistAdmin'],
        ],
      })
      .then(res => {
        const data = res?.data?.createOrderByAdmin;
        if (!data?.status) return toast.error(data?.messsage);
        toast.success(data?.message);
        setTimeout(() => {
          history.push('/admin/order/list');
        }, 1000);
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setIsLoading(false));
  };

  const productColumn = [
    {
      title: 'Product',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 400,
      render: (_, record) => (
        <Select
          placeholder="Select Product"
          options={productOption}
          defaultValue={record.prod_name}
          showSearch
          allowClear
          optionFilterProp="label"
          style={{ width: 400 }}
          onSearch={val => {
            if (val.length > 3) {
              apolloClient
                .query({
                  query: productSchema.SEARCH_PRODUCT,
                  variables: {
                    query: {
                      searchQuery: val,
                    },
                  },
                  context: {
                    headers: {
                      TENANTID: process.env.REACT_APP_TENANTID,
                    },
                  },
                })
                .then(res => {
                  const data = res?.data?.getSearchedProducts;
                  if (!data.status) return;
                  setProductOption(
                    data.data.map(product => ({
                      label: product?.prod_name,
                      value: product?.id,
                      ...product,
                    })),
                  );
                });
            } else {
              setProductOption([]);
            }
          }}
          onSelect={(_, data) => {
            for (const item of selectedProduct) {
              if (item.id === data.id) {
                setSelectedProduct(prevState => prevState.filter(value => value.id !== lastInitProductId));
                return toast.info('Duplicate Product Found!');
              }
            }

            setSelectedProduct(prevState => [
              ...prevState.filter(item => item.id !== record.id),
              ...prevState
                .filter(item => item.id === record.id)
                .map(item => ({
                  ...item,
                  id: data.id,
                  price: data.prod_sale_price === 0 ? data.prod_regular_price : data.prod_sale_price,
                  prod_name: data.prod_name,
                  quantity: 1,
                })),
            ]);
          }}
        />
      ),
    },
    {
      title: 'U. Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (val, record) => `$${val}`,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (val, record) => `$${parseFloat(val) * record.quantity}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (val, record) => (
        <Input
          min={0}
          type="number"
          defaultValue={val}
          onChange={e => {
            e.persist();
            setSelectedProduct(prevState =>
              prevState.map(item => {
                if (item.id === record.id) {
                  return { ...item, quantity: parseInt(e.target.value) };
                }
                return item;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: val => (
        <Button
          size="small"
          title="Remove"
          type="danger"
          onClick={() => {
            setSelectedProduct(prevState => {
              return prevState.filter(value => value?.id !== val);
            });
          }}
        >
          <FeatherIcon icon="trash-2" />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Load Shipping Method
    apolloClient
      .query({
        query: productSchema.GET_SHIPPING_METHOD_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getShippingMethodListPublic;
        if (!data.status) return;
        setShippingMethod(data?.data);
      });

    // Load Payment Mathod
    apolloClient
      .query({
        query: productSchema.GET_PAYMENT_METHOD_LIST,
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
      });

    // Get Order Status List
    apolloClient
      .query({
        query: orderQuery.GET_ORDER_STATUS_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderStatusList;
        if (!data.status) return;
        const order_status_list = data?.data?.map(item => ({
          ...item,
          value: item.id,
          label: item.name,
        }));
      });
  }, []);

  /* -------------------------- Step From Data Start -------------------------- */
  const steps = [
    {
      title: 'Customer',
      percent: 15,
    },
    {
      title: 'Products',
      percent: 35,
    },
    {
      title: 'Addresses',
      percent: 50,
    },
    {
      title: 'Shipping',
      percent: 65,
    },
    {
      title: 'Voucher & Status',
      percent: 80,
    },
    {
      title: 'Payment Method',
      percent: 90,
    },
    {
      title: 'Payment',
      percent: 100,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
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
              setDiscount((total.price / 100) * data.data.coupon_amount);
            } else {
              setDiscount(data.data.coupon_amount);
            }
            setSelectedCouponCode(data?.data?.id);
          } else {
            toast.error(data.message);
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
    setAddressType(type);
    if (id) {
      setIsAddressEdit(true);
      if (type === 'billing') {
        setEditSelectedAddress(billingAddresses.filter(item => item.id === id)[0]);
      } else {
        setEditSelectedAddress(shippingAddresses.filter(item => item.id === id)[0]);
      }
    } else {
      setEditSelectedAddress(null);
      addressForm.resetFields();
      setIsAddressEdit(false);
    }
    setAddressModalOpen(true);
  };

  // First Time Change address open Modal
  const changeAddressHandler = type => {
    setListAddressModalOpen(true);
    setAddressType(type);
  };

  // Handle Address Submit
  const handleAddressSubmit = type => {
    const values = addressForm.getFieldValue();
    setChangeAddress(false);
    let newBillingAddress = [];
    let newShippingAddress = [];
    if (editSelectedAddress) {
      if (type === 'billing') {
        newBillingAddress = billingAddresses.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: selectedCustomer?.id,
            isDefault: isDefault,
            ...rest,
          };
        });
      } else {
        newShippingAddress = shippingAddresses.map(item => {
          let { id, createdAt, updatedAt, __typename, type, isDefault, ...rest } = item;
          if (values.isDefault) isDefault = false;
          if (editSelectedAddress?.id === id) {
            rest = values;
          }
          return {
            parent_id: selectedCustomer?.id,
            isDefault: isDefault,
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
          setChangeAddress(true);
          setAddressModalOpen(false);
        });
    } else {
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
          const data =
            type === 'billing' ? res?.data?.addCustomerBillingAddress : res?.data?.addCustomerShippingAddress;
          if (!data?.status) return;
          setChangeAddress(true);
          setAddressModalOpen(false);
        });
    }
  };

  // Trigger Function when select an address finally
  const selectAddressHandler = type => {
    if (type === 'billing') {
      setSelectedBillingAddress(tempSelectedAddress);
      form.setFieldValue({
        billing_address_id: tempSelectedAddress?.id,
      });
    } else {
      setSelectedShippingAddress(tempSelectedAddress);
      form.setFieldValue({
        shipping_address_id: tempSelectedAddress?.id,
      });
    }
    setListAddressModalOpen(false);
  };

  // Refetch query after adding or updating address
  useEffect(() => {
    if (!selectedCustomer?.id) return;
    setTimeout(() => {
      apolloClient
        .query({
          query: customerQuery.GET_SINGLE_CUSTOMER,
          variables: { customer_id: selectedCustomer?.id },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
          fetchPolicy: 'network-only',
        })
        .then(res => {
          const data = res?.data?.getSingleCustomer;
          if (!data?.status) return;
          const shipping = [];
          const billing = [];
          setSelectedBillingAddress(null);
          setSelectedShippingAddress(null);
          data?.data?.addresses?.forEach(address => {
            if (address.type === 'billing') billing.push(address);
            if (address.type === 'shipping') shipping.push(address);
            if (address.type === 'billing' && address.isDefault) setSelectedBillingAddress(address);
            if (address.type === 'shipping' && address.isDefault) setSelectedShippingAddress(address);
          });
          setBillingAddresses(billing);
          setShippingAddresses(shipping);
        });
    }, 2000);
  }, [changeAddress]);

  return (
    <>
      <PageHeader title={'Add Order'} />
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
                // labelCol={{ span: 4 }}
                layout="vertical"
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
                          <Col md={12} sm={24}>
                            <Form.Item
                              rules={[{ required: true, message: 'Please select a customer' }]}
                              name="customer_id"
                              label="Customer"
                            >
                              <Select
                                placeholder="Select a customer"
                                options={customerData}
                                showSearch
                                allowClear
                                optionFilterProp="label"
                                onSelect={(val, data) => {
                                  setSelectedCustomer(data.item);
                                  const billing = [];
                                  const shipping = [];
                                  setSelectedBillingAddress(null);
                                  setSelectedShippingAddress(null);
                                  data?.item?.addresses?.forEach(addr => {
                                    if (addr.type === 'billing') billing.push(addr);
                                    if (addr.type === 'shipping') shipping.push(addr);
                                    if (addr.type === 'billing' && addr.isDefault) setSelectedBillingAddress(addr);
                                    if (addr.type === 'shipping' && addr.isDefault) setSelectedShippingAddress(addr);
                                  });
                                  setBillingAddresses(billing);
                                  setShippingAddresses(shipping);
                                }}
                                onSearch={val => {
                                  if (val.length > 3) {
                                    apolloClient
                                      .query({
                                        query: productSchema.GET_SEARCH_CUSTOMER,
                                        variables: {
                                          query: {
                                            searchQuery: val,
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
                                        const data = res.data.getSearchedCustomers;
                                        if (!data.status) return toast.error(data.message);
                                        const options = data?.data?.map(item => ({
                                          label: item.email,
                                          value: item.id,
                                          item,
                                        }));
                                        setCustomerData(options);
                                      });
                                  } else {
                                    setCustomerData([]);
                                  }
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={12} sm={24}>
                            <Row gutter={25}>
                              <Col>
                                {selectedCustomer?.image ? (
                                  <Avatar
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                    src={renderImage(selectedCustomer?.id, selectedCustomer?.image, 'user', '', true)}
                                  >
                                    <LazyLoadImage
                                      effect="blur"
                                      width={100}
                                      height={100}
                                      src={renderImage(selectedCustomer?.id, selectedCustomer?.image, 'user', '', true)}
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
                        </Row>
                      )}
                      {current === 1 && (
                        <Row gutter={25}>
                          <Col lg={18} md={16} sm={24}>
                            <span className={'psp_list'}>
                              <Table
                                className="table-responsive"
                                columns={productColumn}
                                dataSource={selectedProduct}
                                pagination={false}
                                rowKey="id"
                                rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  marginTop: '10px',
                                  marginBottom: '10px',
                                  paddingRight: '18px',
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    const new_id = new Date().getTime();
                                    setLastInitProductId(new_id);
                                    setSelectedProduct(prevState => [...prevState, { ...prod_initial, id: new_id }]);
                                    setProductOption([]);
                                  }}
                                  size="small"
                                  title="Add Product"
                                  htmlType="button"
                                  type="primary"
                                >
                                  <FeatherIcon icon="plus-circle" />
                                </Button>
                              </div>
                            </span>
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
                                {selectedProduct.reduce(
                                  (accumulator, item) => accumulator + item.quantity * item.price,
                                  0,
                                )}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Product Quantity : </Text>
                                {selectedProduct.reduce((accumulator, item) => accumulator + item.quantity, 0)}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Discount : </Text>${discount}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Shipping Cost : </Text>${shippingCost}
                              </Paragraph>{' '}
                              <Paragraph>
                                <Text strong>Total Price : </Text>$
                                {selectedProduct.reduce(
                                  (accumulator, item) => accumulator + item.quantity * item.price,
                                  0,
                                ) +
                                  shippingCost -
                                  discount}
                              </Paragraph>
                            </Card>
                          </Col>
                        </Row>
                      )}
                      {current === 2 && (
                        <Row gutter={25}>
                          <Col lg={12} sm={24}>
                            <Button
                              size="small"
                              style={{ float: 'right', zIndex: 1000, marginTop: -25, marginBottom: 10 }}
                              title={`Add shipping address`}
                              htmlType="button"
                              type="primary"
                              onClick={() => addOrEditAddressHandler(null, 'shipping')}
                            >
                              <FeatherIcon icon="plus-circle" />
                            </Button>
                            <Form.Item
                              rules={[{ required: true, message: 'Please Select Shipping Address' }]}
                              name="shipping_address_id"
                              label="Shipping Addresses"
                              initialValue={selectedShippingAddress?.id}
                              value={selectedShippingAddress?.id}
                            >
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
                                        <FeatherIcon icon="repeat" />
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
                                        value={selectedShippingAddress?.id}
                                      >
                                        <p>
                                          <b>Email: </b>
                                          {selectedShippingAddress?.email}
                                        </p>
                                        <p>
                                          <b>Phone: </b>
                                          {selectedShippingAddress?.phone}
                                        </p>
                                        <p>
                                          <b>Address 1: </b>
                                          {selectedShippingAddress?.address1 &&
                                            ellipsis(selectedShippingAddress?.address1, 35)}
                                        </p>
                                        <p>
                                          <b>Address 2: </b>
                                          {selectedShippingAddress?.address2 &&
                                            ellipsis(selectedShippingAddress?.address2, 35)}
                                        </p>
                                        <p>
                                          <b>City: </b>
                                          {selectedShippingAddress?.city}
                                        </p>
                                        <p>
                                          <b>State: </b>
                                          {selectedShippingAddress?.state}
                                        </p>
                                        <p>
                                          <b>Zip Code: </b>
                                          {selectedShippingAddress?.zip_code}
                                        </p>
                                      </Radio>
                                    </Col>
                                  )}
                                </Row>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col lg={12} sm={24}>
                            <Button
                              size="small"
                              style={{ float: 'right', zIndex: 1000, marginTop: -25, marginBottom: 10 }}
                              title={`Add Billing address`}
                              htmlType="button"
                              type="primary"
                              onClick={() => addOrEditAddressHandler(null, 'billing')}
                            >
                              <FeatherIcon icon="plus-circle" />
                            </Button>
                            <Form.Item
                              rules={[{ required: true, message: 'Please Select Billing Address' }]}
                              name="billing_address_id"
                              label="Billing Addresses"
                              initialValue={selectedBillingAddress?.id}
                            >
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
                                        <FeatherIcon icon="repeat" />
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
                                        value={selectedBillingAddress?.id}
                                      >
                                        <p>
                                          <b>Email: </b>
                                          {selectedBillingAddress?.email}
                                        </p>
                                        <p>
                                          <b>Phone: </b>
                                          {selectedBillingAddress?.phone}
                                        </p>
                                        <p>
                                          <b>Address 1: </b>
                                          {selectedBillingAddress?.address1 &&
                                            ellipsis(selectedBillingAddress?.address1, 35)}
                                        </p>
                                        <p>
                                          <b>Address 2: </b>
                                          {selectedBillingAddress?.address2 &&
                                            ellipsis(selectedBillingAddress?.address2, 35)}
                                        </p>
                                        <p>
                                          <b>City: </b>
                                          {selectedBillingAddress?.city}
                                        </p>
                                        <p>
                                          <b>State: </b>
                                          {selectedBillingAddress?.state}
                                        </p>
                                        <p>
                                          <b>Zip Code: </b>
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
                      {current === 5 && (
                        <Row gutter={25}>
                          <Col lg={24} sm={24}>
                            <Form.Item
                              name="payment_id"
                              label="Payment Method"
                              rules={[{ required: true, message: 'Select Payment Method' }]}
                            >
                              <Radio.Group
                                style={{ width: '100%', padding: 10 }}
                                onChange={e => setSelectedPaymentMethodSlug(e.target.value)}
                              >
                                {paymentMethod.map(item => (
                                  <Row gutter={25}>
                                    <Col key={item.id} xs={8}>
                                      <Radio
                                        style={{
                                          width: '100%',
                                          border: '1px solid #f0f0f0',
                                          fontSize: 12,
                                          marginBottom: 10,
                                          padding: 10,
                                          borderRadius: 5,
                                        }}
                                        value={item.slug}
                                      >
                                        <Typography.Title level={4}>{item.name}</Typography.Title>
                                        <Typography.Text>{item?.description}</Typography.Text>
                                      </Radio>
                                    </Col>
                                  </Row>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                      {current === 3 && (
                        <Row gutter={25}>
                          <Col sm={24}>
                            <Form.Item
                              name="shipping_method_id"
                              label="Shipping Method"
                              rules={[{ required: true, message: 'Select Shipping Method' }]}
                            >
                              <Radio.Group style={{ width: '100%', padding: 10 }}>
                                {shippingMethod.map(item => (
                                  <Row gutter={25}>
                                    <Col key={item.id} xs={8}>
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
                                        <Typography.Title level={4}>{item.name}</Typography.Title>
                                        <Typography.Text>{item?.description}</Typography.Text>
                                      </Radio>
                                    </Col>
                                  </Row>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                      )}
                      {current === 4 && (
                        <Row gutter={25}>
                          <Col lg={18} xs={24}>
                            <Form.Item label="Voucher Code">
                              <Input.Search
                                placeholder="Input Voucher Code"
                                enterButton="Apply Voucher"
                                size="large"
                                onSearch={validateVoucher}
                                defaultValue={selctedCouponCode}
                              />
                            </Form.Item>
                            <Form.Item name="tax_exempt" label="Tax Exempt">
                              <Switch size="small" defaultChecked={textExempt} onChange={e => setTextExempt(e)} />
                            </Form.Item>
                            {textExempt && (
                              <Form.Item label="Tax Exempt File">
                                <Upload
                                  defaultFileList={image && [image]}
                                  beforeUpload={beforeImageUpload}
                                  name="tax_exempt_file"
                                >
                                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                              </Form.Item>
                            )}
                          </Col>
                          <Col lg={6} xs={24}>
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
                                {selectedProduct.reduce(
                                  (accumulator, item) => accumulator + item.quantity * item.price,
                                  0,
                                )}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Product Quantity : </Text>
                                {selectedProduct.reduce((accumulator, item) => accumulator + item.quantity, 0)}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Discount : </Text>${discount}
                              </Paragraph>
                              <Paragraph>
                                <Text strong>Shipping Cost : </Text>${shippingCost}
                              </Paragraph>{' '}
                              <Paragraph>
                                <Text strong>Total Price : </Text>$
                                {selectedProduct.reduce(
                                  (accumulator, item) => accumulator + item.quantity * item.price,
                                  0,
                                ) +
                                  shippingCost -
                                  discount}
                              </Paragraph>
                            </Card>
                          </Col>
                        </Row>
                      )}
                      {current === 6 && (
                        <Row gutter={25} align="middle" justify="center">
                          <Col lg={12}>
                            {selectedPaymentMethodSlug ? (
                              <Card title={selectedPaymentMethodSlug?.toUpperCase()} bordered={true} size="small">
                                {selectedPaymentMethodSlug === 'paypal' && (
                                  <PayPalScriptProvider options={{ 'client-id': 'test' }}>
                                    <PayPalButton amount={10} />
                                  </PayPalScriptProvider>
                                )}
                                {selectedPaymentMethodSlug === 'stripe' && (
                                  <Elements stripe={stripePromise}>
                                    <StripeForm />
                                  </Elements>
                                )}
                              </Card>
                            ) : (
                              <Alert message="Please Select Payment Method" type="error" showIcon />
                            )}
                          </Col>
                        </Row>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <div className="steps-action" style={{ float: 'right' }}>
                      <Link to="/admin/order/list">
                        <Button
                          type="light"
                          style={{
                            margin: '0 8px',
                          }}
                          onClick={() => prev()}
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
                          {isLoading ? 'Processing...' : 'Create Order'}
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
              <Col md={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Please Enter Address One' }]}
                  name="address1"
                  label="Address One"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.address1 ?? ''}
                >
                  <Input placeholder="Address One" />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Please Enter Phone' }]}
                  name="phone"
                  label="Phone"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.phone}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Please Enter Email' }]}
                  name="email"
                  label="Email"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.email}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="fax" label="Fax" style={{ marginBottom: 5 }} initialValue={editSelectedAddress?.fax}>
                  <Input placeholder="Fax" />
                </Form.Item>
                <Form.Item
                  name="isDefault"
                  label="Default"
                  style={{ marginBottom: 0 }}
                  initialValue={editSelectedAddress?.isDefault}
                >
                  <Switch defaultChecked={editSelectedAddress?.isDefault} />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  name="address2"
                  label="Address Two"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.address2}
                >
                  <Input placeholder="Address Two" />
                </Form.Item>
                <Form.Item name="country" initialValue="United State" label="Country" style={{ marginBottom: 5 }}>
                  <Select>
                    <Select.Option value="United State">United State</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Please Enter City' }]}
                  name="city"
                  label="City"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.city}
                >
                  <Input placeholder="City" />
                </Form.Item>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: 'Please Enter State' }]}
                  label="State"
                  style={{ marginBottom: 5 }}
                  initialValue={editSelectedAddress?.state}
                >
                  <Input placeholder="State" />
                </Form.Item>
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
          </Form>
        </Modal>
        {/* Modal For Add / Update Address */}
        {/* Modal For Add / Update Address */}
        <Modal
          title={`List of ${addressType} addresses`}
          style={{ top: 20 }}
          width={1000}
          open={listAddressModalOpen}
          okText="Select"
          onOk={() => selectAddressHandler(addressType)}
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
                  <FeatherIcon icon="plus-circle" />
                </Button>
              </Col>
              {addressType === 'billing'
                ? billingAddresses.map(item => (
                    <Col key={item.id} xs={24} md={12}>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                        title="Edit Billing Address"
                        htmlType="button"
                        type="info"
                        onClick={() => addOrEditAddressHandler(item.id, 'billing')}
                      >
                        <FeatherIcon icon="edit" />
                      </Button>
                      {billingAddresses.filter(item => item.isDefault)[0]?.id === item.id && (
                        <Badge.Ribbon text="Default" color="pink" style={{ top: 40, zIndex: 1000 }} />
                      )}
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
                  ))
                : shippingAddresses.map(item => (
                    <Col key={item.id} xs={24} md={12}>
                      <Button
                        size="small"
                        style={{ position: 'absolute', right: 14, zIndex: 1000 }}
                        title="Edit Shipping Address"
                        htmlType="button"
                        type="info"
                        onClick={() => addOrEditAddressHandler(item.id, 'shipping')}
                      >
                        <FeatherIcon icon="edit" />
                      </Button>
                      {shippingAddresses.filter(item => item.isDefault)[0]?.id === item.id && (
                        <Badge.Ribbon text="Default" color="pink" style={{ top: 40, zIndex: 1000 }} />
                      )}
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
        </Modal>
        {/* Modal For Add / Update Address */}
      </Main>
    </>
  );
};

export default AddOrder;
