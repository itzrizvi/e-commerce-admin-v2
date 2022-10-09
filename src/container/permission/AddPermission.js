import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import queryString from 'query-string'

const AddPermission = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [form] = Form.useForm();
    const maxLength = 30
    const [permissionStatus, setPermissionStatus] = useState(params.status ? params.status == "true" : true)
    const [isLoading, setIsLoading] = useState(false)




    const handleSubmit = values => {
        console.log(values)
        setIsLoading(true)


        if (!params.id) {
            apolloClient.mutate({
                mutation: authMutation.CREATE_ROLES_PERMISSION,
                variables: { data: { ...values, permissionStatus } },
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                },
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_ROLES_PERMISSION,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllRolesPermission'
                ],


            }).then(res => {
                const data = res?.data?.createRolesPermission
                if (!data.status) return toast.error(data.message);
                toast.success(`${values.permissionName} added successfully`);
                history.push("/admin/permission/list");

            }).catch(err => {
                console.log("got error on addPermission", err)
                return toast.error('Soemthing Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })


        } else {
            const variables = { data: { roles_permission_uuid: params.id, roles_permission_name: values.permissionName, roles_permission_status: permissionStatus, } }
            apolloClient.mutate({
                mutation: authMutation.UPDATE_ROLES_PERMISSION,
                variables,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                },
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_ROLES_PERMISSION,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllRolesPermission'
                ],
            }).then(res => {
                const data = res?.data?.updateRolesPermission
                if (!data.status) return toast.error(data.message);
                toast.success(`${values.permissionName} updated successfully`);
                history.push("/admin/permission/list");

            }).catch(err => {
                console.log("got error on addPermission", err)
                return toast.error('Soemthing Went wrong !!')
            }).finally(() => {
                setIsLoading(false)
            })

        }
    }


    return (
        <>
            <PageHeader
                title={params.name ? `Edit Permission - ${params.name}` : "Add Permission"}
            />
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
                                labelCol={{ span: 4 }}
                            >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                    name="permissionName" label="Name"
                                    initialValue={params.name || ""}
                                >
                                    <Input placeholder='Enter Permission Name' />
                                </Form.Item>

                                <Form.Item
                                    name="permissionStatus" label="Status"
                                >
                                    <Switch checked={permissionStatus} onChange={checked => setPermissionStatus(checked)} />
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
                                        <Link to="/admin/permission/list">
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

export default AddPermission;
