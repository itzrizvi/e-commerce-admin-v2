import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, Upload, InputNumber } from 'antd';
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

const AddBrand = () => {
    const { TextArea } = Input;
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)
    const [role_status, setRole_status] = useState(true)
    const [image, setImage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [order, setOrder] = useState(0);
    const [category, setCategory] = useState([]);
    const maxLength = 30
    const [form] = Form.useForm();

    const handleSubmit = values => {
       setIsLoading(true)
       const modify_category = [];
       category.forEach(val => {
           modify_category.push(
               {"cat_id": val},
           )
       })
       const data = { ...values, brandStatus: role_status, image, brandSortOrder: order }
       console.log(data);
        apolloClient.mutate({
            mutation: brandQuery.BRAND_ADD,
            variables: { data },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            console.log(res);
            // const data = res?.data?.createRoleWithPermission
            // if (!data?.status) return toast.error('Something Went wrong !!');
            // toast.success(`${values.role} Role created successfully.`);
            history.push("/admin/brand/list");
        }).catch(err => {
            toast.error('Something Went wrong !!');
        }).finally(() => setIsLoading(false))
    };

    const beforeImageUpload = (file) => {
        const isJpg = file.type === 'image/jpeg';
        if (!isJpg) toast.error('You can only upload JPG file!')
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) toast.error('Image must smaller than 2MB!');

        if( isJpg && isLt2M ){
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

    return (
        <>
            <PageHeader 
                title="Edit Manufacture" 
                buttons={[
                    <div key="1">
                        <Switch checked={role_status} onChange={checked => setRole_status(checked)} checkedChildren="ON" unCheckedChildren="OFF" />
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
                                onFinish={handleSubmit}
                                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                                labelCol={{ span: 4 }} >
                                <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter Manufacture Name" }]}
                                    name="brandName" label="Name" >
                                    <Input placeholder='Enter Manufacture Name' />
                                </Form.Item>
                                <Form.Item
                                    rules={[{ required: true, message: "Please enter Manufacture Description" }]}
                                    name="brandDescription" label="Description"
                                >
                                    <TextArea rows={4} placeholder="Enter Manufacture Description" />
                                </Form.Item>

                                <Form.Item label="Categories">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select Categories"
                                        initialvalues={['china']}
                                        onChange={(e) => setCategory(e)}
                                        optionLabelProp="label"
                                    >
                                        <Select.Option value="china" label="China">
                                            <div className="demo-option-label-item">
                                                China
                                            </div>
                                        </Select.Option>
                                        <Select.Option value="usa" label="USA">
                                            <div className="demo-option-label-item">
                                                USA
                                            </div>
                                        </Select.Option>
                                        <Select.Option value="japan" label="Japan">
                                            <div className="demo-option-label-item">
                                                Japan
                                            </div>
                                        </Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Sort Order">
                                    <InputNumber initialvalues={0} onChange={setOrder} style={{ width: '100%' }} />
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
                                            <img
                                                src={thumbnail}
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

                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
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
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AddBrand;
