import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, Upload, InputNumber, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { brandQuery } from '../../apollo/brand';
import apolloClient, { apolloUploadClient } from '../../apollo';
import queryString from 'query-string'
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AddBrand = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const { TextArea } = Input;
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [brandStatus, setBrandStatus] = useState(true)
    const [image, setImage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [order, setOrder] = useState(0);
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [singleBrand, setSingleBrand] = useState({ data: {}, loading: true, error: '' })
    const maxLength = 30
    const [form] = Form.useForm();

    const handleSubmit = values => {
        setIsLoading(true)
        const modify_category = [];
        category.forEach(val => {
            modify_category.push(
                { "cat_id": val },
            )
        })
        const data = { ...values, brand_status: brandStatus, brand_sort_order: order, categories: modify_category, brand_uuid: params?.id }
        // console.log(data);
        apolloUploadClient.mutate({
            mutation: image ? brandQuery.BRAND_UPDATE : brandQuery.BRAND_UPDATE_WI,
            variables: image ? { data, file: image } : { data },
            refetchQueries: [
                {
                  query: brandQuery.GET_ALL_BRAND,
                  context: {
                    headers: {
                      TENANTID: process.env.REACT_APP_TENANTID,
                      Authorization: token
                    }
                  }
                },
                'getAllBrands'
            ],
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            // console.log(res);
            const data = res?.data?.updateBrand
            if (!data?.status) return toast.error('Something Went wrong !!');
            toast.success(data?.message);
            history.push("/admin/brand/list");
            window.location.reload();
        }).catch(err => {
            toast.error('Something Went wrong !!');
        }).finally(() => setIsLoading(false))
    };

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

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}> Upload </div>
        </div>
    );

    useEffect(() => {
        setLoading(true);
        apolloClient.query({
            query: brandQuery.GET_CATEGORIES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getParentCategories?.categories
            setCategories(data)
        }).catch(err => {
            setCategories([])
            console.log(err);
        })
        apolloClient.query({
            query: brandQuery.GET_SINGLE_BRAND,
            variables: {
                brand_uuid: params?.id
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleBrand
            if (!data.status) return;
            setSingleBrand({ data: data?.data, loading: false, error: '' })
            const inputSelectedCategories =  []
            data?.data?.categories.map(item => {
                inputSelectedCategories.push(item.cat_id)
            })
            setCategory(inputSelectedCategories)
            setLoading(false);
            setBrandStatus(data?.data?.brand_status)
            setThumbnail(renderImage(params?.id, data?.data?.image, 'brand', '128x128'))
            form.setFieldsValue({
                "brand_name": data?.data?.brand_name,
                "brand_description": data?.data?.brand_description
            })
            setOrder(data?.data?.brand_sort_order)
        }).catch(err => {
            console.log(err);
            setSingleBrand({ data: {}, loading: false, error: 'Something went worng' })
        })
    }, [])

    return (
        <>
            <PageHeader
                title={ `Manage Manufacture | Edit Manufacture ${singleBrand?.data?.brand_name ? `(${singleBrand?.data?.brand_name})` : ""}` }
            />
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
                                        name="editBrand"
                                        onFinish={handleSubmit}
                                        onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                        labelCol={{ span: 4 }} >
                                        <Form.Item
                                            rules={[{ required: true, max: maxLength, message: "Please Enter Manufacture Name" }]}
                                            name="brand_name" label="Name" >
                                            <Input placeholder='Enter Manufacture Name' defaultValue={singleBrand?.data?.brand_name} />
                                        </Form.Item>
                                        <Form.Item
                                            rules={[{ required: true, message: "Please Enter Manufacture Description" }]}
                                            name="brand_description" label="Description"
                                        >
                                            <TextArea rows={4} placeholder="Enter Manufacture Description" defaultValue={singleBrand?.data?.brand_description} />
                                        </Form.Item>

                                        <Form.Item label="Categories">
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder="Select Categories"
                                                defaultValue={category}
                                                onChange={(e) => setCategory(e)}
                                                optionLabelProp="label"
                                            >
                                                {
                                                    categories.map(val => {
                                                        return (
                                                            <Select.Option key={val.cat_id} value={val.cat_id} label={val.cat_name}>
                                                                <div className="demo-option-label-item">
                                                                    {
                                                                        val.cat_name
                                                                    }
                                                                </div>
                                                            </Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Sort Order">
                                            <InputNumber defaultValue={singleBrand?.data?.brand_sort_order} onChange={setOrder} style={{ width: '100%' }} />
                                        </Form.Item>

                                        <Form.Item label="Status">
                                            <Switch checked={brandStatus} onChange={checked => setBrandStatus(checked)} checkedChildren="ON" unCheckedChildren="OFF" />
                                        </Form.Item>

                                        <Form.Item label="Image">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                beforeUpload={beforeImageUpload}
                                                fileList={[]}
                                            >
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
                                        </Form.Item>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Form.Item>
                                                <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                                                    {isLoading ? 'Processing' : 'Save'}
                                                </Button>
                                                <Link to="/admin/brand/list">
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

export default AddBrand;
