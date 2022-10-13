import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Switch, Tabs, Spin, Select, Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { productQuery } from '../../utility/apollo';
import Heading from '../../components/heading/heading';
import queryString from 'query-string'

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const AddCategory = () => {
    const [form] = Form.useForm();
    const [categoryStatus, setCategoryStatus] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const maxLength = 30;
    const { search } = useLocation();
    const params = queryString.parse(search)

    const [categories, setCategories] = useState([])
    const [structuredCategories, setStructuredCategories] = useState({ data: [], loading: true })
    const [singleCategory, setSingleCategory] = useState({})


    const [state, setState] = useState({
        file: null,
        list: null,
        submitValues: {},
    });

    const fileList = [
        {
            uid: '1',
            name: '1.png',
            status: 'done',
            url: require('../../static/img/products/1.png'),
            thumbUrl: require('../../static/img/products/1.png'),
        },
    ];

    const fileUploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                setState({ ...state, file: info.file, list: info.fileList });
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        listType: 'picture',
        defaultFileList: fileList,
        showUploadList: {
            showRemoveIcon: true,
            removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
        },
    };



    useEffect(() => { // load category
        apolloClient.query({
            query: productQuery.GET_ALL_CATEGORIES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    // Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCategories
            if (!data.status) return;
            setCategories(data.categories)
        }).catch(err => {

        })

    }, [])

    useEffect(() => { // category structure

        if (!categories.length) return
        let arrData = []

        categories.forEach(item => {
            const parent = item.cat_name
            const cat_sort_order = item.cat_sort_order

            arrData.push({ cat_name: parent, cat_id: item.cat_id, cat_sort_order })
            if (item.subcategories) {
                item.subcategories.forEach(subCat => {
                    const sub = subCat.cat_name

                    arrData.push({ cat_name: `${parent} > ${sub}`, cat_id: subCat.cat_id })
                    // if (subCat.subsubcategories) {
                    //     subCat.subsubcategories.forEach(subSubCat => {
                    //         const subSub = subSubCat.cat_name

                    //         arrData.push({ cat_name: `${parent} > ${sub} > ${subSub}`, cat_id: subSubCat.cat_id })
                    //     })
                    // }
                })

            }
        })
        setStructuredCategories({ data: arrData, loading: false })

    }, [categories])

    // useEffect(() => { // get single category
    //     apolloClient.

    // }, [])





    const handleSubmit = values => {
        console.log(values);

    }



    return (
        <>
            <PageHeader
                title={params.id ? `Edit category - ${params.name}` : "Add Category"}
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
                                            rules={[{ required: true, max: maxLength, message: "Please enter Role Name" }]}
                                            name="categoryName" label="Category Name"
                                        // initialValue={params.name || ""}
                                        >
                                            <Input placeholder='Enter Category Name' />
                                        </Form.Item>
                                        <Form.Item
                                            name="categoryDescription" label="Description"
                                        >
                                            <TextArea rows={4} placeholder="Enter Category Description" />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please enter Meta Title" }]}
                                            name="categoryMetaTagTitle" label="Meta Tag Title"
                                        >
                                            <Input placeholder='Enter Meta Tag Title' />
                                        </Form.Item>
                                        <Form.Item
                                            name="categoryMetaTagDescription" label="Meta Tag Description"
                                        >
                                            <TextArea rows={3} placeholder="Enter Meta Tag Description" />
                                        </Form.Item>
                                        <Form.Item
                                            className='wrap-label'
                                            name="categoryMetaTagKeywords" label="Enter Meta Tag Keywords"
                                        >
                                            <TextArea rows={3} placeholder="Enter Category Description" />
                                        </Form.Item>


                                    </Tabs.TabPane>

                                    <Tabs.TabPane tab="Data" key="Data">
                                        <Form.Item
                                            name="roleUUID"
                                            initialValue=""
                                            label="Parent"
                                        // tooltip={roles.isLoading ? 'Loading roles....' : null}
                                        >
                                            {structuredCategories.loading
                                                ?
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Spin />
                                                </div>
                                                : <>
                                                    <Select
                                                        allowClear
                                                        placeholder="Please select"
                                                    // onChange={value => setSelectedRoles(value)}
                                                    // defaultValue={existingRoles.data}
                                                    >
                                                        {structuredCategories.data.map(item => (
                                                            <Option key={item.cat_id} value={item.cat_id}>{item.cat_name}</Option>
                                                        ))}

                                                    </Select>
                                                </>
                                            }

                                        </Form.Item>

                                        <Form.Item
                                            name="categorySortOrder" label="Sort Order"
                                        >
                                            <Input placeholder='Enter Sort Order' />
                                        </Form.Item>

                                        <Form.Item
                                            name="categoryIsFeatured" label="Is Featured"
                                        >
                                            <Checkbox checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                                        </Form.Item>
                                        <Form.Item
                                            name="categoryStatus" label="Status"
                                        >
                                            <Switch
                                                checked={categoryStatus}
                                                onChange={checked => setCategoryStatus(checked)}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="img" label="Image"
                                        >
                                            {/* <div className="add-product-block">
                                            <Row gutter={15}>
                                                <Col xs={24}>
                                                    <div className="add-product-content">
                                                        <Cards title="Product Image"> */}
                                            <Dragger {...fileUploadProps} style={{ marginTop: '3em' }}>
                                                <p className="ant-upload-drag-icon">
                                                    <FeatherIcon icon="upload" size={50} />
                                                </p>
                                                <Heading as="h4" className="ant-upload-text">
                                                    Drag and drop an image
                                                </Heading>
                                                <p className="ant-upload-hint">
                                                    or <span>Browse</span> to choose a file
                                                </p>
                                            </Dragger>
                                            {/* </Cards>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div> */}
                                        </Form.Item>





                                    </Tabs.TabPane>
                                </Tabs>;


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
