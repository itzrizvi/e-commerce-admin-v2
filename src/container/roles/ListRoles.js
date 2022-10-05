import { Col, Form, Input, Modal, PageHeader, Row } from 'antd'
import { Button } from '../../components/buttons/buttons';
import React, { lazy, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame'
import { Main } from '../styled'
import FeatherIcon from 'feather-icons-react';
const RoleListTable = lazy(() => import('../../container/pages/overview/RoleListTable'))

export default function ListRoles() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values.name);
    }
    return (
        <>
            <PageHeader>
                <Row>
                    <Col xs={24}>
                        <Button size="32" type="primary" style={{ float: 'right' }} onClick={() => setIsOpenModal(true)}>
                            <FeatherIcon icon="user-plus" />
                            Add Role
                        </Button>
                    </Col>
                </Row>
            </PageHeader>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Cards title="Role List">
                            <RoleListTable />
                        </Cards>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={16} xs={18}>
                        <Modal
                            type={'primary'}
                            title={isEditModal ? "Edit Role" : "Add Role"}
                            open={isOpenModal}
                            footer={false}
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
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Add Role
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
