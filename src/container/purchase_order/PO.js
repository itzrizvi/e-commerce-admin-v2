import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Typography, Switch, Modal, Spin, Card, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { vendorMutation } from '../../utility/apollo';
import { poQuery } from '../../apollo/po';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import { methodQuery } from '../../apollo/method';
import ProductSearch from '../../components/searchModule/ProductSearch';
import { CheckCircleOutlined, ExclamationCircleFilled, SelectOutlined } from '@ant-design/icons';
import VendorSearch from '../../components/searchModule/VendorSearch';
import AddContactPerson from '../../components/contactPerson/AddContactPerson';
import ContactPersonList from '../../components/contactPerson/ContactPersonList';
import { contactPersonsSchema } from '../../apollo/contactPerson';
import PaymentMethodList from '../../components/common-modal/PaymentMethodList';
import ShippingTypeList from '../../components/common-modal/ShippingTypeList';
import ShippingAccountList from '../../components/common-modal/ShippingAccountList';
import AddressList from '../../components/common-modal/AddressList';
import AddAddress from '../../components/common-modal/AddAddress';
import { addressSchema } from '../../apollo/address';
import UpdateAddress from '../../components/common-modal/UpdateAddress';
import Products from '../../components/products/Products';
import config from '../../config/config';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
import configMessage from '../../config/config_message';
const { confirm } = Modal;
const { TextArea } = Input;

