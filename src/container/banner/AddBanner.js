import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, Upload, InputNumber, Spin, Table } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { brandQuery } from '../../apollo/brand';
import apolloClient from '../../apollo';
import { apolloUploadClient } from '../../apollo';
import { errorImageSrc } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FeatherIcon from 'feather-icons-react';

const AddBanner = () => {
    const { TextArea } = Input;
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [brandStatus, setBrandStatus] = useState(true)
    const [image, setImage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const maxLength = 50
    const [form] = Form.useForm();

    const initialData = {
        "id": new Date().getTime(),
        "title": "",
        "link": "",
        "image": "",
        "sort_order": "",
        "action": ""
    }
    const [bannerData, setBannerData] = useState([initialData]);

    useEffect(() => {
        // setLoading(true);
        // apolloClient.query({
        //     query: brandQuery.GET_CATEGORIES,
        //     context: {
        //         headers: {
        //             TENANTID: process.env.REACT_APP_TENANTID,
        //             Authorization: token
        //         }
        //     }
        // }).then(res => {
        //     const data = res?.data?.getParentCategories?.categories
        //     setCategories(data)
        //     setLoading(false)
        // }).catch(err => {
        //     setCategories([])
        //     console.log(err);
        // })
    }, [])

    //Submit Form 
    const handleSubmit = values => {
        console.log(bannerData);
        // setIsLoading(true)
        // const modify_category = [];
        // category.forEach(val => {
        //     modify_category.push(
        //         { "cat_id": val },
        //     )
        // })

        // if (modify_category.length == 0) {
        //     setIsLoading(false)
        //     return toast.error("Please Select Category")
        // }


        // const data = { ...values, brandStatus: brandStatus, brandSortOrder: order, categories: modify_category }
        // apolloUploadClient.mutate({
        //     mutation: image ? brandQuery.BRAND_ADD : brandQuery.BRAND_ADD_WI,
        //     variables: image ? { data, file: image } : { data },
        //     refetchQueries: [
        //         {
        //             query: brandQuery.GET_ALL_BRAND,
        //             context: {
        //                 headers: {
        //                     TENANTID: process.env.REACT_APP_TENANTID,
        //                     Authorization: token
        //                 }
        //             }
        //         },
        //         'getAllBrands'
        //     ],
        //     context: {
        //         headers: {
        //             TENANTID: process.env.REACT_APP_TENANTID,
        //             Authorization: token
        //         }
        //     }
        // }).then(res => {
        //     const data = res?.data?.createBrand
        //     if (!data?.status) return toast.error('Something Went wrong !!');
        //     history.push("/admin/brand/list");
        //     toast.success(data?.message);
        //     window.location.reload();
        // }).catch(err => {
        //     toast.error('Something Went wrong !!');
        // }).finally(() => setIsLoading(false))
    };

    // Assign Image
    const beforeImageUpload = (file) => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) toast.error('Image must smaller than 1MB!');

        if (isJpg && isLt2M) {
            setThumbnail(URL.createObjectURL(file))
            setImage(file)
        }

        return false;
    };

    // Upload Button Design
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}> Upload </div>
        </div>
    );

    // List For Table Column
    const column = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input placeholder="Title" />
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => <Input placeholder="Link" />
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={beforeImageUpload} fileList={[]}>
                {thumbnail ? (
                    <LazyLoadImage
                        src={thumbnail}
                        onError={errorImageSrc}
                        alt="image"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        },
        {
            title: 'Sort Order',
            dataIndex: 'sort_order',
            key: 'sort_order',
            width: 150,
            render: (text, record) => <Input type="number" placeholder="Sort Order" onChange={(e) => record.sort_order = e.target.value} />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)} ><FeatherIcon icon="minus" /></Button>
        },
    ];

    // Adding new row on table
    const addNewRow = () => {
        const newData = (
            {
                "id": new Date().getTime(),
                "title": "",
                "link": "",
                "image": "",
                "sort_order": "",
                "action": ""
            }
        )
        setBannerData(prevState => [...prevState, newData])
    }

    const removeRow = (id) => {
        setBannerData(prevState => {
            return prevState.filter((value) => value.id !== id)
        })
    }

    return (
        <>
            <PageHeader title="Add Banner" />

            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {
                                loading ? (
                                    <div style={{ textAlign: "center" }}>
                                        <Spin tip="processing..." />
                                    </div>
                                ) :
                                    <Form
                                        style={{ width: '100%' }}
                                        form={form}
                                        name="addBanner"
                                        onFinish={handleSubmit}
                                        onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                        labelCol={{ span: 4 }} >
                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please Enter Banner Name" }]}
                                            name="bannerName" label="Banner Name" >
                                            <Input placeholder='Enter Banner Name' />
                                        </Form.Item>

                                        <Form.Item label="Status">
                                            <Switch checked={brandStatus} onChange={checked => setBrandStatus(checked)} checkedChildren="ON" unCheckedChildren="OFF" />
                                        </Form.Item>

                                        <Table
                                            className="table-responsive"
                                            columns={column}
                                            pagination={false}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={bannerData}
                                        />

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
                                            <Button size="small" title="Add Banner" htmlType="button" type="primary" onClick={addNewRow}>
                                                <FeatherIcon icon="plus" />
                                            </Button>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <Form.Item>
                                                <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                                    {isLoading ? 'Processing' : 'Save'}
                                                </Button>
                                                <Link to="/admin/banner/list">
                                                    <Button
                                                        style={{ marginLeft: 10 }}
                                                        type='light'
                                                        size="default">
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

export default AddBanner;
