import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Tooltip, Select, DatePicker } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient from '../../utility/apollo';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { orderQuery } from '../../apollo/order';
import Moment from 'react-moment';
import moment from 'moment';
const { RangePicker } = DatePicker;
import { productSchema } from '../../apollo/product';

let checkPoint = false;
const ListOrder = () => {
  viewPermission('order');
  const [orders, setOrders] = useState({ data: [], loading: false, error: '' });
  const token = useSelector(state => state.auth.token);
  const [isFilter, setIsFilter] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({ data: [], loading: false, error: '' });
  const [orderStatus, setOrderStatus] = useState({ data: [], loading: false, error: '' });
  const [orderUpdateAdmins, setOrderUpdateAdmins] = useState({ data: [], loading: false, error: '' });
  const [searchDisable, setSearchDisable] = useState(true);
  const [dateRange, setChangeDateRange] = useState(null);
  const [productOption, setProductOption] = useState([]);
  const [updatedDateRange, setChangeUpdatedDateRange] = useState(null);
  const [filterParams, setFilterParams] = useState({
    paymentmethods: [],
    productIds: [],
    statuses: [],
    updatedby: [],
    searchQuery: '',
    orderEntryStartDate: '',
    orderEntryEndDate: '',
    orderUpdatedStartDate: '',
    orderUpdatedEndDate: ''
  });

  const searchOrderAdmin = () => {
    setOrders(s => ({ ...s, loading: true }));
    apolloClient
      .query({
        query: orderQuery.GET_ALL_ORDER,
        variables: {
          query: {
            searchQuery: filterParams.searchQuery ?? '',
            productIds: filterParams.productIds.length ? filterParams.productIds : null,
            paymentmethods: filterParams.paymentmethods.length ? filterParams.paymentmethods : null,
            statuses: filterParams.statuses.length ? filterParams.statuses : null,
            updatedby: filterParams.updatedby.length ? filterParams.updatedby : null,
            orderEntryStartDate: filterParams.orderEntryStartDate ?? '',
            orderEntryEndDate: filterParams.orderEntryEndDate ?? '',
            orderUpdatedStartDate: filterParams.orderUpdatedStartDate ?? '',
            orderUpdatedEndDate: filterParams.orderUpdatedEndDate ?? '',
          }
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only'
      })
      .then(res => {
        const data = res?.data?.getOrderlistAdmin;
        if (!data.status) return;
        setOrders(data);
      })
      .catch(err => {
        setOrders(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setOrders(s => ({ ...s, loading: false }));
        setSearchButton(!searchButton)
      });
  }

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'first_name'],
      key: 'first_name',
      width: 150,
      render: (text, record) => `${text} ${record.customer.last_name}`,
      sorter: (a, b) => (a.first_name > b.first_name ? 1 : -1),
    },
    {
      title: 'Customer Email',
      dataIndex: ['customer', 'email'],
      key: 'email',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
      render: val => `$${val}`,
      sorter: (a, b) => (a.total > b.total ? 1 : -1),
    },
    {
      title: 'Status',
      dataIndex: ['orderStatus', 'name'],
      key: 'name',
      align: 'center',
      width: 150,
      render: val => (
        <span
          style={{
            borderRadius: '4em',
            padding: '.5em 1.5em',
            color: val === 'Pending' ? '#feaf00' : val === 'Completed' ? '#2fb083' : '',
            background: val === 'Pending' ? '#fef6e6' : val === 'Completed' ? '#ebf9f4' : '',
          }}
        >
          {val}
        </span>
      ),
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Payment Method',
      dataIndex: ['paymentmethod', 'name'],
      key: 'name',
      width: 150,
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
      sorter: (a, b) => (a.createdAt === b.createdAt ? 0 : a.createdAt ? -1 : 1),
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Date Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: 150,
      sorter: (a, b) => (a.updatedAt === b.updatedAt ? 0 : a.updatedAt ? -1 : 1),
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'View',
      dataIndex: 'id',
      width: 70,
      align: 'right',
      key: 'id',
      render: (text, record) => (
        <>
          <Link to={`/admin/order/view?id=${text}`}>
            <FontAwesome name="eye" style={{ margin: '.5em 1em', color: 'rgb(46, 204, 113)' }} />
          </Link>
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 140,
      align: 'center',
      key: 'createdAt',
      render: (text, record) => (
        <>
          <Tooltip placement="topLeft" title="Edit Order" color="cyan">
            <Link to={`/admin/order/edit/${record.id}`}>
              <FontAwesome name="edit" style={{ margin: '.5em 1em', color: '#5F63F2' }} />
            </Link>
          </Tooltip>
          <Tooltip placement="topLeft" title="Make Purchase Order" color="cyan">
            <Link to={`/admin/po/add?order_id=${record.id}`}>
              <FontAwesome name="cart-plus" style={{ margin: '.5em 1em', color: "#e67e22" }} />
            </Link>
          </Tooltip>
        </>
      ),
    },
  ];

  const onDateRangeChange = dateRange => {
    if (dateRange) {
      setFilterParams(s => ({ ...s, orderEntryStartDate: dateRange[0]._d ?? '', orderEntryEndDate: dateRange[1]._d ?? '' }))
      setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
    } else {
      setChangeDateRange(null);
    }
  };

  const onDateUpdatedRangeChange = updatedDateRange => {
    if (updatedDateRange) {
      setFilterParams(s => ({ ...s, orderUpdatedStartDate: updatedDateRange[0]._d ?? '', orderUpdatedEndDate: updatedDateRange[1]._d ?? '' }))
      setChangeUpdatedDateRange(returnMomentDateRange(updatedDateRange[0], updatedDateRange[1]));
    } else {
      setChangeUpdatedDateRange(null);
    }
  };

  const returnMomentDateRange = (start, finish) => {
    return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
  };

  useEffect(() => {
    // Load Payment Mathod
    apolloClient
      .query({
        query: productSchema.GET_PAYMENT_METHOD_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPaymentMethodListPublic;
        if (!data.status) return;
        setPaymentMethod(data);
      }).catch(err => {
        setPaymentMethod(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setPaymentMethod(s => ({ ...s, loading: false }));
      });

    // Load Order Status
    apolloClient
      .query({
        query: orderQuery.GET_ORDER_STATUS_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderStatusList;
        if (!data.status) return;
        setOrderStatus(data);
      }).catch(err => {
        setOrderStatus(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setOrderStatus(s => ({ ...s, loading: false }));
      });

    // Load Order Update Admin List
    apolloClient
      .query({
        query: orderQuery.GET_ORDER_UPDATE_ADMIN_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getOrderUpdateAdminList;
        if (!data.status) return;
        setOrderUpdateAdmins(data);
      }).catch(err => {
        setOrderUpdateAdmins(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setOrderUpdateAdmins(s => ({ ...s, loading: false }));
      });

    if (checkPoint) {
      if (filterParams.paymentmethods.length > 0 ||
        filterParams.productIds.length > 0 ||
        filterParams.statuses.length > 0 ||
        filterParams.updatedby.length > 0 ||
        filterParams.searchQuery !== '' ||
        filterParams.orderEntryEndDate !== '' ||
        filterParams.orderEntryStartDate !== '' ||
        filterParams.orderUpdatedEndDate !== '' ||
        filterParams.orderUpdatedStartDate !== '') {
        setSearchDisable(false)
      } else {
        setSearchDisable(true)
      }
    }
    checkPoint = true;
  }, [filterParams]);

  return (
    <>
      <PageHeader
        title="List Orders"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              size="small"
              type="white"
              onClick={() => setIsFilter(state => !state)}
            >
              <FeatherIcon icon="filter" />
              Filter
            </Button>
            <Button size="small" type="white" onClick={() => {
              setChangeDateRange(null)
              setSearchDisable(true)
              setChangeUpdatedDateRange(null)
              setFilterParams({
                paymentmethods: [],
                productIds: [],
                statuses: [],
                updatedby: [],
                searchQuery: '',
                orderEntryStartDate: '',
                orderEntryEndDate: '',
                orderUpdatedStartDate: '',
                orderUpdatedEndDate: ''
              })
            }}>
              <RetweetOutlined />
              Reset Filter
            </Button>
            <Link to="/admin/order/add">
              <Button size="small" title="Add Order" type="primary">
                <FeatherIcon icon="plus" />
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {orders.loading ?
                <div className="spin">
                  <Spin />
                </div>
                :
                orders.error ?
                  <p>{orders.error}</p>
                  :
                  <>
                    <Row gutter={25}>
                      <Col span={18}>
                        <Input
                          style={{ height: "42px" }}
                          placeholder="Search Order By Customer..."
                          prefix={<SearchOutlined />}
                          value={filterParams?.searchQuery}
                          onChange={e => {
                            e.persist()
                            const value = e.target.value;
                            setFilterParams(s => ({ ...s, searchQuery: value }));
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <Button
                          style={{ height: "42px" }}
                          size="large"
                          type="primary"
                          disabled={searchDisable}
                          onClick={searchOrderAdmin}
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <br />
                    {isFilter && (
                      <div style={{ marginBottom: '2.5em' }}>
                        <Row gutter={16}>
                          <Col span={8}>
                            Product: <br />
                            <Select
                              style={{ width: '100%' }}
                              placeholder="Select Product"
                              options={productOption}
                              showSearch
                              allowClear
                              optionFilterProp="label"
                              size="middle"
                              mode="multiple"
                              value={filterParams?.productIds}
                              onDeselect={(val) => setFilterParams(prev => ({ ...prev, productIds: prev.productIds.filter(item => item !== val) }))}
                              onSelect={val => {
                                setFilterParams(s => ({ ...s, productIds: filterParams.productIds.concat(parseInt(val)) }));
                              }}
                              onSearch={val => {
                                if (val.length > 3) {
                                  apolloClient
                                    .query({
                                      query: productSchema.SEARCH_PRODUCT,
                                      variables: {
                                        query: {
                                          searchQuery: val,
                                        },
                                      },
                                      context: {
                                        headers: {
                                          TENANTID: process.env.REACT_APP_TENANTID,
                                        },
                                      },
                                    })
                                    .then(res => {
                                      const data = res?.data?.getSearchedProducts;
                                      if (!data.status) return;
                                      setProductOption(
                                        data.data.map(product => ({
                                          label: product?.prod_name +
                                            product?.prod_slug +
                                            product?.prod_sku +
                                            product?.prod_partnum +
                                            product?.mfg_build_part_number,
                                          value: product?.id,
                                          ...product,
                                        })),
                                      );
                                    });
                                } else {
                                  setProductOption([]);
                                }
                              }}
                            />
                          </Col>
                          <Col span={8}>
                            Payment Method: <br />
                            <Select
                              style={{ width: '100%' }}
                              placeholder={paymentMethod.loading ? 'Loading..' : 'Select Payment Method'}
                              size="middle"
                              mode="multiple"
                              optionFilterProp="label"
                              value={filterParams?.paymentmethods}
                              onDeselect={(val) => setFilterParams(prev => ({ ...prev, paymentmethods: prev.paymentmethods.filter(item => item !== val) }))}
                              onSelect={val => {
                                setFilterParams(s => ({ ...s, paymentmethods: filterParams.paymentmethods.concat(parseInt(val)) }));
                              }}
                              options={paymentMethod?.data.map(item => ({
                                label: item.name,
                                value: item.id,
                              }))}
                            />
                          </Col>
                          <Col span={8}>
                            Order Status : <br />
                            <Select
                              style={{ width: '100%' }}
                              placeholder={orderStatus.loading ? 'Loading..' : 'Select Order Status'}
                              size="middle"
                              mode="multiple"
                              optionFilterProp="label"
                              value={filterParams?.statuses}
                              onDeselect={(val) => setFilterParams(prev => ({ ...prev, statuses: prev.statuses.filter(item => item !== val) }))}
                              onSelect={val => {
                                setFilterParams(s => ({ ...s, statuses: filterParams.statuses.concat(parseInt(val)) }));
                              }}
                              options={orderStatus?.data.map(item => ({
                                label: item.name,
                                value: item.id,
                              }))}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: '.5em' }}>
                          <Col span={8}>
                            Updated By: <br />
                            <Select
                              style={{ width: '100%' }}
                              size="middle"
                              mode="multiple"
                              value={filterParams?.updatedby}
                              onDeselect={(val) => setFilterParams(prev => ({ ...prev, updatedby: prev.updatedby.filter(item => item !== val) }))}
                              placeholder={orderUpdateAdmins.loading ? 'Loading...' : 'Select Admins..'}
                              options={orderUpdateAdmins?.data?.map(item => ({
                                label: item.first_name + ' ' + item.last_name,
                                value: item.id,
                              }))}
                              onSelect={val => {
                                setFilterParams(s => ({ ...s, updatedby: filterParams.updatedby.concat(parseInt(val)) }));
                              }}
                            />
                          </Col>
                          <Col span={8}>
                            Date Added: <br />
                            <RangePicker
                              style={{ height: '40px', width: '100%' }}
                              size="small"
                              allowClear={true}
                              picker="date"
                              value={dateRange !== "" ? dateRange : ""}
                              onChange={onDateRangeChange}
                            />
                          </Col>
                          <Col span={8}>
                            Date Updated: <br />
                            <RangePicker
                              style={{ height: '40px', width: '100%' }}
                              size="small"
                              allowClear={true}
                              picker="date"
                              value={updatedDateRange !== "" ? updatedDateRange : ""}
                              onChange={onDateUpdatedRangeChange}
                            />
                          </Col>


                        </Row>

                      </div>
                    )}

                    <span className={'psp_list'}>
                      <Table
                        className="table-responsive"
                        columns={columns}
                        rowKey={'id'}
                        size="small"
                        dataSource={orders?.data ? orders.data : []}
                        rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                        pagination={{
                          defaultPageSize: config.ORDER_PER_PAGE,
                          total: orders?.data ? orders.data.length : 0,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                      />
                    </span>
                  </>
              }
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ListOrder;
