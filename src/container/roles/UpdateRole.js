import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Table, Checkbox, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
const { TextArea } = Input;

const UpdateRole = () => {
    viewPermission('role');
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [id, setId] = useState(params.id)
    const [role, setRole] = useState(params.role)
    const [permissionList, setPermissionList] = useState([])
    const [role_status, setRole_status] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [singleRole, setSingleRole] = useState({ data: {}, loading: true, error: '' })
    const maxLength = 30
    const [form] = Form.useForm();

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
                onChange={e => {
                    const { id, read_access, edit_access } = item
                    const variables = {
                        data: {
                            permissionsData: {
                                role_id: parseInt(singleRole?.data?.id),
                                permission_id: parseInt(id),
                                read_access: e.target.checked,
                                edit_access
                            }
                        }
                    }
                    setIsLoading(true)
                    apolloClient.mutate({
                        mutation: authMutation.UPDATE_ROLE_PERMISSIONS_ONCHANGE,
                        variables,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    }).then(res => {
                        const data = res?.data?.updateRolePermissions
                        if (!data.status) return toast.error('Something Went wrong !!')
                        toast.success(`Permission Updated Successfully`)
                        // update state
                        setPermissionList(state => {
                            const copyState = [...state]
                            copyState[index] = { ...copyState[index], read_access: e.target.checked }
                            return copyState;
                        })

                    }).catch(err => {
                        toast.error('Something Went wrong !!')
                    }).finally(() => {
                        setIsLoading(false)
                    })
                }}
            />,
        },
        {
            title: 'Modify',
            dataIndex: 'edit_access',
            render: (value, item, index) => <Checkbox
                defaultChecked={value}
                onChange={e => {
                    const { id, read_access, edit_access } = item
                    const variables = {
                        data: {
                            permissionsData: {
                                role_id: parseInt(singleRole?.data?.id),
                                permission_id: parseInt(id),
                                read_access,
                                edit_access: e.target.checked
                            }
                        }
                    }
                    setIsLoading(true)
                    apolloClient.mutate({
                        mutation: authMutation.UPDATE_ROLE_PERMISSIONS_ONCHANGE,
                        variables,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    }).then(res => {
                        const data = res?.data?.updateRolePermissions
                        if (!data.status) return toast.error('Something Went wrong !!')
                        toast.success(`Permission Updated Successfully`)
                        // update state
                        setPermissionList(state => {
                            const copyState = [...state]
                            copyState[index] = { ...copyState[index], edit_access: e.target.checked }
                            return copyState;
                        })


                    }).catch(err => {
                        toast.error('Something Went wrong !!')
                    }).finally(() => {
                        setIsLoading(false)
                    })
                }}
            />,
        },
    ];

    const [allPermissions, setAllPermissions] = useState({ data: [], loading: true, error: '' })

    // Load single role & get all permission
    useEffect(() => {
        if (!id) return;

        // Load single role 
        apolloClient.query({
            query: authQuery.GET_SINGLE_ROLE,
            variables: {
                query: {
                    id: parseInt(id)
                }
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleRole
            if (!data.status) return;
            setSingleRole({ data: data?.data, loading: false, error: '' })
            setRole_status(data?.data?.role_status)
        }).catch(err => {
            console.log("got error loading single", err);
            setSingleRole({ data: {}, loading: false, error: 'Something went worng' })
        })


        // Load all permission
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
            if (!data?.isAuth) return setAllPermissions(s => ({ ...s, error: 'You Are not Authorized' }))
            setAllPermissions(s => ({ data: data?.data, loading: false, error: '' }))
        }).catch(err => {
            setAllPermissions(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        })

    }, [])

    // organize permission
    useEffect(() => {
        if (singleRole.loading || allPermissions.loading) return;


        const data = allPermissions.data.map(item => {
            const pid1 = item.id
            let findRes = singleRole?.data?.permissions?.find(permission => permission.rolesPermission.id == pid1)
            const copyItem = { ...item, edit_access: false, read_access: false }

            if (findRes) {
                copyItem.read_access = findRes.read_access
                copyItem.edit_access = findRes.edit_access
            }

            return copyItem
        })
        setPermissionList(data)
    }, [singleRole, allPermissions])


    const handleSubmit = values => {
        // console.log(values);
        setIsLoading(true)
        const variables = { data: { ...values, role_status, id: singleRole.data.id } }

        apolloClient.mutate({
            mutation: authMutation.UPDATE_ROLE,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.updateRole
            if (!data?.status) return toast.error('Something Went wrong !!')
            history.push("/admin/roles/list");
            window.location.reload();
            toast.success(`${singleRole.data.role} updated successfully.`)
        }).catch(err => {
            console.log("🚀 ~ file: UpdateRole.js ~ line 193 ~ handleSubmit ~ err", err);
        }).finally(() => {
            setIsLoading(false)
        })


    }


    return (
        <>
            <PageHeader
                title={`Manage Role | Edit Role (${role})`}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {singleRole.loading || allPermissions.loading ?
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
                                                // defaultChecked={singleRole.data.role_status}
                                                checked={role_status}
                                                onChange={checked => setRole_status(checked)}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="permissionsData" label="Permissions"
                                        >
                                            <Table
                                                pagination={false}
                                                columns={columns}
                                                rowKey={'id'}
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
                                                {/* <Link to="/admin/roles/list"> */}
                                                <Button
                                                    // className="btn-cancel"
                                                    type='white'
                                                    size="large"
                                                    onClick={() => {
                                                        history.push("/admin/roles/list");
                                                        window.location.reload();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                {/* </Link> */}
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

export default UpdateRole;
