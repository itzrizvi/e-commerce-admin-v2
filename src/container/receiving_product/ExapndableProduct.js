import React from 'react';
import { Table } from 'antd';
import Moment from 'react-moment';

export default function ExapndableProduct({ products }) {
  const productColumns = [
    {
      title: 'Received Quantity',
      dataIndex: 'received_quantity',
      key: 'received_quantity',
      width: 200,
      sorter: (a, b) => parseFloat(a.received_quantity) > parseFloat(b.received_quantity),
    },
    {
      title: 'Received By',
      dataIndex: ['received_by', 'first_name'],
      key: 'first_name',
      width: 200,
      sorter: (a, b) => (a.first_name.toUpperCase() > b.first_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY hh:mm A">{parseInt(text)}</Moment>}</span>
      ),
    },
  ];
  return (
    <div style={{
      width: `calc(70vw)`,
      padding: "30px 0"
    }}>
      <Table
        rowKey="id"
        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
        columns={productColumns}
        dataSource={products}
        showSorterTooltip={false}
        pagination={false}
      />
    </div>
  );
}
