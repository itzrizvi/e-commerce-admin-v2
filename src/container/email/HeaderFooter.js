import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient from '../../apollo';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import config from '../../config/config';
import { EmailTemplateQuery } from '../../apollo/email';

const ListEmail = () => {
  viewPermission('email-template');
  const [headerFooter, setHeaderFooter] = useState({ data: [], loading: true, error: '' });
  const [filteredHeaderFooter, setFilteredHeaderFooter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_HEADER_FOOTER_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getEmailTempHeaderFooterList;
        setHeaderFooter(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setHeaderFooter(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setHeaderFooter(s => ({ ...s, loading: false }));
      });
  }, []);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 40,
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Alias',
      dataIndex: 'slug',
      key: 'slug',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.type.toUpperCase() > b.type.toUpperCase() ? 1 : -1),
      render: (text) => text.toUpperCase()
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 120,
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'right',
      key: 'action',
      width: 80,
      render: (text, record) => (
        <>
          <Link to={`/admin/email/header-footer/edit/${record.id}`}>
            <FontAwesome name="edit" />
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredHeaderFooter(
        headerFooter.data.filter(hf =>
        (hf?.name + hf?.slug + hf?.type).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Email Header Footer"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/email/header-footer/add">
              <Button size="small" title="Add Email Header Footer" type="primary">
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
              {headerFooter.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : headerFooter.error ? (
                <p>{headerFooter.error}</p>
              ) : (
                <>
                  <Input placeholder="Search in Email Header Footer..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.EMAIL_TEMPLATE_PER_PAGE,
                        total: isFilter ? headerFooter?.data?.length : headerFooter?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredHeaderFooter : headerFooter.data}
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

export default ListEmail;
