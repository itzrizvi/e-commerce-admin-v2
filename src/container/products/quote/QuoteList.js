import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
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

const QuoteList = () => {
  viewPermission('quote');
  const [quote, setQuote] = useState({ data: [], loading: false, error: '' });
  const [filteredQuote, setFilteredQuote] = useState([]);
  const [isFilter, setIsFilter] = useState(true);
  const token = useSelector(state => state.auth.token);
  const [searchText, setSearchText] = useState('');
  const [backupQuotes, setBackupQuotes] = useState([]);
  const [searchButton, setSearchButton] = useState(false);
  const [filterDate, setFilterDate] = useState({
    status: [],
    startDate: '',
    endDate: ''
  });


  const searchQuoteAdmin = () => {
    setQuote(s => ({ ...s, loading: true }));
    // return
    apolloClient
      .query({
        query: quoteQuery.GET_ALL_QUOTE,
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
        setBackupQuotes(data?.data);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Email',
      dataIndex: ['quotedby', 'email'],
      key: 'email',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1),
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
      align: 'right',
      width: 100,
      filters: [
        {
          text: 'New',
          value: "new",
        },
        {
          text: 'In Progress',
          value: "in_progress",
        },
        {
          text: 'Save',
          value: "save",
        },
        {
          text: 'Submitted',
          value: "submitted",
        },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status - b.status,
      render: (text) => text.toUpperCase()
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: 250,
      ellipsis: true,
      sorter: (a, b) => (a.note.toUpperCase() > b.note.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
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
          <Link to={`/admin/products/quote/edit/${record.id}`} style={{ margin: '.5em' }} >
            <FontAwesome name="edit" />
          </Link>
        </>
      ),
    },
  ];

  ////////////////////////
  const quoteStatus = [
    'submitted',
    'in_progress',
    'new',
    'received',
    'save'
  ]


  // All filter
  useEffect(() => {
    if (quote.loading) return;
    let filteredData = backupQuotes;
    if (searchText) {
      filteredData = filteredData.filter(quote =>
        (quote?.quotedby.email).toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    if (filterDate.startDate) {
      const startDate = new Date(filterDate.startDate).valueOf();
      const endDate = new Date(filterDate.endDate).valueOf();
      filteredData = filteredData.filter(quote => {
        const creeatedAt = parseInt(quote.createdAt);
        const c1 = creeatedAt >= startDate;
        const c2 = creeatedAt <= endDate;
        return c1 && c2;
      });
    }

    if (filterDate.status.length) {
      filteredData = filteredData.filter(quote => filterDate.status.includes(quote.status));
    }

    setFilteredQuote(filteredData);
  }, [searchButton]);


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
                        placeholder="Search Quotes..."
                        prefix={<SearchOutlined />}
                        onChange={e => {
                          const value = e.target.value;
                          setSearchText(value);
                        }}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        size="large"
                        type="primary"
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
                            onChange={val => {
                              setFilterDate(s => ({ ...s, status: val }));
                            }}
                            options={quoteStatus.map(item => ({
                              label: item.toUpperCase(),
                              value: item,
                            }))}
                          />
                        </Col>

                        <Col span={8}>
                          Date: <br />
                          <RangePicker
                            style={{ height: '40px', width: '100%' }}
                            size="middle"
                            onChange={val => {
                              setFilterDate(s => {
                                return {
                                  ...s,
                                  startDate: val ? val[0]?._d : null,
                                  endDate: val ? val[1]?._d : null,
                                };
                              });
                            }}
                          />
                        </Col>

                        <Col span={8}>
                          Amount: <br />
                          <Input
                            style={{ height: '40px', width: '50%' }}
                            size="middle"
                            type="text"
                            placeholder="Min Amount"
                          // value={filterDate?.minPrice ?? ''}
                          // onChange={e => {
                          //   e.persist()
                          //   setFilterDate(s => ({ ...s, minPrice: e?.target?.value }));
                          // }}
                          />
                          <Input
                            style={{ height: '40px', width: '50%' }}
                            size="middle"
                            type="text"
                            placeholder="Max Ampunt"
                          // value={filterDate?.maxPrice ?? ''}
                          // onChange={e => {
                          //   e.persist()
                          //   setFilterDate(s => ({ ...s, maxPrice: e?.target?.value }));
                          // }}
                          />
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
                        total: filteredQuote.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={filteredQuote}
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
