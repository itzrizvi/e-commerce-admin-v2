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
import apolloClient from '../../apollo';
import { viewPermission } from '../../utility/utility';
import { productAvailabilityStatusQuery } from '../../apollo/productAvailabilityStatus';

const UpdateAvailabilityStatus = () => {
  viewPermission('product-availability-status');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState({ data: [], isLoading: true });
  const maxLength = 30;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!params.id) return;

    apolloClient
      .query({
        query: productAvailabilityStatusQuery.GET_SINGLE_AVAILABILITY_STATUS,
        variables: { query: { id: parseInt(params?.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleProductAvailabilityStatus;
        if (!data?.status) return;
        setAvailabilityStatus(s => ({ ...s, data: data?.data, error: '' }));
        form.setFieldsValue({
          name: data?.data?.name,
        });
      })
      .catch(err => {
        setAvailabilityStatus(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setAvailabilityStatus(s => ({ ...s, isLoading: false }));
      });
  }, []);

  //Submit Form
  const handleSubmit = values => {
    setLoading(true);
    apolloClient
      .mutate({
        mutation: productAvailabilityStatusQuery.AVAILABILITY_STATUS_UPDATE,
        variables: { data: { name: values.name, id: parseInt(params?.id) } },
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
        const data = res?.data?.updateProductAvailabilityStatus;
        if (!data?.status) return toast.error('Something Went wrong !!');
        setTimeout(() => {
          history.push('/admin/product-availability-status/list');
        }, 1000);
        toast.success(data?.message);
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <PageHeader
        title={`Manage Product Availability Status | Edit Product Availability Status ${
          availabilityStatus?.data?.name ? `(${availabilityStatus?.data?.name})` : ''
        }`}
      />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {availabilityStatus?.isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addProductAvailabilityStatus"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item
                    rules={[
                      { required: true, max: maxLength, message: 'Please Enter Product Availability Status Name' },
                    ]}
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
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default UpdateAvailabilityStatus;
