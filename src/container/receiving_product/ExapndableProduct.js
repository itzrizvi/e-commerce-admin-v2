import React from 'react';
import { Table, PageHeader } from 'antd';

export default function ExapndableProduct({ products }) {
  const productColumns = [
    {
      title: 'Product name',
      dataIndex: ['product', 'prod_name'],
      key: 'prod_name',
      width: 200,
      ellipsis: true
    },
    {
      title: 'Product SKU',
      dataIndex: ['product', 'prod_sku'],
      key: 'prod_sku',
      width: 150,
    },
    {
      title: 'Product Part Number',
      dataIndex: ['product', 'prod_partnum'],
      key: 'prod_partnum',
      width: 150
    },
    {
      title: 'Product Serials',
      dataIndex: 'serials',
      key: 'serials',
      width: 300,
      render: value => value.length > 0 ? <p>{value.toString()}</p> : <p>No Serial Found!</p>,
    },
  ];
  return (
    <>
      <PageHeader title="Product Lists" />
      <Table
        className="table-responsive"
        rowKey="id"
        rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
        columns={productColumns}
        dataSource={products}
        pagination={{
          defaultPageSize: 10,
          total: products.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
}
