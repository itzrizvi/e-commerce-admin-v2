import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Select, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient from '../../utility/apollo';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { poQuery } from '../../apollo/po';
import { receivingProductQuery } from '../../apollo/receiving_product';

const ListPO = () => {
  viewPermission('purchase-order');
  const [po, setPO] = useState({ data: [], isLoading: true });
  const [filteredPO, setFilteredPO] = useState([]);
  const [searchText, setSearchText] = useState('');
  const token = useSelector(state => state.auth.token);
  const history = useHistory();

  const columns = [
    {
      title: 'PO NUMBER',
      dataIndex: 'po_number',
      key: 'po_number',
      width: 120,
      sorter: (a, b) => (a.po_number > b.po_number ? 1 : -1),
    },
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.order_id.toUpperCase() > b.order_id.toUpperCase() ? 1 : -1)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      sorter: (a, b) => (a.phone_number.toUpperCase() > b.phone_number.toUpperCase() ? 1 : -1),
      render: value => value.toUpperCase(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'grandTotal_price',
      key: 'grandTotal_price',
      width: 120,
      sorter: (a, b) => parseFloat(a.grandTotal_price) > parseFloat(b.grandTotal_price),
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      key: 'comment',
      width: 250,
      ellipsis: true,
      sorter: (a, b) => (a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1)
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 70,
      align: 'right',
      render: (text, record) => (
        <>
          <Tooltip placement="topLeft" title="Create Receiving Product">
            <FontAwesome
              onClick={() => handleCreateReceivingProduct(record.id)}
              name="anchor"
              style={{ margin: '.5em', color: '#ADB4D2', cursor: 'pointer' }}
            />
          </Tooltip>
          <Link to={`/admin/po/edit/${record.id}`}>
            <FontAwesome name="edit" style={{ margin: '.5em' }} />
          </Link>
        </>
      ),
      key: 'id',
    },
  ];

  // LOAD CUSTOMER GROUPS
  useEffect(() => {
    apolloClient
      .query({
        query: poQuery.GET_ALL_PO,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPurchaseOrderList;
        if (!data?.status) return;
        setPO(s => ({ ...s, data: data?.data, error: '' }));
      })
      .catch(err => {
        setPO(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setPO(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredPO(
      po.data.filter(po =>
        (po?.id + po?.comment + po.grandTotal_price + po.po_number + po.status).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleCreateReceivingProduct = id => {
    apolloClient
      .mutate({
        mutation: receivingProductQuery.ADD_RECEIVING_PRODUCT,
        variables: {
          data: {
            status: 'new',
            purchaseOrder_id: id,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: receivingProductQuery.GET_ALL_RP,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
          ['getReceivingProductList'],
        ],
      })
      .then(res => {
        const data = res?.data?.createReceiving;
        if (!data.status) return toast.error(data.message);
        toast.success(data.message);
        history.push(`/admin/rp/edit?id=${data?.id}`);
      })
      .catch(err => {
        console.log('error on adding customer', err);
      });
  };

  return (
    <>
      <PageHeader
        title="Purchase Order"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/po/add">
              <Button size="small" title="Add Purchase Order" type="primary">
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
              {po.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <>
                  <Input placeholder="Search Purchase Order..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />
                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'id'}
                      size="small"
                      dataSource={searchText ? filteredPO : po.data}
                      rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
                      // pagination={false}
                      pagination={{
                        defaultPageSize: config.PO_PER_PAGE,
                        total: searchText ? filteredPO.length : po.data.length,
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

export default ListPO;
