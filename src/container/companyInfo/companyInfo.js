import { Button, Col, Form, Input, PageHeader, Row, Spin, Table, Tabs, Upload } from 'antd';
import React, { useState } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { viewPermission } from '../../utility/utility';
import { Main } from '../styled';
import { PlusOutlined } from '@ant-design/icons';
import { errorImageSrc, renderImage } from '../../utility/images';
import FeatherIcon from 'feather-icons-react';
import ApolloClient, { apolloUploadClient } from './../../apollo';
import { companyInfoQuery } from '../../apollo/companyInfo';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';

export default function companyInfo() {
  viewPermission('company-info');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [emailData, setEmailData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [initailData, setInitialData] = useState({
    data: [],
    isLoading: true,
    error: '',
  });
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    ApolloClient.query({
      query: companyInfoQuery.GET_COMPANY_INFO,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: token,
        },
      },
    })
      .then(res => {
        const data = res?.data?.getCompanyInfo;
        if (!data?.status) return;

        setInitialData(s => ({ ...s, data: res?.data?.getCompanyInfo?.data, error: '' }));
        form.setFieldsValue({
          name: data?.data?.name,
          contact_address: data?.data?.contact_address,
          fax: data?.data?.fax,
        });
        setThumbnail(renderImage(process.env.REACT_APP_TENANTID, data?.data?.logo, 'logo', '128x128'));
        setEmailData(data?.data?.company_emails)
        setPhoneData(data?.data?.company_phones)
      })
      .catch(err => {
        setInitialData(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setInitialData(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    let check_point = true;
    emailData.forEach(val => {
      if (check_point && (val.email == '' || val.type == '')) {
        toast.info('Please Provide Email and Type!');
        check_point = false;
        return;
      }
    });

    phoneData.forEach(val => {
      if (check_point && (val.phone == '' || val.type == '')) {
        toast.info('Please Provide All Phone and Type!');
        check_point = false;
        return;
      }
    });

    if (check_point) {
      setIsLoading(true);
      let data;
      let phoneDataNew = [];
      let emailDataNew = [];
      phoneData.forEach(val => {
        if(val.id){
          phoneDataNew.push({
            id: val.id,
            phone: val.phone,
            type: val.type
          })
        }else{
          phoneDataNew.push({
            phone: val.phone,
            type: val.type
          })
        }
       
      })

      emailData.forEach(val => {
        if(val.id){
          emailDataNew.push({
            id: val.id,
            email: val.email,
            type: val.type
          })
        }else{
          emailDataNew.push({
            email: val.email,
            type: val.type
          })
        }
       
      })
      if (image) data = { ...values, logo: image, phone: phoneDataNew, email: emailDataNew };
      else data = { ...values, phone: phoneDataNew, email: emailDataNew };
      apolloUploadClient
        .mutate({
          mutation: companyInfoQuery.COMPANY_INFO,
          variables: { data: data },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
        })
        .then(res => {
          if(res?.data?.companyInfo?.status){
            setIsLoading(false)
            toast.success("Company Info Updated Successfully!");
          }
        })
        .catch(err => {
          toast.error('Something Went wrong!!');
        });
    }
  };

  const EmailColumn = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <Input type="text" defaultValue={record.email} placeholder="Email" onChange={e => (record.email = e.target.value)} />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => <Input type="text" defaultValue={record.type} placeholder="Type" onChange={e => (record.type = e.target.value)} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button title="Remove" type="danger" onClick={() => removeEmail(record.key)}>
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  const PhoneColumn = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <Input type="text" placeholder="Phone" defaultValue={record.phone} onChange={e => (record.phone = e.target.value)} />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => <Input type="text" defaultValue={record.type} placeholder="Type" onChange={e => (record.type = e.target.value)} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button title="Remove" type="danger" onClick={() => removePhone(record.key)}>
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Upload Button Design
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}> Upload </div>
    </div>
  );

  // Assign Image
  const beforeImageUpload = file => {
    const isJpg = file.type === 'image/jpeg';
    if (!isJpg) toast.error('You can only upload JPG file!');
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) toast.error('Image must smaller than 1MB!');

    if (isJpg && isLt2M) {
      setImage(file);
      setThumbnail(URL.createObjectURL(file));
    }

    return false;
  };

  const addNewEmail = () => {
    const newEmailData = {
      email: '',
      type: '',
      key: new Date().getTime() + Math.floor(Math.random() * 900000),
    };
    setEmailData(prevState => [...prevState, newEmailData]);
  };

  const removeEmail = key => {
    setEmailData(prevState => {
      return prevState.filter(value => value.key !== key);
    });
  };

  const addNewPhone = () => {
    const newPhoneData = {
      phone: '',
      type: '',
      key: new Date().getTime() + Math.floor(Math.random() * 900000),
    };
    setPhoneData(prevState => [...prevState, newPhoneData]);
  };

  const removePhone = key => {
    setPhoneData(prevState => {
      return prevState.filter(value => value.key !== key);
    });
  };

  return (
    <>
      <PageHeader title="Company Info" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {initailData.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="company_info"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="General" key="general">
                      <Form.Item
                        rules={[{ required: true, max: 30, message: 'Please Enter Company Name' }]}
                        name="name"
                        label="Company Name"
                      >
                        <Input placeholder="Enter Company Name" />
                      </Form.Item>

                      <Form.Item rules={[{ max: 100 }]} name="contact_address" label="Contact Address">
                        <Input placeholder="Enter Contact Address" />
                      </Form.Item>

                      <Form.Item rules={[{ max: 30 }]} name="fax" label="Company Fax">
                        <Input placeholder="Enter Company Fax" />
                      </Form.Item>
                      <Form.Item label="Logo">
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
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Email" key="email">
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}
                      >
                        <Button onClick={addNewEmail} size="small" title="Add Email" htmlType="button" type="primary">
                          <FeatherIcon icon="plus" />
                        </Button>
                      </div>
                      <Table
                        className="table-responsive"
                        columns={EmailColumn}
                        pagination={false}
                        rowKey={'email'}
                        size="small"
                        dataSource={emailData}
                      />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Contact" key="contact">
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}
                      >
                        <Button onClick={addNewPhone} size="small" title="Add Email" htmlType="button" type="primary">
                          <FeatherIcon icon="plus" />
                        </Button>
                      </div>
                      <Table
                        className="table-responsive"
                        columns={PhoneColumn}
                        pagination={false}
                        rowKey={'phone'}
                        size="small"
                        dataSource={phoneData}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised="true">
                        {isLoading ? 'Processing' : 'Save Information'}
                      </Button>
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
}