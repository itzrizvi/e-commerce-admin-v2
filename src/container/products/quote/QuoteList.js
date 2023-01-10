import React, { useEffect, useState } from 'react';
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient from '../../../apollo';
import { quoteQuery } from '../../../apollo/quote';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import FeatherIcon from 'feather-icons-react';
const { RangePicker } = DatePicker;
import { viewPermission } from '../../../utility/utility';
import config from '../../../config/config';
import Cookies from 'js-cookie';
import moment from 'moment';

let checkPoint = false;

const QuoteList = () => {
  viewPermission('quote');
  const [quote, setQuote] = useState({ data: [], loading: false, error: '' });
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [searchButton, setSearchButton] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState({ data: [], isLoading: true });
  const [dateRange, setChangeDateRange] = useState(null);
  const [searchDisable, setSearchDisable] = useState(true);
  const [filterDate, setFilterDate] = useState({
    status: [],
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    searchQuery: ''
  });


  // Load Quote Status List
  useEffect(() => {
    apolloClient
      .query({
        query: quoteQuery.GET_ALL_QUOTE_STATUS,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getQuoteStatusList;
        if (!data.status) return;
        setQuoteStatus({ data: data.data, isLoading: false });
      });

  }, []);


  useEffect(() => {
    if (checkPoint) {
      if (filterDate.status.length > 0 ||
        filterDate.searchQuery !== '' ||
        filterDate.endDate !== '' ||
        filterDate.startDate !== '' ||
        filterDate.minAmount !== '' ||
        filterDate.maxAmount !== '') {
        setSearchDisable(false)
      } else {
        setSearchDisable(true)
      }
    }
    checkPoint = true;
  }, [filterDate]);


  const searchQuoteAdmin = () => {
    setQuote(s => ({ ...s, loading: true }));
    // return
    apolloClient
      .query({
        query: quoteQuery.GET_ALL_QUOTE,
        variables: {
          query: {
            searchQuery: filterDate.searchQuery ?? '',
            statuses: filterDate.status ?? null,
            quoteEntryStartDate: filterDate.startDate ?? '',
            quoteEntryEndDate: filterDate.endDate ?? '',
            minAmount: parseFloat(filterDate.minAmount) ?? null,
            maxAmount: parseFloat(filterDate.maxAmount) ?? null
          }
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSubmittedQuoteList;
        if (!data?.status) return;
        setQuote(data);
      })
      .catch(err => {
        setQuote(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setQuote(s => ({ ...s, loading: false }));
        setSearchButton(!searchButton)
      });
  }


  const columns = [
    {
      title: 'Quoted By',
      dataIndex: ['quotedby', 'first_name'],
      key: 'first_name',
      width: 100,
      ellipsis: true,
      render: (text, record) => `${text} ${record.quotedby.last_name}`
    },
    {
      title: 'Email',
      dataIndex: ['quotedby', 'email'],
      key: 'email',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
    },
    {
      title: 'Total',
      dataIndex: 'grand_total',
      key: 'grand_total',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => (a.grand_total > b.grand_total ? 1 : -1),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 150,
      render: val => (
        <span
          style={{
            borderRadius: '.5em',
            padding: '.5em 2.5em',
          }}
        >
          {val}
        </span>
      ),
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: 250,
      ellipsis: true,
      sorter: (a, b) => (a.note > b.note ? 1 : -1),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'right',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <>
          <Link to={`/admin/products/quote/edit/${record.id}`} style={{ margin: '.5em', color: "#096dd9" }} >
            <FontAwesome name="edit" style={{ color: "#5F63F2" }} />
          </Link>
        </>
      ),
    },
  ];


  const onDateRangeChange = dateRange => {
    if (dateRange) {
      setFilterDate(s => ({ ...s, startDate: dateRange[0]._d ?? '', endDate: dateRange[1]._d ?? '' }))
      setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
    } else {
      setChangeDateRange(null);
    }
  };
  const returnMomentDateRange = (start, finish) => {
    return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
  };

  return (
    <>
      <PageHeader
        title="Quote List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="white" onClick={() => setIsFilter(state => !state)}>
              <FeatherIcon icon="filter" />
              Filter
            </Button>
            <Button size="small" type="white" onClick={() => {
              setChangeDateRange(null)
              setSearchDisable(true)
              setFilterDate({
                status: [],
                startDate: '',
                endDate: '',
                minAmount: '',
                maxAmount: '',
                searchQuery: ''
              })
            }}>
              <RetweetOutlined />
              Reset Filter
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {quote.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : quote.error ? (
                <p>{quote.error}</p>
              ) : (
                <>
                  <Row gutter={25}>
                    <Col span={18}>
                      <Input
                        style={{ height: "42px" }}
                        placeholder="Search Quotes..."
                        prefix={<SearchOutlined />}
                        value={filterDate?.searchQuery}
                        onChange={e => {
                          e.persist()
                          const value = e.target.value;
                          setFilterDate(s => ({ ...s, searchQuery: value }));
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        size="large"
                        type="primary"
                        disabled={searchDisable}
                        onClick={searchQuoteAdmin}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  {isFilter && (
                    <div style={{ marginBottom: '2.5em' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          Status: <br />
                          <Select
                            style={{ width: '100%' }}
                            placeholder="Select status"
                            size="middle"
                            mode="multiple"
                            value={filterDate?.status}
                            onDeselect={(val) => setFilterDate(prev => ({ ...prev, status: prev.status.filter(item => item !== val) }))}
                            onSelect={val => {
                              setFilterDate(s => ({ ...s, status: filterDate.status.concat(val) }));
                            }}
                            options={quoteStatus?.data.map(item => ({
                              label: item.name,
                              value: item.slug,
                            }))}
                          />
                        </Col>

                        <Col span={8}>
                          Date: <br />
                          <RangePicker
                            style={{ height: '40px', width: '100%' }}
                            size="middle"
                            allowClear={true}
                            picker="date"
                            value={dateRange !== "" ? dateRange : ""}
                            onChange={onDateRangeChange}
                          />
                        </Col>

                        <Col span={8}>
                          Amount: <br />
                          <Input.Group compact size="default">
                            <Input
                              type="text"
                              placeholder="Min Amount"
                              style={{ width: '50%', height: '40px' }}
                              value={filterDate?.minAmount ?? ''}
                              onChange={e => {
                                e.persist()
                                setFilterDate(s => ({ ...s, minAmount: e?.target?.value }));
                              }}
                            />
                            <Input
                              type="text"
                              placeholder="Max Ampunt"
                              style={{ width: '50%', height: '40px' }}
                              value={filterDate?.maxAmount ?? ''}
                              onChange={e => {
                                e.persist()
                                setFilterDate(s => ({ ...s, maxAmount: e?.target?.value }));
                              }}
                            />
                          </Input.Group>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.QUOTE_PER_PAGE,
                        total: quote.data ? quote.data.length : 0,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={quote.data ? quote.data : []}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
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

export default QuoteList;
