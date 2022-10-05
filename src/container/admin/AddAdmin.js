import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'

const { Option } = Select;

const AddAdmin = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)


    const [roles, setRoles] = useState({
        roles: [],
        isLoading: true,
        error: null,
    })
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.token);

    const [form] = Form.useForm();

    useEffect(() => {
        setRoles(state => ({ ...state, isLoading: true }))

        apolloClient.query({
            query: authQuery.GET_ALL_ROLES_QUERY,
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {
            const roles = res?.data?.getAllRoles?.data
            if (roles) {
                setRoles(state => ({ ...state, roles }))
            }

        }).catch(err => {
            console.log("🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err", err);
        }).finally(() => {
            setRoles(state => ({ ...state, isLoading: false }))
        })

    }, [])



    const handleSubmit = values => {
        setIsLoading(true);

        apolloClient.mutate({
            mutation: authMutation.ADMIN_SIGN_UP,
            variables: { data: { ...values, roleNo: values.roleNo + '' } },
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {
            console.log("add product res", res)
            if (res.data.adminSignUp.status) return toast.success(params.email ? 'Admin Updated' : 'New Admin Added.');
            toast.error('Soemthing Went wrong !!');
        }).catch(err => {
            console.log("add product err", err)
            toast.error('Soemthing Went wrong !!');
        }).finally(() => setIsLoading(false))
    };


    return (
        <>
            <PageHeader
                title={params.email ? "Update Admin" : "Add Admin"}
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <Button size="small" type="white" key="3">
                            <FeatherIcon icon="share-2" size={14} />
                            Share
                        </Button> */}
                        <Link to="/admin/admin/admins">
                            <Button size="small" type="primary">
                                <FeatherIcon icon="users" size={14} />
                                List Admin
                            </Button>
                        </Link>
                    </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards title="About Admin" >
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
                                    rules={[{ required: true, message: "Please enter First Name" }]}
                                    name="first_name" label="First Name"
                                    initialValue={params.first_name}
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
                                <Form.Item
                                    rules={[{
                                        required: true, message: "Please enter an email",
                                        // type: 'email'
                                    }]}
                                    name="email" label="Email"
                                    initialValue={params.email}
                                >
                                    <Input type='email' placeholder='Enter Email Address' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{
                                        required: true,
                                        message: "Please enter a password",
                                    }]}
                                    name="password" label="Password">
                                    <Input.Password type="password" placeholder='Enter Password...' />
                                </Form.Item>

                                <Form.Item
                                    rules={[{ required: true, message: "Please select a role" }]}
                                    name="roleNo" initialValue="" label="Role"
                                    tooltip={roles.isLoading ? 'Loading roles....' : null}
                                >
                                    <Select
                                        placeholder="Select Company"
                                        loading={roles.isLoading}
                                        disabled={roles.isLoading}
                                        style={{ width: '100%' }}
                                        size={"large"}
                                    >
                                        {roles.roles.map(item => (
                                            <Option key={item.role_uuid} value={item.role_no}>{item.role}</Option>
                                        ))}
                                    </Select>
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
                                            className="btn-cancel"
                                            size="large"
                                            onClick={() => {
                                                return form.resetFields();
                                            }}
                                        >
                                            CLear
                                        </Button>
                                        <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                            {isLoading ? 'Processing' : params.email ? 'Update Admin' : 'Add Admin'}
                                        </Button>
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

export default AddAdmin;
