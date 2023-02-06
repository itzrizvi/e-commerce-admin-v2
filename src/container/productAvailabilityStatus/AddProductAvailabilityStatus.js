import React, { useState } from 'react';
import { Row, Col, Form, Input, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import { productAvailabilityStatusQuery } from '../../apollo/productAvailabilityStatus';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddProductAvailabilityStatus = () => {
  viewPermission('product-availability-status');
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
        mutation: productAvailabilityStatusQuery.AVAILABILITY_STATUS_ADD,
        variables: { name: values.name },
        refetchQueries: [
          {
            query: productAvailabilityStatusQuery.GET_ALL_AVAILABILITY_STATUS,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
          ['getAllProductAvailabilityStatus'],
        ],
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.addProductAvailabilityStatus;
        if (!data?.status) return InternalErrorMessage();
        setTimeout(() => {
          history.push('/admin/product-availability-status/list');
        }, 1000);
        message.success(data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <PageHeader title="Add Product Availability Status" />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <Form
                style={{ width: '100%' }}
                form={form}
                name="addProductAvailabilityStatus"
                onFinish={handleSubmit}
                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                labelCol={{ span: 4 }}
              >
                <Form.Item
                  rules={[{ required: true, max: maxLength, message: 'Please Enter Product Availability Status Name' }]}
                  name="name"
                  label="Name"
                >
                  <Input placeholder="Enter Product Availability Status Name" />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Form.Item>
                    <Button loading={loading} size="default" htmlType="submit" type="primary" raised>
                      {loading ? 'Processing' : 'Save'}
                    </Button>
                    <Link to="/admin/product-availability-status/list">
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

export default AddProductAvailabilityStatus;
