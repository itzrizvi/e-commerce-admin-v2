import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table, Modal } from 'antd';
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

const ListTemplate = () => {
  viewPermission('email-template');
  const [email, setEmail] = useState({ data: [], loading: true, error: '' });
  const [filteredEmail, setFilteredEmail] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllEmailTemplateList;
        setEmail(s => ({ ...s, data: data?.data, error: '' }));
      })
      .finally(() => {
        setEmail(s => ({ ...s, loading: false }));
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
      title: 'Email Template ID',
      dataIndex: 'email_template_id',
      key: 'email_template_id',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.email_template_id.toUpperCase() > b.email_template_id.toUpperCase() ? 1 : -1),
      render: text => text ?? 'Not Used!',
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
          <Link to={`/admin/email/template/edit/${record.id}`}>
            <FontAwesome name="edit" />
          </Link>
          <Button shape="circle" onClick={() => handlePreview(record.id)}>
            <FontAwesome name="eye" />
          </Button>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredEmail(
      email.data.filter(email =>
        (email?.email_template_id + email?.name + email?.slug).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handlePreview = id => {
    setEmail(s => ({ ...s, loading: true }));
    apolloClient
      .query({
        query: EmailTemplateQuery.GET_EMAIL_TEMPLATE_PREVIEW,
        variables: {
          query: {
            templatelist_id: id,
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
        const data = res?.data?.getEmailTemplatePreview;
        setModalContent(data?.data);
        setModalOpen(true);
      })
      .finally(() => {
        setEmail(s => ({ ...s, loading: false }));
      });
  };

  return (
    <>
      <PageHeader
        title="Email Template"
        buttons={[
          <div key="email-template" className="page-header-actions">
            <Link to="/admin/email/template/add">
              <Button size="small" title="Add Email Template" type="primary">
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
              {email.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : email.error ? (
                <p>{email.error}</p>
              ) : (
                <>
                  <Input
                    placeholder="Search in Email Template..."
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
                        total: isFilter ? email?.data?.length : email?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredEmail : email.data}
                    />
                  </span>
                </>
              )}
            </Cards>
            <Modal
              title="Template Preview"
              centered
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
              width={800}
            >
              <div dangerouslySetInnerHTML={{ __html: modalContent }}></div>
            </Modal>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ListTemplate;
