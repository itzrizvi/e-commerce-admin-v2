import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Table, Spin, Switch, Checkbox, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const { TextArea } = Input;
import queryString from 'query-string'

const AddRole = () => {
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [emailInput, setEmailInput] = useState(params.email || '')


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


    const columns = [
        {
            title: '',
            dataIndex: 'roles_permission_name',
        },
        {
            title: 'Access',
            dataIndex: 'roles_permission_uuid',
            render: (value, item, index) => <Checkbox onChange={e => {
                const isChecked = e.target.checked
                setSelectedPermission(state => {
                    let copy = [...state]
                    let data = { ...copy[index], read_access: isChecked }
                    copy[index] = data
                    return copy
                })
            }} />,
        },
        {
            title: 'Modify',
            dataIndex: 'Modify',
            render: (value, item, index) => <Checkbox onChange={e => {
                const isChecked = e.target.checked
                setSelectedPermission(state => {
                    let copy = [...state]
                    let data = { ...copy[index], edit_access: isChecked }
                    copy[index] = data
                    return copy
                })
            }} />,
        },
    ];

    useEffect(() => {
        apolloClient.query({
            query: authQuery.GET_ALL_ROLES_PERMISSION,
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {

            const data = res?.data?.getAllRolesPermission

            if (!data?.isAuth) return setAllPermission(s => ({ ...s, error: 'You Are not Authorized' }))
            setAllPermission(s => ({ ...s, data: data?.data, error: '' }))
            setSelectedPermission(state => {
                const newState = data?.data.map(item => ({
                    permission_uuid: item.roles_permission_uuid,
                    read_access: false,
                    edit_access: false
                }))
                return newState;
            })

        }).catch(err => {
            setAllPermission(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAllPermission(s => ({ ...s, isLoading: false }))
        })

    }, [])


    const handleSubmit = values => {
        setIsLoading(true)
        const data = { ...values, role_status: role_status, permissionsData: selectedPermission }

        // return;
        apolloClient.mutate({
            mutation: authMutation.CREATE_ROLE_WITH_PERMISSION,
            variables: { data },
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {
            console.log("add role res", res)
            const data = res?.data?.createRoleWithPermission
            if (!data?.status) return toast.error('Something Went wrong !!');
            toast.success(`${values.role} Role created successfully.`);
            history.push("/admin/roles/list");
        }).catch(err => {
            console.log("add role err", err)
            toast.error('Something Went wrong !!');
        }).finally(() => setIsLoading(false))
    };





    return (
        <>
            <PageHeader
                title="Add Role"
            // buttons={[
            //     <div key="1" className="page-header-actions">
            //         <Link to="/admin/roles/list">
            //             <Button size="small" type="primary">
            //                 <FeatherIcon icon="users" size={14} />
            //                 Manage Roles
            //             </Button>
            //         </Link>
            //     </div>,
            // ]}
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
                            // wrapperCol={{ span: 14 }}
                            // layout={'vertical'}
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
                                    <Switch checked={role_status} onChange={checked => setRole_status(checked)} />
                                </Form.Item>


                                <Form.Item
                                    name="permissionsData" label="Permissions"
                                >
                                    {allPermission.isLoading ?
                                        <div className="spin">
                                            <Spin />
                                        </div>
                                        :
                                        allPermission.error ?
                                            <p>{allPermission.error}</p>
                                            :
                                            <Table
                                                pagination={false}
                                                columns={columns}
                                                rowKey={'roles_permission_uuid'}
                                                dataSource={allPermission.data}
                                            />
                                    }
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

export default AddRole;
