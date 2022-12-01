import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { customerMutation, customerQuery, vendorMutation, vendorQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
const { TextArea } = Input;

const AddVendor = () => {
  viewPermission('vendor');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [singleVendor, setSingleVendor] = useState({ data: [], isLoading: true });
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const maxLength = 30;

  // ============+ for billing START +====================
  const initialData1 = {
    id: new Date().getTime(),
    address1: '',
    address1: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    fax: '',
    phone: '',
    status: true,
    // contactPerson: "",
  };
  const [billingAddresses, setBillingAddresses] = useState([initialData1]);
  // ============+ for billing END +====================

  // ============+ for billing START +====================
  const initialData2 = {
    id: new Date().getTime(),
    address1: '',
    address1: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    fax: '',
    phone: '',
    status: true,
  };
  const [shippingAddresses, setShippingAddresses] = useState([initialData2]);
  // ============+ for billing END +====================

  // LOAD SINGLE Vendor
  useEffect(() => {
    if (!params.id) return;

    apolloClient
      .query({
        query: vendorQuery.GET_SINGLE_VENDOR,
        variables: { query: { id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleVendor;
        if (!data?.status) return;
        setSingleVendor(s => ({ ...s, data: data?.data, error: '' }));

        let billings = [];
        let shippings = [];
        data?.data?.addresses?.forEach(address => {
          const item = {
            id: address.id,
            address1: address.address1,
            address2: address.address2,
            country: address.country,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            email: address.email,
            fax: address.fax,
            phone: address.phone,
            status: address.status,
          };
          if (address.type === 'billing') return billings.push(item);
          return shippings.push(item);
        });
        setBillingAddresses(billings);
        setShippingAddresses(shippings);
      })
      .catch(err => {
        setSingleVendor(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setSingleVendor(s => ({ ...s, isLoading: false }));
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

    // validate shippingAddresses.
    const notValidate1 = shippingAddresses.find(item => {
      const { id, address1, country, city, state, zip_code, email, fax, phone, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && email && fax && phone && address2);
      return checkFalse;
    });
    if (notValidate1?.id) return toast.warning('Enter Shipping Address Correctly!');

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
              Authorization: Cookies.get('psp_t'),
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
                    Authorization: Cookies.get('psp_t'),
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
          // add shipping address
          shippingAddresses.forEach((val, index) => {
            const { id, ...rest } = val;
            apolloClient
              .mutate({
                mutation: vendorMutation.ADD_VENDOR_SHIPPING_ADDRESS,
                variables: { data: { ...rest, parent_id } },
                context: {
                  headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t'),
                  },
                },
              })
              .then(res => {
                const data = res?.data?.addVendorShippingAddress;
                if (shippingAddresses.length === index + 1) {
                  setTimeout(() => {
                    history.push('/admin/vendor/list');
                  }, 1000);
                }
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
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.updateVendor;
          if (!data.status) return toast.error(data.message);

          // add shipping address
          const addresses = [...billingAddresses, ...shippingAddresses];
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
                  }, 1000);
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

  return (
    <>
      <PageHeader
        title={
          params.id
            ? `Manage Vendor | Edit ${singleVendor.data.company_name ? `(${singleVendor.data.company_name})` : ''}`
            : 'Add Vendor'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleVendor.isLoading ? (
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
                  initialValues={
                    params.id
                      ? {
                          company_name: singleVendor.data.company_name,
                          contact_person: singleVendor.data.contact_person,
                          email: singleVendor.data.email,
                          description: singleVendor.data.description,
                          phone_number: singleVendor.data.phone_number,
                          EIN_no: singleVendor.data.EIN_no,
                          TAX_ID: singleVendor.data.TAX_ID,
                          FAX_no: singleVendor.data.FAX_no,
                        }
                      : null
                  }
                >
                  <Tabs>
                    <Tabs.TabPane tab="General" key="general">
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Vendor Company Name' }]}
                        name="company_name"
                        label="Company Name"
                      >
                        <Input placeholder="Enter Vendor Company Name" />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Vendor Contact Person' }]}
                        label="Contact Person"
                        name="contact_person"
                      >
                        <Input placeholder="Enter Contact Person" />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Email' }]}
                        name="email"
                        label="Email"
                      >
                        <Input placeholder="Enter Vendor Email" type="email" />
                      </Form.Item>

                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Phone Number' }]}
                        name="phone_number"
                        label="Phone"
                      >
                        <Input placeholder="Enter Vendor Phone Number" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Fax No' }]}
                        name="FAX_no"
                        label="Fax"
                      >
                        <Input placeholder="Enter Vendor Fax" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter EIN No' }]}
                        name="EIN_no"
                        label="EIN"
                      >
                        <Input placeholder="Enter Vendor EIN Number" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Fax Id' }]}
                        name="TAX_ID"
                        label="Tax Id"
                      >
                        <Input placeholder="Enter Vendor Tax Id" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, message: 'Please enter Vendor Description' }]}
                        name="description"
                        label="Description"
                      >
                        <TextArea rows={4} placeholder="Enter Vendor Description" />
                      </Form.Item>
                      <Form.Item label="Vendor Status">
                        <Switch checked={status} onChange={checked => setStatus(checked)} />
                      </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Billing Address" key="billing_address">
                      <BillingAdderess {...{ initialData1, billingAddresses, setBillingAddresses }} />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                      <ShippingAddress {...{ initialData2, shippingAddresses, setShippingAddresses }} />
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
                      <Link to="/admin/vendor/list">
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

export default AddVendor;
