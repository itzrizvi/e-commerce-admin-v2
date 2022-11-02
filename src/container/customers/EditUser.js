import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Table, Switch, Checkbox, Typography, Tabs, Button, Rate } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import Cookies from 'js-cookie';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
const { Paragraph, Text } = Typography;

const { Option } = Select;

const EditUser = () => {
    viewPermission('customer');
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [emailInput, setEmailInput] = useState(params.email || '')
    const maxLength = 30;
    const [userStatus, setUserStatus] = useState(true);
    const [selectedRoles, setSelectedRoles] = useState([])
    const [sendEmail, setSendEmail] = useState(true);


    const [roles, setRoles] = useState({
        roles: [],
        isLoading: true,
        error: null,
    })
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
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleAdmin
            if (data.status) {
                const roles = data?.data?.roles;
                const rolesArray = roles.map(item => item.role_uuid)
                setExistingRoles({ data: rolesArray, isLoading: false })
                setSelectedRoles(rolesArray)
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
                    'getAllStaff'
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
                    'getAllStaff'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
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

    const address_columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ellipsis: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 250,
            ellipsis: true
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Zip Code',
            dataIndex: 'zip',
            key: 'zip',
            width: 120,
            ellipsis: true,
        }
    ]

    const order_columns = [
        {
            title: 'Order ID',
            dataIndex: 'uuid',
            key: 'uuid',
            width: 100,
            ellipsis: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 250,
            ellipsis: true
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Payable Amount',
            dataIndex: 'pay',
            key: 'pay',
            width: 120,
            ellipsis: true,
        }
    ]

    const rating_columns = [
        {
            title: 'Product ID',
            dataIndex: 'product_uuid',
            key: 'product_uuid',
            width: 120,
            ellipsis: true
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            ellipsis: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 250,
            ellipsis: true
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 150,
            render: (text, record) => (
                <Rate allowHalf defaultValue={2.5} />
            ),
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (text, record) => (
                <span className={"status-text"}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
            ),
            ellipsis: true,
        }
    ]

    const message_columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            width: 200,
            ellipsis: true
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            width: 250,
            ellipsis: true
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            ellipsis: true,
        }
    ]

    const rating_data = [
        {
            "product_uuid": "fjagfa-6534fwffljfdgafshdg-sjfhs",
            "title": "This is title",
            "description": "this is Description",
            "rating": 4.5,
            "createdAt": "2022-09-09 17:59:46.735+06"
        }
    ]


    return (
        <>
            <PageHeader
                title={params.uid ? `Manage User | Edit user (${params.email})` : "Add Admin"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <Tabs>
                                <Tabs.TabPane tab="Information" key="information">
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
                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
                                            name="first_name" label="First Name"
                                            initialValue={params.first_name}
                                        // help={`Maximum length is ${maxLength}`}
                                        >
                                            <Input placeholder='Enter First Name' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Last Name" }]}
                                            name="last_name" label="Last Name"
                                            initialValue={params.last_name}

                                        >
                                            <Input placeholder='Enter Last Name' />
                                        </Form.Item>
                                        {!params.uid && <Form.Item
                                            rules={[{
                                                required: true, message: "Please enter an email",
                                                max: maxLength,
                                                // type: 'email'
                                            }]}
                                            name="email" label="Email"
                                            initialValue={params.email}
                                        // help={`Maximum length is ${maxLength}`}
                                        >
                                            <Input type='email' placeholder='Enter Email Address' onChange={e => setEmailInput(e.target.value)} />
                                        </Form.Item>}
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter a password",

                                                },
                                                // {
                                                //     // pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                                //     pattern: /^[2-9]{2}\d{8}$/,
                                                //     message: `Password Pattern`
                                                // }
                                            ]}
                                            name="password" label="Password">
                                            <Input.Password type="password" placeholder='Enter Password...' />
                                        </Form.Item>

                                        <Form.Item
                                            name="userStatus"
                                            label="User Status"
                                        >
                                            <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Send Email"
                                        >
                                            <Checkbox
                                                value={sendEmail}
                                                onChange={e => setSendEmail(e.target.checked)}
                                            ></Checkbox>
                                        </Form.Item>
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
                                                <Link to="/admin/admin/admins">
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
                                </Tabs.TabPane >
                                <Tabs.TabPane tab="Shipping Address" key="shipping_address">
                                    <ShippingAddress />
                                    {/* <Table
                                        className="table-responsive"
                                        columns={address_columns}
                                        rowKey={'uid'}
                                        size="small"
                                        dataSource={[]}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    /> */}
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Billing Address" key="billing_address">
                                    <BillingAdderess />

                                    {/* <Table
                                        className="table-responsive"
                                        columns={address_columns}
                                        rowKey={'uid'}
                                        size="small"
                                        dataSource={[]}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    /> */}
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Order" key="order">
                                    <Table
                                        className="table-responsive"
                                        columns={order_columns}
                                        rowKey={'uid'}
                                        size="small"
                                        dataSource={[]}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Rating" key="rating">
                                    <Table
                                        className="table-responsive"
                                        columns={rating_columns}
                                        rowKey={'date'}
                                        size="small"
                                        dataSource={rating_data}
                                        rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        pagination={false}
                                    />
                                </Tabs.TabPane>
                            </Tabs>
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default EditUser;
