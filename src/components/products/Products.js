import { Col, Input, Row, Table } from 'antd';
import React from 'react';
import FeatherIcon from 'feather-icons-react';
import config from '../../config/config';

import AddButton from '../buttons/AddButton';

const Products = ({ products, setProducts, setProductSearchModalOpen, loading = false }) => {
  const column = [
    {
      title: 'Part No',
      dataIndex: 'prod_partnum',
      key: 'prod_partnum',
      width: 120,
      ellipsis: true,
      align: 'left',
    },
    {
      title: 'Description',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'cost',
      key: 'cost',
      width: 80,
      align: 'left',
      render: (val, record) => (
        <Input
          min={0}
          size="small"
          type="number"
          defaultValue={val}
          onChange={e => {
            e.persist();
            setProducts(prevState =>
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
      width: 60,
      align: 'left',
      render: (val, record) => (
        <Input
          min={0}
          type="number"
          size="small"
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
      title: 'Sub Total',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      width: 80,
      render: (val, record) => {
        if (val === 0) return `${config.CURRENCY_SYMBOL}0`;
        else return `${config.CURRENCY_SYMBOL}${(parseFloat(val) * record.quantity).toFixed(config.DECIMAL_DIGIT)}`;
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'right',
      render: val => (
        <FeatherIcon
          style={{ cursor: 'pointer' }}
          className="color-danger"
          onClick={() => {
            setProducts(prevState => {
              return prevState.filter(value => value?.id !== val);
            });
          }}
          icon="trash-2"
        />
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    setProductSearchModalOpen(true);
  };

  return (
    <div>
      <Row gutter={25}>
        <Col span={24}>
          <span className={'psp_list'}>
            <Row gutter={25} justify="end">
              <Col span={24}>
                <AddButton onClick={addNewRow} style={{ float: 'right' }} title="Add Product" />
              </Col>
            </Row>
            <Table
              className="table-responsive purchase-order-table"
              columns={column}
              dataSource={products}
              pagination={false}
              loading={loading}
              rowKey="id"
              summary={() => (
                <Table.Summary fixed="bottom">
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} />
                    <Table.Summary.Cell index={3} colSpan={1}>
                      <strong>Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      <strong>
                        {config.CURRENCY_SYMBOL}
                        {products
                          .reduce((accumulator, item) => accumulator + item.quantity * item.cost, 0)
                          .toFixed(config.DECIMAL_DIGIT)}
                      </strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
