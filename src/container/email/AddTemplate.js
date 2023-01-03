import React, { useState } from 'react';
import { Row, Col, Form, Input, Spin, Select } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import { EmailTemplateQuery } from '../../apollo/email';
import { useEffect } from 'react';

const AddTemplate = () => {
  viewPermission('email-template');
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [form] = Form.useForm();

  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    apolloClient
      .mutate({
        mutation: EmailTemplateQuery.ADD_EMAIL_TEMPLATE_LIST,
        variables: { data: { ...values } },
        refetchQueries: [
          {
            query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_LIST,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getAllEmailTemplateList'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.addEmailTemplateOnList;
        if (!data?.status) return toast.error('Something Went wrong !!');
        setTimeout(() => {
          history.push('/admin/email/template/list');
        }, 1000);
        toast.success(data?.message);
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_CONTENT_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getEmailTemplateList;
        setEmailTemplate(data?.data);
      })
      .catch(err => {
        setEmailTemplate([]);
        console.log("🚀 ~ file: AddTemplate.js:83 ~ useEffect ~ err", err)
      });
  });

  return (
    <>
      <PageHeader title="Add Email Template" />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addEmailTemplate"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: 100, message: 'Please Enter Template Name' }]}
                    name="name"
                    label="Name"
                  >
                    <Input placeholder="Enter Template Name" />
                  </Form.Item>
                  <Form.Item name="email_template_id" label="Email Content">
                    <Select style={{ width: '100%' }} placeholder="Select Email Template Content" optionLabelProp="label">
                      {emailTemplate?.map(item => (
                        <Select.Option value={item.id} label={item.name}>
                          <div className="demo-option-label-item">{item.name}</div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/email/template/list">
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

export default AddTemplate;
