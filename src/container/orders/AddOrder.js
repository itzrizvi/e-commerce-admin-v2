import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Switch,
  Spin,
  Select,
  Card,
  Table,
  message,
  Steps,
  Avatar,
  Typography,
  Radio,
  Upload,
} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { apolloUploadClient, customerMutation, customerQuery, productQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { productSchema } from '../../apollo/product';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
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
  const [orderStatusOptions, setOrderStatusOptions] = useState([]);
  const [selctedCouponCode, setSelectedCouponCode] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [textExempt, setTextExempt] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const form_data = form.getFieldsValue(true);
    const orderProducts = selectedProduct.map(item => ({ product_id: item.id, quantity: item.quantity }));
    if (orderProducts.length === 0) return toast.error('Please Select at Least One Product.');
    if (!form_data.billing_address_id) return toast.error('Please Select Billing Address.');
    if (!form_data.shipping_address_id) return toast.error('Please Select Shipping Address.');
    if (!form_data.customer_id) return toast.error('Please Select Customer.');
    if (!form_data.order_status_id) return toast.error('Please Select Order Status.');
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
          type="primary"
          onClick={() => {
            setSelectedProduct(prevState => {
              return prevState.filter(value => value?.id !== val);
            });
          }}
        >
          <FeatherIcon icon="minus" />
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
        setOrderStatusOptions(order_status_list);
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
      toast.warn('Voucher Removed!');
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
            toast.success(data.message);
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
                                  data?.item?.addresses?.forEach(addr => {
                                    if (addr.type === 'billing' && addr.isDefault) billing.push(addr);
                                    if (addr.type === 'shipping' && addr.isDefault) shipping.push(addr);
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
                            <Form.Item
                              rules={[{ required: true, message: 'Please Select Shipping Address' }]}
                              name="shipping_address_id"
                              label="Shipping Addresses"
                            >
                              <Radio.Group style={{ width: '100%', padding: 10 }}>
                                <Row gutter={25}>
                                  {shippingAddresses.map(item => (
                                    <Col key={item.id} xs={24}>
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
                          </Col>
                          <Col lg={12} sm={24}>
                            <Form.Item
                              rules={[{ required: true, message: 'Please Select Billing Address' }]}
                              name="billing_address_id"
                              label="Billing Addresses"
                            >
                              <Radio.Group style={{ width: '100%', padding: 10 }}>
                                <Row gutter={25}>
                                  {billingAddresses.map(item => (
                                    <Col key={item.id} xs={24}>
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
                              <Radio.Group style={{ width: '100%', padding: 10 }}>
                                <Row gutter={25}>
                                  {paymentMethod.map(item => (
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
                                  ))}
                                </Row>
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
                                <Row gutter={25}>
                                  {shippingMethod.map(item => (
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
                                  ))}
                                </Row>
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
                            <Form.Item
                              name="order_status_id"
                              label="Order Status"
                              rules={[{ required: true, message: 'Select Order Status' }]}
                            >
                              <Select
                                placeholder="Select Order Status"
                                options={orderStatusOptions}
                                optionFilterProp="label"
                              />
                            </Form.Item>
                            <Form.Item name="tax_exempt" label="Tax Exempt">
                              <Switch size="small" defaultChecked={textExempt} onChange={e => setTextExempt(e)} />
                            </Form.Item>
                            {textExempt && (
                              <Form.Item label="Tax Exempt File">
                                <Upload defaultFileList={image && [image]} beforeUpload={beforeImageUpload} name="tax_exempt_file">
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
      </Main>
    </>
  );
};

export default AddOrder;
