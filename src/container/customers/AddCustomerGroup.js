import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
const { TextArea } = Input;

const AddCustomerGroup = () => {
  viewPermission('customer-group');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [singleCustomerGroup, setSingleCustomerGroup] = useState({ data: [], isLoading: true });
  const [customergroup_status, setCustomergroup_status] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const maxLength = 30;

  // LOAD SINGLE CUSTOMER GROUP
  useEffect(() => {
    if (!params.id) return;

    apolloClient
      .query({
        query: customerQuery.GET_SINGLE_CUSTOMER_GROUP,
        variables: { query: { customer_group_id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleCustomerGroup;

        if (!data?.status) return InternalErrorMessage();
        setSingleCustomerGroup(s => ({ ...s, data: data?.data, error: '' }));
      })
      .finally(() => {
        setSingleCustomerGroup(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    const { customer_group_name, customergroup_description, customergroup_sortorder } = values;

    // ADD NEW CUSTOMER GROUP
    if (!params.id) {
      const variables = {
        data: {
          customer_group_name,
          customergroup_description,
          customergroup_sortorder: parseInt(customergroup_sortorder),
          customergroup_status,
        },
      };
      apolloClient
        .mutate({
          mutation: customerMutation.CREATE_CUSTOMER_GROUP,
          variables,
          refetchQueries: [
            {
              query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllCustomerGroups'],
          ],
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.createCustomerGroup;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/customers/group');
          }, 1000);
          message.success(`${values.customer_group_name} Group added successfully`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // UPDATE CUSTOMER GROUP
    else {
      const variables = {
        data: {
          id: parseInt(params.id),
          customer_group_name,
          customergroup_description,
          customergroup_sortorder: parseInt(customergroup_sortorder),
          customergroup_status,
        },
      };
      apolloClient
        .mutate({
          mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
          variables,
          refetchQueries: [
            {
              query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllCustomerGroups'],
          ],
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.updateCustomerGroup;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/customers/group');
          }, 1000);
          message.success(`${values.customer_group_name} Group Updated successfully`);
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
            ? `Manage Group | Edit ${
                singleCustomerGroup.isLoading ? '' : `(${singleCustomerGroup.data.customer_group_name})`
              }`
            : 'Add Customer Group'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleCustomerGroup.isLoading ? (
                <div div className="spin">
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
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Attribute Group Name' }]}
                    name="customer_group_name"
                    label="Group Name"
                    initialValue={params.id ? singleCustomerGroup.data.customer_group_name : ''}
                  >
                    <Input placeholder="Enter Attribute Group Name" />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Group Description' }]}
                    name="customergroup_description"
                    label="Description"
                    initialValue={singleCustomerGroup.data.customergroup_description || ''}
                  >
                    <TextArea rows={4} placeholder="Enter Group Description" />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Sort order' }]}
                    name="customergroup_sortorder"
                    label="Sort order"
                    initialValue={
                      singleCustomerGroup.data.customergroup_sortorder
                        ? parseInt(singleCustomerGroup.data.customergroup_sortorder)
                        : ''
                    }
                  >
                    <Input type="number" placeholder="Enter sort order" />
                  </Form.Item>

                  <Form.Item label="Group Status">
                    <Switch checked={customergroup_status} onChange={checked => setCustomergroup_status(checked)} />
                  </Form.Item>

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
                      <Link to="/admin/customers/group">
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

export default AddCustomerGroup;
