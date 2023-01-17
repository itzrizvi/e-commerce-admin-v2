import React, { useState } from 'react';
import { Row, Col, Form, Input, Switch, Popconfirm } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import htmlEditButton from 'quill-html-edit-button';
import { bannerQuery } from '../../apollo/banner';
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

const AddBanner = () => {
  viewPermission('banner');
  const { TextArea } = Input;
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [htmlContent, setHTMLContent] = useState('');
  const [customHtmlSwitch, setCustomHtmlSwitch] = useState(false);
  const [statusSwitch, setStatusSwitch] = useState(true);
  const [form] = Form.useForm();

  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    let customVer;
    if (customHtmlSwitch) customVer = { layout_type: 'custom', content: htmlContent };
    else customVer = { layout_type: 'dynamic', content };
    apolloClient
      .mutate({
        mutation: bannerQuery.BANNER_ADD,
        variables: { data: { ...values, ...customVer, banner_status: statusSwitch } },
        refetchQueries: [
          {
            query: bannerQuery.GET_ALL_BANNER,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
            fetchPolicy: 'network-only',
          },
          ['getAllBanners'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.addBanner;
        if (!data?.status) return toast.error('Something Went wrong !!');
        setTimeout(() => {
          history.push('/admin/banner/list');
        }, 2000);
        toast.success(data?.message);
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setIsLoading(false));
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
                  rules={[{ required: true, max: 100, message: 'Please enter banner name' }]}
                  name="banner_name"
                  label="Name"
                >
                  <Input style={{ width: "50%" }} placeholder="Enter banner name" />
                </Form.Item>
                <Form.Item label="Status">
                  <Switch defaultChecked={statusSwitch} onChange={e => setStatusSwitch(e)} />
                </Form.Item>
                <Form.Item label="Custom HTML">
                  <Switch defaultChecked={false} onChange={e => setCustomHtmlSwitch(e)} />
                </Form.Item>
                {!customHtmlSwitch && (
                  <Form.Item label="Content">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      placeholder="Content goes here..."
                      onChange={setContent}
                    />
                  </Form.Item>
                )}

                {customHtmlSwitch && (
                  <Form.Item label="Custom HTML">
                    <TextArea
                      style={{
                        height: 200,
                      }}
                      onChange={e => setHTMLContent(e.target.value)}
                      placeholder="Paste your HTML Code Here..."
                    />
                  </Form.Item>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>

                  <Popconfirm
                    title="Cancel Task"
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => history.push("/admin/banner/list")}
                  >
                    <Button style={{ marginRight: 10 }} type="light" size="default">
                      Cancel
                    </Button>
                  </Popconfirm>
                  <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                    {isLoading ? 'Processing' : 'Add Banner'}
                  </Button>
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
