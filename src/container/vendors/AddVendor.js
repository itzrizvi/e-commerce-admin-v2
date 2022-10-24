import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const { TextArea } = Input;


const AddVendor = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [singleCustomerGroup, setSingleCustomerGroup] = useState({ data: [], isLoading: true })
    const [customergroup_status, setCustomergroup_status] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;

    // ============+ for billing START +====================
    const initialData = {
        id: new Date().getTime(),
    }
    const [billingAddresses, setBillingAddresses] = useState([initialData])
    const handleAddAddress = () => {
        setBillingAddresses(state => [...state, { id: new Date().getTime(), }])
    }
    const handleRemoveAddress = (id, index) => {
        setBillingAddresses(state => {
            const copy = [...state]
            copy.splice(index, 1)
            return copy
        })
    }
    // ============+ for billing END +====================

    // ============+ for billing START +====================
    const initialData1 = {
        id: new Date().getTime(),
    }
    const [shippingAddresses, setShippingAddresses] = useState([initialData1])
    const handleAddAddress_s = () => {
        setShippingAddresses(state => [...state, { id: new Date().getTime(), }])
    }
    const handleRemoveAddress_s = (id, index) => {
        setShippingAddresses(state => {
            const copy = [...state]
            copy.splice(index, 1)
            return copy
        })
    }
    // ============+ for billing END +====================


    // LOAD SINGLE CUSTOMER GROUP
    useEffect(() => {
        if (!params.id) return;

        apolloClient.query({
            query: customerQuery.GET_SINGLE_CUSTOMER_GROUP,
            variables: { query: { customer_group_uuid: params.id } },
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
        console.log(values)
        return;

        const { customer_group_name, customergroup_description, customergroup_sortorder } = values
        // console.log(values)

        // ADD NEW CUSTOMER GROUP
        if (!params.id) {
            const variables = { data: { customer_group_name, customergroup_description, customergroup_sortorder: parseInt(customergroup_sortorder), customergroup_status, } }
            console.log(variables)
            apolloClient.mutate({
                mutation: customerMutation.CREATE_CUSTOMER_GROUP,
                variables,
                refetchQueries: [
                    {
                        query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllCustomerGroups'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },

                },

            }).then(res => {
                const data = res?.data?.createCustomerGroup
                if (!data.status) return toast.error(data.message);
                history.push("/admin/customers/group");
                window.location.reload()
                toast.success(`${values.customer_group_name} Group added successfully`);
            }).catch(err => {
                console.log("got error on addCustomerGroup", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }
        // UPDATE CUSTOMER GROUP
        else {
            const variables = {
                data: {
                    customer_group_uuid: params.id,
                    customer_group_name,
                    customergroup_description,
                    customergroup_sortorder: parseInt(customergroup_sortorder),
                    customergroup_status,
                }
            }
            console.log(variables)
            apolloClient.mutate({
                mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
                variables,
                refetchQueries: [
                    {
                        query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllCustomerGroups'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    },

                },

            }).then(res => {
                const data = res?.data?.updateCustomerGroup
                if (!data.status) return toast.error(data.message);
                history.push("/admin/customers/group");
                window.location.reload()
                toast.success(`${values.customer_group_name} Group Updated successfully`);
            }).catch(err => {
                console.log("got error on addCustomerGroup", err)
                return toast.error('Something Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })
        }

    }

    return (
        <>
            <PageHeader
                title={params.id ? `Manage Vendor | Edit (${params.name})` : "Add Vendor"}
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
                                    <Tabs>





                                        <Tabs.TabPane tab="General" key="general">
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Company Name" }]}
                                                name="v_c_n" label="Company Name"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Company Name' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Name" }]}
                                                name="v_n" label="Contact Person"
                                                initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Contact Person' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                                name="v_e" label="Email"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Email' />
                                            </Form.Item>


                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                                name="v_p" label="Phone"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Phone Number' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                                name="v_f" label="Fax"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Fax' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                                name="v_ein" label="EIN"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor EIN Number' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                                name="v_fax" label="Tax Id"
                                            // initialValue={params.name || ""}
                                            >
                                                <Input placeholder='Enter Vendor Tax Id' />
                                            </Form.Item>
                                            <Form.Item
                                                // rules={[{ required: true, message: "Please enter Vendor Description" }]}
                                                name="v_d" label="Description"
                                                initialValue={singleCustomerGroup.data.v_d || ""}
                                            >
                                                <TextArea rows={4} placeholder="Enter Vendor Description" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Vendor Status"
                                            >
                                                <Switch checked={customergroup_status} onChange={checked => setCustomergroup_status(checked)} />
                                            </Form.Item>

                                        </Tabs.TabPane>


                                        <Tabs.TabPane tab="Billing Address" key="billing_address">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <Button
                                                    title="Add Address"
                                                    type='primary'
                                                    size="small"
                                                    onClick={handleAddAddress}
                                                >
                                                    <FeatherIcon icon="plus" />
                                                </Button>
                                            </div>
                                            <Row >
                                                {billingAddresses.map((item, index) => (
                                                    <Col span={12} >
                                                        <Cards key={item.id} headless size="small" >
                                                            <Form.Item
                                                                label="Address"
                                                            >
                                                                <Input placeholder='Enter Billing Address' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Country"
                                                            >
                                                                <Input placeholder='Enter Vendor Country' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="City"
                                                            >
                                                                <Input placeholder='Enter Vendor City' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Zip Code"
                                                            >
                                                                <Input placeholder='Enter Vendor Zip Code' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="PO Code"
                                                            >
                                                                <Input placeholder='Enter Vendor PO Code' />
                                                            </Form.Item>

                                                            {billingAddresses.length !== 1 && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                                <Button size="small" title="Remove" type="danger" onClick={() => handleRemoveAddress(item.id, index)} ><FeatherIcon icon="minus" /></Button>
                                                            </div>}
                                                        </Cards>
                                                    </Col>
                                                ))}
                                            </Row>


                                        </Tabs.TabPane>



                                        <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <Button
                                                    title="Add Address"
                                                    type='primary'
                                                    size="small"
                                                    onClick={handleAddAddress_s}
                                                >
                                                    <FeatherIcon icon="plus" />
                                                </Button>
                                            </div>
                                            <Row >
                                                {shippingAddresses.map((item, index) => (
                                                    <Col span={12} >
                                                        <Cards key={item.id} headless size="small" >
                                                            <Form.Item
                                                                label="Address"
                                                            >
                                                                <Input placeholder='Enter Shipping Address' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Country"
                                                            >
                                                                <Input placeholder='Enter Vendor Country' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="City"
                                                            >
                                                                <Input placeholder='Enter Vendor City' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Zip Code"
                                                            >
                                                                <Input placeholder='Enter Vendor Zip Code' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="PO Code"
                                                            >
                                                                <Input placeholder='Enter Vendor PO Code' />
                                                            </Form.Item>

                                                            {billingAddresses.length !== 1 && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                                <Button size="small" title="Remove" type="danger" onClick={() => handleRemoveAddress_s(item.id, index)} ><FeatherIcon icon="minus" /></Button>
                                                            </div>}
                                                        </Cards>
                                                    </Col>
                                                ))}
                                            </Row>


                                        </Tabs.TabPane>
















                                    </Tabs>

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
                                            <Link to="/admin/vendor/list">
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

export default AddVendor;
