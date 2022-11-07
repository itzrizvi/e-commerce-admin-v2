import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import Moment from 'react-moment';

const ListOrder = () => {
  viewPermission('order');
  const [orders, setOrders] = useState({ data: [], loading: true, error: '' });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    apolloClient
      .query({
        query: orderQuery.GET_ALL_ORDER,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderlistAdmin;
        if (!data.status) return;
        const order_data = [];
        data?.data.forEach(item => {
          const { customer, id, createdAt, orderStatus, payment, total } = item;
          order_data.push({
            id,
            customer_name: customer.first_name,
            customer_email: customer.email,
            createdAt,
            orderStatus: orderStatus.name,
            payment_name: payment.name,
            total,
          });
        });

        setOrders(s => ({ ...s, data: order_data, error: '' }));
      })
      .catch(err => {
        setOrders(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setOrders(s => ({ ...s, loading: false }));
      });
  }, []);

  const handleStatusChange = (record, checked) => {
    const variables = {
      data: {
        customer_group_uuid: record.customer_group_uuid,
        customergroup_status: checked,
      },
    };
    apolloClient
      .mutate({
        mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateCustomerGroup;
        if (!data.status) return toast.error(data.message);
        toast.success(`${record.customer_group_name} Group Status Updated successfully`);
      })
      .catch(err => {
        console.log('got error on updateStatus', err);
        return toast.error('Something Went wrong !!');
      });
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 150,
      sorter: (a, b) => (a.customer_name.toUpperCase() > b.customer.first_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Customer Email',
      dataIndex: 'customer_email',
      key: 'customer_email',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.customer_email.toUpperCase() > b.customer.customer_email.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      render: val => `$${val}`,
      sorter: (a, b) => (a.total.toUpperCase() > b.total.toUpperCase() ? 1 : -1),
    },
    {
        title: 'Payment Method',
        dataIndex: 'payment_name',
        key: 'payment_name',
        width: 150,
        sorter: (a, b) => (a.payment_name.toUpperCase() > b.payment_name.toUpperCase() ? 1 : -1),
      },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: 'center',
      width: 100,
      sorter: (a, b) => (a.orderStatus === b.orderStatus ? 0 : a.orderStatus ? -1 : 1),
      filters: [
        {
          text: 'Pending',
          value: "Pending",
        },
        {
          text: 'Delivered',
          value: "Delivered",
        },
      ],
      onFilter: (value, record) => record.orderStatus === value,
      render: (value, record) => (
        <Switch defaultChecked={value} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
    },

    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },

    {
      title: 'View',
      dataIndex: 'o_i',
      width: 70,
      align: 'right',
      key: 'o_i',
      render: (text, record) => (
        <>
          <Link to={`/admin/order/view?id=${text}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="eye" style={{ margin: '.5em 1em' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 70,
      align: 'right',
      key: 'last_name',
      render: (text, record) => (
        <>
          <Link to={`/admin/order/add?id=${text}`}>
            {/* <Button size="default" type="white" title='Edit'> */}
            <FontAwesome name="edit" style={{ margin: '.5em 1em' }} />
            {/* </Button> */}
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredOrders(
      orders.data.filter(order =>
        (order?.id + order?.customer_name + order?.customer_email + order?.orderStatus + order?.payment_name + order?.total)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="List Orders"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <Link to="/admin/customers/add-group"> */}
            <Button size="small" title="Add Order" type="primary">
              <FeatherIcon icon="user-plus" />
            </Button>
            {/* </Link> */}
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {orders.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input placeholder="Search Orders.." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'g_s'}
                      size="small"
                      dataSource={isFilter ? filteredOrders : orders.data}
                      rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.ORDER_PER_PAGE,
                        total: isFilter ? filteredOrders.length : orders.data.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </span>
                </>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ListOrder;
