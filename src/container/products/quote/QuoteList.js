import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient from '../../../apollo';
import { quoteQuery } from '../../../apollo/quote';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { viewPermission } from '../../../utility/utility';
import config from '../../../config/config';

const QuoteList = () => {
  viewPermission('quote');
  const [quote, setQuote] = useState({ data: [], loading: true, error: '' });
  const [filteredQuote, setFilteredQuote] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
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
        setQuote(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setQuote(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setQuote(s => ({ ...s, loading: false }));
      });
  }, []);


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

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredQuote(
      quote.data.filter(quote =>
        (quote?.quotedby?.email + quote?.id + quote?.status + quote?.grand_total + quote?.note).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader title="Quote List" />
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
                  <Input placeholder="Search in Quote..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.QUOTE_PER_PAGE,
                        total: isFilter ? quote?.data?.length : quote?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredQuote : quote.data}
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
