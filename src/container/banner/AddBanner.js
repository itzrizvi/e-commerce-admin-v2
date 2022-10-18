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
import { bannerQuery } from '../../apollo/banner';
import apolloClient, { apolloUploadClient } from '../../apollo';
import { errorImageSrc } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FeatherIcon from 'feather-icons-react';

const AddBanner = () => {
    const { TextArea } = Input;
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)
    const [bannerStatus, setBannerStatus] = useState(true)
    const [image, setImage] = useState('');
    const maxLength = 50
    const [form] = Form.useForm();

    const [bannerData, setBannerData] = useState([]);

    //Submit Form 
    const handleSubmit = values => {
        setIsLoading(true)
        const data = { ...values, banner_status: bannerStatus}
        apolloUploadClient.mutate({
            mutation: bannerQuery.BANNER_ADD,
            variables: { data },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.addBanner
            if (!data?.status) return toast.error('Something Went wrong !');
            // console.log(data?.data?.banner_uuid);
            const banner_uuid = data?.data?.banner_uuid;

            bannerData.forEach((val) => {
                // apolloUploadClient.mutate({
                //     mutation: bannerQuery.BANNER_IMAGE_ADD,
                //     variables: {data: { banner_id: banner_uuid, title: val.title, sort_order: val.sort_order, link: val.link}, file: val.image},
                //     context: {
                //         headers: {
                //             TENANTID: process.env.REACT_APP_TENANTID,
                //             Authorization: token
                //         }
                //     }
                // }).then(res => {
                //     console.log(res);
                // }).catch(err => {
                //     toast.error('Something Went wrong !!');
                // })

                apolloUploadClient.mutate({
                    mutation: bannerQuery.SINGLE_UPLOAD,
                    variables: {file: image},
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    toast.error('Something Went wrong !!');
                })
            })
        }).catch(err => {
            toast.error('Something Went wrong !!!');
        }).finally(() => setIsLoading(false))
    };

    // Assign Image
    const beforeImageUpload = (file) => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) toast.error('Image must smaller than 1MB!');

        if (isJpg && isLt2M) {

            console.log(file);

            apolloUploadClient.mutate({
                mutation: bannerQuery.SINGLE_UPLOAD,
                variables: {file: file},
            }).then(res => {
                console.log(res);
            }).catch(err => {
                toast.error('Something Went wrong !!');
            })

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

    const setImageInObject = (e) => {
        if(e && "target" in e && 'getAttribute' in e.target){
            const data_id = e.target.getAttribute("data-id");
            if(data_id){
                let shawlow_copy = bannerData;
                shawlow_copy.map(ele =>{
                    if(ele.id == data_id){
                        ele.image = image
                    }
                    return ele;
                });
            }
        }
    }

    // List For Table Column
    const column = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input type='text' placeholder="Title" onChange={(e) => record.title = e.target.value}/>
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => <Input type='text' placeholder="Link" onChange={(e) => record.link = e.target.value}/>
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <Upload name="avatar" listType="picture-card" data-id={record.id} className="avatar-uploader" showUploadList={false} beforeUpload={beforeImageUpload} onChange={setImageInObject(event)} fileList={[]}>
                {
                record.image ? (
                    <LazyLoadImage
                        src={URL.createObjectURL(record.image)}
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
            render: (text, record) => <Input type="number" placeholder="Sort Order" onChange={(e) => record.sort_order = parseInt(e.target.value)} />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button size="" title="Remove" type="danger"><FeatherIcon icon="minus" onClick={() => removeRow(record.id)} /></Button>
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
                "sort_order": ""
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

                            <Form
                                style={{ width: '100%' }}
                                form={form}
                                name="addBanner"
                                onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }} >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please Enter Banner Name" }]}
                                    name="banner_name" label="Banner Name" >
                                    <Input placeholder='Enter Banner Name' />
                                </Form.Item>

                                <Form.Item label="Status">
                                    <Switch checked={bannerStatus} onChange={checked => setBannerStatus(checked)} checkedChildren="ON" unCheckedChildren="OFF" />
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
                                    <Button size="small" title="Add Banner" htmlType="button" type="primary">
                                        <FeatherIcon icon="plus" onClick={addNewRow} />
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

                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddBanner;
