import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Spin, Switch } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { attributeMutation, attributeQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
const { Option } = Select;

const AddAttribute = () => {
  viewPermission('attribute');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true });
  const [attr_group_id, setAttr_group_id] = useState('');
  const [attribute_status, setAttribute_status] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const maxLength = 30;
  const [singleAttribute, setSingleAttribute] = useState({ data: [], isLoading: true });

  // Load all attribute group
  useEffect(() => {
    apolloClient
      .query({
        query: attributeQuery.GET_ALL_ATTR_GROUPS,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllAttrGroups;

        if (!data?.status) return;
        setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setAttributeGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setAttributeGroups(s => ({ ...s, isLoading: false }));
      });
  });

  useEffect(() => {
    if (!params.id) return;
    apolloClient
      .query({
        query: attributeQuery.GET_SINGLE_ATTRIBUTE,
        variables: {
          query: {
            attribute_id: parseInt(params.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleAttribute;
        setSingleAttribute({ data: data.data, isLoading: false });
        setAttr_group_id(data.data.attr_group_id);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const handleSubmit = values => {
    const { attribute_name } = values;
    if (!attr_group_id) return toast.warning('Attribute Group is not selected');

    setIsLoading(true);
    if (!params.id) {
      // Create Attribute group
      const variables = { data: { attribute_name, attribute_status, attr_group_id } };

      apolloClient
        .mutate({
          mutation: attributeMutation.CREATE_ATTRIBUTE,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
            refetchQueries: [
              {
                query: attributeQuery.GET_ALL_ATTRIBUTES,
                context: {
                  headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t'),
                  },
                },
              },
              ['getAllAttributes'],
            ],
          },
        })
        .then(res => {
          const data = res?.data?.createAttribute;
          if (!data.status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/attributes/list');
          }, 1000);
          toast.success(`${values.attribute_name} Added successfully`);
        })
        .catch(err => {
          console.log('got error on addPermission', err);
          return toast.error('Something Went wrong !!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Update  Attribute group
      const variables = {
        data: {
          attribute_id: parseInt(params.id),
          attribute_name,
          attribute_status,
          attr_group_id: parseInt(attr_group_id),
        },
      };
      // return;
      apolloClient
        .mutate({
          mutation: attributeMutation.UPDATE_ATTRIBUTE,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
          refetchQueries: [
            {
              query: attributeQuery.GET_ALL_ATTRIBUTES,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllAttributes'],
          ],
        })
        .then(res => {
          const data = res?.data?.updateAttribute;
          if (!data.status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/attributes/list');
          }, 1000);
          toast.success(data.message);
        })
        .catch(err => {
          console.log('got error on addPermission', err);
          return toast.error('Something Went wrong !!');
        })
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
            ? `Manage Attribute | Edit ${singleAttribute.isLoading ? '' : `(${singleAttribute.data.attribute_name})`}`
            : 'Add Attribute'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleAttribute.isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
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
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Attribute Name' }]}
                    name="attribute_name"
                    label="Attribute Name"
                    initialValue={singleAttribute?.data?.attribute_name || ''}
                  >
                    <Input placeholder="Enter Attribute Name" />
                  </Form.Item>

                  <Form.Item
                    initialValue=""
                    label="Attribute Group"
                    // tooltip={roles.isLoading ? 'Loading roles....' : null}
                  >
                    {attributeGroups.isLoading ? (
                      <div className="spin">
                        <Spin />
                      </div>
                    ) : (
                      <>
                        <Select
                          // mode="multiple"
                          allowClear
                          placeholder="Select Attribute Group"
                          value={attr_group_id}
                          onChange={value => setAttr_group_id(value)}
                        >
                          {attributeGroups.data.map(item => (
                            <Option key={item.id} value={item.id}>
                              {item.attr_group_name}
                            </Option>
                          ))}
                        </Select>
                      </>
                    )}
                  </Form.Item>
                  <Form.Item name="attrgroup_status" label="Status">
                    <Switch checked={attribute_status} onChange={checked => setAttribute_status(checked)} />
                  </Form.Item>

                  {/* <Form.Item
                                    rules={[{ required: true, max: maxLength, message: "Please enter sort order" }]}
                                    name="gs" label="Sort order"
                                // initialValue={params.name || ""}
                                >
                                    <Input type='number' placeholder='Enter sort order' />
                                </Form.Item> */}

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
                      <Link to="/admin/attributes/list">
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

export default AddAttribute;
