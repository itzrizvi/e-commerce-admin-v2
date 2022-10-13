import React, { useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';

const AddCategory = () => {
    const [form] = Form.useForm();
    const [categoryStatus, setCategoryStatus] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const maxLength = 30;


    const handleSubmit = values => {

    }



    return (
        <>
            <PageHeader
                title="Add Category"
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
                                // initialValue={params.name || ""}
                                >
                                    <Input placeholder='Enter Permission Name' />
                                </Form.Item>

                                <Form.Item
                                    name="permissionStatus" label="Is Featured"
                                >
                                    <Checkbox checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                                </Form.Item>
                                <Form.Item
                                    name="catStatus" label="Status"
                                >
                                    <Switch
                                        checked={categoryStatus}
                                        onChange={checked => setCategoryStatus(checked)}
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
                                        <Link to="/admin/categories/list">
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

export default AddCategory;
