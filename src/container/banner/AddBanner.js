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
import { viewPermission } from '../../utility/utility';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AddBanner = () => {
  viewPermission('banner');
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerStatus, setBannerStatus] = useState(true);
  const [image, setImage] = useState('');
  const maxLength = 50;
  const [form] = Form.useForm();

  const initialData = {
    id: new Date().getTime(),
    title: '',
    link: '',
    image: '',
    sort_order: '',
    sub_title: '',
    button_text: '',
    option_1: '',
    option_2: '',
    price: '',
    sale_price: '',
    action: '',
  };
  const [bannerData, setBannerData] = useState([initialData]);

  //Submit Form
  const handleSubmit = values => {
    let check_point = true;
    bannerData.forEach(val => {
      if (check_point && (val.image == '' || val.title == '')) {
        toast.info('Please Provide All Banner Image First!');
        check_point = false;
        return;
      }
    });

    if (check_point) {
      setIsLoading(true);
      const data = { ...values, banner_status: bannerStatus };
      apolloClient
        .mutate({
          mutation: bannerQuery.BANNER_ADD,
          variables: { data },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
              'Apollo-Require-Preflight': 'true'
            },
          },
          refetchQueries: [
            {
              query: bannerQuery.GET_ALL_BANNER,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            },
            ['getAllBanners'],
          ],
        })
        .then(res => {
          const data = res?.data?.addBanner;
          if (!data?.status) return toast.error('Something Went wrong !');
          const banner_id = data?.data?.id;
          bannerData.forEach((val, index) => {
            apolloUploadClient
              .mutate({
                mutation: bannerQuery.BANNER_ITEM_ADD,
                variables: {
                  data: {
                    banner_id: banner_id,
                    title: val.title,
                    sub_title: val.sub_title,
                    sort_order: val.sort_order,
                    link: val.link,
                    button_text: val.button_text,
                    option_1: val.option_1,
                    option_2: val.option_2,
                    price: val.price,
                    sale_price: val.sale_price,
                    image: val.image,
                  },
                },
                context: {
                  headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token,
                  },
                },
              })
              .then(_ => {
                if (bannerData.length === index + 1) {
                  history.push('/admin/banner/list');
                  setIsLoading(false);
                  toast.success('Banner Added Successfully!');
                }
              })
              .catch(err => {
                toast.error('Something Went wrong !!');
              });
          });
        })
        .catch(err => {
          toast.error('Something Went wrong !!!');
        });
    }
  };

  // Assign Image
  const beforeImageUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) toast.error('Image must smaller than 2MB!');
    if (isLt2M) setImage(file);
    return false;
  };

  // Upload Button Design
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}> Upload </div>
    </div>
  );

  const setImageInObject = e => {
    if (e && 'target' in e && 'getAttribute' in e.target) {
      const data_id = e.target.getAttribute('data-id');
      if (data_id) {
        let shawlow_copy = bannerData;
        shawlow_copy.map(ele => {
          if (ele.id == data_id) {
            ele.image = image;
          }
          return ele;
        });
      }
    }
  };

  // List For Table Column
  const column = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (text, record) => (
        <Input type="text" placeholder="Title" onChange={e => (record.title = e.target.value)} />
      ),
    },
    {
      title: 'Sub Title',
      dataIndex: 'sub_title',
      key: 'sub_title',
      width: 200,
      render: (text, record) => (
        <Input type="text" placeholder="Sub Title" onChange={e => (record.sub_title = e.target.value)} />
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 200,
      render: (text, record) => <Input type="text" placeholder="Link" onChange={e => (record.link = e.target.value)} />,
    },
    {
      title: 'Button Text',
      dataIndex: 'button_text',
      key: 'button_text',
      width: 200,
      render: (text, record) => (
        <Input type="text" placeholder="Button Text" onChange={e => (record.button_text = e.target.value)} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (text, record) => (
        <Input type="number" placeholder="Price" onChange={e => (record.price = e.target.value)} />
      ),
    },
    {
      title: 'Sale Price',
      dataIndex: 'sale_price',
      key: 'sale_price',
      width: 100,
      render: (text, record) => (
        <Input
          type="number"
          placeholder="Sale Price"
          onChange={e => (record.sale_price = e.target.value)}
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (text, record) => (
        <Upload
          name="avatar"
          listType="picture-card"
          data-id={record.id}
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeImageUpload}
          onChange={setImageInObject(event)}
          fileList={[]}
        >
          {record.image ? (
            <LazyLoadImage
              src={URL.createObjectURL(record.image)}
              onError={errorImageSrc}
              alt="image"
              effect="blur"
              style={{
                width: '100%',
              }}
              visibleByDefault={image.src === '/public/loading.webp'}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: 'Optional One',
      dataIndex: 'option_1',
      key: 'option_1',
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <Input type="text" placeholder="Optional One" onChange={e => (record.option_1 = e.target.value)} />
      ),
    },
    {
      title: 'Optional Two',
      dataIndex: 'option_2',
      key: 'option_2',
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <Input type="text" placeholder="Optional Two" onChange={e => (record.option_2 = e.target.value)} />
      ),
    },
    {
      title: 'Sort Order',
      dataIndex: 'sort_order',
      key: 'sort_order',
      width: 80,
      render: (text, record) => (
        <Input type="number" placeholder="Sort Order" onChange={e => (record.sort_order = parseInt(e.target.value))} />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 50,
      render: (text, record) => (
        <Button size="small" title="Remove" type="danger" onClick={() => removeRow(record.id)}>
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    const newData = {
      id: new Date().getTime(),
      title: '',
      sub_title: '',
      link: '',
      image: '',
      sort_order: '',
      button_text: '',
      option_1: '',
      option_2: '',
      price: '',
      sale_price: '',
    };
    setBannerData(prevState => [...prevState, newData]);
  };

  const removeRow = id => {
    setBannerData(prevState => {
      return prevState.filter(value => value.id !== id);
    });
  };

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
                labelCol={{ span: 4 }}
              >
                <Form.Item
                  rules={[{ required: true, max: maxLength, message: 'Please Enter Banner Name' }]}
                  name="banner_name"
                  label="Banner Name"
                >
                  <Input placeholder="Enter Banner Name" />
                </Form.Item>

                <Form.Item label="Status">
                  <Switch
                    checked={bannerStatus}
                    onChange={checked => setBannerStatus(checked)}
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                  />
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
                  <Button onClick={addNewRow} size="small" title="Add Banner" htmlType="button" type="primary">
                    <FeatherIcon icon="plus" />
                  </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Form.Item>
                    <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                      {isLoading ? 'Processing' : 'Save'}
                    </Button>
                    <Link to="/admin/banner/list">
                      <Button style={{ marginLeft: 10 }} type="light" size="default">
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
