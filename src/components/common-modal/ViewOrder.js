import { Col, Modal, Row, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { orderQuery } from '../../apollo/order';

export default function ViewOrder({ order_id, viewOrderModalOpen, setViewOrderModalOpen }) {
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);
  const [singleOrder, setSingleOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

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
      ellipsis: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 110,
      align: 'right',
      ellipsis: true,
    },
    {
      title: 'Unit Cost',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'right',
      render: val => `$${val}`,
    },
    {
      title: 'Line Total',
      dataIndex: 'total',
      key: 'total',
      width: 130,
      align: 'right',
      render: (val, record) => `$${val}`,
    },
  ];

  useEffect(() => {
    if(!order_id) return;
    setLoading(true);
    apolloClient
      .query({
        query: orderQuery.GET_SINGLE_ORDER_ADMIN,
        variables: {
          query: {
            order_id,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res.data.getSingleOrderAdmin;
        if (!data.status) return toast.error(data.message);
        setSingleOrder(data.data);

        let sub_total = 0;
        const prods = data.data?.orderitems?.map(item => {
          const {
            quantity,
            price,
            product: { prod_name, prod_short_desc },
          } = item;
          const total = price * quantity;
          sub_total += total;
          return {
            prod_name,
            quantity,
            price,
            total,
            des: prod_short_desc,
          };
        });
        setProducts(prods);
        setSubTotal(sub_total);
      }).finally(() => setLoading(false))
  }, [order_id]);

  return (
    <Modal
      title="View Order"
      style={{ top: 20 }}
      width={1000}
      open={viewOrderModalOpen}
      destroyOnClose={true}
     footer={false}
      onCancel={() => setViewOrderModalOpen(false)}
    >
      <Row gutter={25}>
        <Col md={24}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="processing..." size="large" />
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p>
                    <b>Customer ID: </b>
                    {singleOrder?.data?.id}
                  </p>
                  <p>
                    <b>Customer Name: </b>
                    {singleOrder?.data?.customer?.first_name} {singleOrder?.data?.customer?.last_name}
                  </p>
                  <p>
                    <b>Email: </b> {singleOrder?.data?.customer?.email}{' '}
                  </p>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />

              <Table
                columns={column}
                dataSource={products}
                pagination={false}
              />

              <div>
                <p>
                  <b>Payment Details:</b> {singleOrder?.data?.paymentmethod.name}
                </p>
                <p>
                  <b>Delivery Option:</b> {singleOrder?.data?.shippingmethod.name}
                </p>
              </div>

              <div>
                <p>
                  <b>SUBTOTAL</b>${subTotal}
                </p>
                <p>
                  <b>Shipping Cost</b>${singleOrder?.data?.shipping_cost}
                </p>
                <p>
                  <b>TAX</b>${singleOrder?.data?.tax_amount}
                </p>
                <p>
                  <b>DISCOUNT</b>${singleOrder?.data?.discount_amount}
                </p>
                <p>
                  <b>TOTAL</b>
                  <b>
                    $
                    {subTotal +
                      singleOrder?.data?.shipping_cost +
                      singleOrder?.data?.tax_amount -
                      singleOrder?.data?.discount_amount}
                  </b>
                </p>
              </div>

              <div>
                <div>
                  <Typography.Paragraph>
                    <b>BILL TO:</b>
                  </Typography.Paragraph>
                  <Typography.Paragraph>{singleOrder?.data?.payment?.billingAddress?.address1}</Typography.Paragraph>
                  {singleOrder?.data?.payment?.billingAddress?.address2 && (
                    <Typography.Paragraph>{singleOrder?.data?.payment?.billingAddress?.address2}</Typography.Paragraph>
                  )}
                  <Typography.Paragraph>
                    {singleOrder?.data?.payment?.billingAddress?.city},{' '}
                    {singleOrder?.data?.payment?.billingAddress?.state} -{' '}
                    {singleOrder?.data?.payment?.billingAddress?.zip_code}
                  </Typography.Paragraph>
                  <Typography.Paragraph>{singleOrder?.data?.payment?.billingAddress?.country}</Typography.Paragraph>
                </div>
                <div>
                  <Typography.Paragraph>
                    <b>SHIP TO:</b>
                  </Typography.Paragraph>
                  <Typography.Paragraph>{singleOrder?.data?.shippingAddress?.address1}</Typography.Paragraph>
                  {singleOrder?.data?.shippingAddress?.address2 && (
                    <Typography.Paragraph>{singleOrder?.data?.shippingAddress?.address2}</Typography.Paragraph>
                  )}
                  <Typography.Paragraph>
                    {singleOrder?.data?.shippingAddress?.city}, {singleOrder?.data?.shippingAddress?.state} -{' '}
                    {singleOrder?.data?.shippingAddress?.zip_code}
                  </Typography.Paragraph>
                  <Typography.Paragraph>{singleOrder?.data?.shippingAddress?.country}</Typography.Paragraph>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Modal>
  );
}
