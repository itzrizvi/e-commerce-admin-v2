import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { customerMutation, customerQuery, productQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
const { TextArea } = Input;


const AddOrder = () => {
    // viewPermission('customer-group');
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [singleCustomerGroup, setSingleCustomerGroup] = useState({ data: [], isLoading: true })
    const [customergroup_status, setCustomergroup_status] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;


    // LOAD SINGLE CUSTOMER GROUP
    useEffect(() => {
        if (!params.id) return;

        apolloClient.query({
            query: customerQuery.GET_SINGLE_CUSTOMER_GROUP,
            variables: { query: { customer_group_id: parseInt(params.id) } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleCustomerGroup

            if (!data?.status) return
            setSingleCustomerGroup(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setSingleCustomerGroup(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setSingleCustomerGroup(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const handleSubmit = values => {
        console.log("🚀 ~ file: AddOrder.js ~ line 57 ~ handleSubmit ~ values", values);


    }


    // ===================== new ===================== 
    const [customers, setCustomers] = useState({ data: [], isLoading: true })
    const [selectedCustomer, setSelectedCustomer] = useState({})
    const [billingAddresses, setBillingAddresses] = useState([])
    const [shippingAddresses, setShippingAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({ billing: {}, shipping: {} })
    const [products, setProducts] = useState({ data: [], isLoading: true })

    useEffect(() => { // load customer list
        apolloClient.query({
            query: customerQuery.GET_ALL_CUSTOMER_FOR_ORDER,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res.data.getAllCustomer
            if (!data.status) return toast.error(data.message)

            const options = data?.data?.map(item => ({
                label: item.email,
                value: item.id,
                item
            }))
            setCustomers({ data: options, isLoading: false })

        }).catch(err => {

        })

    }, [])
    useEffect(() => { // load product list
        apolloClient.query({
            query: productQuery.GET_PRODUCT_LIST,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res.data.getProductList
            console.log("🚀 ~ file: AddOrder.js ~ line 162 ~ useEffect ~ data", data);
            if (!data.status) return toast.error(data.message)

            const options = data?.data?.map(item => ({
                label: item.prod_name,
                value: item.id,
                prod_slug: item.prod_slug,
                item
            }))
            console.log("🚀 ~ file: AddOrder.js ~ line 113 ~ options ~ options", options);
            setProducts({ data: options, isLoading: false })

        }).catch(err => {

        })

    }, [])


    return (
        <>
            <PageHeader
                title={"Add Order"}
            // title={params.id ? `Add Order | Edit ${singleCustomerGroup.isLoading ? '' : `(${singleCustomerGroup.data.customer_group_name})`}` : "Add Customer Group"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {params.id && singleCustomerGroup.isLoading ?
                                <div div className="spin">
                                    <Spin />
                                </div>

                                : <Form
                                    style={{ width: '100%' }}
                                    form={form}
                                    name="addRole"
                                    onFinish={handleSubmit}
                                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                    labelCol={{ span: 4 }}
                                >
                                    <Form.Item
                                        rules={[{ required: true, message: "Please select a customer" }]}
                                        name="customer_group_name"
                                        label="Customer"
                                    >
                                        <Select
                                            placeholder={customers.isLoading ? "Loading...." : "Select a customer"}
                                            options={customers.data}
                                            showSearch
                                            optionFilterProp='label'
                                            onSelect={(val, data) => {
                                                console.log("🚀 ~ file: AddOrder.js ~ line 160 ~ AddOrder ~ data", data);
                                                setSelectedAddress({ billing: {}, shipping: {} }) //clear address
                                                setSelectedCustomer(data.item)
                                                const billing = []
                                                const shipping = []
                                                data?.item?.addresses.forEach(addr => {
                                                    if (addr.type === "billing") return billing.push({
                                                        label: addr.address1,
                                                        value: addr.id,
                                                        item: addr
                                                    })
                                                    if (addr.type === "shipping") return shipping.push({
                                                        label: addr.address1,
                                                        value: addr.id,
                                                        item: addr
                                                    })
                                                })
                                                setBillingAddresses(billing)
                                                setShippingAddresses(shipping)
                                            }}
                                        />

                                        {selectedCustomer?.id && <p
                                            style={{
                                                marginTop: '0.7em',
                                                lineHeight: '2em',
                                                paddingLeft: '1.5em',
                                                marginBottom: 0
                                            }}
                                        >
                                            <b>First Name: </b> {selectedCustomer.first_name} <br />
                                            <b>Last Name: </b> {selectedCustomer.last_name} <br />
                                        </p>}

                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please select products" }]}
                                        name="ps"
                                        label="Products"
                                        mode="multiple"
                                        optionFilterProp='prod_slug'
                                    >
                                        <Select
                                            placeholder={products.isLoading ? "Loading...." : "Select products"}
                                            options={products.data}
                                        />


                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please select a billing address" }]}
                                        name="billing_address_id"
                                        label="Billing Address"
                                    >
                                        <Select
                                            placeholder={customers.isLoading ? "Loading..."
                                                : "Select a billing address"
                                            }
                                            options={billingAddresses}
                                            onSelect={(val, data) => {
                                                console.log("🚀 ~ file: AddOrder.js ~ line 214 ~ AddOrder ~ data", data);
                                                setSelectedAddress(state => ({ ...state, billing: data.item }))
                                            }}
                                        />

                                        {selectedAddress?.billing?.id && <p
                                            style={{
                                                marginTop: '0.7em',
                                                lineHeight: '2em',
                                                paddingLeft: '1.5em',
                                                marginBottom: 0
                                            }}
                                        >
                                            <b>Address 1 : </b> {selectedAddress?.billing?.address1} <br />
                                            <b>Address 2 : </b> {selectedAddress?.billing?.address2} <br />
                                            <b>Email : </b> {selectedAddress?.billing?.email} <br />
                                            <b>Phone : </b> {selectedAddress?.billing?.phone} <br />
                                            <b>Fax : </b> {selectedAddress?.billing?.fax} <br />
                                            <b>Country : </b> {selectedAddress?.billing?.country} <br />
                                            <b>City : </b> {selectedAddress?.billing?.city} <br />
                                            <b>State : </b> {selectedAddress?.billing?.state} <br />
                                            <b>Zip Code : </b> {selectedAddress?.billing?.zip_code} <br />
                                        </p>}

                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please select a shipping address" }]}
                                        name="shipping_address_id"
                                        label="Shipping Address"
                                    >
                                        <Select
                                            placeholder={customers.isLoading ? "Loading..."
                                                : "Select a shipping address"
                                            }
                                            options={shippingAddresses}
                                            onSelect={(val, data) => {
                                                console.log("🚀 ~ file: AddOrder.js ~ line 229 ~ AddOrder ~ data", data);
                                                setSelectedAddress(state => ({ ...state, shipping: data.item }))
                                            }}
                                        />

                                        {selectedAddress?.shipping?.id && <p
                                            style={{
                                                marginTop: '0.7em',
                                                lineHeight: '2em',
                                                paddingLeft: '1.5em',
                                                marginBottom: 0
                                            }}
                                        >
                                            <b>Address 1 : </b> {selectedAddress?.shipping?.address1} <br />
                                            <b>Address 2 : </b> {selectedAddress?.shipping?.address2} <br />
                                            <b>Email : </b> {selectedAddress?.shipping?.email} <br />
                                            <b>Phone : </b> {selectedAddress?.shipping?.phone} <br />
                                            <b>Fax : </b> {selectedAddress?.shipping?.fax} <br />
                                            <b>Country : </b> {selectedAddress?.shipping?.country} <br />
                                            <b>City : </b> {selectedAddress?.shipping?.city} <br />
                                            <b>State : </b> {selectedAddress?.shipping?.state} <br />
                                            <b>Zip Code : </b> {selectedAddress?.shipping?.zip_code} <br />
                                        </p>}

                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "Please select a payment method" }]}
                                        name="payment_id"
                                        label="Payment Method"
                                    >
                                        <Select
                                            placeholder="Select payment method"
                                            options={[
                                                {
                                                    label: "Method 1",
                                                    value: 1
                                                },
                                                {
                                                    label: "Method 2",
                                                    value: 2
                                                },
                                            ]}
                                        />
                                    </Form.Item>



                                    {/* <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Attribute Group Name" }]}
                                        name="customer_group_name" label="Group Name"
                                        initialValue={params.id ? singleCustomerGroup.data.customer_group_name : ""}
                                    >
                                        <Input placeholder='Enter Attribute Group Name' />
                                    </Form.Item> */}



                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '3em'
                                        }}
                                    >
                                        <Form.Item>
                                            <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                                {isLoading ? 'Processing' : 'Save'}
                                            </Button>
                                            <Link to="/admin/order/list">
                                                <Button
                                                    type='white'
                                                    size="large"
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </Form.Item>
                                    </div>


                                </Form>}
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddOrder;
