import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Table, Checkbox } from 'antd';
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
    const [permissionList, setPermissionList] = useState([])

    const dummyRole = {
        role_uuid: "8e7a2df3-b3d0-4fb3-a101-adf9ab1df2ed",
        role_no: 1665178153868,
        role: "Additional Project Manager",
        role_slug: "additional-project-manager",
        role_status: true,
        role_description: "Updated Demo Description",
        tenant_id: "100001",
        permissions: [
            {
                permission_data_uuid: "f2def1f7-3f15-46ac-83f7-7514e9166bdd",
                rolesPermission: {
                    roles_permission_uuid: "a2048c66-1a39-4aa2-b819-2c5dc1b55ccd",
                    roles_permission_name: "Product",
                    roles_permission_slug: "product",
                    roles_permission_status: true
                },
                edit_access: true,
                read_access: true
            },
            {
                permission_data_uuid: "27896aed-da8d-43c4-be77-2785c5d638da",
                rolesPermission: {
                    roles_permission_uuid: "142e1dfb-86cd-43f6-aeef-2c372f504619",
                    roles_permission_name: "Category",
                    roles_permission_slug: "category",
                    roles_permission_status: true
                },
                edit_access: false,
                read_access: false
            }
        ]
    }

    const [singleRole, setSingleRole] = useState({ data: dummyRole, loading: false, error: '' })
    // const [singleRole, setSingleRole] = useState({ data: {}, loading: true, error: '' })

    const columns = [
        {
            title: '',
            dataIndex: 'roles_permission_name',
        },
        {
            title: 'Access',
            dataIndex: 'read_access',
            render: (value, item, index) => <Checkbox
                defaultChecked={value}
            />,
        },
        {
            title: 'Modify',
            dataIndex: 'edit_access',
            render: (value, item, index) => <Checkbox
                defaultChecked={value}
            />,
        },
    ];
    const dummyAllPermission = [
        {
            roles_permission_uuid: "a2048c66-1a39-4aa2-b819-2c5dc1b55ccd",
            roles_permission_name: "Product",
            roles_permission_slug: "product",
            roles_permission_status: true
        },
        {
            roles_permission_uuid: "142e1dfb-86cd-43f6-aeef-2c372f504619",
            roles_permission_name: "Category",
            roles_permission_slug: "category",
            roles_permission_status: true
        },
        {
            roles_permission_uuid: "cfc8a4cf-d064-46e1-a25f-cd43b622f765",
            roles_permission_name: "Brand",
            roles_permission_slug: "brand",
            roles_permission_status: true
        }
    ]
    // const [allPermissions, setAllPermissions] = useState({ data: [], loading: true, error: '' })
    const [allPermissions, setAllPermissions] = useState({ data: dummyAllPermission, loading: false, error: '' })
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

        apolloClient.query({
            query: authQuery.GET_ALL_ROLES_PERMISSION,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllRolesPermission
            console.log("🚀 ~ file: UpdateRole.js ~ line 69 ~ useEffect ~ data", data);

            if (!data?.isAuth) return setAllPermissions(s => ({ ...s, error: 'You Are not Authorized' }))
            setAllPermissions(s => ({ ...s, data: data?.data, error: '' }))
            // setSelectedPermission(state => {
            //     const newState = data?.data.map(item => ({
            //         permission_uuid: item.roles_permission_uuid,
            //         read_access: false,
            //         edit_access: false
            //     }))
            //     return newState;
            // })

        }).catch(err => {
            setAllPermissions(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAllPermissions(s => ({ ...s, isLoading: false }))
        })

    }, [])


    useEffect(() => {
        if (singleRole.loading || allPermissions.loading) return;
        console.log('2nd ue')


        const data = allPermissions.data.map(item => {
            const puuid1 = item.roles_permission_uuid
            let findRes = singleRole.data.permissions.find(permission => permission.rolesPermission.roles_permission_uuid == puuid1)
            const copyItem = { ...item, edit_access: false, read_access: false }

            if (findRes) {
                copyItem.read_access = findRes.read_access
                copyItem.edit_access = findRes.edit_access
            }

            return copyItem
        })
        setPermissionList(data)
    }, [singleRole, allPermissions])






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
                                    initialValue={singleRole.data.role}
                                // help={`Maximum length is ${ maxLength }`}
                                >
                                    <Input placeholder='Enter Role Name' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: "Please enter Role Description" }]}
                                    name="roleDescription" label="Description"
                                    initialValue={singleRole.data.role_description}

                                >
                                    <TextArea rows={4} placeholder="Enter Role Description" />
                                </Form.Item>

                                <Form.Item
                                    name="role_status" label="Status"
                                >
                                    <Switch
                                        checked={singleRole.data.role_status}
                                    // onChange={checked => setRole_status(checked)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="permissionsData" label="Permissions"
                                >
                                    <Table
                                        pagination={false}
                                        columns={columns}
                                        rowKey={'roles_permission_uuid'}
                                        dataSource={permissionList}
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
