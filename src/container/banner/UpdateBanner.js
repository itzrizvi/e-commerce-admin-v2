import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Switch, Popconfirm } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useParams } from 'react-router-dom';
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

const UpdateBanner = () => {
  viewPermission('banner');
  const params = useParams();
  const { TextArea } = Input;
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [htmlContent, setHTMLContent] = useState('');
  const [customHtmlSwitch, setCustomHtmlSwitch] = useState(false);
  const [statusSwitch, setStatusSwitch] = useState(true);
  const [singleBanner, setSingleBanner] = useState({ data: {}, loading: true, error: '' });
  const [form] = Form.useForm();


  //Submit Form
  const handleSubmit = values => {
    setIsLoading(true);
    let customVer;
    if (customHtmlSwitch) customVer = { layout_type: 'custom', content: htmlContent };
    else customVer = { layout_type: 'dynamic', content };
    apolloClient
      .mutate({
        mutation: bannerQuery.BANNER_UPDATE,
        variables: { data: { ...values, ...customVer, status: statusSwitch, banner_id: parseInt(params?.id) } },
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
        const data = res?.data?.updateBanner;
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

  useEffect(() => {
    if (!parseInt(params?.id)) return;
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
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getSingleBanner;
        if (!data.status) return;
        setSingleBanner({ data: data?.data, loading: false, error: '' });
        form.setFieldsValue({
          name: data?.data?.name
        });
        setHTMLContent(data?.data?.content);
        setContent(data?.data?.content);
        setStatusSwitch(data?.data?.status);
        setCustomHtmlSwitch(data?.data?.layout_type === "custom");
      })
      .catch(err => {
        console.log(err);
        setSingleBanner({ data: {}, loading: false, error: 'Something went worng' });
      });
  }, [params?.id]);

  return (
    <>
      <PageHeader
        title={`Manage Banner | Edit Banner ${singleBanner?.data?.name ? `(${singleBanner?.data?.name})` : ''
          }`}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleBanner.loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="EditBanner"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: 100, message: 'Please enter banner name' }]}
                    name="name"
                    label="Name"
                  >
                    <Input style={{ width: "50%" }} placeholder="Enter banner name" />
                  </Form.Item>
                  <Form.Item label="Status">
                    <Switch checked={statusSwitch} onChange={e => setStatusSwitch(e)} />
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
                        style={{
                          height: 200,
                        }}
                        defaultValue={htmlContent}
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
                      {isLoading ? 'Processing' : 'Update Banner'}
                    </Button>
                  </div>
                </Form>)}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default UpdateBanner;
