import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Upload, Spin, Table, Modal } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { bannerQuery } from '../../apollo/banner';
import apolloClient, { apolloUploadClient } from '../../apollo';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FeatherIcon from 'feather-icons-react';
import queryString from 'query-string'

const AddBanner = () => {
    const { search } = useLocation();
    const params = queryString.parse(search)
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)
    const [bannerStatus, setBannerStatus] = useState(true)
    const [image, setImage] = useState('');
    const maxLength = 50
    const [form] = Form.useForm();
    const [bannerData, setBannerData] = useState([]);
    const [singleBanner, setSingleBanner] = useState({ data: {}, loading: true, error: '' })

    useEffect(() => {
        apolloClient.query({
            query: bannerQuery.GET_SINGLE_BANNER,
            variables: {
                banner_uuid: params?.id
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getSingleBanner
            if (!data.status) return;
            setSingleBanner({ data: data?.data, loading: false, error: '' })
            const all_banner_data = []
            data?.data?.bannerimages.forEach(val => {
                all_banner_data.push({
                    "banner_id": val.banner_uuid,
                    "title": val.title,
                    "link": val.link,
                    "image": val.image,
                    "sort_order": val.sort_order,
                })
            })
            setBannerData(all_banner_data)
            setBannerStatus(data?.data?.banner_status)
            form.setFieldsValue({
                "banner_name": data?.data?.banner_name
            })
        }).catch(err => {
            console.log(err);
            setSingleBanner({ data: {}, loading: false, error: 'Something went worng' })
        })
    }, [])

    //Submit Form 
    const handleSubmit = values => {
        let check_point = true;
        bannerData.forEach(val => {
            if (check_point && (val.image == "" || val.title == "")) {
                toast.info("Please Provide All Banner Image and Title!");
                check_point = false;
                return;
            }
        });

        if (check_point) {
            setIsLoading(true)
            const data = { ...values, banner_status: bannerStatus, banner_uuid: singleBanner?.data?.banner_uuid }

            apolloClient.mutate({
                mutation: bannerQuery.BANNER_UPDATE,
                variables: { data },
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token
                    }
                },
                refetchQueries: [
                    {
                    query: bannerQuery.GET_ALL_BANNER,
                    context: {
                        headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token
                        }
                    }
                    },
                    'getAllBanners'
                ],
            }).then(res => {
                bannerData.forEach(val => {
                    if(val?.isNew){
                        apolloUploadClient.mutate({
                            mutation: bannerQuery.BANNER_IMAGE_ADD,
                            variables: { data: { banner_id: singleBanner?.data?.banner_uuid, title: val.title, sort_order: val.sort_order, link: val.link, image: val.image } },
                            context: {
                                headers: {
                                    TENANTID: process.env.REACT_APP_TENANTID,
                                    Authorization: token
                                }
                            }
                        }).then(res => {
                            // console.log(res);
                        }).catch(err => {
                            toast.error('Something Went wrong!!');
                        })
                    }else{
                        let data_var;
                        if( typeof val.image == 'string' ) data_var = { banner_id: singleBanner?.data?.banner_uuid, banner_uuid: val.banner_id, title: val.title, sort_order: val.sort_order, link: val.link }
                        else data_var = { banner_id: singleBanner?.data?.banner_uuid, banner_uuid: val.banner_id, title: val.title, sort_order: val.sort_order, link: val.link, image: val.image }
                        apolloUploadClient.mutate({
                            mutation: bannerQuery.BANNER_IMAGE_UPDATE,
                            variables: { data: data_var },
                            context: {
                                headers: {
                                    TENANTID: process.env.REACT_APP_TENANTID,
                                    Authorization: token
                                }
                            }
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            toast.error('Something Went wrong!!');
                        })
                    }
    
                })
            }).catch(err => {
                toast.error('Something Went wrong !!!');
            }).finally(() =>{
                setIsLoading(false)
                history.push("/admin/banner/list");
                toast.success("Banner Updated Successfully!");
                setTimeout(() => {
                    window.location.reload(); 
                }, 1000);
            })
        }
    };

    // Assign Image
    const beforeImageUpload = (file) => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) toast.error('Image must smaller than 1MB!');

        if (isJpg && isLt2M) {
            setImage(file)
        }

        return false;
    }

    // Upload Button Design
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}> Upload </div>
        </div>
    );

    const setImageInObject = (e) => {
        if (e && "target" in e && 'getAttribute' in e.target) {
            const data_id = e.target.getAttribute("data-id");
            if (data_id) {
                let shawlow_copy = bannerData;
                shawlow_copy.map(ele => {
                    if (ele.banner_id == data_id) {
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
            render: (text, record) => <Input type='text' defaultValue={record.title} placeholder="Title" onChange={(e) => record.title = e.target.value} />
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text, record) => <Input type='text' defaultValue={record.link} placeholder="Link" onChange={(e) => record.link = e.target.value} />
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <Upload
                name="avatar"
                listType="picture-card"
                data-id={record.banner_id}
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeImageUpload}
                onChange={setImageInObject(event)} fileList={[]}
            >
                {
                    record.image ? (
                        <LazyLoadImage
                            src={ typeof record.image === 'string' ? renderImage(params?.id, record.image, 'banner', '128x128') : URL.createObjectURL(record.image)}
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
            render: (text, record) => <Input type="number" defaultValue={record.sort_order} placeholder="Sort Order" onChange={(e) => record.sort_order = parseInt(e.target.value)} />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button size="" title="Remove" type="danger"><FeatherIcon icon="minus" onClick={() => removeRow(record.banner_id)} /></Button>
        },
    ];

    // Adding new row on table
    const addNewRow = () => {
        const newData = (
            {
                "banner_id": new Date().getTime(),
                "title": "",
                "link": "",
                "image": "",
                "sort_order": "",
                "isNew": true
            }
        )
        setBannerData(prevState => [...prevState, newData])
    }

    const removeRow = (banner_id) => {
        Modal.confirm({
            title: 'Slider Remove Confirmation!',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to permanently remove this slider?',
            okText: 'Remove',
            cancelText: 'Cancel',
            okType: 'danger',
            onOk: () => {
                const filter_verify = bannerData.find(o => o.banner_id === banner_id);
                if(filter_verify?.isNew){
                    toast.success("Slider Removed successfully");
                    setBannerData(prevState => {
                        return prevState.filter((value) => value.banner_id !== banner_id)
                    })
                }else{
                    apolloUploadClient.mutate({
                        mutation: bannerQuery.BANNER_IMAGE_DELETE,
                        variables: { banner_uuid: banner_id},
                        context: {
                            headers: {
                                TENANTID: process.env.REACT_APP_TENANTID,
                                Authorization: token
                            }
                        }
                    }).then(res => {
                        if(res?.data?.deleteBannerImage?.status){
                            toast.success("Slider Removed successfully");
                            setBannerData(prevState => {
                                return prevState.filter((value) => value.banner_id !== banner_id)
                            })
                        }
                    }).catch(err => {
                        toast.error('Something Went wrong!!');
                    })
                }
                
            }
          });

    }

    return (
        <>
            <PageHeader title={ `Manage Banner | Edit Banner ${singleBanner?.data?.banner_name ? `(${singleBanner?.data?.banner_name})` : ""}` }/>

            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {
                                singleBanner?.loading ? (
                                    <div className="spin">
                                        <Spin />
                                    </div>
                                ) : (
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
                                            rowKey={'banner_id'}
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
                                )
                            }
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddBanner;
