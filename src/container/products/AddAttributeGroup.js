import React, { useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'

const AddAttributeGroup = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const maxLength = 30;

    return (
        <>
            <PageHeader
                title={params.id ? `Manage Group | Edit - (${params.name})` : "Add Attribute Group"}
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
                                    name="gn" label="Group Name"
                                    initialValue={params.name || ""}
                                >
                                    <Input placeholder='Enter Attribute Group Name' />
                                </Form.Item>

                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                    name="gs" label="Group Name"
                                // initialValue={params.name || ""}
                                >
                                    <Input type='number' placeholder='Enter Permission Name' />
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
                                        <Link to="/admin/attributes/list-group">
                                            <Button
                                                type='white'
                                                size="large"
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

export default AddAttributeGroup;
