import { Button, Input, Select, Table } from 'antd';
import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';

const Products = ({ initialData, products, setProducts }) => {
  const column = [
    {
      title: 'Product SKU',
      dataIndex: 'prod_sku',
      key: 'prod_sku',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Product',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'prod_thumbnail',
      key: 'prod_thumbnail',
      width: 100,
      render: (text, record) => (
        <LazyLoadImage
          effect="blur"
          width="40"
          src={renderImage(record.prod_id, record.prod_thumbnail, 'product/image/thumbnail', '128x128')}
          onError={errorImageSrc}
          alt={record.id}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100
    },
    {
      title: 'Received Quantity',
      dataIndex: 'recieved_quantity',
      key: 'recieved_quantity',
      width: 150,
      render: (text, record) => (
        <Input
          defaultValue={record.recieved_quantity}
          min="0"
          type="number"
          placeholder="Received Quantity"
          onChange={e => (record.recieved_quantity = e.target.value)}
        />
      ),
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
          disabled={!record.is_serial}
          onChange={(e) => record.serials = e}
        />
      ),
    }
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
