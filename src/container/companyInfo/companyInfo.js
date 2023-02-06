import { Button, Col, Form, Input, message, PageHeader, Row, Spin, Table, Tabs, Upload } from 'antd';
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
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import apolloClient from './../../apollo';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
import configMessage from '../../config/config_message';

export default function companyInfo() {
  viewPermission('company-info');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [dark_image, setDarkImage] = useState('');
  const [fav, setFav] = useState('');
  const [emailData, setEmailData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [socialData, setSocialData] = useState([]);
  const [companyInfoId, SetCompanyInfoId] = useState(null);
  const initialAddressData = {
    id: new Date().getTime(),
    parent_id: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    fax: '',
    phone: '',
    status: true,
    isDefault: false,
  };
  const [billingData, setBillingData] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [defaultBilling, setDefaultBilling] = useState(null);
  const [defaultShipping, setDefaultShipping] = useState(null);

  const token = useSelector(state => state.auth.token);
  const [initailData, setInitialData] = useState({
    data: [],
    isLoading: true,
    error: '',
  });
  const [thumbnail, setThumbnail] = useState('');
  const [darkThumbnail, setDarkThumbnail] = useState('');
  const [favThumbnail, setFavThumbnail] = useState('');

  useEffect(() => {
    // GET_COMPANY_INFO
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
        if (!data?.status) return InternalErrorMessage();

        setInitialData(s => ({ ...s, data: res?.data?.getCompanyInfo?.data, error: '' }));
        SetCompanyInfoId(data?.data?.id);
        form.setFieldsValue({
          name: data?.data?.name,
          contact_address: data?.data?.contact_address,
          fax: data?.data?.fax,
        });
        setThumbnail(renderImage(process.env.REACT_APP_TENANTID, data?.data?.logo, 'logo', '', true));
        setDarkThumbnail(renderImage(process.env.REACT_APP_TENANTID, data?.data?.dark_logo, 'dark-logo', '', true));
        setFavThumbnail(renderImage(process.env.REACT_APP_TENANTID, data?.data?.fav_icon, 'fav', '', true));

        setEmailData(
          data?.data?.company_emails.map(item => {
            return { ...item, ...{ key: new Date().getTime() + Math.floor(Math.random() * 900000) } };
          }),
        );
        setPhoneData(
          data?.data?.company_phones.map(item => {
            return { ...item, ...{ key: new Date().getTime() + Math.floor(Math.random() * 900000) } };
          }),
        );
        setSocialData(
          data?.data?.company_socials.map(item => {
            return { ...item, ...{ key: new Date().getTime() + Math.floor(Math.random() * 900000) } };
          }),
        );
        setBillingData(
          data?.data?.billingAddresses.map(add => {
            const { updatedAt, createdAt, __typename, type, isDefault, ...rest } = add;
            if (isDefault) setDefaultBilling(add.id);
            return { ...rest, isDefault: false, isNew: false, parent_id: data?.data?.id };
          }),
        );
        setShippingData(
          data?.data?.shippingAddresses.map(add => {
            const { updatedAt, createdAt, __typename, type, isDefault, ...rest } = add;
            if (isDefault) setDefaultShipping(add.id);
            return { ...rest, isDefault: false, isNew: false, parent_id: data?.data?.id };
          }),
        );
      })
      .finally(() => {
        setInitialData(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    let check_point = true;
    emailData.forEach(val => {
      if (check_point && (val.email == '' || val.type == '')) {
        message.info('Please Provide Email and Type.');
        check_point = false;
        return;
      }
    });

    phoneData.forEach(val => {
      if (check_point && (val.phone == '' || val.type == '')) {
        message.info('Please Provide All Phone and Type.');
        check_point = false;
        return;
      }
    });

    socialData.forEach(val => {
      if (check_point && (val.social == '' || val.type == '')) {
        message.info('Please Provide All Social Name and Type!');
        check_point = false;
        return;
      }
    });

    billingData.forEach(val => {
      const { id, parent_id, phone, email, fax, isDefault, ...rest } = val;
      if (check_point && Object.values(rest).some(x => x === null || x === '')) {
        message.info('Please provide all field properly in billing address tab.');
        check_point = false;
        return;
      }
    });
    shippingData.forEach(val => {
      const { id, parent_id, phone, email, fax, isDefault, ...rest } = val;
      if (check_point && Object.values(rest).some(x => x === null || x === '')) {
        message.info('Please provide all field properly in shipping address tab..');
        check_point = false;
        return;
      }
    });

    // return;

    if (check_point) {
      // company Info
      setIsLoading(true);
      let data;
      let phoneDataNew = [];
      let emailDataNew = [];
      let socialDataNew = [];
      phoneData.forEach(val => {
        if (val.id) {
          phoneDataNew.push({
            id: val.id,
            phone: val.phone,
            type: val.type,
          });
        } else {
          phoneDataNew.push({
            phone: val.phone,
            type: val.type,
          });
        }
      });

      emailData.forEach(val => {
        if (val.id) {
          emailDataNew.push({
            id: val.id,
            email: val.email,
            type: val.type,
          });
        } else {
          emailDataNew.push({
            email: val.email,
            type: val.type,
          });
        }
      });

      socialData.forEach(val => {
        if (val.id) {
          socialDataNew.push({
            id: val.id,
            social: val.social,
            type: val.type,
          });
        } else {
          socialDataNew.push({
            social: val.social,
            type: val.type,
          });
        }
      });
      data = {
        ...values,
        phone: phoneDataNew,
        email: emailDataNew,
        social: socialDataNew,
        ...(image && { logo: image }),
        ...(dark_image && { dark_logo: dark_image }),
        ...(fav && { fav_icon: fav }),
      };
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
          if (res?.data?.companyInfo?.status) {
            setIsLoading(false);
            message.success('Company Info Updated Successfully!');
          }
        });
    }

    if (check_point) {
      //billing
      let variables;
      let type = 'add';

      setIsLoading(true);
      if (!initailData.data.billingAddresses.length) {
        // add billing
        variables = {
          data: {
            addresses: billingData.map(add => {
              const { id, countryCode, states, ...rest } = add;
              return id === defaultBilling ? { ...rest, isDefault: true } : rest;
            }),
          },
        };
      } else {
        // update billing
        type = 'update';
        variables = {
          data: {
            ref_id: parseInt(companyInfoId),
            type: 'billing',
            addresses: billingData.map(add => {
              const { id, isNew, states, countryCode, ...rest } = add;
              const addresses = id === defaultBilling ? { ...rest, isDefault: true } : rest;
              if (isNew === undefined) {
                addresses.isNew = true;
              } else {
                addresses.isNew = false;
                addresses.id = id;
              }

              return addresses;
            }),
          },
        };
      }

      if (!billingData.length && type === 'add') return;
      // return
      apolloClient
        .mutate({
          mutation:
            type === 'add' ? companyInfoQuery.ADD_COMPANY_BILLING_ADDRESS : companyInfoQuery.UPDATE_COMPANY_ADDRESS,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
        })
        .then(res => {
          const data = type === 'add' ? res?.data?.addCompanyBillingAddress : res?.data?.updateCompanyAddress;
          if (!data?.status) return InternalErrorMessage();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (check_point) {
      //shipping
      let variables;
      let type = 'add';
      setIsLoading(true);

      if (!initailData.data.shippingAddresses.length) {
        // add shipping
        variables = {
          data: {
            addresses: shippingData.map(add => {
              const { id, states, countryCode, ...rest } = add;
              return id === defaultShipping ? { ...rest, isDefault: true } : rest;
            }),
          },
        };
      } else {
        // update shipping
        type = 'update';
        variables = {
          data: {
            ref_id: parseInt(companyInfoId),
            type: 'shipping',
            addresses: shippingData.map(add => {
              const { id, isNew, countryCode, states, ...rest } = add;
              const addresses = id === defaultShipping ? { ...rest, isDefault: true } : rest;
              if (isNew === undefined) {
                addresses.isNew = true;
              } else {
                addresses.isNew = false;
                addresses.id = id;
              }

              return addresses;
            }),
          },
        };
      }

      if (!shippingData.length && type === 'add') return;
      // return
      apolloClient
        .mutate({
          mutation:
            type === 'add' ? companyInfoQuery.ADD_COMPANY_SHIPPING_ADDRESS : companyInfoQuery.UPDATE_COMPANY_ADDRESS,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
        })
        .then(res => {
          const data = type === 'add' ? res.data.addCompanyShippingAddress : 'update';
          if (!data?.status) return InternalErrorMessage();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const EmailColumn = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.email}
          placeholder="Email"
          onChange={e => (record.email = e.target.value)}
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.type}
          placeholder="Type"
          onChange={e => (record.type = e.target.value)}
        />
      ),
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
        <Input
          type="text"
          placeholder="Phone"
          defaultValue={record.phone}
          onChange={e => (record.phone = e.target.value)}
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.type}
          placeholder="Type"
          onChange={e => (record.type = e.target.value)}
        />
      ),
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

  const SocialColumn = [
    {
      title: 'Social',
      dataIndex: 'social',
      key: 'social',
      render: (text, record) => (
        <Input
          type="text"
          placeholder="Social Name"
          defaultValue={record.social}
          onChange={e => (record.social = e.target.value)}
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <Input
          type="text"
          defaultValue={record.type}
          placeholder="Type"
          onChange={e => (record.type = e.target.value)}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button title="Remove" type="danger" onClick={() => removeSocial(record.key)}>
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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) message.error(configMessage.FILE_MAX_2MB);

    if (isLt2M) {
      setImage(file);
      setThumbnail(URL.createObjectURL(file));
    }

    return false;
  };

  // Assign Image
  const beforeDarkImageUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) message.error(configMessage.FILE_MAX_2MB);

    if (isLt2M) {
      setDarkImage(file);
      setDarkThumbnail(URL.createObjectURL(file));
    }

    return false;
  };

  // Assign Image
  const beforeFavUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 0.1;
    if (!isLt2M) message.error(configMessage.FILE_MAX_100KB);

    if (isLt2M) {
      setFav(file);
      setFavThumbnail(URL.createObjectURL(file));
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

  const addNewSocial = () => {
    const newSocialData = {
      phone: '',
      type: '',
      key: new Date().getTime() + Math.floor(Math.random() * 900000),
    };
    setSocialData(prevState => [...prevState, newSocialData]);
  };

  const removeSocial = key => {
    setSocialData(prevState => {
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
                                width: '80%',
                              }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Form.Item>
                      <Form.Item label="Dark Logo">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={beforeDarkImageUpload}
                          fileList={[]}
                        >
                          {darkThumbnail ? (
                            <LazyLoadImage
                              src={darkThumbnail}
                              onError={errorImageSrc}
                              alt="image"
                              style={{
                                width: '80%',
                              }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Form.Item>
                      <Form.Item label="Fav">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={beforeFavUpload}
                          fileList={[]}
                        >
                          {favThumbnail ? (
                            <LazyLoadImage
                              src={favThumbnail}
                              onError={errorImageSrc}
                              alt="image"
                              style={{
                                height: '60%',
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
                        scroll={{ x: 'max-content' }}
                        columns={EmailColumn}
                        pagination={false}
                        rowKey={'key'}
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
                        scroll={{ x: 'max-content' }}
                        className="table-responsive"
                        columns={PhoneColumn}
                        pagination={false}
                        rowKey={'phone'}
                        size="small"
                        dataSource={phoneData}
                      />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Social Account" key="social">
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}
                      >
                        <Button
                          onClick={addNewSocial}
                          size="small"
                          title="Add Social Account"
                          htmlType="button"
                          type="primary"
                        >
                          <FeatherIcon icon="plus" />
                        </Button>
                      </div>
                      <Table
                        className="table-responsive"
                        columns={SocialColumn}
                        pagination={false}
                        rowKey={'social'}
                        size="small"
                        dataSource={socialData}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Billing Addresses" key="billing">
                      <BillingAddress
                        initialData={initialAddressData}
                        defaultAddressId={defaultBilling}
                        {...{ setBillingData, setDefaultBilling, billingData }}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Shipping Addresses" key="Shipping">
                      <ShippingAddress
                        initialData={initialAddressData}
                        defaultAddressId={defaultShipping}
                        {...{ setShippingData, setDefaultShipping, shippingData }}
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