const PO = () => {
  const history = useHistory();
  const { id } = useParams();
  if (id) viewPermission('purchase-order-edit');
  else viewPermission('purchase-order');
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('default');
  const [paymentMethod, setPaymentMethod] = useState([]);

  // Product Search Module State Start
  const [productSearchModalOpen, setProductSearchModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  //Product Search Module State End

  // Vendor Search State Start
  const [vendorSearchModalOpen, setVendorSearchModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedVendorBillingAddress, setSelectedVendorBillingAddress] = useState(null);
  // Vendor Search State End

  // Contact person Add State Start
  const [contactPersonAddModalOpen, setContactPersonAddModalOpen] = useState(false);
  const [cpSuccess, setCPSuccess] = useState(false);
  const [selectedContactPerson, setSelectedContactPerson] = useState(null);
  const [contactSelectModalOpen, setContactSelectModalOpen] = useState(false);
  // Contact Person Add state End

  // Payment Method Select List State Start
  const [paymentMethodSelectModalOpen, setPaymentMethodSelectModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  // Payment Method Select List State END

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

  // Billing Address List State Start
  const [billingAddressListModalOpen, setBillingAddressListModalOpen] = useState(false);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [updateAddressModalOpen, setUpdateAddressModalOpen] = useState(false);
  const [editSelectedAddress, setEditSelectedAddress] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  // Billing Address List State End
  const [creatingPO, setCreatingPO] = useState(false);

  // Edit PO
  const [singlePO, setSinglePO] = useState({ data: [], isLoading: false });

  // Get Order Id From Param And get the Order
  let check_post = true;
  useEffect(() => {
    if (!params || !params.order_id) return;
    if (check_post) {
      check_post = false;
      setSelectedType('drop_shipping');

      /* ------------------------- Get Single View Order ------------------------ */
      apolloClient
        .query({
          query: orderQuery.GET_SINGLE_ORDER_ADMIN,
          variables: {
            query: {
              order_id: parseInt(params?.order_id),
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
          if (!data?.status) return InternalErrorMessage();
          form.setFieldsValue({
            order_id: data?.data?.id,
          });
          const prods = data.data?.orderitems?.map(item => {
            const { product, ...rest } = item;

            return {
              ...product,
              quantity: rest.quantity,
              cost: rest.price,
            };
          });
          setProducts(prods);
        });
    }
  }, [params?.order_id]);

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
        if (!data?.status) return InternalErrorMessage();
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
        if (!data?.status) return InternalErrorMessage();
        setShippingMethod(data?.data);
        setSelectedShippingMethod(data?.data?.filter(item => item.isDefault === true)[0]?.id);
      })

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
        if (!data?.status) return InternalErrorMessage();
        setPaymentMethod(data?.data);
      })
  }, []);

  // Trigger After Contact Person Add
  useEffect(() => {
    if (!selectedVendor?.id) return;
    apolloClient
      .query({
        query: contactPersonsSchema.GET_CONTACT_PERSON_BY_ID,
        variables: {
          query: {
            id: selectedVendor?.id,
            type: 'vendor',
            status: true,
          },
        },
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID, Authorization: token },
        },
      })
      .then(res => {
        const data = res.data.getContactPerson;
        if (!data?.status) return InternalErrorMessage();
        setSelectedVendor(prev => ({ ...prev, contactPersons: data?.data }));
      });
  }, [cpSuccess]);

  const handleSubmit = () => {
    const values = form.getFieldsValue(true);
    // validate Products.
    if (products.length === 0) return message.warning(configMessage.PRODUCT_NOT_EXIST);
    const notValidate = products.find(item => {
      const { id, cost, quantity } = item;
      const checkFalse = !(id && cost && quantity);
      return checkFalse;
    });
    if (notValidate) return message.warning(configMessage.PRODUCT_DATA_MISSING);
    const newProduct = products.map(item => {
      return { id: item.id, price: item.cost, quantity: item.quantity, ...(item?.isNew && { isNew: item?.isNew }) };
    });

    const { order_id, shipping_cost, tax_amount, vendor_billing_address_id, ...newValues } = values;

    const variables = {
      ...newValues,
      ...(order_id && { order_id: parseInt(order_id) }),
      ...(selectedContactPerson?.id && { contact_person_id: selectedContactPerson.id }),
      ...(selectedShippingAccount?.id && { shipping_account_id: selectedShippingAccount.id }),
      ...(shipping_cost && { shipping_cost: parseFloat(shipping_cost) }),
      ...(tax_amount && { tax_amount: parseFloat(tax_amount) }),
      products: newProduct,
      type: selectedType,
      ...(!id && { vendor_billing_address_id }),
      ...(id && {
        id: singlePO?.data?.id,
        po_number: singlePO?.data?.po_number,
        vendor_billing_id: vendor_billing_address_id,
      }),
    };

    // Loading Start Until process Finished
    setCreatingPO(true);
    // ADD NEW Vendor
    setIsLoading(true);
    apolloClient
      .mutate({
        mutation: id ? poQuery.UPDATE_PO : poQuery.CREATE_PURCHASE_ORDER,
        variables: { data: variables },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = id ? res?.data?.updatePurchaseOrder : res?.data?.createPurchaseOrder;
        if (!data?.status) return InternalErrorMessage();
        successPO(data?.po_number, id);
      })
      .finally(() => {
        setIsLoading(false);
        setCreatingPO(true);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      vendor_id: selectedVendor?.id,
      payment_method_id: selectedPaymentMethod?.id,
      shipping_method_id: selectedShippingMethod?.id,
      vendor_billing_address_id: selectedVendorBillingAddress?.id,
    });
  }, [selectedVendor?.id, selectedPaymentMethod?.id, selectedShippingMethod?.id, selectedVendorBillingAddress?.id]);

  // Confirmation for Cancel Po
  const cancelConfirm = () => {
    confirm({
      title: 'Do you want to cancel this PO?',
      icon: <ExclamationCircleFilled />,
      content: null,
      onOk() {
        history.push('/admin/po/list');
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };
  // Confirmation For Create PO
  const createConfirm = () => {
    confirm({
      title: id ? 'Do you want to update this PO?' : 'Do you want to create this PO?',
      icon: <CheckCircleOutlined />,
      content: null,
      onOk() {
        form.submit();
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  // Add Edit Address Modal Open
  const addOrEditAddressHandler = id => {
    if (id) {
      setUpdateAddressModalOpen(true);
      setEditSelectedAddress(selectedVendor?.addresses?.filter(item => item.id === id)[0]);
    } else {
      setAddAddressModalOpen(true);
    }
  };
  // Add Address Handler
  const addAddressHandler = (type, values) => {
    let newBillingAddress = [];
    let newShippingAddress = [];
    if (type === 'billing') newBillingAddress.push({ parent_id: selectedVendor?.id, ...values });
    else newShippingAddress.push({ parent_id: selectedVendor?.id, ...values });
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
        if (!data?.status) return InternalErrorMessage();
        setAddAddressModalOpen(false);
        setChangeAddress(prev => !prev);
      });
  };

  // Select Billing Address Handler
  const selectAddressHandler = (_, id) => {
    setSelectedVendorBillingAddress(
      selectedVendor.addresses.filter(item => item.type === 'billing' && item.id === id)[0],
    );
    form.setFieldsValue({
      vendor_billing_address_id: id,
    });
    setBillingAddressListModalOpen(false);
  };

  // Update Address Handler
  const updateAddressHandler = (type, values) => {
    const newBillingAddress = selectedVendor?.addresses
      ?.filter(item => item.type === 'billing')
      .map(item => {
        let { id, createdAt, updatedAt, __typename, type, isDefault, countryCode, ...rest } = item;
        if (values.isDefault) isDefault = false;
        if (editSelectedAddress?.id === id) {
          rest = values;
        }
        return {
          parent_id: selectedVendor?.id,
          isNew: false,
          isDefault,
          id,
          ...rest,
        };
      });

    apolloClient
      .mutate({
        mutation: vendorMutation.UPDATE_VENDOR_ADDRESS,
        variables: {
          data: {
            ref_id: selectedVendor?.id,
            type,
            addresses: newBillingAddress,
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
        if (!data?.status) return InternalErrorMessage();
        setChangeAddress(prev => !prev);
        setUpdateAddressModalOpen(false);
      });
  };

  useEffect(() => {
    const vendor_id = selectedVendor?.id;
    if (!vendor_id) return;
    apolloClient
      .query({
        query: addressSchema.GET_ADDRESS_LIST_BY_VENDOR_ID,
        variables: {
          query: {
            vendor_id,
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
        const data = res?.data?.getAddressListByVendorID;
        if (!data?.status) return InternalErrorMessage();
        setSelectedVendor(prev => ({ ...prev, addresses: data?.data }));
        const default_billing = data?.data.filter(item => item.isDefault && item.type === 'billing')[0];
        setSelectedVendorBillingAddress(default_billing);
        form.setFieldsValue({
          vendor_billing_address_id: default_billing?.id,
        });
      });
  }, [changeAddress]);

  /* ------------------------ Get Single PO Order Start ----------------------- */
  useEffect(() => {
    if (!id) return;
    setSinglePO(s => ({ ...s, isLoading: true }));
    apolloClient
      .query({
        query: poQuery.GET_SINGLE_PO,
        variables: {
          query: {
            id: parseInt(id),
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
        if (!data?.status) return InternalErrorMessage();
        setSinglePO({ data: data?.data, isLoading: false, message: data?.message });
        setSelectedType(data?.data?.type);
        setSelectedContactPerson(data?.data?.contactPerson);
        setSelectedVendor(data?.data?.vendor);
        setSelectedVendorBillingAddress(data?.data?.vendorBillingAddress);
        setSelectedPaymentMethod(data?.data?.paymentmethod);
        setSelectedShippingMethod(data?.data?.shippingMethod);
        setSelectedShippingAccount(data?.data?.shippingAccount);
        form.setFieldsValue({
          comment: data?.data?.comment,
          receiving_instruction: data?.data?.receiving_instruction,
          is_insurance: data?.data?.is_insurance,
          shipping_method_id: data?.data?.shippingMethod?.id,
          shipping_cost: data?.data?.shipping_cost,
          payment_method_id: data?.data?.paymentmethod?.id,
          tax_amount: data?.data?.tax_amount,
          vendor_id: data?.data?.vendor?.id,
          vendor_billing_address_id: data?.data?.vendorBillingAddress?.id,
          order_id: data?.data?.order_id,
        });
        const new_product_list = data?.data?.poProductlist?.map(item => {
          return {
            prod_partnum: item.product.prod_partnum,
            id: item.product.id,
            cost: item.price,
            quantity: item.quantity,
            prod_name: item.product.prod_name,
          };
        });
        setProducts(new_product_list);
      })
      .finally(() => {
        setSinglePO(s => ({ ...s, isLoading: false }));
      });
  }, [id]);
  /* ------------------------- Get Single PO Order End ------------------------ */

  // Success Message
  const successPO = po_number => {
    Modal.success({
      content: `${po_number} has been ${id ? 'updated' : 'created'} successfully.`,
      onOk: () => {
        history.push('/admin/po/list?status=new');
      },
    });
  };

  return (
    <>
      <PageHeader title="Add Purchase Order" />
      <Main>
        <Spin
          spinning={creatingPO || singlePO.isLoading}
          tip={
            creatingPO
              ? id
                ? 'Updating PO please wait...'
                : 'Creating PO please wait...'
              : singlePO.isLoading && 'Loading...'
          }
          size="large"
        >
          <>
            <Row gutter={25}>
              <Col sm={24} xs={24}>
                <Cards headless>
                  <Form
                    style={{ width: '100%' }}
                    form={form}
                    name="addPO"
                    onFinish={handleSubmit}
                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                    labelCol={{ xl: 8, xxl: 6 }}
                    scrollToFirstError={true}
                    // requiredMark={false}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="steps-content">
                          <Products {...{ products, setProducts, setProductSearchModalOpen, loading: singlePO.isLoading }} />
                          <table className="table table-responsive purchase_order_vendor_table">
                            <thead>
                              <tr>
                                <th>Vendor</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td width="50%" style={{ borderRight: '1px solid #ddd' }}>
                                  <Form.Item
                                    label="Vendor"
                                    name="vendor_id"
                                    labelAlign="left"
                                    style={{ margin: 0 }}
                                    rules={[{ required: true, message: 'Vendor is required' }]}
                                  >
                                    {selectedVendor ? (
                                      selectedVendor?.company_name
                                    ) : (
                                      <Typography.Text
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setVendorSearchModalOpen(true)}
                                      >
                                        Select Vendor
                                      </Typography.Text>
                                    )}
                                    <SelectOutlined
                                      style={{
                                        cursor: 'pointer',
                                        color: 'var(--primary)',
                                        marginRight: 10,
                                        float: 'right',
                                      }}
                                      onClick={() => setVendorSearchModalOpen(true)}
                                    />
                                  </Form.Item>
                                  {/* Vendor Billing Address Start */}
                                  <Form.Item
                                    name="vendor_billing_address_id"
                                    label="Vendor Address"
                                    labelAlign="left"
                                    style={{ margin: 0 }}
                                    rules={[{ required: true, message: 'Vendor address is required' }]}
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
                                              if (!selectedVendor?.id) return;
                                              setBillingAddressListModalOpen(true);
                                            }}
                                          />
                                          <p className="mb-0">{selectedVendorBillingAddress?.address1}</p>
                                          {selectedVendorBillingAddress?.address2 && (
                                            <p className="mb-0">{selectedVendorBillingAddress?.address2}</p>
                                          )}
                                          <p className="mb-0">
                                            {selectedVendorBillingAddress?.city &&
                                              `${selectedVendorBillingAddress.city}, ${selectedVendorBillingAddress.state} - ${selectedVendorBillingAddress.zip_code}`}
                                          </p>
                                          <p className="mb-0">{selectedVendorBillingAddress?.countryCode?.name}</p>
                                        </Card>
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                  {/* Vendor Billing Address End */}
                                  <Form.Item label="Vendor Contact" labelAlign="left" style={{ margin: 0 }}>
                                    <Row gutter={10}>
                                      <Col span={24}>
                                        {selectedContactPerson ? (
                                          selectedContactPerson?.name
                                        ) : (
                                          <Typography.Text
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              if (!selectedVendor?.id) return;
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
                                            if (!selectedVendor?.id) return;
                                            setContactSelectModalOpen(true);
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                  <Form.Item name="order_id" label="Order" labelAlign="left">
                                    <Input
                                      disabled={selectedType === 'drop_shipping'}
                                      style={{ width: '50%', height: config.INPUT_HEIGHT, margin: 0 }}
                                      name="order_id"
                                      type="number"
                                      placeholder="Order ID"
                                    />
                                  </Form.Item>
                                </td>
                                <td width="50%">
                                  <Form.Item
                                    label="Payment Method"
                                    labelAlign="left"
                                    name="payment_method_id"
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
                                  <Form.Item label="Shipping Account" labelAlign="left" style={{ margin: 0 }}>
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
                          <table style={{ margin: 0 }} className="table table-responsive purchase_order_vendor_table">
                            <tbody>
                              <tr>
                                <td>
                                  <Form.Item
                                    labelCol={{ xl: 4, xxl: 3 }}
                                    size="small"
                                    label="Shipping Cost"
                                    labelAlign="left"
                                    name="shipping_cost"
                                    style={{ marginTop: 10 }}
                                  >
                                    <Input
                                      style={{ width: '19%', height: config.INPUT_HEIGHT, margin: 0 }}
                                      type="number"
                                      name="shipping_cost"
                                      placeholder="Shipping Cost"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    labelCol={{ xl: 4, xxl: 3 }}
                                    size="small"
                                    label="Tax Amount"
                                    labelAlign="left"
                                    name="tax_amount"
                                    style={{ marginTop: 10 }}
                                  >
                                    <Input
                                      style={{ width: '19%', height: config.INPUT_HEIGHT, margin: 0 }}
                                      type="number"
                                      name="tax_amount"
                                      placeholder="Tax Amount"
                                    />
                                  </Form.Item>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style={{ margin: 0 }} className="table table-responsive purchase_order_vendor_table">
                            <tbody>
                              <tr>
                                <td>
                                  <Form.Item
                                    labelCol={{ xl: 4, xxl: 3 }}
                                    size="small"
                                    label="Comment"
                                    labelAlign="left"
                                    name="comment"
                                    style={{ marginTop: 10, marginBottom: 0 }}
                                  >
                                    <TextArea placeholder="Comment" autoSize />
                                  </Form.Item>
                                  <Form.Item
                                    style={{ marginBottom: 10 }}
                                    labelCol={{ xl: 4, xxl: 3 }}
                                    size="small"
                                    label="Receiving Instruction"
                                    labelAlign="left"
                                    name="receiving_instruction"
                                  >
                                    <TextArea style={{ marginTop: 10 }} placeholder="Receiving Instruction" autoSize />
                                  </Form.Item>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style={{ margin: 0 }} className="table table-responsive purchase_order_vendor_table">
                            <tbody>
                              <tr>
                                <td>
                                  <Form.Item
                                    labelCol={{ xl: 4, xxl: 3 }}
                                    size="small"
                                    label="Insurance"
                                    labelAlign="left"
                                    name="is_insurance"
                                    style={{ marginTop: 10, marginBottom: 0 }}
                                    initialValue={singlePO?.data?.is_insurance}
                                  >
                                    <Switch defaultChecked={singlePO?.data?.is_insurance} />
                                  </Form.Item>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                            <Button style={{ marginRight: 10 }} type="secondary" raised onClick={cancelConfirm}>
                              Cancel
                            </Button>

                            <Button
                              loading={isLoading}
                              disabled={isLoading}
                              onClick={createConfirm}
                              type="primary"
                              raised
                            >
                              {isLoading ? 'Processing' : id ? 'Update PO' : 'Create PO'}
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </Col>
            </Row>

            {/* Modal For Product Search */}
            <ProductSearch {...{ productSearchModalOpen, setProductSearchModalOpen, products, setProducts }} />
            <VendorSearch
              {...{
                vendorSearchModalOpen,
                setVendorSearchModalOpen,
                selectedVendor,
                setSelectedVendor,
                setSelectedVendorBillingAddress,
              }}
            />
            <ContactPersonList
              {...{
                contactPersons: selectedVendor?.contactPersons,
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
                parent: 'vendor',
                id: selectedVendor?.id,
                setCPSuccess,
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
            <AddressList
              {...{
                addresses: selectedVendor?.addresses?.filter(item => item.type === 'billing'),
                addressListModalOpen: billingAddressListModalOpen,
                setAddressListModalOpen: setBillingAddressListModalOpen,
                type: 'billing',
                handler: addOrEditAddressHandler,
                selectHandler: selectAddressHandler,
              }}
            />
            <AddAddress
              {...{
                type: 'billing',
                addressModalOpen: addAddressModalOpen,
                setAddressModalOpen: setAddAddressModalOpen,
                handleSubmit: addAddressHandler,
              }}
            />
            <UpdateAddress
              {...{
                type: 'billing',
                address: editSelectedAddress,
                addressModalOpen: updateAddressModalOpen,
                setAddressModalOpen: setUpdateAddressModalOpen,
                handleSubmit: updateAddressHandler,
              }}
            />
          </>
        </Spin>
      </Main>
    </>
  );
};

export default PO;
