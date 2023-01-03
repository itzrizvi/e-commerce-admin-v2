import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { vendorMutation, vendorQuery } from '../../utility/apollo';
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
  const [defaultBilling, setDefaultBilling] = useState(null);
  const [defaultShipping, setDefaultShipping] = useState(null);
  const [form] = Form.useForm();
  const maxLength = 30;
  const [operation, setOperation] = useState(false);
  const [vendor_id, setVendorId] = useState(null);
  const [isError, setIsError] = useState(false);

  // ============+ for billing START +====================
  const initialAddressData = {
    id: new Date().getTime(),
    parent_id: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    fax: '',
    phone: '',
    status: true,
    isDefault: false,
    isNew: true,
  };
  const [billingAddresses, setBillingAddresses] = useState([]);
  // ============+ for billing END +====================

  const [shippingAddresses, setShippingAddresses] = useState([]);
  // ============+ for billing END +====================

  // LOAD SINGLE Vendor
  useEffect(() => {
    if (!params?.id) return;

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
        initialAddressData.parent_id = data?.data?.id;
        setSingleVendor(s => ({ ...s, data: data?.data, error: '' }));

        let billings = [];
        let shippings = [];
        data?.data.addresses.forEach(address => {
          const { updatedAt, createdAt, __typename, type, isDefault, ...rest } = address;
          const item = {
            isDefault: false,
            isNew: false,
            parent_id: data?.data?.id,
            ...rest,
          };
          if (address.type === 'billing') {
            if (isDefault) setDefaultBilling(address.id);
            return billings.push(item);
          } else if (address.type === 'shipping') {
            if (isDefault) setDefaultShipping(address.id);
            return shippings.push(item);
          }
          return;
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
  }, [params?.id]);

  const handleSubmit = values => {
    const variables = { ...values, status };
    // validate billingAddresses.
    const notValidate = billingAddresses.find(item => {
      const { id, address1, country, city, state, zip_code, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && address2);
      return checkFalse;
    });
    if (notValidate?.id) return toast.warning('Enter Billing Address Correctly!');

    // validate shippingAddresses.
    const notValidate1 = shippingAddresses.find(item => {
      const { id, address1, country, city, state, zip_code, address2 } = item;
      const checkFalse = !(id && address1 && country && city && state && zip_code && address2);
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
          refetchQueries: [
            {
              query: vendorQuery.GET_ALL_VENDOR,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
              fetchPolicy: 'network-only',
            },
            ['getAllVendor'],
          ],
        })
        .then(res => {
          const data = res?.data?.createVendor;
          if (!data.status) return toast.error(data.message);
          setVendorId(parseInt(data.id));
          setOperation(true);
        })
        .catch(err => {
          setIsLoading(false);
          console.log('got error on add vendor', err);
          setIsError(true);
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
          setVendorId(parseInt(params?.id));
          setOperation(true);
        })
        .catch(err => {
          console.log('got error on update vendor', err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (operation && vendor_id) {
      const newBillingAddress = billingAddresses.map(item => {
        const { parent_id, isNew, states, id, isDefault, ...rest } = item;
        return {
          isDefault: defaultBilling === id,
          parent_id: vendor_id,
          isNew,
          ...rest,
          ...(!isNew && { id }),
        };
      });
      const newShippingAddress = shippingAddresses.map(item => {
        const { parent_id, isNew, states, isDefault, id, ...rest } = item;
        return {
          isDefault: defaultShipping === id,
          parent_id: vendor_id,
          isNew,
          ...rest,
          ...(!isNew && { id }),
        };
      });

      ['billing', 'shipping'].forEach(type => {
        setIsLoading(true);
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
                Authorization: Cookies.get('psp_t'),
              },
            },
          })
          .then(res => {
            const data = res?.data?.updateVendorAddress;
            if (!data?.status) return;
          })
          .catch(err => {
            setIsError(true);
          })
          .finally(res => {
            setIsLoading(false);
            if (type === 'shipping') {
              if (!isError) {
                toast.success('Vendor Added Successfully.');
                setTimeout(() => {
                  history.push('/admin/vendor/list');
                }, [2000]);
              }
            }
          });
      });
    }
  }, [operation, vendor_id]);

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
                      <BillingAdderess
                        {...{
                          defaultBilling,
                          initialAddressData,
                          billingAddresses,
                          setBillingAddresses,
                          setDefaultBilling,
                        }}
                      />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                      <ShippingAddress
                        {...{
                          defaultShipping,
                          initialAddressData,
                          shippingAddresses,
                          setShippingAddresses,
                          setDefaultShipping,
                        }}
                      />
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
