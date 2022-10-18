import React, { useState } from 'react';
import { Row, Col, Tabs, Form, Input, Switch, Select, DatePicker } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import RichTextEditor from 'react-rte';
const { TextArea } = Input;
import style from "./products.module.css"
import AttributeTab from './addProducts/AttributeTab';
import DiscountTab from './addProducts/DiscountTab';



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
                                            <Input placeholder='Enter comma separated Tags' />
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

                                    <Tabs.TabPane tab="Stock" key="Stock">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Quantity" }]}
                                            name="q"
                                            label="Quantity"
                                        >
                                            <Input placeholder='Enter Quantity' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Minimum Quantity" }]}
                                            name="mq"
                                            label="Minimum Quantity"
                                        >
                                            <Input placeholder='Enter Minimum Quantity' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Subtract Stock"
                                        >
                                            <Switch defaultChecked={true} />

                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Out Of Stock Status" }]}
                                            // name="q"
                                            label="Out Of Stock Status"

                                        >
                                            <Select defaultValue={2}>
                                                <Select.Option key={1} value={1}>2-3 Days</Select.Option>
                                                <Select.Option key={2} value={2}>In Stock</Select.Option>
                                                <Select.Option key={3} value={3}>Out Of Stock</Select.Option>
                                                <Select.Option key={4} value={4}>Pre-Order</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Date Available" }]}
                                            // name="q"
                                            label="Date Available"
                                        >
                                            <DatePicker size='middle' style={{ height: '2.6em' }} />
                                        </Form.Item>
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Attribute" key="Attribute">
                                        <AttributeTab />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Price" key="Price">
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Discount" key="Discount">
                                        <DiscountTab />
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
