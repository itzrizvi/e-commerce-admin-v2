import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Select, Card, Table } from 'antd';
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
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selected, setSelected] = useState(null)//dummy
    const formRef = useRef()


    const productColumn = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 170,
            render: (val, record) => (
                <Input
                    type="number"
                    defaultValue={val}
                />
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            align: "center",
            render: (val) => (
                <Button size="small" title="Add Order" type="primary"
                    onClick={() => {
                        setSelectedProduct(prevState => {
                            return prevState.filter(value => value.id !== val);
                        });
                    }}

                >
                    <FeatherIcon icon="minus" />
                </Button>
            )
        },
    ]


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
                            <Row>
                                <Col sm={12} xs={12}>
                                    {params.id && singleCustomerGroup.isLoading ?
                                        <div div className="spin">
                                            <Spin />
                                        </div>

                                        : <Form
                                            ref={formRef}
                                            style={{ width: '100%' }}
                                            form={form}
                                            name="addRole"
                                            onFinish={handleSubmit}
                                            onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                            // labelCol={{ span: 4 }}
                                            layout="vertical"
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



                                            </Form.Item>

                                            <Form.Item // billing
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


                                            </Form.Item>

                                            <Form.Item // shipping
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


                                            </Form.Item>

                                            <Form.Item // payment method
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

                                            <Form.Item
                                                name="ps"
                                                label="Products"
                                            >
                                                <Select
                                                    optionFilterProp='label'
                                                    placeholder={products.isLoading ? "Loading...." : "Select products"}
                                                    options={products.data}
                                                    showSearch
                                                    mode="multiple"
                                                    allowClear
                                                    onSelect={(val, item) => {
                                                        const newProd = {
                                                            "id": new Date().getTime(),
                                                            "name": item?.item?.prod_name,
                                                            "quantity": 1,
                                                            "price": item?.item?.prod_sale_price
                                                                ? item?.item?.prod_sale_price
                                                                : item?.item?.prod_regular_price
                                                        }
                                                        setSelectedProduct(s => [...s, newProd])
                                                    }}
                                                    onChange={(val) => {
                                                        setTimeout(() => {
                                                            formRef.current.setFieldsValue({ ps: undefined })
                                                        }, 20);
                                                    }}
                                                />
                                            </Form.Item>
                                            <span className={"psp_list"} >
                                                <Table
                                                    columns={productColumn}
                                                    dataSource={selectedProduct}
                                                    rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                                />
                                            </span>




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
                                </Col>
                                <Col sm={12} xs={12} style={{ paddingLeft: "3em" }}>
                                    <Card
                                        headless

                                    >
                                        <h3
                                            style={{
                                                borderBottom: "1px solid #f2f1f1",
                                                paddingBottom: "0.3em",
                                                marginBottom: "0.9em",
                                            }}
                                        >Preview</h3>
                                        {selectedCustomer?.id && <>
                                            <p
                                                style={{
                                                    fontWeight: 500,
                                                }}
                                            >Customer Details :</p>

                                            <table
                                                style={{
                                                    marginLeft: "1em"
                                                }}
                                            >
                                                <tr>
                                                    <td style={{ width: '150px' }}>
                                                        <b>Email </b>
                                                    </td>
                                                    <td>: {selectedCustomer.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>First Name </b>
                                                    </td>
                                                    <td>: {selectedCustomer.first_name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Last Name:</b></td>
                                                    <td>: {selectedCustomer.last_name}</td>
                                                </tr>
                                            </table>

                                        </>}


                                        {selectedAddress?.billing?.id && <>
                                            <p
                                                style={{
                                                    fontWeight: 500,
                                                    marginTop: "2em",
                                                    // marginBottom: "3px"
                                                }}
                                            >Billing Address :</p>

                                            <table
                                                style={{
                                                    marginLeft: "1em"
                                                }}
                                            >

                                                <tr>
                                                    <td style={{ width: '150px' }}><b>Address 1</b></td>
                                                    <td>: {selectedAddress?.billing?.address1}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Address 2</b></td>
                                                    <td>: {selectedAddress?.billing?.address2} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Email</b></td>
                                                    <td>: {selectedAddress?.billing?.email} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Phone</b></td>
                                                    <td>: {selectedAddress?.billing?.phone} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Fax</b></td>
                                                    <td>: {selectedAddress?.billing?.fax} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Country</b></td>
                                                    <td>: {selectedAddress?.billing?.country} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>City</b></td>
                                                    <td>: {selectedAddress?.billing?.city} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>State</b></td>
                                                    <td>: {selectedAddress?.billing?.state} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Zip Code</b></td>
                                                    <td>: {selectedAddress?.billing?.zip_code} </td>
                                                </tr>


                                            </table>

                                        </>}

                                        {selectedAddress?.shipping?.id && <>
                                            <p
                                                style={{
                                                    fontWeight: 500,
                                                    marginTop: "2em",
                                                    // marginBottom: "3px"
                                                }}
                                            >Billing Address :</p>

                                            <table
                                                style={{
                                                    marginLeft: "1em"
                                                }}
                                            >

                                                <tr>
                                                    <td style={{ width: '150px' }}><b>Address 1</b></td>
                                                    <td>: {selectedAddress?.shipping?.address1}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Address 2</b></td>
                                                    <td>: {selectedAddress?.shipping?.address2} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Email</b></td>
                                                    <td>: {selectedAddress?.shipping?.email} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Phone</b></td>
                                                    <td>: {selectedAddress?.shipping?.phone} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Fax</b></td>
                                                    <td>: {selectedAddress?.shipping?.fax} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Country</b></td>
                                                    <td>: {selectedAddress?.shipping?.country} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>City</b></td>
                                                    <td>: {selectedAddress?.shipping?.city} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>State</b></td>
                                                    <td>: {selectedAddress?.shipping?.state} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Zip Code</b></td>
                                                    <td>: {selectedAddress?.shipping?.zip_code} </td>
                                                </tr>


                                            </table>

                                        </>}

                                    </Card>

                                </Col>
                            </Row>

                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddOrder;
