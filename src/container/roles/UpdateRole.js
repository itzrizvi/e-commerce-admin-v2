import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
const { TextArea } = Input;

const UpdateRole = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [id, setId] = useState(params.id)
    const [role, setRole] = useState(params.role)
    const [singleRole, setSingleRole] = useState({ data: {}, loading: true, error: '' })
    const [isLoading, setIsLoading] = useState(false)

    const maxLength = 30
    const [form] = Form.useForm();


    useEffect(() => {
        if (!id) return;

        apolloClient.query({
            query: authQuery.GET_SINGLE_ROLE,
            variables: {
                query: {
                    role_uuid: id
                }
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            console.log("🚀 ~ file: UpdateRole.js ~ line 45 ~ useEffect ~ res", res);
            const data = res?.data?.getSingleRole
            if (!data.status) return;
            setSingleRole({ data: data?.data, loading: false, error: '' })

        }).catch(err => {
            console.log("got error loading single", err);
            setSingleRole({ data: {}, loading: false, error: 'Something went worng' })

        })

    }, [])





    return (
        <>
            <PageHeader
                title={`Manage role - ${role}`}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <Form
                                style={{ width: '100%' }}
                                form={form}
                                name="addRole"
                                // onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }}
                            >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                    name="role" label="Name"
                                // initialValue={params.first_name}
                                // help={`Maximum length is ${ maxLength }`}
                                >
                                    <Input placeholder='Enter Role Name' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: "Please enter Role Description" }]}
                                    name="roleDescription" label="Description"
                                >
                                    <TextArea rows={4} placeholder="Enter Role Description" />
                                </Form.Item>

                                <Form.Item
                                    name="role_status" label="Status"
                                >
                                    <Switch
                                    // checked={role_status}
                                    // onChange={checked => setRole_status(checked)}
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
                                        <Link to="/admin/roles/list">
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

export default UpdateRole;
