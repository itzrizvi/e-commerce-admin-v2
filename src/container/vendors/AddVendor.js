import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin } from 'antd';
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
                                    // onFinish={handleSubmit}
                                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                    labelCol={{ span: 4 }}
                                >
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor Name" }]}
                                        name="v_n" label="Vendor Name"
                                        initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor Name' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor Email" }]}
                                        name="v_e" label="Email"
                                    // initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor Email' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor Address" }]}
                                        name="v_a" label="Address"
                                    // initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor Address' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor City" }]}
                                        name="v_c" label="City"
                                    // initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor City' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor Country" }]}
                                        name="v_c1" label="Country"
                                    // initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor Country' />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Vendor Company Name" }]}
                                        name="v_c_n" label="Company Name"
                                    // initialValue={params.name || ""}
                                    >
                                        <Input placeholder='Enter Vendor Company Name' />
                                    </Form.Item>

                                    <Form.Item
                                        rules={[{ required: true, message: "Please enter Vendor Description" }]}
                                        name="v_d" label="Description"
                                        initialValue={singleCustomerGroup.data.v_d || ""}
                                    >
                                        <TextArea rows={4} placeholder="Enter Vendor Description" />
                                    </Form.Item>


                                    <Form.Item
                                        rules={[{ required: true, max: maxLength, message: "Please enter Sort order" }]}
                                        name="customergroup_sortorder" label="Sort order"
                                        initialValue={singleCustomerGroup.data.customergroup_sortorder || ""}
                                    >
                                        <Input type='number' placeholder='Enter sort order' />
                                    </Form.Item>


                                    <Form.Item
                                        label="Vendor Status"
                                    >
                                        <Switch checked={customergroup_status} onChange={checked => setCustomergroup_status(checked)} />
                                    </Form.Item>

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
