import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Select, Tooltip, DatePicker, Checkbox, Modal } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
const { confirm } = Modal;
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  RetweetOutlined,
  SearchOutlined,
  SendOutlined,
  StopOutlined,
} from '@ant-design/icons';
import config from '../../config/config';
import apolloClient from '../../utility/apollo';
import { toast } from 'react-toastify';
import { checkPermission, viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { poQuery } from '../../apollo/po';
import { receivingProductQuery } from '../../apollo/receiving_product';
import Moment from 'react-moment';
import moment from 'moment';
const { RangePicker } = DatePicker;
import { productSchema } from '../../apollo/product';

let checkPoint = false;
const ListPO = () => {
  viewPermission('purchase-order');
  const [po, setPO] = useState({ data: [], loading: false, error: '' });
  const token = useSelector(state => state.auth.token);
  const history = useHistory();
  const [isFilter, setIsFilter] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [POStatus, setPOStatus] = useState({ data: [], loading: false, error: '' });
  const [PONumbers, setPONumbers] = useState({ data: [], loading: false, error: '' });
  const [searchDisable, setSearchDisable] = useState(true);
  const [hasOrder, setHasOrder] = useState(false);
  const [dateRange, setChangeDateRange] = useState(null);
  const [productOption, setProductOption] = useState([]);
  const [updatedDateRange, setChangeUpdatedDateRange] = useState(null);
  const [filterParams, setFilterParams] = useState({
    ponumbers: [],
    productIDS: [],
    statuses: [],
    types: [],
    has_order: false,
    searchQuery: '',
    poEntryStartDate: '',
    poEntryEndDate: '',
    poUpdatedStartDate: '',
    poUpdatedEndDate: '',
  });

  const columns = [
    {
      title: 'PO Number',
      dataIndex: 'po_number',
      key: 'po_number',
      width: 120,
      sorter: (a, b) => (a.po_number > b.po_number ? 1 : -1),
      render: (text, record) => <Link to={`/admin/po/view-po/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => (a.order_id > b.order_id ? 1 : -1),
      render: value => <span>{value ?? 'N/A'}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      sorter: (a, b) => (a.type > b.type ? 1 : -1),
      render: value => value.toUpperCase(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'grandTotal_price',
      key: 'grandTotal_price',
      width: 120,
      align: 'center',
      sorter: (a, b) => parseFloat(a.grandTotal_price) > parseFloat(b.grandTotal_price),
    },
    {
      title: 'Status',
      dataIndex: ['postatus', 'name'],
      key: 'name',
      align: 'center',
      width: 100,
      render: val => <span>{val}</span>,
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      key: 'comment',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 140,
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
      width: 140,
      sorter: (a, b) => (a.updatedAt === b.updatedAt ? 0 : a.updatedAt ? -1 : 1),
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
      align: 'right',
      render: (text, record) => (
        <>
          {(record?.postatus?.slug === 'new' || record?.postatus?.slug === 'canceled') &&
            checkPermission('submit-po', 'edit') && (
              <Tooltip placement="topLeft" title="Submit PO">
                <SendOutlined
                  onClick={() => poSendToVendor(record)}
                  className="list_po_button_style"
                  style={{ color: 'rgb(34 121 230)' }}
                />
              </Tooltip>
            )}

          {(record?.postatus?.slug === 'submitted' ||
            record?.postatus?.slug === 'new' ||
            record?.postatus?.slug === 'view') &&
            checkPermission('cancel-po', 'edit') && (
              <Tooltip placement="topLeft" title="Cancel PO">
                <CloseCircleOutlined
                  onClick={() => poStatus(record, 'cancel')}
                  className="list_po_button_style"
                  style={{ color: 'rgb(255 0 0)' }}
                />
              </Tooltip>
            )}
          {record?.postatus?.slug === 'new' && checkPermission('hold-po', 'edit') && (
            <Tooltip placement="topLeft" title="Hold PO">
              <PauseCircleOutlined
                onClick={() => poStatus(record, 'hold')}
                className="list_po_button_style"
                style={{ color: 'rgb(165 77 0)' }}
              />
            </Tooltip>
          )}
          {record?.postatus?.slug === 'canceled' &&
            checkPermission(
              'kill-po',
              'edit',
            )(
              <Tooltip placement="topLeft" title="Kill PO">
                <StopOutlined
                  onClick={() => poStatus(record, 'kill')}
                  className="list_po_button_style"
                  style={{ color: 'rgb(255 0 0)' }}
                />
              </Tooltip>,
            )}
        </>
      )
    },
  ];

  useEffect(() => {
    // Load PO Status
    apolloClient
      .query({
        query: poQuery.GET_PO_STATUS_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPOStatusList;
        if (!data.status) return;
        setPOStatus(data);
      })
      .catch(err => {
        setPOStatus(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setPOStatus(s => ({ ...s, loading: false }));
      });

    // Load PO NUMBERS
    apolloClient
      .query({
        query: poQuery.GET_PO_NUMBER_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPONumbers;
        if (!data.status) return;
        setPONumbers(data);
      })
      .catch(err => {
        setPONumbers(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setPONumbers(s => ({ ...s, loading: false }));
      });

    if (checkPoint) {
      if (
        filterParams.ponumbers.length > 0 ||
        filterParams.productIDS.length > 0 ||
        filterParams.statuses.length > 0 ||
        filterParams.types.length > 0 ||
        filterParams.searchQuery !== '' ||
        hasOrder !== false ||
        filterParams.poEntryStartDate !== '' ||
        filterParams.poEntryEndDate !== '' ||
        filterParams.poUpdatedStartDate !== '' ||
        filterParams.poUpdatedEndDate !== ''
      ) {
        setSearchDisable(false);
      } else {
        setSearchDisable(true);
      }
    }
    checkPoint = true;
  }, [filterParams]);

  const searchPOAdmin = () => {
    setPO(s => ({ ...s, loading: true }));
    apolloClient
      .query({
        query: poQuery.GET_ALL_PO,
        variables: {
          query: {
            searchQuery: filterParams.searchQuery ?? '',
            productIDS: filterParams.productIDS.length ? filterParams.productIDS : null,
            statuses: filterParams.statuses.length ? filterParams.statuses : null,
            ponumbers: filterParams.ponumbers.length ? filterParams.ponumbers : null,
            types: filterParams.types.length ? filterParams.types : null,
            has_order: filterParams.has_order === true && filterParams.has_order,
            poEntryStartDate: filterParams.poEntryStartDate ?? '',
            poEntryEndDate: filterParams.poEntryEndDate ?? '',
            poUpdatedStartDate: filterParams.poUpdatedStartDate ?? '',
            poUpdatedEndDate: filterParams.poUpdatedEndDate ?? '',
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getPurchaseOrderList;
        if (!data.status) return;
        setPO(data);
      })
      .catch(err => {
        setPO(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setPO(s => ({ ...s, loading: false }));
        setSearchButton(!searchButton);
      });
  };

  const handleCreateReceivingProduct = id => {
    apolloClient
      .mutate({
        mutation: receivingProductQuery.ADD_RECEIVING_PRODUCT,
        variables: {
          data: {
            status: 'new',
            purchaseOrder_id: id,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: receivingProductQuery.GET_ALL_RP,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
          ['getReceivingProductList'],
        ],
      })
      .then(res => {
        const data = res?.data?.createReceiving;
        if (!data.status) return toast.error(data.message);
        toast.success(data.message);
        history.push(`/admin/rp/edit?id=${data?.id}`);
      })
      .catch(err => {
        console.log('error on adding customer', err);
      });
  };

  const onDateRangeChange = dateRange => {
    if (dateRange) {
      setFilterParams(s => ({ ...s, poEntryStartDate: dateRange[0]._d ?? '', poEntryEndDate: dateRange[1]._d ?? '' }));
      setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
    } else {
      setChangeDateRange(null);
    }
  };

  const onDateUpdatedRangeChange = updatedDateRange => {
    if (updatedDateRange) {
      setFilterParams(s => ({
        ...s,
        poUpdatedStartDate: updatedDateRange[0]._d ?? '',
        poUpdatedEndDate: updatedDateRange[1]._d ?? '',
      }));
      setChangeUpdatedDateRange(returnMomentDateRange(updatedDateRange[0], updatedDateRange[1]));
    } else {
      setChangeUpdatedDateRange(null);
    }
  };

  const returnMomentDateRange = (start, finish) => {
    return [moment(start, 'YYYY-MM-DD'), moment(finish, 'YYYY-MM-DD')];
  };

  // Confirmation status change
  const poStatus = (record, type) => {
    if (POStatus.data.length === 0) return;
    let status_id;
    let title;
    if (type === 'send') {
      status_id = POStatus.data.filter(item => item.slug === 'submitted')[0].id;
      title = `Do you want to send PO to vendor ?`;
    } else if (type === 'hold') {
      status_id = POStatus.data.filter(item => item.slug === 'hold')[0].id;
      title = `Do you want to hold PO?`;
    } else if (type === 'cancel') {
      status_id = POStatus.data.filter(item => item.slug === 'canceled')[0].id;
      title = `Do you want to cancel PO?`;
    } else if (type === 'kill') {
      status_id = POStatus.data.filter(item => item.slug === 'kill')[0].id;
      title = `Do you want to kill PO?`;
    }

    confirm({
      title,
      icon: <CheckCircleOutlined />,
      content: `PO Number: ${record.po_number}`,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.UPDATE_PO_STATUS,
            variables: {
              data: {
                id: record.id,
                status: status_id,
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
            const data = res?.data?.updatePOStatus;
            if (!data.status) return toast.error(data.message);
            statusUpdate(record.po_number);
          })
          .catch(err => {
            console.log('got error on add vendor', err);
          })
          .finally(() => {
            setIsLoading(false);
            setCreatingPO(true);
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };
  const poSendToVendor = record => {
    if (POStatus.data.length === 0) return;
    const status_id = POStatus.data.filter(item => item.slug === 'submitted')[0].id;

    confirm({
      title: 'Do you want to send PO to vendor ?',
      icon: <CheckCircleOutlined />,
      content: `PO Number: ${record.po_number}`,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.SEND_TO_PO,
            variables: {
              data: {
                id: record.id,
                status: status_id,
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
            const data = res?.data?.poSendToVendor;
            if (!data.status) return;
            Modal.success({
              content: `${record.po_number} send successfully.`,
              onOk: () => {
                searchPOAdmin();
              },
            });
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  // Success Message
  const statusUpdate = id => {
    Modal.success({
      content: `${id} status has been changed successfully.`,
      onOk: () => {
        searchPOAdmin();
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Purchase Order"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="white" onClick={() => setIsFilter(state => !state)}>
              <FeatherIcon icon="filter" />
              Filter
            </Button>
            <Button
              size="small"
              type="white"
              onClick={() => {
                setChangeDateRange(null);
                setSearchDisable(true);
                setChangeUpdatedDateRange(null);
                setHasOrder(false);
                setFilterParams({
                  ponumbers: [],
                  productIDS: [],
                  statuses: [],
                  types: [],
                  searchQuery: '',
                  poEntryStartDate: '',
                  poEntryEndDate: '',
                  poUpdatedStartDate: '',
                  poUpdatedEndDate: '',
                });
              }}
            >
              <RetweetOutlined />
              Reset Filter
            </Button>
            {checkPermission('create-po', 'edit') && (
              <Link to="/admin/po/add">
                <Button size="small" title="Add Purchase Order" type="primary">
                  <FeatherIcon icon="plus" /> Create PO
                </Button>
              </Link>
            )}
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {po.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : po.error ? (
                <p>{po.error}</p>
              ) : (
                <>
                  <Row gutter={25}>
                    <Col span={18}>
                      <Input
                        style={{ height: '42px' }}
                        placeholder="Search PO By Vendor Details..."
                        prefix={<SearchOutlined />}
                        value={filterParams?.searchQuery}
                        onChange={e => {
                          e.persist();
                          const value = e.target.value;
                          setFilterParams(s => ({ ...s, searchQuery: value }));
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        style={{ height: '42px' }}
                        size="large"
                        type="primary"
                        disabled={searchDisable}
                        onClick={searchPOAdmin}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <br />

                  {isFilter && (
                    <div style={{ marginBottom: '2.5em' }}>
                      <Row gutter={16} style={{ marginBottom: '2.5em' }}>
                        <Col span={8}>
                          <Checkbox
                            checked={hasOrder}
                            onChange={e => {
                              setFilterParams(s => ({ ...s, has_order: e.target.checked }));
                              setHasOrder(e.target.checked);
                            }}
                          >
                            Has Order
                          </Checkbox>
                        </Col>
                      </Row>
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
                            value={filterParams?.productIDS}
                            onDeselect={val =>
                              setFilterParams(prev => ({
                                ...prev,
                                productIDS: prev.productIDS.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterParams(s => ({
                                ...s,
                                productIDS: filterParams.productIDS.concat(parseInt(val)),
                              }));
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
                                        label:
                                          product?.prod_name +
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
                          PO Status : <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder={POStatus.loading ? 'Loading..' : 'Select PO Status'}
                            size="middle"
                            mode="multiple"
                            optionFilterProp="label"
                            value={filterParams?.statuses}
                            onDeselect={val =>
                              setFilterParams(prev => ({
                                ...prev,
                                statuses: prev.statuses.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterParams(s => ({ ...s, statuses: filterParams.statuses.concat(parseInt(val)) }));
                            }}
                            options={POStatus?.data.map(item => ({
                              label: item.name,
                              value: item.id,
                            }))}
                          />
                        </Col>
                        <Col span={8}>
                          PO Numbers : <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder={PONumbers.loading ? 'Loading..' : 'Select PO Numbers'}
                            size="middle"
                            mode="multiple"
                            optionFilterProp="label"
                            value={filterParams?.ponumbers}
                            onDeselect={val =>
                              setFilterParams(prev => ({
                                ...prev,
                                ponumbers: prev.ponumbers.filter(item => item !== val),
                              }))
                            }
                            onSelect={val => {
                              setFilterParams(s => ({ ...s, ponumbers: filterParams.ponumbers.concat(val) }));
                            }}
                            options={PONumbers?.data.map(item => ({
                              label: item.po_number,
                              value: item.po_number,
                            }))}
                          />
                        </Col>
                      </Row>
                      <Row gutter={16} style={{ marginTop: '.5em' }}>
                        <Col span={8}>
                          Types: <br />
                          <Select
                            style={{ width: '100%' }}
                            size="middle"
                            mode="multiple"
                            value={filterParams?.types}
                            onDeselect={val =>
                              setFilterParams(prev => ({ ...prev, types: prev.types.filter(item => item !== val) }))
                            }
                            placeholder={'Select Types..'}
                            options={[
                              {
                                label: 'Default',
                                value: 'default',
                              },
                              {
                                label: 'Drop Shipping',
                                value: 'drop_shipping',
                              },
                            ]}
                            onSelect={val => {
                              setFilterParams(s => ({ ...s, types: filterParams.types.concat(val) }));
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
                            value={dateRange !== '' ? dateRange : ''}
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
                            value={updatedDateRange !== '' ? updatedDateRange : ''}
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
                      dataSource={po?.data ? po.data : []}
                      pagination={{
                        defaultPageSize: config.PO_PER_PAGE,
                        total: po?.data ? po.data.length : 0,
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

export default ListPO;
