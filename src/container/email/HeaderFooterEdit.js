import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EmailTemplateQuery } from '../../apollo/email';
import { useEffect } from 'react';
import ImageResize from 'quill-image-resize-module-react';
import htmlEditButton from 'quill-html-edit-button';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/htmlEditButton', htmlEditButton);

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
  htmlEditButton: {
    okText: 'Save',
    msg: 'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced',
  },
};

const HeaderFooterEdit = () => {
  viewPermission('email-template');
  const { TextArea } = Input;
  const params = useParams();
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [htmlContent, setHTMLContent] = useState('');
  const [customHtmlSwitch, setCustomHtmlSwitch] = useState(false);
  const [singleHeaderFooter, setSingleHeaderFooter] = useState({ data: {}, loading: true, error: '' });
  const [form] = Form.useForm();

  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    let customVer;
    if (customHtmlSwitch) customVer = { layout_type: 'custom', content: htmlContent };
    else customVer = { layout_type: 'dynamic', content };
    apolloClient
      .mutate({
        mutation: EmailTemplateQuery.EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE,
        variables: { data: { ...values, id: parseInt(params?.id), ...customVer } },
        refetchQueries: [
          {
            query: EmailTemplateQuery.GET_EMAIL_HEADER_FOOTER_LIST,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getEmailTempHeaderFooterList'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateEmailTempHeaderFooter;
        if (!data?.status) return toast.error('Something Went wrong !!');
        setTimeout(() => {
          history.push('/admin/email/header-footer/list');
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
        query: EmailTemplateQuery.SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER,
        variables: {
          query: {
            id: parseInt(params?.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getSingleEmailTempHeaderFooter;
        if (!data.status) return;
        setSingleHeaderFooter({ data: data?.data, loading: false, error: '' });
        form.setFieldsValue({
          name: data?.data?.name,
          type: data?.data?.type,
        });
        setHTMLContent(data?.data?.content);
        setContent(data?.data?.content);
        setCustomHtmlSwitch(data?.data?.layout_type === "custom");
      })
      .catch(err => {
        console.log(err);
        setSingleHeaderFooter({ data: {}, loading: false, error: 'Something went worng' });
      });
  }, []);

  return (
    <>
      <PageHeader
        title={`Manage Email Header/Footer | Edit Email Header/Footer ${
          singleHeaderFooter?.data?.name ? `(${singleHeaderFooter?.data?.name})` : ''
        }`}
      />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleHeaderFooter.loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="editEmailHeaderFooter"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: 100, message: 'Please Enter Email Header/Footer Name' }]}
                    name="name"
                    label="Name"
                  >
                    <Input placeholder="Enter Header/Footer Name" />
                  </Form.Item>
                  <Form.Item name="type" label="Type" required>
                    <Select style={{ width: '100%' }} placeholder="Select Header/Footer Type" optionLabelProp="label">
                      <Select.Option value="header" label="Header">
                        <div className="demo-option-label-item">Header</div>
                      </Select.Option>
                      <Select.Option value="footer" label="Footer">
                        <div className="demo-option-label-item">Footer</div>
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Custom HTML">
                    <Switch checked={customHtmlSwitch} onChange={e => setCustomHtmlSwitch(e)} />
                  </Form.Item>
                  {!customHtmlSwitch && (
                    <Form.Item label="Content">
                      <ReactQuill
                        theme="snow"
                        value={content}
                        modules={modules}
                        placeholder="Content goes here..."
                        onChange={setContent}
                      />
                    </Form.Item>
                  )}

                  {customHtmlSwitch && (
                    <Form.Item label="Custom HTML">
                      <TextArea
                        defaultValue={htmlContent}
                        onChange={e => setHTMLContent(e.target.value)}
                        placeholder="Paste your HTML Code Here..."
                      />
                    </Form.Item>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/email/header-footer/list">
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

export default HeaderFooterEdit;
