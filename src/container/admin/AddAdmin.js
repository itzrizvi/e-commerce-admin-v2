import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch, Checkbox } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import Cookies from 'js-cookie';

const { Option } = Select;

const AddAdmin = () => {
    const history = useHistory();
    const { search } = useLocation();
    const params = queryString.parse(search)
    const [emailInput, setEmailInput] = useState(params.email || '')
    const maxLength = 30;
    const [userStatus, setUserStatus] = useState(true);
    const [selectedRoles, setSelectedRoles] = useState([])


    const [roles, setRoles] = useState({
        roles: [],
        isLoading: true,
        error: null,
    })
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const [existingRoles, setExistingRoles] = useState({ data: [], isLoading: true })

    const [form] = Form.useForm();

    useEffect(() => {
        setRoles(state => ({ ...state, isLoading: true }))

        apolloClient.query({
            query: authQuery.GET_ALL_ROLES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllRoles
            if (data.status) {
                setRoles(state => ({ ...state, roles: data.data }))
            }
        }).catch(err => {
            console.log("🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err", err);
        }).finally(() => {
            setRoles(state => ({ ...state, isLoading: false }))
        })

    }, [])

    useEffect(() => {
        if (!params.uid) return

        apolloClient.query({
            query: authQuery.GET_SINGLE_ADMIN,
            variables: { query: { uid: params.uid } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleAdmin
            if (data.status) {
                const roles = data?.data?.roles;
                const rolesArray = roles.map(item => item.role_uuid)
                setExistingRoles({ data: rolesArray, isLoading: false })
                setSelectedRoles(rolesArray)
            }
        }).catch(err => {
            console.log("🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err", err);
        }).finally(() => {
            setRoles(state => ({ ...state, isLoading: false }))
        })


    }, [])



    const handleSubmit = values => {
        if (!selectedRoles.length) return toast.warn("Select At List 1 Role..")

        setIsLoading(true);
        if (!params.uid) { // ADD NEW ADMIN
            const variables = { data: { ...values, roleUUID: selectedRoles.map(item => ({ role_uuid: item })), userStatus } }
            apolloClient.mutate({
                mutation: authMutation.ADMIN_SIGN_UP,
                variables,
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_STAFF,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllStaff'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const data = res.data.adminSignUp
                if (!data.status) return toast.error(message);
                toast.success(`${values.email} added successfully.`)
                history.push("/admin/admin/admins");

            }).catch(err => {
                console.log("add product err", err)
                toast.error('Soemthing Went wrong !!');
            }).finally(() => setIsLoading(false))

        } else { // UPDATE ADMIN
            const { first_name, last_name } = values
            const variables = {
                data: {
                    uid: params.uid,
                    first_name,
                    last_name,
                    roleUUID: selectedRoles.map(item => ({ role_uuid: item })),
                    user_status: userStatus
                }
            }

            // console.log(variables)
            // return
            apolloClient.mutate({
                mutation: authMutation.ADMIN_UPDATE,
                variables,
                refetchQueries: [
                    {
                        query: authQuery.GET_ALL_STAFF,
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: Cookies.get('psp_t')
                            }
                        }
                    },
                    'getAllStaff'
                ],
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const status = res?.data?.adminUpdate?.status
                if (!status) return toast.error(data.message)
                history.push("/admin/admin/admins");
                window.location.reload()
                toast.success(`${params.email} user Status updated successfully.`)
            }).catch(err => {
                console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
                toast.error(`Something went wrong!!`)
            }).finally(() => setIsLoading(false))
        }
    };


    return (
        <>
            <PageHeader
                title={params.uid ? `Manage User | Edit user (${params.email})` : "Add Admin"}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
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
                                    rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
                                    name="first_name" label="First Name"
                                    initialValue={params.first_name}
                                // help={`Maximum length is ${maxLength}`}
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
                                {!params.uid && <Form.Item
                                    rules={[{
                                        required: true, message: "Please enter an email",
                                        max: maxLength,
                                        // type: 'email'
                                    }]}
                                    name="email" label="Email"
                                    initialValue={params.email}
                                // help={`Maximum length is ${maxLength}`}
                                >
                                    <Input type='email' placeholder='Enter Email Address' onChange={e => setEmailInput(e.target.value)} />
                                </Form.Item>}
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter a password",

                                        },
                                        // {
                                        //     // pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        //     pattern: /^[2-9]{2}\d{8}$/,
                                        //     message: `Password Pattern`
                                        // }
                                    ]}
                                    name="password" label="Password">
                                    <Input.Password type="password" placeholder='Enter Password...' />
                                </Form.Item>

                                <Form.Item
                                    name="userStatus"
                                    label="User Status"
                                >
                                    <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                                </Form.Item>


                                <Form.Item
                                    name="roleUUID" initialValue="" label="Role"
                                >
                                    {(params.uid && existingRoles.isLoading) || roles.isLoading
                                        ?
                                        <div className="spin">
                                            <Spin />
                                        </div>
                                        : <>
                                            <Checkbox.Group
                                                style={{
                                                    width: '100%',
                                                    marginTop: "1em",
                                                }}
                                                defaultValue={existingRoles.data}
                                                onChange={checkedValues => setSelectedRoles(checkedValues)}

                                            >
                                                <Row>
                                                    {roles.roles.map(item => (
                                                        <Col span={12}>
                                                            <Checkbox value={item.role_uuid}>{item.role}</Checkbox>
                                                        </Col>

                                                    ))}

                                                </Row>
                                            </Checkbox.Group>

                                        </>}


                                </Form.Item>



                                {/* OLD MULTISELECT ROLESS */}
                                {/* <Form.Item
                                    name="roleUUID" initialValue="" label="Role"
                                >
                                    {(params.uid && existingRoles.isLoading) || roles.isLoading
                                        ?
                                        <div className="spin">
                                            <Spin />
                                        </div>
                                        : <>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Please select"
                                                onChange={value => setSelectedRoles(value)}
                                                defaultValue={existingRoles.data}
                                            >
                                                {roles.roles.map(item => (
                                                    <Option key={item.role_uuid} value={item.role_uuid}>{item.role}</Option>
                                                ))}
                                            </Select>
                                        </>
                                    }
                                </Form.Item> */}


                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '3em'
                                    }}
                                >
                                    <Form.Item>

                                        <Button
                                            loading={isLoading}
                                            disabled={roles.isLoading}
                                            size="default" htmlType="submit" type="primary" raised>
                                            {isLoading ? 'Processing' : 'Save'}
                                        </Button>
                                        <Link to="/admin/admin/admins">
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

export default AddAdmin;
