import { Input, Select, Table, Tag } from 'antd';
import React from 'react';
import ExapndableProduct from './ExapndableProduct';

const Products = ({ products }) => {
  const column = [
    {
      title: 'SKU',
      dataIndex: ['product', 'prod_sku'],
      key: 'prod_sku',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.product.prod_sku.toUpperCase() > b.product.prod_sku.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Part Number',
      dataIndex: ['product', 'prod_partnum'],
      key: 'prod_partnum',
      width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.product.prod_partnum.toUpperCase() > b.product.prod_partnum.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Name',
      dataIndex: ['product', 'prod_name'],
      key: 'prod_name',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.product.prod_name.toUpperCase() > b.product.prod_name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      sorter: (a, b) => parseFloat(a.quantity) > parseFloat(b.quantity),
    },
    {
      title: 'Received Quantity',
      dataIndex: 'received_quantity',
      key: 'received_quantity',
      width: 150,
      sorter: (a, b) => parseFloat(a.received_quantity) > parseFloat(b.received_quantity),
    },
    {
      title: 'Remaining Quantity',
      dataIndex: 'remaining_quantity',
      key: 'remaining_quantity',
      width: 150,
      sorter: (a, b) => parseFloat(a.remaining_quantity) > parseFloat(b.remaining_quantity),
    },
    {
      title: 'Receiving Amount',
      dataIndex: 'receiving_quantity',
      key: 'receiving_quantity',
      width: 150,
      render: (text, record) => (
        <Input
          min="0"
          defaultValue={text}
          type="number"
          placeholder="Receiving Amount"
          onChange={e => (record.receiving_quantity = e.target.value)}
        />
      ),
      sorter: (a, b) => parseFloat(a.receiving_quantity) > parseFloat(b.receiving_quantity),
    },
    {
      title: 'Serial Status',
      dataIndex: ['product', 'is_serial'],
      key: 'is_serial',
      width: 150,
      render: (text, record) =>
        text ? (
          <Tag color="red" style={{ color: '#000' }}>
            Required
          </Tag>
        ) : (
          <Tag style={{ color: '#000' }} color="green">
            Not Required
          </Tag>
        ),
    },
    {
      title: 'Serial Number',
      dataIndex: 'new_serials',
      key: 'new_serials',
      width: 500,
      render: (text, record) => (
        <Select mode="tags" style={{ width: '100%' }} placeholder="Serial" onChange={e => (record.new_serials = e)} />
      ),
    },
    {
      title: 'Short Description',
      dataIndex: ['product', 'prod_short_desc'],
      key: 'prod_short_desc',
      width: 400,
      ellipsis: true,
      sorter: (a, b) => (a.product.prod_short_desc.toUpperCase() > b.product.prod_short_desc.toUpperCase() ? 1 : -1),
    },
  ];

  return (
    <div>
      <Table
        className="table-responsive"
        columns={column}
        pagination={false}
        expandable={{
          expandedRowRender: record => <ExapndableProduct {...{products: record?.receivinghistory}} />,
          rowExpandable: record => record?.receivinghistory?.length > 0,
        }}
        rowKey={'id'}
        size="small"
        dataSource={products}
      />
    </div>
  );
};

export default Products;
