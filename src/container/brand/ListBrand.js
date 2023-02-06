import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table, Switch, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient from '../../apollo';
import { brandQuery } from '../../apollo/brand';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { viewPermission } from '../../utility/utility';
import config from '../../config/config';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const ListBrand = () => {
  viewPermission('manufacture');
  const [brand, setBrand] = useState({ data: [], loading: true, error: '' });
  const [filteredBrand, setFilteredBrand] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    apolloClient
      .query({
        query: brandQuery.GET_ALL_BRAND,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllBrands;
        setBrand(s => ({ ...s, data: data?.data, error: '' }));
      })
      .finally(() => {
        setBrand(s => ({ ...s, loading: false }));
      });
  }, []);

  const handleStatusChange = (record, checked) => {
    const variables = { data: { brand_id: record.id, brand_status: checked } };

    apolloClient
      .mutate({
        mutation: brandQuery.BRAND_UPDATE,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const status = res?.data?.updateBrand?.status;
        if (!status) return InternalErrorMessage();
        message.success(`${record.brand_name} Status updated.`);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => (a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Name',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => (a.brand_name.toUpperCase() > b.brand_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 150,
      align: 'center',
      render: (text, record) => (
        <LazyLoadImage
          effect="blur"
          height="32"
          src={renderImage(record.id, record.image, 'brand', '', true)}
          onError={errorImageSrc}
          onL
          alt={record.brand_name}
        />
      ),
    },
    {
      title: 'Alias',
      dataIndex: 'brand_slug',
      key: 'brand_slug',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => (a.brand_slug.toUpperCase() > b.brand_slug.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Description',
      dataIndex: 'brand_description',
      key: 'brand_description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'brand_status',
      key: 'brand_status',
      align: 'right',
      width: 120,
      render: (text, record) => (
        <Switch defaultChecked={text} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
      filters: [
        {
          text: 'Enable',
          value: true,
        },
        {
          text: 'Disable',
          value: false,
        },
      ],
      onFilter: (value, record) => record.brand_status === value,
      sorter: (a, b) => a.brand_status - b.brand_status,
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
          <Link to={`/admin/brand/edit?id=${record.id}`}>
            <FontAwesome name="edit" />
          </Link>
        </>
      ),
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setIsFilter(value);
    setFilteredBrand(
      brand.data.filter(brand =>
        (brand?.brand_name + brand?.brand_slug + brand?.id).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Manufacture"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/brand/add">
              <Button size="small" title="Add Manufacture" type="primary">
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
              {brand.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : brand.error ? (
                <p>{brand.error}</p>
              ) : (
                <>
                  <Input placeholder="Search in Manufacture..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      pagination={{
                        defaultPageSize: config.BRAND_PER_PAGE,
                        total: isFilter ? brand?.data?.length : brand?.data?.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      rowKey={'id'}
                      size="small"
                      dataSource={isFilter ? filteredBrand : brand.data}
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

export default ListBrand;
