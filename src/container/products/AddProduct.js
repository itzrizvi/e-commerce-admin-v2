import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Form, Input, Switch, Select, DatePicker, Checkbox } from 'antd';
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
import ImageTab from './addProducts/ImageTab';
import Heading from '../../components/heading/heading';
import apolloClient from '../../apollo';
import { brandQuery } from '../../apollo/brand';
import Cookies from 'js-cookie';
import { productQuery } from '../../utility/apollo';
import PartsOfProductTab from './addProducts/PartsOfProductTab';
import { viewPermission } from '../../utility/utility';
const { Option } = Select;



const AddProduct = () => {
    viewPermission('product');
    const [form] = Form.useForm();
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [brand, setBrand] = useState({ data: [], loading: true, error: '' })
    const [categoriesData, setCategoriesData] = useState({ data: [], loading: true })
    const onChangeRte = value => {
        console.log(value.toString('html'))
        setDescription(value);
    }

    // for links tab--------------
    const [selectedManifacture, setSelectedManifacture] = useState({})
    const [categories, setCategories] = useState([])
    const onManufactureSelect = (val, item) => {
        if (!item?.categories?.length) return
        let arrData = []
        // Loop & organize categories
        !item?.categories?.forEach(item => {
            const parent = item.cat_name

            arrData.push({ cat_name: parent, cat_id: item.cat_id, cat_status: item.cat_status })
            if (item.subcategories) {
                item.subcategories.forEach(subCat => {
                    const sub = subCat.cat_name
                    arrData.push({ cat_name: `${parent} > ${sub}`, cat_id: subCat.cat_id, cat_status: subCat.cat_status })
                    if (subCat.subsubcategories) {
                        subCat.subsubcategories.forEach(subSubCat => {
                            const subSub = subSubCat.cat_name
                            arrData.push({ cat_name: `${parent} > ${sub} > ${subSub}`, cat_id: subSubCat.cat_id, cat_status: subSubCat.cat_status })
                        })
                    }
                })
            }
        })
        setCategories(arrData)

    }

    useEffect(() => {
        // Load Manufacture/brand
        apolloClient.query({
            query: brandQuery.GET_ALL_BRAND_WITH_CATEGORY,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllBrands
            setBrand(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setBrand(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setBrand(s => ({ ...s, loading: false }))
        })


    }, [])


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
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="model"
                                            label="Model"
                                        >
                                            <Input placeholder='Enter Product Model' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter " }]}
                                            name="SKU"
                                            label="SKU"
                                        >
                                            <Input placeholder='Enter Product SKU' />
                                        </Form.Item>
                                        {/* <Heading as="h6"> Specification:</Heading> */}
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Links" key="Links">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            // name=""
                                            label="Manufacturer"
                                        >
                                            <Select placeholder={brand.loading ? "Loading..." : "select Manufacture"}
                                                options={brand.data.map(item => ({
                                                    label: item.brand_name,
                                                    value: item.brand_name,
                                                    categories: item.categories,
                                                }))}
                                                onSelect={onManufactureSelect}
                                            />

                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            // name=""
                                            label="Categories"
                                        >
                                            <Select placeholder={brand.loading ? "Loading..." :
                                                categories.length ?
                                                    "Select Category"
                                                    :
                                                    "Select manifacture first"
                                            }
                                                options={categories.map(item => ({
                                                    label: item.cat_name,
                                                    value: item.cat_name,
                                                }))}
                                            // mode="multiple"
                                            />
                                            {/* {categoriesData.data.map(item => (
                                                    <Option key={item.cat_id} value={item.cat_id} >{item.cat_name}</Option>
                                                ))}
                                            </Select> */}
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            // name=""
                                            label="Related Product"
                                        >
                                            <Select
                                                // placeholder={brand.loading ? "Loading..." : "select Manufacture"}
                                                placeholder={"select Related Products"}
                                            >
                                                {/* {brand.data.map(item => (
                                                    <Option key={item.brand_uuid} value={item.brand_uuid} >{item.brand_name}</Option>
                                                ))} */}
                                            </Select>
                                        </Form.Item>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Specifications" key="Specifications">
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="d1"
                                            label={<p>Dimensions <br /> (L x W x H)</p>}
                                        >
                                            <Input.Group compact >
                                                <Input type='number' style={{ width: "33.3%" }} placeholder='Length' />
                                                <Input type='number' style={{ width: "33.3%" }} placeholder='Width' />
                                                <Input type='number' style={{ width: "33.3%" }} placeholder='Height' />
                                            </Input.Group>
                                        </Form.Item>
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="model"
                                            label={<p>Dimensions <br />Class </p>}
                                        >
                                            <Select style={{ height: '3.5em' }} placeholder="Enter Dimension Class" >
                                                <Option key={1} value={1} >Centimeter</Option>
                                                <Option key={2} value={2} >Millimeter</Option>
                                                <Option key={3} value={3} >Inch</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="w"
                                            label="Weight"
                                        >
                                            <Input type='number' placeholder='Enter Weight' />
                                        </Form.Item>
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="model"
                                            label="Weight Class"
                                        >
                                            <Select placeholder="Enter Weight Class" >
                                                <Option key={1} value={1} >Kilogram</Option>
                                                <Option key={1} value={1} >Gram</Option>
                                                <Option key={2} value={2} >Pound</Option>
                                                <Option key={3} value={3} >Ounce</Option>
                                            </Select>
                                        </Form.Item>

                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Stock" key="Stock">
                                        {/* <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Quantity" }]}
                                            name="q"
                                            label="Quantity"
                                        >
                                            <Input placeholder='Enter Quantity' />
                                        </Form.Item> */}
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Minimum Quantity" }]}
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
                                            <DatePicker size='middle' style={{ height: '2.6em', }} />
                                        </Form.Item>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Attribute" key="Attribute">
                                        <AttributeTab />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Price" key="Price">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please Enter Regular Price" }]}
                                            name="Rp"
                                            label="Regular Price"
                                        >
                                            <Input placeholder='Enter Regular Price' prefix="US$  " type='number' />
                                        </Form.Item>

                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter " }]}
                                            name="cPrice"
                                            label="Sales Price"
                                        >
                                            <Input prefix="US$  " type='number' placeholder='Enter Sales Price' />
                                        </Form.Item>
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter " }]}
                                            name="cPrice"
                                            label="Cost Per Item"
                                        >
                                            <Input prefix="US$  " type='number' placeholder='Enter Cost Per Item' />
                                            <p style={{ color: "gray" }}>Customers won't see this</p>

                                            <Checkbox >Charge Tax on this product</Checkbox>

                                        </Form.Item>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Discount" key="Discount">
                                        <DiscountTab />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Parts Of Product" key="PartsOf">
                                        <PartsOfProductTab />
                                    </Tabs.TabPane>


                                    <Tabs.TabPane tab="Images" key="Images">
                                        <ImageTab />
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
