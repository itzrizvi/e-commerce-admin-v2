import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Table, Switch, Checkbox, Typography, Tabs, Rate, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useLocation } from 'react-router-dom';
import apolloClient, { authMutation, authQuery, customerQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import Cookies from 'js-cookie';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import BillingAdderess from './BillingAdderess';
import ShippingAddress from './ShippingAddress';
import { Button } from '../../components/buttons/buttons';

const { Option } = Select;

const EditUser = () => {
    viewPermission('customer');
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const maxLength = 30;
    const [userStatus, setUserStatus] = useState(true);
    const [sendEmail, setSendEmail] = useState(true);


    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    // new
    const [singleUser, setSingleUser] = useState({ data: {}, isLoading: true })

    useEffect(() => { // load single customer 
        if (!params.id) return

        apolloClient.query({
            query: customerQuery.GET_SINGLE_CUSTOMER,
            variables: { customer_id: parseInt(params.id) },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleCustomer
            console.log(data);
            setSingleUser({ data: data.data, isLoading: false })
        }).catch(err => {
            console.log("🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err", err);
        }).finally(() => {

        })


    }, [])



    const handleSubmit = values => {

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
                title={`Manage User | Edit user ${singleUser.isLoading ? '' : `(${singleUser.data.email})`}`}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {params.id && singleUser.isLoading ?
                                <div div className="spin">
                                    <Spin />
                                </div>
                                :
                                <Form
                                    style={{ width: '100%' }}
                                    form={form}
                                    name="addProduct"
                                    onFinish={handleSubmit}
                                    onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                    labelCol={{ span: 4 }}
                                    initialValues={{
                                        first_name: singleUser?.data?.first_name,
                                        last_name: singleUser?.data?.last_name,
                                        email: singleUser?.data?.email,
                                    }}
                                >
                                    <Tabs>
                                        <Tabs.TabPane tab="Information" key="information">
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
                                                name="first_name" label="First Name"
                                            >
                                                <Input placeholder='Enter First Name' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, message: "Please enter Last Name" }]}
                                                name="last_name" label="Last Name"
                                            >
                                                <Input placeholder='Enter Last Name' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{
                                                    required: true, message: "Please enter an email",
                                                    max: maxLength,
                                                    // type: 'email'
                                                }]}
                                                name="email" label="Email"
                                                initialValue={params.email}
                                            >
                                                <Input
                                                    type='email'
                                                    disabled
                                                />
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
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '3em'
                                        }}>
                                        <Form.Item>

                                            <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                                {isLoading ? 'Processing' : 'Save'}
                                            </Button>
                                            <Link to="/admin/customer/list">
                                                <Button
                                                    // className="btn-cancel"
                                                    type='white'
                                                    size="large"
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </Form.Item>
                                    </div>

                                </Form>
                            }
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default EditUser;
