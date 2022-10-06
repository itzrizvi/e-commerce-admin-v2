import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import React, { lazy, useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame'
import { Main } from '../styled'
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { roleDataAdd, rolesDataRead } from '../../redux/roles/actionCreator';
import { Link } from 'react-router-dom';
const RoleListTable = lazy(() => import('../../container/pages/overview/RoleListTable'))

export default function ListRoles() {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        dispatch(roleDataAdd({ role: values.name, status: values.status }))
        setIsOpenModal(false);
    }

    return (
        <>
            <PageHeader
                title="Manage Role"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/admin/add-admin">
                            <Button title="Add Role" size="small" type="primary" onClick={() => setIsOpenModal(true)}>
                                <FeatherIcon icon="plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />

            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Cards headless>
                            <RoleListTable />
                        </Cards>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={16} xs={18}>
                        <Modal
                            type={'primary'}
                            title={isEditModal ? "Edit Group" : "Add Group"}
                            open={isOpenModal}
                            closable={true}
                            footer={false}
                            onCancel={() => setIsOpenModal(false)}
                        >
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Role Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your role name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Role Name' />
                                </Form.Item>
                                <Form.Item label="Status" name="status" rules={[
                                    {
                                        required: true,
                                        message: 'Please select your role status!',
                                    },
                                ]}>
                                    <Select>
                                        <Select.Option value="true">Approve</Select.Option>
                                        <Select.Option value="false">Pending</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Add Group
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
            </Main>
        </>
    )
}
