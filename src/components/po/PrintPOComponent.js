import { Col, Divider, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import Moment from 'react-moment';
import config from '../../config/config';
import { nameFormat } from '../../utility/stringModify';
import { ellipsis } from '../../utility/utility';

const PrintPOComponent = React.forwardRef((props, ref) => {
  const { purchaseOrder } = props;
  return (
    <>
      <div ref={ref} style={{ padding: 10 }}>
        <div
          className="p-3"
          style={{
            border: '1px solid var(--primary)',
            borderRadius: '5px',
            padding: 10,
          }}
        >
          <Row gutter={25}>
            <Col span={8}>
              <Typography.Title level={config.TITLE_LEVEL}>Issued To</Typography.Title>
              <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.company_name}</Typography.Paragraph>
              <Typography.Paragraph className="po-address">
                {purchaseOrder?.vendor?.contact_person}
              </Typography.Paragraph>
              <Typography.Paragraph className="po-address">{purchaseOrder?.vendor?.email}</Typography.Paragraph>
              {purchaseOrder?.vendor?.phone_number && (
                <Typography.Paragraph className="po-address">
                  {purchaseOrder?.vendor?.phone_number}
                </Typography.Paragraph>
              )}
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
            <Col span={8}>
              <Typography.Title level={config.TITLE_LEVEL}>Ship To</Typography.Title>
              {purchaseOrder?.type?.toUpperCase() === 'DROP_SHIPPING' && (
                <>
                  {purchaseOrder?.customer?.company_name && (
                    <Typography.Paragraph className="po-address">
                      {purchaseOrder?.customer?.company_name}
                    </Typography.Paragraph>
                  )}

                  <Typography.Paragraph className="po-address">
                    {nameFormat(purchaseOrder?.customer)}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="po-address">{purchaseOrder?.customer?.email}</Typography.Paragraph>
                  {purchaseOrder?.customer?.phone && (
                    <Typography.Paragraph className="po-address">{purchaseOrder?.customer?.phone}</Typography.Paragraph>
                  )}
                </>
              )}
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
            <Col span={8}>
              <Typography.Paragraph className="po-address">
                <strong>Purchase Order:</strong> {purchaseOrder?.po_number}
              </Typography.Paragraph>
              <Typography.Paragraph className="po-address" style={{ marginBottom: 20 }}>
                <strong>Date:</strong>{' '}
                <Moment format="DD - MMM - YYYY">{new Date(parseInt(purchaseOrder?.createdAt))}</Moment>
              </Typography.Paragraph>
              <Typography.Paragraph className="po-address">
                <strong>Order Type:</strong> {purchaseOrder?.type?.toUpperCase()}
              </Typography.Paragraph>
              <Typography.Paragraph className="po-address">
                <strong>Status:</strong> {purchaseOrder?.postatus?.name}
              </Typography.Paragraph>
            </Col>
          </Row>
          <Divider />
          <Row style={{ marginTop: 10 }}>
            <Col span={6}>
              <Typography.Title level={config.TITLE_LEVEL}>Rep</Typography.Title>
              <Typography.Paragraph className="po-address">
                {nameFormat(purchaseOrder?.POCreated_by)}
              </Typography.Paragraph>
            </Col>
            <Col span={6}>
              <Typography.Title level={config.TITLE_LEVEL}>Payment Terms</Typography.Title>
              <Typography.Paragraph className="po-address">{purchaseOrder?.paymentmethod?.name}</Typography.Paragraph>
            </Col>
            <Col span={6}>
              <Typography.Title level={config.TITLE_LEVEL}>Delivery</Typography.Title>
              <Typography.Paragraph className="po-address">{purchaseOrder?.shippingMethod?.name}</Typography.Paragraph>
            </Col>
            <Col span={6}>
              <Typography.Title level={config.TITLE_LEVEL}>Tax Rate</Typography.Title>
              <Typography.Paragraph className="po-address">
                {config.CURRENCY_SYMBOL}
                {purchaseOrder?.tax_amount?.toFixed(config.DECIMAL_DIGIT)}
              </Typography.Paragraph>
            </Col>
          </Row>
        </div>
        <Row gutter={25} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Table
              headerClassName="table-secondary"
              pagination={false}
              columns={[
                {
                  title: 'Part Number',
                  dataIndex: ['product', 'prod_partnum'],
                  ellipsis: true,
                  width: 100,
                },
                {
                  title: 'Description',
                  dataIndex: ['product', 'prod_name'],
                  width: 300,
                },
                {
                  title: 'Unit Price',
                  dataIndex: 'price',
                  align: 'center',
                  width: 80,
                  render: val => `${config.CURRENCY_SYMBOL}${val.toFixed(config.DECIMAL_DIGIT)}`,
                },
                {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  width: 80,
                  align: 'center',
                },
                {
                  title: 'Sub Total',
                  dataIndex: 'price',
                  width: 100,
                  align: 'right',
                  render: (val, record) =>
                    `${config.CURRENCY_SYMBOL}${(val * parseInt(record.quantity)).toFixed(config.DECIMAL_DIGIT)}`,
                },
              ]}
              summary={() => (
                <Table.Summary fixed="bottom">
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} />
                    <Table.Summary.Cell index={3} colSpan={1} className="text-right">
                      <strong>Total:</strong>
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
            <Row justify="space-between">
              <Col span={8} style={{ marginTop: 10 }}>
                <Typography.Title level={config.TITLE_LEVEL}>Comment: </Typography.Title>
                <Typography.Paragraph className="po-address">
                  {ellipsis(purchaseOrder?.comment ?? '', 255)}
                </Typography.Paragraph>
                <Typography.Title level={config.TITLE_LEVEL}>Receiving Instruction: </Typography.Title>
                <Typography.Paragraph className="po-address">
                  {ellipsis(purchaseOrder?.receiving_instruction ?? '', 255)}
                </Typography.Paragraph>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col span={{ span: 16 }} style={{ textAlign: 'right' }}>
                    <Typography.Paragraph strong>Tax: </Typography.Paragraph>
                    <Typography.Paragraph strong>Shipping Cost: </Typography.Paragraph>
                    <Typography.Paragraph strong>Total: </Typography.Paragraph>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right', paddingRight: 10 }}>
                    <Typography.Paragraph style={{ fontWeight: 'normal' }}>
                      {config.CURRENCY_SYMBOL}
                      {purchaseOrder?.tax_amount?.toFixed(config.DECIMAL_DIGIT)}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ fontWeight: 'normal' }}>
                      {config.CURRENCY_SYMBOL}
                      {purchaseOrder?.shipping_cost?.toFixed(config.DECIMAL_DIGIT)}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ fontWeight: 'normal' }}>
                      {config.CURRENCY_SYMBOL}
                      {purchaseOrder?.grandTotal_price?.toFixed(config.DECIMAL_DIGIT)}
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default PrintPOComponent;
