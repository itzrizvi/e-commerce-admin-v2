import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message, Checkbox, DatePicker } from 'antd';


import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { AddProductForm } from './Style';
import Heading from '../../components/heading/heading';
import apolloClient, { authMutation, productMutation } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { gql } from '@apollo/client';

// import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
const { Dragger } = Upload;

const AddProduct = () => {
  const [availableFrom, setAvailableFrom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.auth.token);

  const [form] = Form.useForm();
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

  const handleSubmit = values => {
    setIsLoading(true);

    apolloClient.mutate({
      mutation: productMutation.ADD_PRODUCT_MUTATION,
      variables: { data: { ...values, product_available_from: availableFrom } },
      context: {
        headers: {
          TENANTID: 100001,
          Authorization: token
        }
      }
    }).then(res => {
      console.log("add product res", res)
    }).catch(err => {
      console.log("add product err", err)

    }).finally(() => setIsLoading(false))

    // setState({ ...state, submitValues: values });
  };



  return (
    <>
      <PageHeader
        ghost
        title="Add Product"
      // buttons={[
      //   <div key="1" className="page-header-actions">
      //     <CalendarButtonPageHeader key="1" />
      //     <ExportButtonPageHeader key="2" />
      //     <ShareButtonPageHeader key="3" />
      //     <Button size="small" key="4" type="primary">
      //       <FeatherIcon icon="plus" size={14} />
      //       Add New
      //     </Button>
      //   </div>,
      // ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form
                      style={{ width: '100%' }}
                      form={form}
                      name="addProduct"
                      onFinish={handleSubmit}
                      onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                      layout={'vertical'}
                    >
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Product">
                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_name" label="Product Name">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_description" label="Product Description">
                                    <Input.TextArea rows={5} />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_meta_tag_title" label="Meta Title">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_meta_tag_description" label="Meta description">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_meta_tag_keywords" label="Meta Keywords">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_tags" label="Tags">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_image" label="Image">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_image_gallery" label="Image Gallery">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_sku" label="Product sku">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_regular_price" label="Regular Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_sale_price" label="Sale Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>


                                  <Form.Item name="product_tax_included" valuePropName="checked" noStyle>
                                    <Checkbox>Tax Include</Checkbox>
                                  </Form.Item>


                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_stock_quantity" label="Stock Quantity">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_minimum_stock_quantity" label="Minimum Stock Quantity">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_stock_status" initialValue="" label="Stock Status">
                                    <Select style={{ width: '100%' }}>
                                      <Option value="In-Stock">In Stock</Option>
                                      <Option value="Not-In-Stock">Not In Stock</Option>
                                    </Select>
                                  </Form.Item>


                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_available_from" label="Available from">
                                    <DatePicker
                                      showTime
                                      onChange={(value, dateString) => {
                                        const gmtString = new Date(dateString).toGMTString();
                                        setAvailableFrom(gmtString)
                                      }}

                                    />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_status" initialValue="" label="Product Status">
                                    <Select style={{ width: '100%' }}>
                                      <Option value="Active">Active</Option>
                                      <Option value="Inactive">Inactive</Option>
                                    </Select>
                                  </Form.Item>


                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_barcode" label="Barcode">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    rules={[{ required: true }]}
                                    name="product_category" label="Category">
                                    <Input />
                                  </Form.Item>



                                  {/* <Form.Item required name="category" initialValue="" label="Category">
                                    <Select style={{ width: '100%' }}>
                                      <Option value="">Please Select</Option>
                                      <Option value="wearingClothes">Wearing Clothes</Option>
                                      <Option value="sunglasses">Sunglasses</Option>
                                      <Option value="t-shirt">T-Shirt</Option>
                                    </Select>
                                  </Form.Item>

                                  <Form.Item required name="discount" label="Discount">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend f">
                                        <FeatherIcon icon="percent" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  <Form.Item required name="status" label="Status">
                                    <Radio.Group>
                                      <Radio value="Published">Published</Radio>
                                      <Radio value="Draft">Draft</Radio>
                                    </Radio.Group>
                                  </Form.Item>

                                  <Form.Item required name="mTitle" label="Meta Title">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item required name="mKeyword" label="Meta Keyword">
                                    <Input />
                                  </Form.Item> */}
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* fn- note: images code */}
                        {/* <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Product Image">
                                  <Dragger {...fileUploadProps}>
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
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div> */}

                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button loading={isLoading} size="large" htmlType="submit" type="primary" raised>
                              {isLoading ? 'Processing' : 'Save Product'}
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
