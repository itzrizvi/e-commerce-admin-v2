import { Button, Card, Col, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import Moment from 'react-moment';
import config from '../../config/config';
import { nameFormat } from '../../utility/stringModify';
import { ellipsis } from '../../utility/utility';

export default function ViewPOComponent({ purchaseOrder }) {
  return (
    <>
      <div
        className="p-3"
        style={{
          border: '1px solid var(--primary)',
          borderRadius: '5px',
          padding: 10,
        }}
      >
        <Row gutter={25}>
          <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorBillingAddress?.address1}
            </Typography.Paragraph>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorBillingAddress?.address2}
            </Typography.Paragraph>
            <Typography.Paragraph className="po-address">{`${purchaseOrder?.vendorBillingAddress?.city}, ${purchaseOrder?.vendorBillingAddress?.state} - ${purchaseOrder?.vendorBillingAddress?.zip_code}`}</Typography.Paragraph>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorBillingAddress?.countryCode?.name}
            </Typography.Paragraph>
          </Col>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }} className="mt-sm-5 mt-md-0">
            <Typography.Paragraph className="po-address">
              <strong>Purchase Order:</strong> {purchaseOrder?.po_number}
            </Typography.Paragraph>
            <Typography.Paragraph className="po-address" style={{ marginBottom: 20 }}>
              <strong>Date:</strong>{' '}
              <Moment format="DD - MMM - YYYY">{new Date(parseInt(purchaseOrder?.createdAt))}</Moment>
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row gutter={25} style={{ marginTop: 20 }}>
          <Col xs={24} md={16}>
            <Typography.Title level={4}>Issued To</Typography.Title>
            <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.company_name}</Typography.Paragraph>
            <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.contact_person}</Typography.Paragraph>
            <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.email}</Typography.Paragraph>
            {purchaseOrder?.vendor?.phone_number && (
              <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.phone_number}</Typography.Paragraph>
            )}
          </Col>
          <Col xs={24} md={8}>
            <Typography.Title level={4}>Ship To</Typography.Title>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorShippingAddress?.address1}
            </Typography.Paragraph>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorShippingAddress?.address2}
            </Typography.Paragraph>
            <Typography.Paragraph className="po-address">{`${purchaseOrder?.vendorShippingAddress?.city}, ${purchaseOrder?.vendorShippingAddress?.state} - ${purchaseOrder?.vendorShippingAddress?.zip_code}`}</Typography.Paragraph>
            <Typography.Paragraph className="po-address">
              {purchaseOrder?.vendorShippingAddress?.countryCode?.name}
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row gutter={25} style={{ marginTop: 10 }}>
          <Col xs={24} md={6}>
            <Typography.Title level={5}>Rep</Typography.Title>
            <Typography.Paragraph className="po-address">
              {nameFormat(purchaseOrder?.POCreated_by)}
            </Typography.Paragraph>
          </Col>
          <Col xs={24} md={6}>
            <Typography.Title level={5}>Payment Terms</Typography.Title>
            <Typography.Paragraph className="po-address">{purchaseOrder?.paymentmethod?.name}</Typography.Paragraph>
          </Col>
          <Col xs={24} md={6}>
            <Typography.Title level={5}>Delivery</Typography.Title>
            <Typography.Paragraph className="po-address">{purchaseOrder?.shippingMethod?.name}</Typography.Paragraph>
          </Col>
          <Col xs={24} md={6}>
            <Typography.Title level={5}>Tax Rate</Typography.Title>
            <Typography.Paragraph className="po-address">
              {config.CURRENCY_SYMBOL}
              {purchaseOrder?.tax_amount.toFixed(config.DECIMAL_DIGIT)}
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
      <Row gutter={25} style={{ marginTop: 20 }}>
        <Col xs={24} md={24}>
          <Table
            tableLayout="auto"
            className="table-responsive"
            headerClassName="table-secondary"
            pagination={false}
            style={{ overflow: 'auto' }}
            columns={[
              {
                title: 'Part Number',
                dataIndex: ['product', 'prod_partnum'],
                ellipsis: true,
                width: 150,
              },
              {
                title: 'Description',
                dataIndex: ['product', 'prod_name'],
                ellipsis: true,
                width: 450,
              },
              {
                title: 'Unit Price',
                dataIndex: 'price',
                align: 'center',
                width: 120,
                render: val => `${config.CURRENCY_SYMBOL}${val.toFixed(config.DECIMAL_DIGIT)}`,
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',
                width: 120,
              },
              {
                title: 'Sub Total',
                dataIndex: 'price',
                width: 120,
                align: 'right',
                render: (val, record) =>
                  `${config.CURRENCY_SYMBOL}${(val * parseInt(record.quantity)).toFixed(config.DECIMAL_DIGIT)}`,
              },
            ]}
            summary={() => (
              <Table.Summary fixed="bottom">
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3} />
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} className="text-right">
                    <strong>
                      {config.CURRENCY_SYMBOL}
                      {purchaseOrder?.poProductlist
                        .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
                        .toFixed(config.DECIMAL_DIGIT)}
                    </strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
            dataSource={purchaseOrder?.poProductlist}
          />
          <Row gutter={25} justify="space-between">
            <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
              <Row>
                <Col xs={{ span: 12, offset: 12 }} md={{ span: 16, offset: 8 }}>
                  <div className="mb-10">
                    <table className="table table-striped" style={{marginTop: 10}} cellSpacing={'0'}>
                      <tbody>
                        <tr>
                          <td>
                            <b>Tax: </b>
                          </td>
                          <td
                            style={{
                              textAlign: 'right',
                              paddingRight: 0,
                            }}
                          >
                            {config.CURRENCY_SYMBOL}
                            {purchaseOrder?.tax_amount.toFixed(config.DECIMAL_DIGIT)}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Shipping Cost: </b>
                          </td>
                          <td
                            style={{
                              textAlign: 'right',
                              paddingRight: 0,
                            }}
                          >
                            {config.CURRENCY_SYMBOL}
                            {purchaseOrder?.shipping_cost.toFixed(config.DECIMAL_DIGIT)}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total: </b>
                          </td>
                          <td
                            style={{
                              textAlign: 'right',
                              paddingRight: 0,
                            }}
                          >
                            {config.CURRENCY_SYMBOL}
                            {purchaseOrder?.grandTotal_price.toFixed(config.DECIMAL_DIGIT)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }} style={{ marginTop: 10 }}>

                <Typography.Title level={5}>Comment: </Typography.Title>
                <Typography.Paragraph className="po-address">
                  {ellipsis(purchaseOrder?.comment ?? '', 255)}
                </Typography.Paragraph>
                <Typography.Title level={5}>Receiving Instruction: </Typography.Title>
                <Typography.Paragraph className="po-address">
                  {ellipsis(purchaseOrder?.receiving_instruction ?? '', 255)}
                </Typography.Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
