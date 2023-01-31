import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, DatePicker, Select, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { vendorMutation, vendorQuery } from '../../utility/apollo';
import { viewPermission } from '../../utility/utility';
import Moment from 'react-moment';
import moment from 'moment';
const { RangePicker } = DatePicker;
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

let checkPoint = false;
const ListVendor = () => {
  viewPermission('vendor');

  const [vendors, setVendors] = useState({ data: [], loading: false, error: '' });
  const token = useSelector(state => state.auth.token);
  const [isFilter, setIsFilter] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [searchDisable, setSearchDisable] = useState(true);
  const [dateRange, setChangeDateRange] = useState(null);
  const [updatedDateRange, setChangeUpdatedDateRange] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: '',
    searchQuery: '',
    vendorEntryStartDate: '',
    vendorEntryEndDate: '',
    vendorUpdatedStartDate: '',
    vendorUpdatedEndDate: ''
  });

  const columns = [
    {
      title: 'Vendor ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 180,
      ellipsis: true,
      sorter: (a, b) => (a.company_name > b.company_name ? 1 : -1),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
      ellipsis: true,
      sorter: (a, b) => (a.phone_number > b.phone_number ? 1 : -1),
    },
    {
      title: 'EIN',
      dataIndex: 'EIN_no',
      key: 'EIN_no',
      ellipsis: true,
      sorter: (a, b) => (a.EIN_no > b.EIN_no ? 1 : -1),
    },
    {
      title: 'Fax',
      dataIndex: 'FAX_no',
      key: 'FAX_no',
      ellipsis: true,
      sorter: (a, b) => (a.FAX_no > b.FAX_no ? 1 : -1),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      // width: 100,
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value, record) => (
        <Switch defaultChecked={value} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
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
      width: 70,
      align: 'right',
      render: (text, record) => (
        <>
          <Link to={`/admin/vendor/edit/${record.id}`}>
            <FontAwesome name="edit" style={{ margin: '.5em 1em', color: '#5F63F2' }} />
          </Link>
        </>
      ),
      key: 'last_name',
    },
  ];

  const searchVendorAdmin = () => {
    setVendors(s => ({ ...s, loading: true }));
    apolloClient
      .query({
        query: vendorQuery.GET_ALL_VENDOR,
        variables: {
          query: {
            searchQuery: filterParams.searchQuery ?? '',
            status: filterParams.status ?? '',
            vendorEntryStartDate: filterParams.vendorEntryStartDate ?? '',
            vendorEntryEndDate: filterParams.vendorEntryEndDate ?? '',
            vendorUpdatedStartDate: filterParams.vendorUpdatedStartDate ?? '',
            vendorUpdatedEndDate: filterParams.vendorUpdatedEndDate ?? ''
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
        const data = res?.data?.getAllVendor;
        if (!data.status) return;
        setVendors(data);
      })
      .catch(err => {
        setVendors(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setVendors(s => ({ ...s, loading: false }));
        setSearchButton(!searchButton)
      });
  }

  const handleStatusChange = (record, checked) => {
    apolloClient
      .mutate({
        mutation: vendorMutation.UPDATE_VENDOR_STATUS,
        variables: { data: { id: record.id, status: checked } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateVendorStatus;
        if (!data.status) return toast.error(data.message);
        toast.success(`${record.company_name} status updated.`);
      })
      .catch(err => {
        return toast.error('Something Went wrong !!');
      });
  };

  const onDateRangeChange = dateRange => {
    if (dateRange) {
      setFilterParams(s => ({ ...s, vendorEntryStartDate: dateRange[0]._d ?? '', vendorEntryEndDate: dateRange[1]._d ?? '' }))
      setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
    } else {
      setChangeDateRange(null);
    }
  };
  const onDateUpdatedRangeChange = updatedDateRange => {
    if (updatedDateRange) {
      setFilterParams(s => ({ ...s, vendorUpdatedStartDate: updatedDateRange[0]._d ?? '', vendorUpdatedEndDate: updatedDateRange[1]._d ?? '' }))
      setChangeUpdatedDateRange(returnMomentDateRange(updatedDateRange[0], updatedDateRange[1]));
    } else {
      setChangeUpdatedDateRange(null);
    }
  };

  const returnMomentDateRange = (start, finish) => {
    return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
  };

  useEffect(() => {
    if (checkPoint) {
      if (filterParams.searchQuery !== '' ||
        filterParams.vendorEntryStartDate !== '' ||
        filterParams.status !== '' ||
        filterParams.vendorEntryEndDate !== '' ||
        filterParams.vendorUpdatedStartDate !== '' ||
        filterParams.vendorUpdatedEndDate !== '') {
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
        title="Vendors"
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
                status: '',
                searchQuery: '',
                vendorEntryStartDate: '',
                vendorEntryEndDate: '',
                vendorUpdatedStartDate: '',
                vendorUpdatedEndDate: ''
              })
            }}>
              <RetweetOutlined />
              Reset Filter
            </Button>
            <Link to="/admin/vendor/add">
              <Button size="small" title="Add Vendors" type="primary">
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
              {vendors.loading ?
                <div className="spin">
                  <Spin />
                </div>
                :
                vendors.error ?
                  <p>{vendors.error}</p>
                  :
                  <>
                    <Row gutter={25}>
                      <Col span={18}>
                        <Input
                          placeholder="Search Vendor By Company Name, Email, Phone...."
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
                          size="large"
                          type="primary"
                          disabled={searchDisable}
                          onClick={searchVendorAdmin}
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>

                    <br />
                    <br />
                    {isFilter && (
                      <div style={{ marginBottom: '2.5em' }}>
                        <Row gutter={16} style={{ marginTop: '.5em' }}>
                          <Col span={4}>
                            Status: <br />
                            <Select
                              style={{ width: '100%' }}
                              size="middle"
                              placeholder={"Select Status..."}
                              value={filterParams?.status}
                              options={[
                                {
                                  label: "True",
                                  value: "true"
                                },
                                {
                                  label: "False",
                                  value: "false"
                                },
                              ]}
                              onSelect={val => {
                                setFilterParams(s => ({ ...s, status: val }));
                              }}
                            />
                          </Col>
                          <Col span={10}>
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
                          <Col span={10}>
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
                        rowKey={'g_s'}
                        size="small"
                        dataSource={vendors?.data ? vendors.data : []}
                        // pagination={false}
                        pagination={{
                          defaultPageSize: config.VENDOR_PER_PAGE,
                          total: vendors?.data ? vendors.data.length : 0,
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

export default ListVendor;
