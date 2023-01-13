import { Alert, Button, Card, Col, Input, Row, Select, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { productSchema } from '../../apollo/product';
import apolloClient from '../../apollo';
import { toast } from 'react-toastify';

const Products = ({ initialData, products, setProducts }) => {
  const [productOption, setProductOption] = useState([]);
  const [productFound, setProductFound] = useState(true);

  useEffect(() => {
    setProductOption(products.map(item => ({
      label: item.prod_name,
      value: item.id
    })))
  }, [])

  const column = [
    {
      title: 'Product',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 400,
      render: (_, record) => (
        <Select
          placeholder="Select Product"
          options={productOption}
          defaultValue={record.id}
          showSearch
          allowClear
          optionFilterProp="label"
          style={{ width: 400 }}
          onSearch={val => {
            setProductFound(true);
            if (val.length >= 6) {
              apolloClient
                .query({
                  query: productSchema.SEARCH_PRODUCT,
                  variables: {
                    query: {
                      searchQuery: val,
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
                  if (!data.status) return;
                  if (data?.data.length === 0) return setProductFound(false);
                  setProductOption(
                    data.data.map(product => ({
                      label:
                        product?.prod_name +
                        product?.prod_slug +
                        product?.prod_sku +
                        product?.prod_partnum +
                        product?.mfg_build_part_number,
                      value: product?.id,
                      ...product,
                    })),
                  );
                });
            } else {
              setProductOption([]);
            }
          }}
          onSelect={(_, data) => {
            for (const item of products) {
              if (item.id === data.id) {
                setProducts(prevState => prevState.filter(value => value.id !== data.id));
                return toast.warning('Duplicate Product Found!');
              }
            }

            setProducts(prevState => [
              ...prevState.filter(item => item.id !== record.id),
              ...prevState
                .filter(item => item.id === record.id)
                .map(item => ({
                  ...item,
                  id: data.id,
                  price: data.prod_sale_price === 0 ? data.prod_regular_price : data.prod_sale_price,
                  prod_name: data.prod_name,
                  quantity: 1,
                })),
            ]);
          }}
        />
      ),
    },
    {
      title: 'U. Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (val, record) => `$${val}`,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (val, record) => `$${parseFloat(val) * record.quantity}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (val, record) => (
        <Input
          min={0}
          type="number"
          defaultValue={val}
          onChange={e => {
            e.persist();
            setProducts(prevState =>
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
      title: 'Action',
      dataIndex: 'key',
      key: 'key',
      width: 100,
      align: 'center',
      render: val => (
        <Button
          title="Remove"
          type="danger"
          onClick={() => {
            setProducts(prevState => {
              return prevState.filter(value => value?.key !== val);
            });
          }}
        >
          <FeatherIcon icon="trash-2" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    const key = new Date().getTime();
    setProducts(prevState => [...prevState, { ...initialData, key }]);
  };

  return (
    <div>
      <Row gutter={25}>
        <Col lg={18} md={16} sm={24}>
          <span className={'psp_list'}>
            <Table
              className="table-responsive"
              columns={column}
              dataSource={products}
              pagination={false}
              rowKey="id"
              rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
                marginBottom: '10px',
                paddingRight: '18px',
              }}
            >
              {!productFound && (
                <Alert
                  style={{ width: '30%', marginBottom: 10, marginRight: 10 }}
                  message="Product Not Found!"
                  type="info"
                  showIcon
                  closable
                />
              )}
              <Button title="Add Product" htmlType="button" type="primary" onClick={addNewRow}>
                <FeatherIcon icon="plus" />
              </Button>
            </div>
          </span>
        </Col>
        <Col lg={6} md={8} sm={24}>
          <Card
            title="Summary"
            bordered={true}
            size="small"
            headStyle={{
              backgroundColor: '#5f63f24d',
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            }}
          >
            <Typography.Paragraph>
              <Typography.Text strong>Sub Total Price : </Typography.Text>$
              {products.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Product Quantity : </Typography.Text>
              {products.reduce((accumulator, item) => accumulator + item.quantity, 0)}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Shipping Cost : </Typography.Text>$ 0.00
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Total Price : </Typography.Text>$
              {products.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
