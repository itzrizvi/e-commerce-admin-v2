import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, Upload, InputNumber, Spin, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { brandQuery } from '../../apollo/brand';
import apolloClient from '../../apollo';
import { apolloUploadClient } from '../../apollo';
import { errorImageSrc } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { viewPermission } from '../../utility/utility';
import configMessage from '../../config/config_message';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddBrand = () => {
  viewPermission('manufacture');
  const { TextArea } = Input;
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brandStatus, setBrandStatus] = useState(true);
  const [image, setImage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [order, setOrder] = useState(0);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const maxLength = 30;
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    apolloClient
      .query({
        query: brandQuery.GET_CATEGORIES,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getParentCategories?.categories;
        setCategories(data);
        setLoading(false);
      })
  }, []);

  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    const modify_category = [];
    category.forEach(val => {
      modify_category.push({ cat_id: val });
    });

    if (modify_category.length === 0) {
      setIsLoading(false);
      return message.error(configMessage.CATEGORY_EMPTY);
    }

    const data = { ...values, brandStatus: brandStatus, brandSortOrder: order, categories: modify_category };
    apolloUploadClient
      .mutate({
        mutation: image ? brandQuery.BRAND_ADD : brandQuery.BRAND_ADD_WI,
        variables: image ? { data, file: image } : { data },
        refetchQueries: [
          {
            query: brandQuery.GET_ALL_BRAND,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
          ['getAllBrands'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.createBrand;
        if (!data?.status) return InternalErrorMessage();
        setTimeout(() => {
          history.push('/admin/brand/list');
        }, 1000);
        message.success(data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Assign Image
  const beforeImageUpload = file => {
    const isJpg = file.type === 'image/jpeg';
    if (!isJpg) message.error(configMessage.ONLY_JPG_FILE_UPLOAD);
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) message.error(configMessage.FILE_MAX_1MB);

    if (isJpg && isLt2M) {
      setThumbnail(URL.createObjectURL(file));
      setImage(file);
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

  return (
    <>
      <PageHeader title="Add Manufacture" />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addBrand"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please Enter Manufacture Name' }]}
                    name="brandName"
                    label="Name"
                  >
                    <Input placeholder="Enter Manufacture Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please Enter Manufacture Description' }]}
                    name="brandDescription"
                    label="Description"
                  >
                    <TextArea rows={4} placeholder="Enter Manufacture Description" />
                  </Form.Item>

                  <Form.Item label="Categories" required>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Select Categories"
                      initialvalues=""
                      onChange={e => setCategory(e)}
                      optionLabelProp="label"
                    >
                      {categories.map(val => {
                        return (
                          <Select.Option key={val.id} value={val.id} label={val.cat_name}>
                            <div className="demo-option-label-item">{val.cat_name}</div>
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Sort Order">
                    <InputNumber defaultValue={0} onChange={setOrder} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Status">
                    <Switch
                      checked={brandStatus}
                      onChange={checked => setBrandStatus(checked)}
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                    />
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
                        <Button style={{ marginLeft: 10 }} type="light" size="default">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddBrand;
