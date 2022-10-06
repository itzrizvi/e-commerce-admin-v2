import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Table, Spin, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link } from 'react-router-dom';
import apolloClient, { authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const AddRole = () => {
    const token = useSelector(state => state.auth.token);
    const [selectedPermission, setSelectedPermission] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [allPermission, setAllPermission] = useState({
        data: [],
        isLoading: true,
        error: ''
    })
    const [dummyInputValue, setDummyInputValue] = useState("")
    const maxLength = 30
    const [form] = Form.useForm();



    useEffect(() => {
        apolloClient.query({
            query: authQuery.GET_ALL_FEATURE_PERMISSION,
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {
            if (!res?.data?.getAllFeaturePermission?.isAuth) return setAllPermission(s => ({ ...s, error: 'You Are not Authorized' }))
            setAllPermission(s => ({ ...s, data: res?.data?.getAllFeaturePermission?.data, error: '' }))

        }).catch(err => {
            setAllPermission(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAllPermission(s => ({ ...s, isLoading: false }))
        })

    }, [])


    const handleSubmit = values => {
        console.log("🚀 ~ file: AddRole.js ~ line 54 ~ handleSubmit ~ values", values);

        if (!selectedPermission.length) return;


        const permissionUUIDList = selectedPermission.map(u => u.feature_permission_uuid).join('@')

        console.log("🚀 ~ file: AddRole.js ~ line 61 ~ handleSubmit ~ permissionUUIDList", permissionUUIDList);




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
            if (res.data.adminSignUp.status) return toast.success(params.email ? `${params.email} Updated` : `${emailInput} Added`);
            toast.error('Soemthing Went wrong !!');
        }).catch(err => {
            console.log("add product err", err)
            toast.error('Soemthing Went wrong !!');
        }).finally(() => setIsLoading(false))
    };





    const columns = [
        {
            title: 'All Permissions',
            dataIndex: 'feature_permission_name',
            // render: (text) => <a>{text}</a>,
        },
    ];

    const data = [
        {
            feature_permission_uuid: "142e1dfb-86cd-43f6-aeef-2c372f504619",
            feature_permission_name: "Category View",
            feature_permission_slug: "category-view"
        },
        {
            feature_permission_uuid: "a2048c66-1a39-4aa2-b819-2c5dc1b55ccd",
            feature_permission_name: "Product Edit",
            feature_permission_slug: "product-edit"
        },
        {
            feature_permission_uuid: "a8876f30-b83c-4c73-a888-c05c9a240676",
            feature_permission_name: "Category Edit",
            feature_permission_slug: "category-edit"
        },
        {
            feature_permission_uuid: "abccefc0-ed67-4669-b8dc-4706a0ac830c",
            feature_permission_name: "Product View",
            feature_permission_slug: "product-view"
        }
    ]



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log("selected", selectedRows)
            setSelectedPermission(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };





    return (
        <>
            <PageHeader
                title="Add Role"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/roles/list">
                            <Button size="small" type="primary">
                                <FeatherIcon icon="users" size={14} />
                                Manage Roles
                            </Button>
                        </Link>
                    </div>,
                ]}
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
                                // help={`Maximum length is ${maxLength}`}
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
                                    // rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                    name="role_status" label="Status"
                                >
                                    <Switch defaultChecked />
                                </Form.Item>


                                <Form.Item
                                    // rules={[{ required: true, message: "Please select Permission" }]}
                                    name="row" label="Permissions"
                                >
                                    {allPermission.isLoading ?
                                        <div className="spin">
                                            <Spin />
                                        </div>
                                        :
                                        allPermission.error ?
                                            <p>{allPermission.error}</p>
                                            :
                                            <>

                                                <Table
                                                    rowSelection={{
                                                        type: "checkbox",
                                                        ...rowSelection,
                                                    }}
                                                    pagination={false}
                                                    columns={columns}
                                                    // dataSource={data}
                                                    dataSource={allPermission.data}
                                                    rowKey={'feature_permission_uuid'}
                                                />
                                                {/* <Input value={dummyInputValue} style={{ display: "none" }} /> */}
                                            </>
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

export default AddRole;
