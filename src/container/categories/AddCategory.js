import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Switch, Tabs, Spin, Select, Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { apolloUploadClient, productMutation, productQuery } from '../../utility/apollo';
import Heading from '../../components/heading/heading';
import queryString from 'query-string'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

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
    const [parentUid, setParentUid] = useState("")
    const [image, setImage] = useState(null);


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

    useEffect(() => { // get single category
        if (!params.id) return;

        apolloClient.query({
            query: productQuery.GET_SINGLE_CATEGORY_FOR_UPDATE,
            variables: { query: { cat_id: params.id } },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleCategory
            if (!data.status) return;
            setSingleCategory(data.category)
            setIsFeatured(state => data?.category?.is_featured || state)
            setCategoryStatus(state => data?.category?.cat_status || state)
        }).catch(err => {
            toast.error("Something went worng.!")
        })

    }, [])





    const handleSubmit = values => {

        console.log(image)

        // return;
        setIsLoading(true)
        const {
            categoryName,
            categoryDescription,
            categoryMetaTagDescription,
            categoryMetaTagKeywords,
            categoryMetaTagTitle,
            // categoryParentId,
            categorySortOrder
        } = values



        if (!params.id) {

            const data = {
                categoryName,
                categoryDescription,
                categoryMetaTagDescription,
                categoryMetaTagKeywords,
                categoryMetaTagTitle,
                isFeatured,
                categoryStatus,
            }
            if (parentUid) {
                data.categoryParentId = parentUid
            }
            if (categorySortOrder) {
                data.categorySortOrder = parseInt(categorySortOrder)
            }
            const variables = { data }

            if (image) {
                variables.file = image
            }

            console.log(variables);


            apolloUploadClient.mutate({
                mutation: productMutation.CREATE_CATEGORY,
                variables,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const data = res?.data?.createCategory
                if (!data?.status) return toast.error(data?.message)
                toast.success(data?.message)


            }).catch(err => {

            }).finally(() => {
                setIsLoading(false)
            })
        } else {

            const data = {
                cat_id: params.id,
                cat_name: categoryName,
                cat_description: categoryDescription,
                cat_meta_tag_title: categoryMetaTagTitle,
                cat_meta_tag_description: categoryMetaTagDescription,
                cat_meta_tag_keywords: categoryMetaTagKeywords,
                is_featured: isFeatured,
                cat_status: categoryStatus,
            }
            if (parentUid) {
                data.categoryParentId = parentUid
            } if (image.file) {
                data.categoryImage = image.file
            } if (categorySortOrder) {
                data.cat_sort_order = parseInt(categorySortOrder)
            }

            apolloClient.mutate({
                mutation: productMutation.UPDATE_CATEGORY,
                variables: { data },
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: Cookies.get('psp_t')
                    }
                }
            }).then(res => {
                const data = res?.data?.updateCategory
                if (!data?.status) return toast.error(data?.message)
                toast.success(data?.message)


            }).catch(err => {

            }).finally(() => {
                setIsLoading(false)
            })


        }


    }



    return (
        <>
            <PageHeader
                title={params.id ? `Edit category - ${params.name}` : "Add Category"}
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Switch
                            checked={categoryStatus}
                            onChange={checked => setCategoryStatus(checked)}
                        />
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {params.id && !singleCategory.cat_id ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
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
                                                rules={[{ required: true, max: maxLength, message: "Please enter Category Name" }]}
                                                name="categoryName" label="Category Name"
                                                initialValue={singleCategory.cat_name || ""}
                                            >
                                                <Input placeholder='Enter Category Name' />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Category Description" }]}
                                                name="categoryDescription" label="Description"
                                                initialValue={singleCategory.cat_description || ""}
                                            >
                                                <TextArea rows={4} placeholder="Enter Category Description" />
                                            </Form.Item>
                                            <Form.Item
                                                rules={[{ required: true, max: maxLength, message: "Please enter Meta Title" }]}
                                                name="categoryMetaTagTitle" label="Meta Tag Title"
                                                initialValue={singleCategory.cat_meta_tag_title || ""}

                                            >
                                                <Input placeholder='Enter Meta Tag Title' />
                                            </Form.Item>
                                            <Form.Item
                                                name="categoryMetaTagDescription" label="Meta Tag Description"
                                                rules={[{ required: true, max: maxLength, message: "Please enter Meta Description" }]}
                                                initialValue={singleCategory.cat_meta_tag_description || ""}
                                            >
                                                <TextArea rows={3} placeholder="Enter Meta Tag Description" />
                                            </Form.Item>
                                            <Form.Item
                                                className='wrap-label'
                                                rules={[{ required: true, max: maxLength, message: "Please enter Meta Keywords" }]}
                                                name="categoryMetaTagKeywords" label="Enter Meta Tag Keywords"
                                                initialValue={singleCategory.cat_meta_tag_keywords || ""}
                                            >
                                                <TextArea rows={3} placeholder="Enter Meta Tag Keywords" />
                                            </Form.Item>


                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="Data" key="Data">
                                            <Form.Item
                                                name="categoryParentId"
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
                                                            onChange={value => setParentUid(value)}
                                                            defaultValue={singleCategory.cat_parent_id}
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
                                                initialValue={singleCategory.cat_sort_order || ""}
                                            >
                                                <Input placeholder='Enter Sort Order' />
                                            </Form.Item>

                                            <Form.Item
                                                name="isFeatured" label="Is Featured"
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


                                            {/* <input
                                                type="file"
                                                name="myImage"
                                                accept="image/*"
                                                onChange={e => {
                                                    console.log(e.target.files[0]);
                                                    setImage(e.target.files[0])
                                                }}
                                            /> */}


                                            <Form.Item
                                                name="img" label="Image"
                                            >
                                                <Dragger
                                                    // {...fileUploadProps}

                                                    multiple={false}
                                                    // onChange={info => {
                                                    //     console.log(info.file.originFileObj);

                                                    // }}
                                                    beforeUpload={file => {
                                                        console.log(file);
                                                        console.log(typeof file);


                                                        setImage(file)
                                                        return false;
                                                    }}
                                                    onRemove={file => setImage(null)}
                                                    fileList={image ? [image] : []}
                                                    style={{ marginTop: '3em' }}
                                                >
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
                            }





                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddCategory;
