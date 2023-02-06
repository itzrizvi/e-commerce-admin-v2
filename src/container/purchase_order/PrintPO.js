import { Button, Col, Row, Spin } from 'antd';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import apolloClient from '../../apollo';
import { poQuery } from '../../apollo/po';
import { Cards } from '../../components/cards/frame/cards-frame';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
import PrintPOComponent from '../../components/po/PrintPOComponent';
import { Main } from '../styled';

export default function PrintPO() {
  const params = useParams();
  const token = useSelector(state => state.auth.token);
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
        if (!data.status) return InternalErrorMessage();
        setSinglePO({ data: data?.data, isLoading: false, message: data?.message });
      })
      .catch(err => {
        console.log(err);
        setSinglePO({ data: {}, isLoading: false, error: 'Something went worng' });
      })
      .finally(() => {
        setSinglePO(s => ({ ...s, isLoading: false }));
      });
  }, [params?.id]);
  const [singlePO, setSinglePO] = useState({ data: null, isLoading: true });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Main style={{ marginTop: 10 }}>
        <Row gutter={25}>
          <Col span={24}>
            {singlePO.isLoading ? (
              <div className="spin">
                <Spin />
              </div>
            ) : (
              <>
                <Cards headless style={{ width: '210mm' }}>
                  <Row justify="end" style={{ paddingRight: 10 }}>
                    <Col>
                      <Button style={{ marginRight: 10 }} onClick={() => window.close()}>
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          handlePrint();
                          document.title = `PO-${params.id}-${new Date().getTime()}`;
                        }}
                      >
                        Print
                      </Button>
                    </Col>
                  </Row>
                  <PrintPOComponent {...{ purchaseOrder: singlePO.data }} ref={componentRef} />
                </Cards>
              </>
            )}
          </Col>
        </Row>
      </Main>
    </>
  );
}
