import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Select, Upload, InputNumber, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { productConditionQuery } from '../../apollo/productCondition';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';

const UpdateCondition = () => {
  viewPermission('product-condition');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState({ data: [], isLoading: true });
  const maxLength = 30;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!params.id) return;

    apolloClient
      .query({
        query: productConditionQuery.GET_SINGLE_CONDITION,
        variables: { query: { id: parseInt(params?.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleProductCondition;
        if (!data?.status) return;
        setCondition(s => ({ ...s, data: data?.data, error: '' }));
        form.setFieldsValue({
          name: data?.data?.name,
        });
      })
      .catch(err => {
        setCondition(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setCondition(s => ({ ...s, isLoading: false }));
      });
  }, []);

  //Submit Form
  const handleSubmit = values => {
    setLoading(true);
    apolloClient
      .mutate({
        mutation: productConditionQuery.CONDITION_UPDATE,
        variables: { data: { name: values.name, id: parseInt(params?.id) } },
          refetchQueries: [
            {
              query: productConditionQuery.GET_ALL_CONDITION,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: token,
                },
              },
            },
            ['getAllProductCondition'],
          ],
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: token,
            },
          },
      })
      .then(res => {
        const data = res?.data?.updateProductCondition;
        if (!data?.status) return toast.error('Something Went wrong !!');
        history.push('/admin/product-condition/list');
        toast.success(data?.message);
        window.location.reload();
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <PageHeader title={ `Manage Product Condition | Edit Product Condition ${condition?.data?.name ? `(${condition?.data?.name})` : ""}` } />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {condition?.isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addProductCondition"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please Enter Product Condition Name' }]}
                    name="name"
                    label="Name"
                  >
                    <Input placeholder="Enter Product Condition Name" />
                  </Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item>
                      <Button loading={loading} size="default" htmlType="submit" type="primary" raised>
                        {loading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/product-condition/list">
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

export default UpdateCondition;
