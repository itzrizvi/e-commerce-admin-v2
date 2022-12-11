import { Input, Select, Table, Tag } from 'antd';
import React from 'react';

const Products = ({ products }) => {
  const column = [
    {
      title: 'SKU',
      dataIndex: 'prod_sku',
      key: 'prod_sku',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Part Number',
      dataIndex: 'prod_partnum',
      key: 'prod_partnum',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'Received Quantity',
      dataIndex: 'recieved_quantity',
      key: 'recieved_quantity',
      width: 150,
    },
    {
      title: 'Remaining Quantity',
      dataIndex: 'remaining_quantity',
      key: 'remaining_quantity',
      width: 150,
    },
    {
      title: 'Receiving Amount',
      dataIndex: 'receiving_amount',
      key: 'receiving_amount',
      width: 150,
      render: (text, record) => (
        <Input
          min="0"
          type="number"
          placeholder="Receiving Amount"
          onChange={e => (record.recieved_quantity = e.target.value)}
        />
      ),
    },
    {
      title: 'Serial Status',
      dataIndex: 'is_serial',
      key: 'is_serial',
      width: 150,
      render: (text, record) => (text ? <Tag color="red" style={{color: '#000'}}>Required</Tag> : <Tag style={{color: '#000'}} color="green">Not Required</Tag>),
    },
    {
      title: 'Serial Number',
      dataIndex: 'serial',
      key: 'serial',
      width: 500,
      render: (text, record) => (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Serial"
          defaultValue={record.serial_options}
          options={record.serial_options}
          onChange={e => (record.serials = e)}
        />
      ),
    },
    {
      title: 'Short Description',
      dataIndex: 'prod_short_desc',
      key: 'prod_short_desc',
      width: 400,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Table
        className="table-responsive"
        columns={column}
        pagination={false}
        rowKey={'key'}
        size="small"
        dataSource={products}
      />
    </div>
  );
};

export default Products;
