import React from 'react';
import { Row, Col, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { orderQuery } from '../../apollo/order';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice1 from '../../utility/invoice/invoice1';
import OrderView from '../../components/common-component/OrderView';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const ViewOrder = () => {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const params = queryString.parse(search);

  const token = useSelector(state => state.auth.token);
  const [singleOrder, setSingleOrder] = useState({ data: {}, isLoading: true });
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // get Single Order
    apolloClient
      .query({
        query: orderQuery.GET_SINGLE_ORDER_ADMIN,
        variables: {
          query: {
            order_id: parseInt(params.id),
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
        setSingleOrder({ data: data.data, isLoading: false });

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
      });
  }, []);

  return (
    <>
      <PageHeader
        title="Order"
        buttons={[
          <PDFDownloadLink
            document={
              <Invoice1
                invoice={{
                  id: singleOrder.data?.id,
                  date: 'January 13, 2022',
                  subTotal: subTotal,
                  shippingCost: singleOrder.data?.shipping_cost,
                  tax: singleOrder.data?.tax_amount,
                  discount: singleOrder.data?.discount_amount,
                  total:
                    subTotal +
                    singleOrder.data?.shipping_cost +
                    singleOrder.data?.tax_amount -
                    singleOrder.data?.discount_amount
                }}
                billing={singleOrder?.data?.payment?.billingAddress}
                product={singleOrder.data?.orderitems}
              />
            }
            fileName={`PrimeServerParts#IN_${singleOrder.data?.id}`}
          >
            {({ loading }) =>
              loading ? (
                <Button size="small" title="Generate Invoice" type="primary">
                  Generating Invoice
                </Button>
              ) : (
                <Button size="small" title="Download Invoice" type="primary">
                  Download Invoice
                </Button>
              )
            }
          </PDFDownloadLink>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleOrder.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <OrderView {...{products, order: singleOrder?.data}} />
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ViewOrder;
