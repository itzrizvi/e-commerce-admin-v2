import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch, Checkbox, Typography, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
const { Paragraph, Text } = Typography;

const AddUser = () => {
    viewPermission('customer');
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const maxLength = 30;
    const [userStatus, setUserStatus] = useState(true);
    const [selectedRoles, setSelectedRoles] = useState([])
    const [sendEmail, setSendEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const [existingRoles, setExistingRoles] = useState({ data: [], isLoading: true })
    const [form] = Form.useForm();

    useEffect(() => {
        if (!params.uid) return

        apolloClient.query({
            query: authQuery.GET_SINGLE_ADMIN,
            variables: { query: { uid: params.uid } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleAdmin
            if (data.status) {
                // const roles = data?.data?.roles;
                // const rolesArray = roles.map(item => item.role_uuid)
                // setExistingRoles({ data: rolesArray, isLoading: false })
                // setSelectedRoles(rolesArray)
            }
        }).catch(err => {
            console.log("🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err", err);
        }).finally(() => {
            setRoles(state => ({ ...state, isLoading: false }))
        })


    }, [])



    const handleSubmit = values => {
        if (!selectedRoles.length) return toast.warn("Select At List 1 Role..")

        setIsLoading(true);
        if (!params.uid) { // ADD NEW ADMIN
            const variables = { data: { ...values, roleUUID: selectedRoles.map(item => ({ role_uuid: item })), userStatus, sendEmail } }
            apolloClient.mutate({
                mutation: authMutation.ADMIN_SIGN_UP,
                variables,
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_STAFF,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    ['getAllStaff']
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const data = res.data.adminSignUp
                if (!data.status) return toast.error(message);
                toast.success(`${values.email} added successfully.`)
                history.push("/admin/admin/admins");

            }).catch(err => {
                console.log("add product err", err)
                toast.error('Soemthing Went wrong !!');
            }).finally(() => setIsLoading(false))

        } else { // UPDATE ADMIN
            const { first_name, last_name } = values
            const variables = {
                data: {
                    uid: params.uid,
                    first_name,
                    last_name,
                    roleUUID: selectedRoles.map(item => ({ role_uuid: item })),
                    user_status: userStatus,
                    sendEmail,
                }
            }

            // console.log(variables)
            // return
            apolloClient.mutate({
                mutation: authMutation.ADMIN_UPDATE,
                variables,
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_STAFF,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    ['getAllStaff']
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token
                    }
                }
            }).then(res => {
                const status = res?.data?.adminUpdate?.status
                if (!status) return toast.error(data.message)
                history.push("/admin/admin/admins");
                window.location.reload()
                toast.success(`${params.email} user Status updated successfully.`)
            }).catch(err => {
                console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
                toast.error(`Something went wrong!!`)
            }).finally(() => setIsLoading(false))
        }
    };


    return (
        <>
            <PageHeader
                title={params.uid ? `Manage User | Edit user (${params.email})` : "Add Customer"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <Form
                                style={{ width: '100%' }}
                                form={form}
                                name="addProduct"
                                onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }}
                            // wrapperCol={{ span: 14 }}
                            // layout={'vertical'}
                            >
                                <Tabs>


                                    <Tabs.TabPane tab="Information" key="general">


                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
                                            name="first_name"
                                            label="First Name"
                                        >
                                            <Input placeholder='Enter First Name' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Last Name" }]}
                                            name="last_name"
                                            label="Last Name"
                                        >
                                            <Input placeholder='Enter Last Name' />
                                        </Form.Item>
                                        {!params.uid &&
                                            <>
                                                <Form.Item
                                                    rules={[{
                                                        required: true, message: "Please enter an email",
                                                        max: maxLength,
                                                        // type: 'email'
                                                    }]}
                                                    name="email" label="Email"
                                                >
                                                    <Input type='email' placeholder='Enter Email Address' />
                                                </Form.Item>
                                                <Form.Item
                                                    rules={[{ required: true, message: "Please enter Phone Number" }]}
                                                    name="p" label="Phone Number"
                                                >
                                                    <Input placeholder='Enter Last Name' />
                                                </Form.Item>

                                            </>}

                                        <Form.Item
                                            name="userStatus"
                                            label="User Status"
                                        >
                                            <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                                        </Form.Item>

                                        {/* <Form.Item
                                            label="Send Email"
                                        >
                                            <Checkbox
                                                value={sendEmail}
                                                onChange={e => setSendEmail(e.target.checked)}
                                            ></Checkbox>
                                        </Form.Item> */}

                                    </Tabs.TabPane>


                                    <Tabs.TabPane tab="Shipping Address" key="sAddress">
                                        <ShippingAddress />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Billing Address" key="bAddress">
                                        <BillingAdderess />
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

                                        <Button
                                            loading={isLoading}
                                            size="default" htmlType="submit" type="primary" raised>
                                            {isLoading ? 'Processing' : 'Save'}
                                        </Button>
                                        <Link to="/admin/customers/list">
                                            <Button
                                                // className="btn-cancel"
                                                type='white'
                                                size="large"
                                            // onClick={() => {
                                            //     return form.resetFields();
                                            // }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                    </Form.Item>
                                </div>

                            </Form>

                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddUser;
