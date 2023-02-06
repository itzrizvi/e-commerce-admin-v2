import React, { useEffect } from 'react';
import { Row, Col, Table, Tabs, Rate, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Link, useParams } from 'react-router-dom';
import apolloClient, { customerQuery } from '../../utility/apollo';
import { customerQuery as customerQueryF } from '../../apollo/customer';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import { Button } from '../../components/buttons/buttons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const ViewUser = () => {
  viewPermission('customer');
  const params = useParams();
  const token = useSelector(state => state.auth.token);
  const [rating, setRating] = useState([]);
  const [order, setOrder] = useState([]);
  const [singleUser, setSingleUser] = useState({ data: [], isLoading: true });

  useEffect(() => {
    // load single customer
    if (!params?.id) return;
    apolloClient
      .query({
        query: customerQuery.GET_SINGLE_CUSTOMER,
        variables: { customer_id: parseInt(params?.id) },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleCustomer;
        setSingleUser({ data: data.data, isLoading: false });
      })
      .catch(err => {
        console.log('🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err', err);
      });

    apolloClient
      .query({
        query: customerQuery.GET_ALL_ORDER_BY_CUSTOMER_ID,
        variables: { customer_id: parseInt(params?.id) },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderListByCustomerID;
        if (!data.status) return InternalErrorMessage();
        setOrder(data?.data);
      })
      .catch(err => {
        console.log('🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err', err);
      });

    apolloClient
      .query({
        query: customerQueryF.GET_RATING_BY_USER_ID,
        variables: {
          query: {
            user_id: parseInt(params?.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getRatingsByUserID;
        if (!data.status) return InternalErrorMessage();
        setRating(data?.data);
      })
      .catch(err => {
        console.log('🚀 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err', err);
      });
  }, [params.id, token]);

  const order_columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      ellipsis: true,
      render: text => <p>$ {text}</p>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
      width: 100,
      ellipsis: true,
      render: text => <p>$ {text}</p>,
    },
    {
      title: 'Product Count',
      dataIndex: 'productCount',
      key: 'productCount',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Order Status',
      dataIndex: ['orderStatus', 'name'],
      key: 'name',
      width: 150,
    },
    {
      title: 'Payment Method',
      dataIndex: ['paymentmethod', 'name'],
      key: 'name',
      width: 150,
    },
  ];

  const rating_columns = [
    {
      title: 'Product ID',
      dataIndex: ['product', 'id'],
      key: 'id',
      width: 90,
    },
    {
      title: 'Product Name',
      dataIndex: ['product', 'prod_name'],
      key: 'prod_name',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'rating_description',
      key: 'rating_description',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 150,
      render: (text, record) => <Rate allowHalf defaultValue={text} />,
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
      ),
      ellipsis: true,
    },
  ];

  return (
    <>
      <PageHeader title={`Manage User | View User ${singleUser.isLoading ? '' : `(${singleUser.data.email})`}`} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleUser.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Tabs>
                    <Tabs.TabPane tab="Order" key="order">
                      <Table
                        className="table-responsive"
                        columns={order_columns}
                        rowKey={'id'}
                        size="small"
                        dataSource={order}
                        pagination={false}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Rating" key="rating">
                      <Table
                        className="table-responsive"
                        columns={rating_columns}
                        rowKey={'date'}
                        size="small"
                        dataSource={rating}
                        pagination={false}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Link to="/admin/customers/list">
                      <Button style={{ marginLeft: 10 }} type="light" size="default">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ViewUser;
