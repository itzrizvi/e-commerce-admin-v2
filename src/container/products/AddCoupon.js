import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, Select, DatePicker, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { couponMutation, couponQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import moment from 'moment';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
const { TextArea } = Input;

const AddCoupon = () => {
  viewPermission('coupon');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [singleCoupon, setSingleCoupon] = useState({ data: [], isLoading: true });
  const [coupon_type, setCoupon_type] = useState('');
  const [coupon_status, setCoupon_status] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const maxLength = 30;

  useEffect(() => {
    // Load single coupon
    if (!params.id) return;

    apolloClient
      .query({
        query: couponQuery.GET_SINGLE_COUPON,
        variables: { query: { coupon_id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleCoupon;
        if (!data?.status) return InternalErrorMessage();
        setSingleCoupon(s => ({ ...s, data: data?.data, error: '' }));
        setCoupon_type(data.data.coupon_type);
      })
      .finally(() => {
        setSingleCoupon(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    const {
      coupon_startdate,
      coupon_enddate,
      coupon_maxamount,
      coupon_minamount,
      coupon_amount,
      coupon_sortorder,
      ...rest
    } = values;
    const data = {
      ...rest,
      coupon_startdate: new Date(coupon_startdate).toGMTString(),
      coupon_enddate: new Date(coupon_enddate).toGMTString(),
      coupon_status,
      coupon_type,
      coupon_maxamount: parseInt(coupon_maxamount),
      coupon_minamount: parseInt(coupon_minamount),
      coupon_amount: parseInt(coupon_amount),
      coupon_sortorder: parseInt(coupon_sortorder),
    };

    setIsLoading(true);
    // return;
    // ADD NEW Coupon
    if (!params.id) {
      const variables = { data };

      console.log(variables);
      apolloClient
        .mutate({
          mutation: couponMutation.CREATE_COUPON,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.createCoupon;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/products/coupon');
          }, 1000);
          message.success(`${values.coupon_name} coupon added successfully`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // UPDATE Coupon
    else {
      const variables = {
        data: { coupon_id: parseInt(params.id), ...data },
      };
      console.log(variables);
      apolloClient
        .mutate({
          mutation: couponMutation.UPDATE_COUPON,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.updateCoupon;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/products/coupon');
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
            ? `Manage Coupon | Edit ${singleCoupon.isLoading ? '' : `(${singleCoupon.data.coupon_name})`}`
            : 'Add Coupon'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleCoupon.isLoading ? (
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
                  initialValues={
                    params.id
                      ? {
                          coupon_name: singleCoupon.data.coupon_name,
                          coupon_description: singleCoupon.data.coupon_description,
                          coupon_code: singleCoupon.data.coupon_code,
                          coupon_amount: singleCoupon.data.coupon_amount,
                          coupon_minamount: singleCoupon.data.coupon_minamount,
                          coupon_maxamount: singleCoupon.data.coupon_maxamount,
                          coupon_startdate: moment(parseInt(singleCoupon.data.coupon_startdate)),
                          coupon_enddate: moment(parseInt(singleCoupon.data.coupon_enddate)),
                          coupon_sortorder: singleCoupon.data.coupon_sortorder,
                        }
                      : null
                  }
                >
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Coupon Name' }]}
                    name="coupon_name"
                    label="Coupon Name"
                  >
                    <Input placeholder="Enter Coupon Name" />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Coupon Description' }]}
                    name="coupon_description"
                    label="Description"
                  >
                    <TextArea rows={4} placeholder="Enter Coupon Description" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Coupon CODE' }]}
                    name="coupon_code"
                    label="CODE"
                  >
                    <Input placeholder="Enter Coupon CODE" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter Coupon Type' }]}
                    label="Type"
                  >
                    <Select
                      value={coupon_type}
                      onChange={value => setCoupon_type(value)}
                      placeholder="Select Coupon type"
                    >
                      <Select.Option key={1} value={'percentage'}>
                        Percentage
                      </Select.Option>
                      <Select.Option key={2} value={'flat'}>
                        Flat
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Coupon Amount' }]}
                    name="coupon_amount"
                    label="Amount"
                  >
                    <Input type="number" placeholder="Enter Coupon Amount" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Minimum Amount' }]}
                    name="coupon_minamount"
                    label="Minimum Amount"
                  >
                    <Input type="number" placeholder="Enter Minimum Amount" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Maximum Amount' }]}
                    name="coupon_maxamount"
                    label="Maximum Amount"
                  >
                    <Input type="number" placeholder="Enter Maximum Amount" />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Start Date' }]}
                    name="coupon_startdate"
                    label="Start Date"
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please enter End Date' }]}
                    name="coupon_enddate"
                    label="End Date"
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Sort order' }]}
                    name="coupon_sortorder"
                    label="Sort order"
                  >
                    <Input type="number" placeholder="Enter sort order" />
                  </Form.Item>

                  <Form.Item label="Coupon Status">
                    <Switch checked={coupon_status} onChange={checked => setCoupon_status(checked)} />
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
                        <Button type="white" size="large">
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

export default AddCoupon;
