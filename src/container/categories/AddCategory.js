import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Switch, Tabs, Spin, Select, Upload, Badge, Avatar } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { apolloUploadClient, productMutation, productQuery } from '../../utility/apollo';
import Heading from '../../components/heading/heading';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const AddCategory = () => {
  viewPermission('category');
  const [form] = Form.useForm();
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 30;
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [structuredCategories, setStructuredCategories] = useState({ data: [], loading: true });
  const [singleCategory, setSingleCategory] = useState({});
  const [parentId, setParentId] = useState('');
  const [image, setImage] = useState(null);
  const [thumbUrl, setThumbUrl] = useState('');

  useEffect(() => {
    // load all category
    apolloClient
      .query({
        query: productQuery.GET_ALL_CATEGORIES,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllCategories;
        if (!data.status) return;
        setCategories(data.categories);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    // category structure

    if (!categories.length) return;
    let arrData = [];

    categories.forEach(item => {
      const parent = item.cat_name;
      const cat_sort_order = item.cat_sort_order;

      arrData.push({ cat_name: parent, id: item.id, cat_sort_order });
      if (item.subcategories) {
        item.subcategories.forEach(subCat => {
          const sub = subCat.cat_name;
          arrData.push({ cat_name: `${parent} > ${sub}`, id: subCat.id });
        });
      }
    });
    setStructuredCategories({ data: arrData, loading: false });
  }, [categories]);

  useEffect(() => {
    // get single category
    if (!params.id) return;

    apolloClient
      .query({
        query: productQuery.GET_SINGLE_CATEGORY_FOR_UPDATE,
        variables: { query: { cat_id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleCategory;
        if (!data.status) return;
        setSingleCategory(data.category);
        setIsFeatured(state => data?.category?.is_featured || state);
        setCategoryStatus(state => data?.category?.cat_status || state);
        setParentId(state => data?.category?.cat_parent_id || state);
      })
      .catch(err => {
        toast.error('Something went worng.!');
      });
  }, []);

  const handleSubmit = values => {
    // return;
    setIsLoading(true);
    const {
      categoryName,
      categoryDescription,
      categoryMetaTagDescription,
      categoryMetaTagKeywords,
      categoryMetaTagTitle,
      // categoryParentId,
      categorySortOrder,
    } = values;

    if (!params.id) {
      // for add new
      const data = {
        categoryName,
        categoryDescription,
        categoryMetaTagDescription,
        categoryMetaTagKeywords,
        categoryMetaTagTitle,
        isFeatured,
        categoryStatus,
      };
      if (parentId) {
        data.categoryParentId = parentId;
      }
      if (categorySortOrder) {
        data.categorySortOrder = parseInt(categorySortOrder);
      }
      const variables = { data };

      if (image) {
        variables.file = image;
      }

      console.log(variables);

      apolloUploadClient
        .mutate({
          mutation: productMutation.CREATE_CATEGORY,
          variables,
          refetchQueries: [
            {
              query: productQuery.GET_ALL_CATEGORIES,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                },
              },
            },
            ['getAllCategories'],
          ],
          fetchPolicy: "network-only",
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.createCategory;
          if (!data?.status) return toast.error(data?.message);
          setTimeout(() => {
            history.push('/admin/categories/list');
          }, 1000);
          toast.success(data?.message);
        })
        .catch(err => {})
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      //for update
      const data = {
        cat_id: parseInt(params.id),
        cat_name: categoryName,
        cat_description: categoryDescription,
        cat_meta_tag_title: categoryMetaTagTitle,
        cat_meta_tag_description: categoryMetaTagDescription,
        cat_meta_tag_keywords: categoryMetaTagKeywords,
        is_featured: isFeatured,
        cat_status: categoryStatus,
      };
      if (parentId) {
        data.cat_parent_id = parentId;
      }
      if (image) {
        data.categoryImage = image.file;
      }
      if (categorySortOrder) {
        data.cat_sort_order = parseInt(categorySortOrder);
      }

      apolloUploadClient
        .mutate({
          mutation: productMutation.UPDATE_CATEGORY,
          variables: { data },
          refetchQueries: [
            {
              query: productQuery.GET_ALL_CATEGORIES,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  // Authorization: Cookies.get('psp_t')
                },
              },
            },
            ['getAllBrands'],
          ],
          fetchPolicy: "network-only",
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.updateCategory;
          if (!data?.status) return toast.error(data?.message);
          setTimeout(() => {
            history.push('/admin/categories/list');
          }, 1000);
          toast.success(data?.message);
        })
        .catch(err => {})
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <PageHeader
        title={
          params.id
            ? `Manage category | Edit - ${!singleCategory.cat_name ? '' : `(${singleCategory.cat_name})`}	`
            : 'Add Category'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && !singleCategory.id ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addRole"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Tabs>
                    <Tabs.TabPane tab="General" key="general">
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Category Name' }]}
                        name="categoryName"
                        label="Category Name"
                        initialValue={singleCategory.cat_name || ''}
                      >
                        <Input placeholder="Enter Category Name" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Category Description' }]}
                        name="categoryDescription"
                        label="Description"
                        initialValue={singleCategory.cat_description || ''}
                      >
                        <TextArea rows={4} placeholder="Enter Category Description" />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter Meta Title' }]}
                        name="categoryMetaTagTitle"
                        label="Meta Tag Title"
                        initialValue={singleCategory.cat_meta_tag_title || ''}
                      >
                        <Input placeholder="Enter Meta Tag Title" />
                      </Form.Item>
                      <Form.Item
                        name="categoryMetaTagDescription"
                        label="Meta Tag Description"
                        rules={[{ required: true, max: maxLength, message: 'Please enter Meta Description' }]}
                        initialValue={singleCategory.cat_meta_tag_description || ''}
                      >
                        <TextArea rows={3} placeholder="Enter Meta Tag Description" />
                      </Form.Item>
                      <Form.Item
                        className="wrap-label"
                        rules={[{ required: true, max: maxLength, message: 'Please enter Meta Keywords' }]}
                        name="categoryMetaTagKeywords"
                        label="Enter Meta Tag Keywords"
                        initialValue={singleCategory.cat_meta_tag_keywords || ''}
                      >
                        <TextArea rows={3} placeholder="Enter Meta Tag Keywords" />
                      </Form.Item>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Data" key="Data">
                      <Form.Item
                        name="categoryParentId"
                        initialValue=""
                        label="Parent"
                        // tooltip={roles.isLoading ? 'Loading roles....' : null}
                      >
                        {structuredCategories.loading ? (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Spin />
                          </div>
                        ) : (
                          <>
                            <Select
                              allowClear
                              placeholder="Please select"
                              onChange={value => setParentId(value)}
                              defaultValue={singleCategory.cat_parent_id}
                            >
                              {structuredCategories.data.map(item => (
                                <Option key={item.id} value={item.id}>
                                  {item.cat_name}
                                </Option>
                              ))}
                            </Select>
                          </>
                        )}
                      </Form.Item>

                      <Form.Item
                        name="categorySortOrder"
                        label="Sort Order"
                        initialValue={singleCategory.cat_sort_order || ''}
                      >
                        <Input placeholder="Enter Sort Order" />
                      </Form.Item>

                      <Form.Item name="isFeatured" label="Is Featured">
                        <Checkbox checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                      </Form.Item>
                      <Form.Item name="categoryStatus" label="Status">
                        <Switch checked={categoryStatus} onChange={checked => setCategoryStatus(checked)} />
                      </Form.Item>

                      <Form.Item name="img" label="Image">
                        {!thumbUrl ? (
                          <Dragger
                            multiple={false}
                            beforeUpload={file => {
                              const isJpg = file.type === 'image/jpeg';
                              if (!isJpg) return toast.error('You can only upload JPG file!');
                              const isLt2M = file.size / 1024 / 1024 < 2;
                              if (!isLt2M) return toast.error('Image must smaller than 2MB!');

                              setThumbUrl(URL.createObjectURL(file));

                              setImage(file);
                              return false;
                            }}
                            onRemove={file => {
                              setThumbUrl('');
                              setImage(null);
                            }}
                            fileList={image ? [image] : []}
                            style={{ marginTop: '3em' }}
                          >
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
                        ) : (
                          <Badge text="x">
                            <Avatar
                              shape="square"
                              size={80}
                              src={thumbUrl}
                              onClick={() => {
                                setImage(null);
                                setThumbUrl('');
                              }}
                            />
                          </Badge>
                        )}
                      </Form.Item>
                    </Tabs.TabPane>
                  </Tabs>
                  ;
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/categories/list">
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

export default AddCategory;
