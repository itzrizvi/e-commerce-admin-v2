import React, { useState } from 'react';
import { Row, Col, Tabs, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import RichTextEditor from 'react-rte';
const { TextArea } = Input;
import style from "./products.module.css"
import AttributeTab from './addProducts/AttributeTab';



const AddProduct = () => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const onChangeRte = value => {
        console.log(value.toString('html'))

        setDescription(value);
    }


    return (
        <>
            <PageHeader
                title="Add Product"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="default" type="primary">
                            <FeatherIcon icon="save" />
                            Add Product
                        </Button>
                    </div>
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
                                // onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }}
                            >
                                <Tabs>


                                    <Tabs.TabPane tab="General" key="general">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            name="N"
                                            label="Name"
                                        >
                                            <Input placeholder='Enter Product Name' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter n" }]}
                                            name="n1" label="Short Description"
                                        >
                                            <TextArea rows={3} placeholder="Enter Short Description" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Long Description"
                                        >
                                            <RichTextEditor
                                                value={description}
                                                onChange={onChangeRte}
                                                placeholder='Long Description'
                                                className={style.rte}
                                                editorClassName={style.rteEditor}
                                                toolbarClassName={style.rteToolbar}
                                            />

                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Title" }]}
                                            name="n2" label="Meta Title"
                                        >
                                            <Input placeholder='Enter Meta Title' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Description" }]}
                                            name="n3" label="Meta Description"
                                        >
                                            <Input placeholder='Enter Meta Description' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Keywords" }]}
                                            name="n4" label="Meta Keywords"
                                        >
                                            <Input placeholder='Enter Meta Keywords' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Tags" }]}
                                            name="n5" label="Tags"
                                        >
                                            <Input placeholder='Enter Tags' />
                                        </Form.Item>


                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Data" key="Data">
                                        {/* <Form.Item
                                            rules={[{ required: true, message: "Please enter " }]}
                                            name="N"
                                            label=""
                                        >
                                            <Input placeholder='Enter ' />
                                        </Form.Item> */}

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Attribute" key="Attribute">
                                        <AttributeTab />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Price" key="Price">
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Stock" key="Stock">
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Images" key="Images">
                                    </Tabs.TabPane>
                                </Tabs>
                            </Form>


                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddProduct;
