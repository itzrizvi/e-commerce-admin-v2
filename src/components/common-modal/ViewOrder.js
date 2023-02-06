import { Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { orderQuery } from '../../apollo/order';
import OrderView from '../common-component/OrderView';
import InternalErrorMessage from '../esential/InternalErrorMessage';

export default function ViewOrder({ order_id, viewOrderModalOpen, setViewOrderModalOpen }) {
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.token);
  const [singleOrder, setSingleOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!order_id) return;
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
        if (!data?.status) return InternalErrorMessage();
        setSingleOrder(data.data);
        const prods = data.data?.orderitems?.map(item => {
          const {
            quantity,
            price,
            product: { prod_name, prod_short_desc },
          } = item;
          const total = price * quantity;
          return {
            prod_name,
            quantity,
            price,
            total,
            des: prod_short_desc,
          };
        });
        setProducts(prods);
      })
      .finally(() => setLoading(false));
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
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin tip="processing..." size="large" />
        </div>
      ) : (
        <OrderView {...{ products, order: singleOrder }} />
      )}
    </Modal>
  );
}
