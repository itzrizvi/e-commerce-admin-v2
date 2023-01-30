import { Col, Row, Table, Typography } from 'antd';
import React from 'react';
import config from '../../config/config';
import style from './ListOrder.module.css';

export default function OrderView({ products, order, subTotal }) {
  const column = [
    {
      title: 'Item',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      // ellipsis: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 110,
      align: 'right',
      ellipsis: true,
      // sorter: (a, b) => a.quantity.toUpperCase() > b.quantity.toUpperCase() ? 1 : -1,
    },
    {
      title: 'Unit Cost',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'right',
      render: val => `$${val}`,
      // sorter: (a, b) => a.price.toUpperCase() > b.price.toUpperCase() ? 1 : -1,
    },
    {
      title: 'Line Total',
      dataIndex: 'total',
      key: 'total',
      width: 130,
      align: 'right',
      render: (val, record) => `$${val}`,
      // sorter: (a, b) => a.total.toUpperCase() > b.total.toUpperCase() ? 1 : -1,
    },
  ];
  return (
    <div>
      <Row gutter={25} style={{ marginBottom: 10 }}>
        <Col xs={24} md={9}>
          <Typography.Title level={config.TITLE_LEVEL}>Issued To</Typography.Title>
          <Typography.Paragraph className="po-address">{order?.id}</Typography.Paragraph>
          <Typography.Paragraph className="po-address">
            {order?.customer?.first_name} {order?.customer?.last_name}
          </Typography.Paragraph>
          <Typography.Paragraph className="po-address">{order?.customer?.email}</Typography.Paragraph>
        </Col>
        <Col xs={24} md={9}>
          <Typography.Title level={config.TITLE_LEVEL}>Ship To</Typography.Title>
          <Typography.Paragraph className="po-address">{order?.shippingAddress?.address1}</Typography.Paragraph>
          {order?.shippingAddress?.address2 && (
            <Typography.Paragraph className="po-address">{order?.shippingAddress?.address2}</Typography.Paragraph>
          )}
          <Typography.Paragraph className="po-address">
            {order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.zip_code}
          </Typography.Paragraph>
          <Typography.Paragraph className="po-address">{order?.shippingAddress?.country}</Typography.Paragraph>
        </Col>
        <Col xs={24} md={6}>
          <Typography.Title level={config.TITLE_LEVEL}>BILL TO</Typography.Title>
          <Typography.Paragraph className="po-address">{order?.payment?.billingAddress?.address1}</Typography.Paragraph>
          {order?.payment?.billingAddress?.address2 && (
            <Typography.Paragraph className="po-address">
              {order?.payment?.billingAddress?.address2}
            </Typography.Paragraph>
          )}
          <Typography.Paragraph className="po-address">
            {order?.payment?.billingAddress?.city}, {order?.payment?.billingAddress?.state} -{' '}
            {order?.payment?.billingAddress?.zip_code}
          </Typography.Paragraph>
          <Typography.Paragraph className="po-address">{order?.payment?.billingAddress?.country}</Typography.Paragraph>
        </Col>
      </Row>

      <Table columns={column} dataSource={products} pagination={false} />

      <div className={style.tableFooter}>
        <div>
          <p>
            <b>Payment Details:</b> {order?.paymentmethod.name}
          </p>
          <p>
            <b>Delivery Option:</b> {order?.shippingmethod.name}
          </p>
        </div>

        <div className={style.total}>
          <p>
            <b>Sub Total</b>${order.sub_total}
          </p>
          <p>
            <b>Shipping Cost</b>${order?.shipping_cost}
          </p>
          <p>
            <b>Tax</b>${order?.tax_amount}
          </p>
          <p>
            <b>Discount</b>${order?.discount_amount}
          </p>
          <p>
            <b>Total</b>
            <b>${order?.total}</b>
          </p>
        </div>
      </div>
    </div>
  );
}
