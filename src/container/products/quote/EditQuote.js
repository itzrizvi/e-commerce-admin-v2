import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Upload, Spin, Table, Modal } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../../container/styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { bannerQuery } from '../../../apollo/banner';
import apolloClient, { apolloUploadClient } from '../../../apollo';
import { errorImageSrc, renderImage } from '../../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FeatherIcon from 'feather-icons-react';
import queryString from 'query-string';
import { viewPermission } from '../../../utility/utility';
import 'react-lazy-load-image-component/src/effects/blur.css';

const EditQuote = () => {
  viewPermission('quote');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerStatus, setBannerStatus] = useState(true);
  const [image, setImage] = useState('');
  const maxLength = 50;
  const [form] = Form.useForm();
  const [bannerData, setBannerData] = useState([]);
  const [singleBanner, setSingleBanner] = useState({ data: {}, loading: true, error: '' });

  useEffect(() => {
    apolloClient
      .query({
        query: bannerQuery.GET_SINGLE_BANNER,
        variables: {
          banner_id: parseInt(params?.id),
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleBanner;
        if (!data.status) return;
        setSingleBanner({ data: data?.data, loading: false, error: '' });
        const all_banner_data = [];
        data?.data?.banner_items.forEach(val => {
          all_banner_data.push({
            banner_id: val.id,
            title: val.title,
            sub_title: val.sub_title,
            button_text: val.button_text,
            option_1: val.option_1,
            option_2: val.option_2,
            price: val.price,
            sale_price: val.sale_price,
            link: val.link,
            image: val.image,
            sort_order: val.sort_order,
          });
        });
        setBannerData(all_banner_data);
        setBannerStatus(data?.data?.status);
        form.setFieldsValue({
          name: data?.data?.name,
        });
      })
      .catch(err => {
        console.log(err);
        setSingleBanner({ data: {}, loading: false, error: 'Something went worng' });
      });
  }, []);

  //Submit Form
  const handleSubmit = values => {
    let check_point = true;
    bannerData.forEach(val => {
      if (check_point && (val.image == '' || val.title == '')) {
        toast.info('Please Provide All Banner Image and Title!');
        check_point = false;
        return;
      }
    });

    if (check_point) {
      setIsLoading(true);
      const data = { ...values, status: bannerStatus, banner_id: singleBanner?.data?.id };

      apolloClient
        .mutate({
          mutation: bannerQuery.BANNER_UPDATE,
          variables: { data },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
              'Apollo-Require-Preflight': 'true',
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
            {
              query: bannerQuery.GET_SINGLE_BANNER,
              variables: {
                banner_id: parseInt(params?.id),
              },
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            }
          ],
        })
        .then(res => {
          if (bannerData.length === 0) {
            setIsLoading(false);
            toast.success('Banner Updated Successfully!');
            setTimeout(() => {
              history.push('/admin/banner/list');
            }, 1000);
          }
          bannerData.forEach((val, index) => {
            if (val?.isNew) {
              apolloUploadClient
                .mutate({
                  mutation: bannerQuery.BANNER_ITEM_ADD,
                  variables: {
                    data: {
                      banner_id: singleBanner?.data?.id,
                      title: val.title,
                      sort_order: val.sort_order,
                      link: val.link,
                      image: val.image,
                      sub_title: val.sub_title,
                      button_text: val.button_text,
                      option_1: val.option_1,
                      option_2: val.option_2,
                      price: val.price,
                      sale_price: val.sale_price,
                    },
                  },
                  context: {
                    headers: {
                      TENANTID: process.env.REACT_APP_TENANTID,
                      Authorization: token,
                    },
                  },
                })
                .then(res => {
                  if (bannerData.length === index + 1) {
                    setIsLoading(false);
                    toast.success('Banner Updated Successfully!');
                    setTimeout(() => {
                      history.push('/admin/banner/list');
                    }, 1000);
                  }
                })
                .catch(err => {
                  toast.error('Something Went wrong!!');
                });
            } else {
              let data_var;
              if (typeof val.image == 'string')
                data_var = {
                  id: val.banner_id,
                  title: val.title,
                  sort_order: val.sort_order,
                  link: val.link,
                  banner_id: singleBanner?.data?.id,
                  sub_title: val.sub_title,
                  button_text: val.button_text,
                  option_1: val.option_1,
                  option_2: val.option_2,
                  price: val.price,
                  sale_price: val.sale_price,
                };
              else
                data_var = {
                  id: val.banner_id,
                  title: val.title,
                  sort_order: val.sort_order,
                  link: val.link,
                  image: val.image,
                  banner_id: singleBanner?.data?.id,
                  sub_title: val.sub_title,
                  button_text: val.button_text,
                  option_1: val.option_1,
                  option_2: val.option_2,
                  price: val.price,
                  sale_price: val.sale_price,
                };
              apolloUploadClient
                .mutate({
                  mutation: bannerQuery.BANNER_ITEM_UPDATE,
                  variables: { data: data_var },
                  context: {
                    headers: {
                      TENANTID: process.env.REACT_APP_TENANTID,
                      Authorization: token,
                    },
                  },
                })
                .then(_ => {
                  if (bannerData.length === index + 1) {
                    setIsLoading(false);
                    toast.success('Banner Updated Successfully!');
                    setTimeout(() => {
                      history.push('/admin/banner/list');
                    }, 1000);
                  }
                })
                .catch(err => {
                  toast.error('Something Went wrong!!');
                });
            }
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

    if (isLt2M) {
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

  const setImageInObject = e => {
    if (e && 'target' in e && 'getAttribute' in e.target) {
      const data_id = e.target.getAttribute('data-id');
      if (data_id) {
        let shawlow_copy = bannerData;
        shawlow_copy.map(ele => {
          if (ele.banner_id == data_id) {
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
        <Input
          type="text"
          defaultValue={record.title}
          placeholder="Title"
          onChange={e => (record.title = e.target.value)}
        />
      ),
    },
    {
      title: 'Sub Title',
      dataIndex: 'sub_title',
      key: 'sub_title',
      width: 200,
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.sub_title}
          placeholder="Sub Title"
          onChange={e => (record.sub_title = e.target.value)}
        />
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 200,
      render: (text, record) => (
        <Input
          defaultValue={record.link}
          type="text"
          placeholder="Link"
          onChange={e => (record.link = e.target.value)}
        />
      ),
    },
    {
      title: 'Button Text',
      dataIndex: 'button_text',
      key: 'button_text',
      width: 200,
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Button Text"
          defaultValue={record.button_text}
          onChange={e => (record.button_text = e.target.value)}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (text, record) => (
        <Input
          type="number"
          defaultValue={record.price}
          placeholder="Price"
          onChange={e => (record.price = e.target.value)}
        />
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
          defaultValue={record.sale_price}
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
          data-id={record.banner_id}
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeImageUpload}
          onChange={setImageInObject(event)}
          fileList={[]}
        >
          {record.image ? (
            <LazyLoadImage
              src={
                typeof record.image === 'string'
                  ? renderImage(params?.id, record.image, 'banner', '', true)
                  : URL.createObjectURL(record.image)
              }
              onError={errorImageSrc}
              alt="image"
              effect="blur"
              visibleByDefault={image.src === '/public/loading.webp'}
              style={{
                width: '100%',
              }}
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
        <Input
          type="text"
          defaultValue={record.option_1}
          placeholder="Optional One"
          onChange={e => (record.option_1 = e.target.value)}
        />
      ),
    },
    {
      title: 'Optional Two',
      dataIndex: 'option_2',
      key: 'option_2',
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Optional Two"
          defaultValue={record.option_2}
          onChange={e => (record.option_2 = e.target.value)}
        />
      ),
    },
    {
      title: 'Sort Order',
      dataIndex: 'sort_order',
      key: 'sort_order',
      width: 80,
      render: (text, record) => (
        <Input
          type="number"
          defaultValue={record.sort_order}
          placeholder="Sort Order"
          onChange={e => (record.sort_order = parseInt(e.target.value))}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => removeRow(record.banner_id)} size="" title="Remove" type="danger">
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    const newData = {
      banner_id: new Date().getTime(),
      title: '',
      link: '',
      image: '',
      sort_order: '',
      isNew: true,
    };
    setBannerData(prevState => [...prevState, newData]);
  };

  const removeRow = banner_id => {
    Modal.confirm({
      title: 'Slider Remove Confirmation!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to permanently remove this slider?',
      okText: 'Remove',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        const filter_verify = bannerData.find(o => o.banner_id === banner_id);
        if (filter_verify?.isNew) {
          toast.success('Slider Removed successfully');
          setBannerData(prevState => {
            return prevState.filter(value => value.banner_id !== banner_id);
          });
        } else {
          apolloClient
            .mutate({
              mutation: bannerQuery.BANNER_ITEM_DELETE,
              variables: { banner_id: parseInt(banner_id) },
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            })
            .then(res => {
              if (res?.data?.deleteBannerItem?.status) {
                toast.success('Slider Removed successfully');
                setBannerData(prevState => {
                  return prevState.filter(value => value.banner_id !== banner_id);
                });
              }
            })
            .catch(err => {
              toast.error('Something Went wrong!!');
            });
        }
      },
    });
  };

  return (
    <>
      <PageHeader
        title={`Manage Banner | Edit Banner ${singleBanner?.data?.name ? `(${singleBanner?.data?.name})` : ''}`}
      />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleBanner?.loading ? (
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
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please Enter Banner Name' }]}
                    name="name"
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
                    rowKey={'banner_id'}
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
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default EditQuote;
