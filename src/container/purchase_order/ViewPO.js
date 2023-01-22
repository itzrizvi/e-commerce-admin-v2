import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apolloClient from '../../apollo';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { poQuery } from '../../apollo/po';
import ViewPOComponent from '../../components/po/ViewPOComponent';

export default function ViewPO() {
  const params = useParams();
  const token = useSelector(state => state.auth.token);
  const [singlePO, setSinglePO] = useState({ data: [], isLoading: true });
  /* ------------------------ Get Single PO Order Start ----------------------- */
  useEffect(() => {
    if (!params?.id) return;
    apolloClient
      .query({
        query: poQuery.GET_SINGLE_PO,
        variables: {
          query: {
            id: parseInt(params?.id),
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
        const data = res?.data?.getSinglePurchaseOrder;
        if (!data.status) return;
        setSinglePO({ data: data?.data, isLoading: false, message: data?.message });
      })
      .catch(err => {
        console.log(err);
        setSinglePO({ data: {}, isLoading: false, error: 'Something went worng' });
      })
      .finally(() => {
        setSinglePO(s => ({ ...s, isLoading: false }));
      });
  }, []);
  /* ------------------------- Get Single PO Order End ------------------------ */
  return (
    <>
      {/* <PageHeader /> */}
      <Main style={{marginTop: 10}}>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singlePO.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <ViewPOComponent {...{ purchaseOrder: singlePO.data }} />
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}
