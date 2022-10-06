import { Col, Form, Input, Modal, PageHeader, Row, Select } from 'antd'
import { Button } from '../../components/buttons/buttons';
import React, { lazy, useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame'
import { Main } from '../styled'
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { roleDataAdd, rolesDataRead } from '../../redux/roles/actionCreator';
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
            <PageHeader>
                <Row>
                    <Col xs={24}>
                        <Button size="32" type="primary" style={{ float: 'right' }} onClick={() => setIsOpenModal(true)}>
                            <FeatherIcon icon="user-plus" />
                            Add Group
                        </Button>
                    </Col>
                </Row>
            </PageHeader>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Cards title="User Group">
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
