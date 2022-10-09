import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message, Checkbox, DatePicker } from 'antd';
import { toast, ToastContainer } from 'react-toastify'


import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { AddProductForm } from './Style';
import Heading from '../../components/heading/heading';
import apolloClient, { authMutation, authQuery, productMutation } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { gql } from '@apollo/client';

// import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
const { Dragger } = Upload;

const AddAdmin = () => {
    const [availableFrom, setAvailableFrom] = useState('');
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
            console.log("🚀 ~ file: AddAdmin.js ~ line 44 ~ useEffect ~ res", res);
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
        console.log('-------', values);

        // return;

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
            if (res.data.adminSignUp.status) return toast.success('New Admin Added.');

            toast.error('Soemthing Went wrong !!');

        }).catch(err => {
            console.log("add product err", err)
            toast.error('Soemthing Went wrong !!');

        }).finally(() => setIsLoading(false))

        // setState({ ...state, submitValues: values });
    };



    return (
        <>
            <PageHeader
                ghost
                title="Add Admin"
            // buttons={[
            //   <div key="1" className="page-header-actions">
            //     <CalendarButtonPageHeader key="1" />
            //     <ExportButtonPageHeader key="2" />
            //     <ShareButtonPageHeader key="3" />
            //     <Button size="small" key="4" type="primary">
            //       <FeatherIcon icon="plus" size={14} />
            //       Add New
            //     </Button>
            //   </div>,
            // ]}
            />
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Cards headless>
                            <Row gutter={25} justify="center">
                                <Col xxl={12} md={14} sm={18} xs={24}>
                                    <AddProductForm>
                                        <Form
                                            style={{ width: '100%' }}
                                            form={form}
                                            name="addProduct"
                                            onFinish={handleSubmit}
                                            onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                            layout={'vertical'}
                                        >
                                            <BasicFormWrapper>
                                                <div className="add-product-block">
                                                    <Row gutter={15}>
                                                        <Col xs={24}>
                                                            <div className="add-product-content">
                                                                <Cards title="About Admin">
                                                                    <Form.Item
                                                                        rules={[{ required: true, message: "Please enter First Name" }]}
                                                                        name="first_name" label="First Name">
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        rules={[{ required: true, message: "Please enter Last Name" }]}
                                                                        name="last_name" label="Last Name">
                                                                        <Input />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        rules={[{
                                                                            required: true, message: "Please enter an email",
                                                                            // type: 'email'
                                                                        }]}
                                                                        name="email" label="Email">
                                                                        <Input type='email' />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        rules={[{
                                                                            required: true,
                                                                            message: "Please enter a password",
                                                                        }]}
                                                                        name="password" label="Password">
                                                                        <Input.Password type="password" />
                                                                    </Form.Item>

                                                                    <Form.Item
                                                                        rules={[{ required: true, message: "Please select a role" }]}
                                                                        // placeholder={'loading'}
                                                                        name="roleNo" initialValue="" label="Role">
                                                                        <Select
                                                                            // placeholder={roles.isLoading ? "Loading..." : "Select Role"}
                                                                            loading={roles.isLoading}
                                                                            disabled={roles.isLoading}
                                                                            style={{ width: '100%' }}
                                                                        >
                                                                            {roles.roles.map(item => (
                                                                                <Option key={item.role_uuid} value={item.role_no}>{item.role}</Option>
                                                                            ))}
                                                                        </Select>
                                                                    </Form.Item>

                                                                </Cards>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>


                                                <div className="add-form-action">
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
                                                        <Button loading={isLoading} size="large" htmlType="submit" type="primary" raised>
                                                            {isLoading ? 'Processing' : 'Add Admin'}
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            </BasicFormWrapper>
                                        </Form>
                                    </AddProductForm>
                                </Col>
                            </Row>
                        </Cards>
                    </Col>
                </Row>
            </Main>


            {/* <ToastContainer
                position="bottom-right"
                autoClose={5000}
                // hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                // pauseOnFocusLoss
                // draggable
                pauseOnHover
            /> */}


        </>
    );
};

export default AddAdmin;
