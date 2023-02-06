import React, { useState } from 'react';
import { Row, Col, Form, Input, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { productConditionQuery } from '../../apollo/productCondition';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddCondition = () => {
  viewPermission('product-condition');
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const maxLength = 30;
  const [form] = Form.useForm();

  //Submit Form
  const handleSubmit = values => {
    setLoading(true);
    apolloClient
      .mutate({
        mutation: productConditionQuery.CONDITION_ADD,
        variables: { name: values.name },
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
        const data = res?.data?.addProductCondition;
        if (!data?.status) return InternalErrorMessage();
        setTimeout(() => {
          history.push('/admin/product-condition/list');
        }, 1000);
        message.success(data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <PageHeader title="Add Product Condition" />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
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
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddCondition;
