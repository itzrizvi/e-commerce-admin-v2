import { Button, Col, Input, Modal, Row, Table } from 'antd';
import React, { useState } from 'react';
import apolloClient from '../../apollo';
import { productSchema } from '../../apollo/product';

export default function ProductSearch({ productSearchModalOpen, setProductSearchModalOpen, products, setProducts }) {
  const [searchString, setSearchString] = useState(null);
  const [searchedProduct, setSearchedProduct] = useState([])
  const [loading, setLoading] = useState(false);
  const column = [
    {
      title: 'Part No',
      dataIndex: 'prod_partnum',
      key: 'prod_partnum',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 350,
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'cost',
      key: 'cost',
      width: 120,
      render: (val, record) => (
        <Input
          min={0}
          size="small"
          type="number"
          defaultValue={val}
          onChange={e => {
            e.persist();
            setSearchedProduct(prevState =>
              prevState.map(item => {
                if (item.id === record.id) {
                  return { ...item, cost: parseFloat(e.target.value) };
                }
                return item;
              }),
            );
          }}
        />
      ),
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (val, record) => (
        <Input
          min={0}
          type="number"
          size='small'
          defaultValue={1}
          onChange={e => {
            e.persist();
            setSearchedProduct(prevState =>
              prevState.map(item => {
                if (item.id === record.id) {
                  return { ...item, quantity: parseInt(e.target.value) };
                }
                return item;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Sub Total',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      width: 100,
      render: (val, record) => {
        if (val === 0) return "$0";
        else return `$${parseFloat(val) * record.quantity}`;
      },
    },
    {
      title: 'Condition',
      dataIndex: 'prod_condition',
      key: 'prod_condition',
      width: 100
    },
    {
      title: 'Product Rep.',
      dataIndex: 'representative',
      key: 'representative',
      width: 120,
      ellipsis: true,
      render: (val) => (
        `${val?.first_name ?? ''} ${val?.last_name ?? ''}`
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (id, record) => (
        <Button disabled={products.some((item) => item.id === id)} title="Add " type="primary" onClick={() => addProductHandler(record)}>
          { products.some((item) => item.id === id) ? "Added" : "Add" }
        </Button>
      ),
    },
  ];

  const searchProductHandler = () => {
    setLoading(true);
    apolloClient
      .query({
        query: productSchema.SEARCH_PRODUCT,
        variables: {
          query: {
            searchQuery: searchString,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSearchedProducts;
        setSearchedProduct(data?.data.map(item => ({
          ...item,
          quantity: 1
        })));
        if (!data.status) return;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addProductHandler = (record) => {
    setProducts(prev => ([...prev, {...record, isNew: true}]))
  }

  return (
    <>
      <Modal
        title="Product Search"
        style={{ top: 20 }}
        width={1200}
        open={productSearchModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => {
          setProductSearchModalOpen(false)
          setSearchedProduct([])
        }}
      >
        <Row gutter={25}>
          <Col xs={24} md={8}>
            <Input
              style={{ padding: '8px 11px' }}
              size="default"
              type="text"
              onChange={e => setSearchString(e.target.value)}
              onPressEnter={searchProductHandler}
              placeholder="Product Part No"
            />
          </Col>
          <Col xs={24} md={16}>
            <Button
              style={{ height: 36 }}
              title="Search Product"
              htmlType="button"
              type="primary"
              onClick={searchProductHandler}
            >
              Search
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={loading}
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={searchedProduct}
              pagination={false}
              rowKey="id"
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
