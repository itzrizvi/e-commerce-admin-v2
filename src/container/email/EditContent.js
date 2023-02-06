import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EmailTemplateQuery } from '../../apollo/email';
import ImageResize from 'quill-image-resize-module-react';
import htmlEditButton from 'quill-html-edit-button';
import { useEffect } from 'react';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
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

const AddContent = () => {
  viewPermission('email-template');
  const { TextArea } = Input;
  const history = useHistory();
  const params = useParams();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [form] = Form.useForm();
  const [header, setHeader] = useState([]);
  const [footer, setFooter] = useState([]);
  const [htmlContent, setHTMLContent] = useState('');
  const [customHtmlSwitch, setCustomHtmlSwitch] = useState(false);
  const [singleTemplate, setSingleTemplate] = useState({ data: {}, loading: true, error: '' });

  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    let customVer;
    if (customHtmlSwitch) customVer = { layout_type: 'custom', content: htmlContent };
    else customVer = { layout_type: 'dynamic', content };
    apolloClient
      .mutate({
        mutation: EmailTemplateQuery.UPDATE_EMAIL_TEMPLATE_CONTENT,
        variables: { data: { ...values, ...customVer, id: parseInt(params?.id) } },
        refetchQueries: [
          {
            query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_CONTENT_LIST,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getEmailTemplateList'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateEmailTemplate;
        if (!data?.status) return InternalErrorMessage()
        setTimeout(() => {
          history.push('/admin/email/content/list');
        }, 1000);
        message.success(data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_SINGLE_EMAIL_CONTENT_TEMPLATE,
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
        const data = res?.data?.getSingleEmailTemplate;
        if (!data?.status) return InternalErrorMessage();
        setSingleTemplate({ data: data, loading: false, error: '' });
        form.setFieldsValue({
          name: data?.data?.name,
          header_id: data?.data?.emailHeader?.id,
          footer_id: data?.data?.emailFooter?.id,
        });
        setHTMLContent(data?.data?.content);
        setContent(data?.data?.content);
        setCustomHtmlSwitch(data?.data?.layout_type);
      })

    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_HEADER_FOOTER_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getEmailTempHeaderFooterList;
        setHeader(data?.data?.filter(item => item.type === 'header'));
        setFooter(data?.data?.filter(item => item.type === 'footer'));
      });
  }, []);

  return (
    <>
      <PageHeader
        title={`Manage Email Content | Edit Email Content ${
          singleTemplate?.data?.data?.name ? `(${singleTemplate?.data?.data?.name})` : ''
        }`}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleTemplate.loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="editEmailContent"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: 100, message: 'Please Enter Email Content Name' }]}
                    name="name"
                    label="Name"
                  >
                    <Input placeholder="Enter Email Content Name" />
                  </Form.Item>
                  <Form.Item
                    name="header_id"
                    label="Header"
                    rules={[{ required: true, message: 'Please Select Header' }]}
                  >
                    <Select style={{ width: '100%' }} placeholder="Select Content Header" optionLabelProp="label">
                      {header?.map(item => (
                        <Select.Option value={item.id} label={item.name}>
                          <div className="demo-option-label-item">{item.name}</div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="footer_id"
                    label="Footer"
                    rules={[{ required: true, message: 'Please Select Footer' }]}
                  >
                    <Select style={{ width: '100%' }} placeholder="Select Content Footer" optionLabelProp="label">
                      {footer?.map(item => (
                        <Select.Option value={item.id} label={item.name}>
                          <div className="demo-option-label-item">{item.name}</div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Custom HTML">
                    <Switch checked={customHtmlSwitch} onChange={e => setCustomHtmlSwitch(e)} />
                  </Form.Item>
                  {!customHtmlSwitch && (
                    <Form.Item label="Body">
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
                      <Link to="/admin/email/content/list">
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

export default AddContent;
