import { Button, Input, Select, Table } from 'antd';
import React from 'react';
import FeatherIcon from 'feather-icons-react';

const Products = ({ initialData, products, setProducts, productOption }) => {
  const column = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => (
        <Select
          size="middle"
          defaultValue={record.id}
          style={{ width: 350 }}
          options={productOption}
          placeholder={"Please select product"}
          onChange={(e) => record.id = e}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => <Input defaultValue={text} type="number" placeholder="Price" onChange={(e) => record.price = e.target.value} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => <Input defaultValue={text} type="number" placeholder="Quantity" onChange={(e) => record.quantity = e.target.value} />,
    },
    {
      title: 'Received Quantity',
      dataIndex: 'received_quantity',
      key: 'received_quantity',
      render: (text, record) => <Input defaultValue={record.recieved_quantity ?? 0} type="number" placeholder="Received Quantity" onChange={(e) => record.recieved_quantity = e.target.value} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)}>
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = id => {
    setProducts(prevState => [...prevState, { ...initialData, id }]);
  };

  const removeRow = id => {
    setProducts(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  };

  return (
    <div>
      <Table columns={column} pagination={false} rowKey={'key'} size="small" dataSource={products} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
        <Button
          title="Add Product"
          htmlType="button"
          type="primary"
          onClick={addNewRow}
          style={{ marginRight: '.5em' }}
        >
          <FeatherIcon icon="plus" />
        </Button>
      </div>
    </div>
  );
};

export default Products;
