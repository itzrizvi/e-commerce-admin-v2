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
import { bannerQuery } from '../../apollo/banner';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { viewPermission } from '../../utility/utility';
import config from '../../config/config';

const ListBanner = () => {
  viewPermission('banner');
  const [banner, setBanner] = useState({ data: [], loading: true, error: '' });
  const [filteredBanner, setFilteredBanner] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    apolloClient
      .query({
        query: bannerQuery.GET_ALL_BANNER,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllBanners;
        // console.log(data);
        setBanner(s => ({ ...s, data: data?.data, error: '' }));
      })
      .finally(() => {
        setBanner(s => ({ ...s, loading: false }));
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
      sorter: (a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Alias',
      dataIndex: 'slug',
      key: 'slug',
      width: 250,
      ellipsis: true,
      sorter: (a, b) => (a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1),
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
          <Link to={`/admin/banner/edit/${record.id}`}>
            <FontAwesome name="edit" />
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredBanner(
      banner.data.filter(banner =>
        (banner?.name + banner?.slug + banner?.id).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Banner List"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/banner/add">
              <Button size="small" title="Add Banner" type="primary">
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
              {banner.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : banner.error ? (
                <p>{banner.error}</p>
              ) : (
                <>
                  <Input placeholder="Search in Banner..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.BANNER_PER_PAGE,
                        total: isFilter ? banner?.data?.length : banner?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredBanner : banner.data}
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

export default ListBanner;
