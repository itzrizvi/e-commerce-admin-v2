import { Button, Col, Divider, Form, Modal, Row, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apolloClient from '../../apollo';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { poQuery } from '../../apollo/po';
import ViewPOComponent from '../../components/po/ViewPOComponent';
import POInvoiceList from '../../components/po/POInvoiceList';
import CancelButton from '../../components/buttons/CancelButton';
import { CheckCircleOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import AddInvoice from '../../components/common-modal/AddInvoice';
import POMFGDocList from '../../components/po/POMFGDocList';
import AddMFG from '../../components/common-modal/AddMFG';
import POHistoryList from '../../components/po/POHistoryList';
import ViewOrder from '../../components/common-modal/ViewOrder';

export default function ViewPO() {
  const params = useParams();
  const [form] = Form.useForm();
  const token = useSelector(state => state.auth.token);
  const [singlePO, setSinglePO] = useState({ data: [], isLoading: true });
  const [POStatus, setPOStatus] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [changeInvoice, setChangeInvoice] = useState(false);
  const [addInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);
  const [mfgList, setMfgList] = useState([]);
  const [changeMfg, setChangeMfg] = useState(false);
  const [addMfgModalOpen, setAddMfgModalOpen] = useState(false);
  const [viewOrderModalOpen, setViewOrderModalOpen] = useState(false);
  const [changeActivityHistory, setChangeActivityHistory] = useState(false);
  const [activityHistory, setActivityHistory] = useState([]);
  const [tabLoading, setTabLoading] = useState(true);
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
  }, [params?.id]);

  useEffect(() => {
    // Load PO Status
    apolloClient
      .query({
        query: poQuery.GET_PO_STATUS_LIST,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getPOStatusList;
        if (!data.status) return;
        setPOStatus(data?.data);
      });
  }, []);
  /* ------------------------- Get Single PO Order End ------------------------ */

  /* ------------------------ Get Invoice List From API ----------------------- */
  useEffect(() => {
    if (!params?.id) return;
    // Load PO Invoice List
    setTabLoading(true);
    apolloClient
      .query({
        query: poQuery.GET_PO_INVOICE_LIST,
        variables: {
          query: {
            po_id: parseInt(params.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getPOInvoiceList;
        if (!data.status) return;
        setInvoiceList(data?.data);
      })
      .finally(() => setTabLoading(false));
  }, [changeInvoice, params?.id]);

  /* ------------------------------ Mfg doc list ------------------------------ */

  useEffect(() => {
    if (!params?.id) return;
    // Load PO MFG List
    setTabLoading(true);
    apolloClient
      .query({
        query: poQuery.GET_PO_MFG_DOC_LIST,
        variables: {
          query: {
            po_id: parseInt(params.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getPOMFGDOCList;
        if (!data.status) return;
        setMfgList(data?.data);
      })
      .finally(() => setTabLoading(false));
  }, [changeMfg, params?.id]);

  /* ----------------------- Get Activity History list ----------------------- */
  useEffect(() => {
    if (!params?.id) return;
    // Load PO Activity List
    setTabLoading(true);
    apolloClient
      .query({
        query: poQuery.GET_ACTIVITY_HISTORY_LIST,
        variables: {
          query: {
            po_id: parseInt(params.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        fetchPolicy: 'network-only',
      })
      .then(res => {
        const data = res?.data?.getPOActivityList;
        if (!data.status) return;
        setActivityHistory(data?.data);
      })
      .finally(() => setTabLoading(false));
  }, [changeActivityHistory, params?.id]);

  const sendMailPOConfirmation = () => {
    Modal.confirm({
      title: 'Do you want to send mail PO to vendor?',
      icon: <CheckCircleOutlined />,
      content: null,
      onOk() {
        const status_id = POStatus.filter(item => item.slug === 'submitted')[0].id;
        apolloClient
          .mutate({
            mutation: poQuery.SEND_TO_PO,
            variables: {
              data: {
                id: parseInt(params?.id),
                status: status_id,
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
            const data = res?.data?.poSendToVendor;
            if (!data.status) return;
            Modal.success({
              content: 'PO send successfully.',
            });
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };
  return (
    <>
      {/* <PageHeader /> */}
      <Main style={{ marginTop: 10 }}>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            {singlePO.isLoading ? (
              <div className="spin">
                <Spin />
              </div>
            ) : (
              <Cards headless>
                <ViewPOComponent {...{ purchaseOrder: singlePO.data }} />
                <Divider />
                <Row gutter={25}>
                  <Col span={24}>
                    <Form
                      style={{ width: '100%' }}
                      form={form}
                      name="updateVendor"
                      onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                      labelCol={{ span: 6 }}
                    >
                      <Tabs
                        onChange={name => {
                          if (name === 'history') return setChangeActivityHistory(prev => !prev);
                        }}
                      >
                        <Tabs.TabPane tab="General" key="general">
                          {tabLoading ? (
                            <div className="spin">
                              <Spin />
                            </div>
                          ) : (
                            <>
                              <Button type="primary" onClick={sendMailPOConfirmation} style={{ marginBottom: 15 }}>
                                Send mail PO to vendor
                              </Button>
                              <br />
                              {singlePO?.data?.order_id && (
                                <Button type="primary" onClick={() => setViewOrderModalOpen(true)}>
                                  View order
                                </Button>
                              )}
                            </>
                          )}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Invoice" key="invoice">
                          {tabLoading ? (
                            <div className="spin">
                              <Spin />
                            </div>
                          ) : (
                            <Row>
                              <Col xs={24} md={{ span: 16, offset: 4 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <Button
                                    size="small"
                                    title="Add Invoice"
                                    type="primary"
                                    onClick={() => setAddInvoiceModalOpen(true)}
                                  >
                                    <FeatherIcon icon="plus" />
                                  </Button>
                                </div>
                                <POInvoiceList {...{ invoiceList, setChangeInvoice }} />
                              </Col>
                            </Row>
                          )}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Mfg Doc" key="mfg_doc">
                          {tabLoading ? (
                            <div className="spin">
                              <Spin />
                            </div>
                          ) : (
                            <Row>
                              <Col xs={24} md={{ span: 12, offset: 6 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <Button
                                    size="small"
                                    title="Add Mfg Doc"
                                    type="primary"
                                    onClick={() => setAddMfgModalOpen(true)}
                                  >
                                    <FeatherIcon icon="plus" />
                                  </Button>
                                </div>
                                <POMFGDocList {...{ mfgList, setChangeMfg }} />
                              </Col>
                            </Row>
                          )}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="History" key="history">
                          {tabLoading ? (
                            <div className="spin">
                              <Spin />
                            </div>
                          ) : (
                            <Row>
                              <Col xs={24} md={{ span: 24 }}>
                                <POHistoryList {...{ history: activityHistory }} />
                              </Col>
                            </Row>
                          )}
                        </Tabs.TabPane>
                      </Tabs>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: '3em',
                        }}
                      >
                        <Form.Item>
                          <CancelButton url="/admin/po/list" title="Do you want to exit from PO?" />
                        </Form.Item>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Cards>
            )}
          </Col>
        </Row>
        <AddInvoice
          {...{ po_id: parseInt(params?.id), addInvoiceModalOpen, setAddInvoiceModalOpen, setChangeInvoice }}
        />
        <AddMFG {...{ po_id: parseInt(params?.id), addMfgModalOpen, setAddMfgModalOpen, setChangeMfg }} />
        <ViewOrder {...{ order_id: singlePO?.data?.order_id, viewOrderModalOpen, setViewOrderModalOpen }} />
      </Main>
    </>
  );
}
