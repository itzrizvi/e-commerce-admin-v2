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

const ListContent = () => {
  viewPermission('email-template');
  const [emailContent, setEmailContent] = useState({ data: [], loading: true, error: '' });
  const [filteredEmailContent, setFilteredEmailContent] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_CONTENT_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getEmailTemplateList;
        setEmailContent(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setEmailContent(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setEmailContent(s => ({ ...s, loading: false }));
      });
  });

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
      title: 'Header Name',
      dataIndex: ['emailHeader', 'name'],
      key: 'name',
      sorter: (a, b) => (a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Footer Name',
      dataIndex: ['emailFooter', 'name'],
      key: 'name',
      sorter: (a, b) => (a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1),
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
          <Link to={`/admin/email/content/edit/${record.id}`}>
            <FontAwesome name="edit" />
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredEmailContent(
      emailContent.data.filter(email =>
        (email?.name + email?.emailHeader?.name + email?.slug + email?.emailFooter?.name)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Email Content"
        buttons={[
          <div key="email-template" className="page-header-actions">
            <Link to="/admin/email/content/add">
              <Button size="small" title="Add Email Content" type="primary">
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
              {emailContent.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : emailContent.error ? (
                <p>{emailContent.error}</p>
              ) : (
                <>
                  <Input
                    placeholder="Search in Email Template Content..."
                    prefix={<SearchOutlined />}
                    onChange={onChangeSearch}
                  />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.EMAIL_TEMPLATE_PER_PAGE,
                        total: isFilter ? emailContent?.data?.length : emailContent?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredEmailContent : emailContent.data}
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

export default ListContent;
