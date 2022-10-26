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
import { apolloUploadClient, productMutation, productQuery } from '../../utility/apollo';
import PartsOfProductTab from './addProducts/PartsOfProductTab';
import { viewPermission } from '../../utility/utility';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import RelatedProducts from './addProducts/RelatedProducts';
import { getDefaultCompilerOptions } from 'typescript';
const { Option } = Select;



const AddProduct = () => {
    viewPermission('product');
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    // ================= 1.for General tab START =================
    const [longDescription, setLongDescription] = useState(RichTextEditor.createEmptyValue());
    const [prod_long_desc, setProd_long_desc] = useState("")
    const onChangeRte = value => {
        setProd_long_desc(value.toString('html'))
        setLongDescription(value);
    }
    const [prod_status, setProd_status] = useState(true)
    // ================= 1.for General tab END =================


    // ================= 3.for links tab START =================
    const [brand, setBrand] = useState({ data: [], loading: true, error: '' })
    const [categories, setCategories] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
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
    // get all brands with category
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
    // ================= 3.for links tab END =================


    // ================= 4.for Specification tab START =================
    const [dimensions, setDimensions] = useState({})
    // ================= 4.for Specification tab END =================


    // ================= 6.for Attribute tab START =================
    const initalData = [{
        id: new Date().getTime(),
        attr_group_uuid: "",
        attribute_uuid: '',
        attribute_type: '',
        attribute_value: ''
    }]
    const [attributesTableData, setAttributesTableData] = useState(initalData)
    // ================= 6.for Attribute tab END =================

    // ================= 9.for Parts Of Product tab START =================
    const [products, setProducts] = useState({ data: [], isLoading: true })
    const [selectedPartsOfProducts, setSelectedPartsOfProducts] = useState([])
    const [partOfProductQuantities, setPartOfProductQuantities] = useState({})
    // load ATTRIBUTE GROUPS
    useEffect(() => {
        // return
        apolloClient.query({
            query: productQuery.GET_PRODUCT_LIST_FOR_ADD_MINIMAL,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getProductList

            if (!data?.status) return
            setProducts(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setProducts(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setProducts(s => ({ ...s, isLoading: false }))
        })

    }, [])
    // ================= 9.for Parts Of Product tab END =================


    // ================= 10.for Image tab START =================
    const [featuresImage, setFeaturesImage] = useState({})
    const [gallaryImages, setGallaryImages] = useState([])
    // ================= 10.for Image tab END =================

    const handleSubmit = values => {
        const {
            dimension_class,
            prod_regular_price,
            prod_sale_price,
            prod_weight,
            prod_weight_class,
            ...rest
        } = values

        let isAttribute = true;
        let isAttrCorrect = true;
        const product_attributes = attributesTableData.map(item => {
            // TODO: show warning for missing value
            const { id, ...attributes } = item
            if (attributes.attribute_type === "none") {
                attributes.attribute_value = "none"
            }
            // for empty attribute
            if (!attributes.attr_group_uuid && !attributes.attribute_type && !attributes.attribute_value) {
                isAttribute = false
            }
            // for incorrect inputs
            if (!attributes.attr_group_uuid || !attributes.attribute_type || !attributes.attribute_value) {
                isAttrCorrect = false
            }
            return ({ ...attributes })
        })
        if (!isAttrCorrect && isAttribute) return toast.warning("Please fill all Attribute field correctly")



        const related_product = relatedProducts.map(item => item.uid)
        const partof_product = selectedPartsOfProducts.map(item => {
            const data = {
                prod_uuid: item.uid,
                prod_quantity: partOfProductQuantities[item.uid] ? parseInt(partOfProductQuantities[item.uid]) : 1
            }
            return data
        })
        const prod_thumbnail = featuresImage.file
        const prod_gallery = gallaryImages.map(item => item.file)



        const data = {
            ...rest,
            prod_long_desc,
            related_product,
            prod_status,
            partof_product,
            prod_thumbnail,
            prod_gallery,
        }

        if (prod_regular_price) {
            data.prod_regular_price = parseFloat(prod_regular_price)
        }
        if (prod_sale_price) {
            data.prod_sale_price = parseFloat(prod_sale_price)
        }
        if (isAttribute) {
            data.product_attributes = product_attributes
        }
        if (prod_weight) {
            data.prod_weight = prod_weight
            data.prod_weight_class = prod_weight_class
        }
        const { height, length, width } = dimensions
        if (height || length || width) {
            let dimensions = { dimension_class }
            if (height) {
                dimensions.height = height
            }
            if (length) {
                dimensions.length = length
            }
            if (width) {
                dimensions.width = width
            }
            data.dimensions = dimensions
        }


        console.log("values:\n", values);
        console.log("data:\n", data);

        // All Validation Start
        if (!data.prod_long_desc) return toast.warning("Please enter a long description")
        if (!data.prod_short_desc) return toast.warning("Please enter a long description")
        if (!data.prod_sku) return toast.warning("Please enter Product SKU")
        if (!data.brand_uuid) return toast.warning("Please select a Manufacture")
        if (!data.prod_category) return toast.warning("Please select a Category")
        if (!data.prod_outofstock_status) return toast.warning("Please select an Availability Status")
        if (!data.prod_regular_price) return toast.warning("Please enter Regular Price")
        if (!prod_thumbnail) { return toast.warning("Please select a Feature image") }
        // All Validation End


        // return;
        setIsLoading(true)
        apolloUploadClient.mutate({
            mutation: productMutation.ADD_PRODUCT,
            variables: { data },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.addProduct
            if (!data.status) return toast.error(data.message);
            history.push("/admin/products/list");
            window.location.reload()
            toast.success(data.message);
        }).catch(err => {
            console.log("add Prod err:\n", err)
            return toast.error('Something Went wrong !!')
        }).finally(() => {
            setIsLoading(false)
        })

    }

    return (
        <>
            <PageHeader
                title="Add Product"
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
                                <Tabs>

                                    <Tabs.TabPane tab="General" key="general">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            name="prod_name"
                                            label="Name"
                                        >
                                            <Input placeholder='Enter Product Name' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter n" }]}
                                            name="prod_short_desc"
                                            label="Short Description"
                                        >
                                            <TextArea rows={3} placeholder="Enter Short Description" />
                                        </Form.Item>
                                        <Form.Item
                                            // name="prod_long_desc"
                                            label="Long Description"
                                        >
                                            <RichTextEditor

                                                value={longDescription}
                                                onChange={onChangeRte}
                                                placeholder='Long Description'
                                                className={style.rte}
                                                editorClassName={style.rteEditor}
                                                toolbarClassName={style.rteToolbar}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Title" }]}
                                            name="prod_meta_title"
                                            label="Meta Title"
                                        >
                                            <Input placeholder='Enter Meta Title' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Description" }]}
                                            name="prod_meta_desc"
                                            label="Meta Description"
                                        >
                                            <Input placeholder='Enter Meta Description' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Meta Keywords" }]}
                                            name="prod_meta_keywords"
                                            label="Meta Keywords"
                                        >
                                            <Input placeholder='Enter comma separated Meta Keywords' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Tags" }]}
                                            name="prod_tags"
                                            label="Tags"
                                        >
                                            <Input placeholder='Enter comma separated Tags' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Status"
                                        >
                                            <Switch checked={prod_status} onChange={checked => prod_status(checked)} />
                                        </Form.Item>


                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Data" key="Data">
                                        <Form.Item
                                            name="prod_model"
                                            label="Model"
                                        >
                                            <Input placeholder='Enter Product Model' />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter " }]}
                                            name="prod_sku"
                                            label="SKU"
                                        >
                                            <Input placeholder='Enter Product SKU' />
                                        </Form.Item>
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Links" key="Links">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            name="brand_uuid"
                                            label="Manufacturer"
                                        >
                                            <Select placeholder={brand.loading ? "Loading..." : "select Manufacture"}
                                                options={brand.data.map(item => ({
                                                    label: item.brand_name,
                                                    value: item.brand_uuid,
                                                    categories: item.categories,
                                                }))}
                                                onSelect={onManufactureSelect}
                                            />

                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            name="prod_category"
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
                                                    value: item.cat_id,
                                                    key: item.cat_id,
                                                }))}
                                            // mode="multiple"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Product Name" }]}
                                            // name=""
                                            label="Related Product"
                                        >
                                            <Select
                                                placeholder={products.isLoading ? "Loading..." : "select Related Products"}
                                                mode="multiple"
                                                options={products?.data?.map(item => (
                                                    {
                                                        label: item.prod_name,
                                                        value: item.prod_name,
                                                        uid: item.prod_uuid,
                                                        key: item.prod_uuid,
                                                    }
                                                ))}

                                                onChange={(newVal, items) => {
                                                    setRelatedProducts(items)
                                                }}
                                            >

                                            </Select>
                                        </Form.Item>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Specifications" key="Specifications">
                                        <Form.Item
                                            label={<p>Dimensions <br /> (L x W x H)</p>}
                                        >
                                            <Input.Group compact
                                            >
                                                <Input
                                                    type='number'
                                                    style={{ width: "33.3%" }} placeholder='Length'
                                                    onBlur={e => setDimensions(state => ({ ...state, length: parseFloat(e.target.value) }))}
                                                />
                                                <Input
                                                    type='number'
                                                    style={{ width: "33.3%" }} placeholder='Width'
                                                    onBlur={e => setDimensions(state => ({ ...state, width: parseFloat(e.target.value) }))}
                                                />
                                                <Input
                                                    type='number'
                                                    style={{ width: "33.3%" }} placeholder='Height'
                                                    onBlur={e => setDimensions(state => ({ ...state, height: parseFloat(e.target.value) }))}
                                                />
                                            </Input.Group>
                                        </Form.Item>
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="dimension_class"
                                            label={<p>Dimensions <br />Class </p>}
                                            initialValue="Inch"
                                        >
                                            <Select style={{ height: '3.5em' }} placeholder="Enter Dimension Class" >
                                                <Option key={1} value="Centimeter" >Centimeter</Option>
                                                <Option key={2} value="Millimeter" >Millimeter</Option>
                                                <Option key={3} value="Inch" >Inch</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="prod_weight"
                                            label="Weight"
                                        >
                                            <Input type='number' placeholder='Enter Weight' />
                                        </Form.Item>
                                        <Form.Item
                                            // rules={[{ required: true, message: "Please enter Model" }]}
                                            name="prod_weight_class"
                                            label="Weight Class"
                                            initialValue="Pound"
                                        >
                                            <Select placeholder="Enter Weight Class" >
                                                <Option key={1} value="Kilogram" >Kilogram</Option>
                                                <Option key={1} value="Gram" >Gram</Option>
                                                <Option key={2} value="Pound" >Pound</Option>
                                                <Option key={3} value="Ounce" >Ounce</Option>
                                            </Select>
                                        </Form.Item>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Stock" key="Stock">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please enter Availability Status" }]}
                                            name="prod_outofstock_status"
                                            label="Availability"
                                            initialValue={"In Stock"}
                                        >
                                            <Select placeholder="Please select a Status">
                                                <Select.Option key={1} value="2-3 Days" >2-3 Days</Select.Option>
                                                <Select.Option key={2} value="In Stock">In Stock</Select.Option>
                                                <Select.Option key={3} value="Out Of Stock" >Out Of Stock</Select.Option>
                                                <Select.Option key={4} value="Pre-Orde" >Pre-Order</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Attribute" key="Attribute">
                                        <AttributeTab {...{ attributesTableData, setAttributesTableData }} />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Price" key="Price">
                                        <Form.Item
                                            rules={[{ required: true, message: "Please Enter Regular Price" }]}
                                            name="prod_regular_price"
                                            label="Regular Price"
                                        >
                                            <Input placeholder='Enter Regular Price' prefix="US$  " type='number' />
                                        </Form.Item>

                                        <Form.Item
                                            name="prod_sale_price"
                                            label="Sales Price"
                                        >
                                            <Input prefix="US$  " type='number' placeholder='Enter Sales Price' />
                                        </Form.Item>

                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Discount" key="Discount">
                                        <DiscountTab />
                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Parts Of Product" key="PartsOf">
                                        <PartsOfProductTab {...{ products, setProducts, selectedPartsOfProducts, setSelectedPartsOfProducts, partOfProductQuantities, setPartOfProductQuantities }} />
                                    </Tabs.TabPane>


                                    <Tabs.TabPane tab="Images" key="Images">
                                        <ImageTab {...{ featuresImage, setFeaturesImage, gallaryImages, setGallaryImages }} />
                                    </Tabs.TabPane>

                                </Tabs>

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
                                        <Link to="/admin/roles/list">
                                            <Button
                                                // className="btn-cancel"
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

export default AddProduct;
