import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Table, Spin, Switch, Checkbox, Select } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddBrand = () => {
    const { TextArea } = Input;
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [selectedPermission, setSelectedPermission] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [role_status, setRole_status] = useState(true)
    const [allPermission, setAllPermission] = useState({
        data: [],
        isLoading: true,
        error: ''
    })
    const maxLength = 30
    const [form] = Form.useForm();

    const handleSubmit = values => {
        setIsLoading(true)
        const data = { ...values, role_status: role_status, permissionsData: selectedPermission }

        // return;
        apolloClient.mutate({
            mutation: authMutation.CREATE_ROLE_WITH_PERMISSION,
            variables: { data },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.createRoleWithPermission
            if (!data?.status) return toast.error('Something Went wrong !!');
            toast.success(`${values.role} Role created successfully.`);
            history.push("/admin/brand/list");
        }).catch(err => {
            toast.error('Something Went wrong !!');
        }).finally(() => setIsLoading(false))
    };


    return (
        <>
            <PageHeader title="Add Brand" />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <Form
                                style={{ width: '100%' }}
                                form={form}
                                name="addRole"
                                onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }} >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Brand Name" }]}
                                    name="role" label="Name" >
                                    <Input placeholder='Enter Brand Name' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: "Please enter Brand Description" }]}
                                    name="roleDescription" label="Description"
                                >
                                    <TextArea rows={4} placeholder="Enter Brand Description" />
                                </Form.Item>

                                <Form.Item
                                    name="role_status" label="Status"
                                >
                                    <Switch checked={role_status} onChange={checked => setRole_status(checked)} />
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
                                        <Link to="/admin/brand/list">
                                            <Button
                                                style={{marginLeft: 10}}
                                                type='light'
                                                size="default">
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

export default AddBrand;
