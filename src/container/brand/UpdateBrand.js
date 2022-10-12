import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Table, Checkbox, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const UpdateBrand = () => {
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(state => state.auth.token);

    const [brand, setBrand] = useState({ data: {}, loading: true, error: '' })
    const maxLength = 30
    const [form] = Form.useForm();

    useEffect(() => {
        if (!params.id) return;

        apolloClient.query({
            query: authQuery.GET_SINGLE_ROLE,
            variables: {
                query: {
                    role_uuid: params.id
                }
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleRole
            if (!data.status) return;
            setBrand({ data: data?.data, loading: false, error: '' })
        }).catch(err => {
            console.log("got error loading single", err);
            setBrand({ data: {}, loading: false, error: 'Something went worng' })
        })

    }, [])

    const handleSubmit = values => {
        setIsLoading(true)
        const variables = { data: { ...values, role_status, role_uuid: singleRole.data.role_uuid } }

        apolloClient.mutate({
            mutation: authMutation.UPDATE_ROLE,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.updateRole
            if (!data?.status) return toast.error('Something Went wrong !!')
            toast.success(`${brand.data.role} updated successfully.`)
            history.push("/admin/brand/list");

        }).catch(err => {
            console.log("🚀 ~ file: UpdateRole.js ~ line 193 ~ handleSubmit ~ err", err);
        }).finally(() => {
            setIsLoading(false)
        })


    }


    return (
        <>
            <PageHeader title={`Manage Brand - ${brand.data?.role}`} />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {brand.loading || !brand.data?.role ? 
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Form
                                        style={{ width: '100%' }}
                                        form={form}
                                        name="addRole"
                                        onFinish={handleSubmit}
                                        onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                        labelCol={{ span: 4 }}
                                    >
                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                            name="role" label="Name"
                                            initialValue={role.data.role}
                                        // help={`Maximum length is ${ maxLength }`}
                                        >
                                            <Input placeholder='Enter Role Name' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Role Description" }]}
                                            name="roleDescription" label="Description"
                                            initialValue={role.data.role_description}

                                        >
                                            <TextArea rows={4} placeholder="Enter Role Description" />
                                        </Form.Item>

                                        <Form.Item
                                            name="role_status" label="Status"
                                        >
                                            <Switch
                                                // defaultChecked={singleRole.data.role_status}
                                                checked={role_status}
                                                onChange={checked => setRole_status(checked)}
                                            />
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
                                                        // className="btn-cancel"
                                                        type='white'
                                                        size="large">
                                                        Cancel
                                                    </Button>
                                                </Link>
                                            </Form.Item>
                                        </div>

                                    </Form>


                                </>}

                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default UpdateBrand;
