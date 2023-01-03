import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { receivingProductQuery } from './../../apollo/receiving_product/index';

const ListRP = () => {
  viewPermission('receiving-product');
  const [rp, setRP] = useState({ data: [], isLoading: true });
  const [filteredRP, setFilteredRP] = useState([]);
  const [searchText, setSearchText] = useState('');
  const token = useSelector(state => state.auth.token);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => (a.po_id.toUpperCase() > b.po_id.toUpperCase() ? 1 : -1),
    },
    {
      title: 'PO ID',
      dataIndex: 'po_id',
      key: 'po_id',
      width: 100,
      sorter: (a, b) => (a.po_id.toUpperCase() > b.po_id.toUpperCase() ? 1 : -1),
      render: (value, record) => {
        return <Link to={`/admin/po/edit?id=${record?.po_p_id}`}>{value}</Link>;
      },
    },
    {
      title: 'Contact Person',
      dataIndex: [ 'vendor', 'contact_person'],
      key: 'contact_person',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.contact_person.toUpperCase() > b.contact_person.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Company Name',
      dataIndex: ['vendor', 'company_name'],
      key: 'company_name',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.company_name.toUpperCase() > b.company_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Email',
      dataIndex: ['vendor', 'email'],
      key: 'email',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 300,
      sorter: (a, b) => (a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1),
      filters: [
        {
          value: 'new',
          text: 'New',
        },
        {
          value: 'submitted',
          text: 'Submitted',
        },
        {
          value: 'partially_received',
          text: 'Partially Received',
        },
        {
          value: 'partially_closed',
          text: 'Partially Closed',
        },
        {
          value: 'received',
          text: 'Received',
        },
        {
          value: 'canceled',
          text: 'Canceled',
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value) => value.toUpperCase(),
    },
    {
      title: 'Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 100,
      sorter: (a, b) => parseFloat(a.total_amount) > parseFloat(b.total_amount),
      render: value => '$' + value,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      ellipsis: true,
      sorter: (a, b) => (a.type.toUpperCase() > b.type.toUpperCase() ? 1 : -1),
      render: value => value.toUpperCase(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 70,
      align: 'right',
      render: (text, record) => (
        <>
          <Link to={`/admin/rp/edit?id=${record.id}`}>
            <FontAwesome name="edit" style={{ margin: '.5em 1em' }} />
          </Link>
        </>
      ),
      key: 'id',
    },
  ];

  // LOAD RECEIVING PRODUCT
  useEffect(() => {
    apolloClient
      .query({
        query: receivingProductQuery.GET_ALL_RP,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getReceivingProductList;
        if (!data?.status) return;
        const mod_data = data?.data.map(item => {
          return {
            id: item.id,
            status: item.status,
            total_amount: item?.purchaseOrder.grandTotal_price,
            po_id: item?.purchaseOrder.po_id,
            po_p_id: item?.purchaseOrder.id,
            type: item?.purchaseOrder.type,
            vendor: item?.purchaseOrder?.vendor,
          };
        });
        setRP(s => ({ ...s, data: mod_data, error: '' }));
      })
      .catch(err => {
        setRP(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setRP(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredRP(
      rp.data.filter(rp =>
        (rp.id + rp.po_id + rp.status + rp.total_amount + rp.type + rp.vendor + rp.vendor.contact_person + rp.vendor.company_name + rp.vendor.email)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader title="Receiving Products" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {rp.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input
                    placeholder="Search Receiving Product..."
                    prefix={<SearchOutlined />}
                    onChange={onChangeSearch}
                  />
                  <br />
                  <br />
                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'id'}
                      size="small"
                      dataSource={searchText ? filteredRP : rp.data}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                      pagination={{
                        defaultPageSize: config.PO_PER_PAGE,
                        total: searchText ? filteredRP.length : rp.data.length,
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

export default ListRP;
