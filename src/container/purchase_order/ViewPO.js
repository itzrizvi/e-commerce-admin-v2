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
import { checkPermission } from '../../utility/utility';

export default function ViewPO() {
  const params = useParams();
  const [form] = Form.useForm();
  const token = useSelector(state => state.auth.token);
  const [singlePO, setSinglePO] = useState({ data: null, isLoading: true });
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

  const submitPO = () => {
    Modal.confirm({
      title: 'Do you want to submit PO to vendor?',
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
              onOk: () => window.location.reload(),
            });
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };
  const sendPOLink = () => {
    Modal.confirm({
      title: 'Do you want to send PO link to vendor?',
      icon: <CheckCircleOutlined />,
      content: null,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.SEND_PO_LINK,
            variables: {
              data: {
                po_id: parseInt(params?.id),
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
            const data = res?.data?.resendPOLink;
            if (!data.status) return;
            Modal.success({
              content: 'PO link send successfully.'
            });
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };
  const sendPO = () => {
    Modal.confirm({
      title: 'Do you want to send PO to vendor?',
      icon: <CheckCircleOutlined />,
      content: null,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.SEND_PO,
            variables: {
              data: {
                po_id: parseInt(params?.id)
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
            const data = res?.data?.resendPOAttachment;
            if (!data.status) return;
            Modal.success({
              content: 'PO send successfully.'
            });
          });
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  // Confirmation status change
  const poStatus = type => {
    const record = singlePO.data;
    if (POStatus.length === 0) return;
    let status_id;
    let title;
    if (type === 'send') {
      status_id = POStatus.filter(item => item.slug === 'submitted')[0].id;
      title = `Do you want to send PO to vendor ?`;
    } else if (type === 'hold') {
      status_id = POStatus.filter(item => item.slug === 'hold')[0].id;
      title = `Do you want to hold PO?`;
    } else if (type === 'cancel') {
      status_id = POStatus.filter(item => item.slug === 'canceled')[0].id;
      title = `Do you want to cancel PO?`;
    } else if (type === 'kill') {
      status_id = POStatus.filter(item => item.slug === 'kill')[0].id;
      title = `Do you want to kill PO?`;
    }

    Modal.confirm({
      title,
      icon: <CheckCircleOutlined />,
      content: `PO Number: ${record.po_number}`,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.UPDATE_PO_STATUS,
            variables: {
              data: {
                id: record.id,
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
            const data = res?.data?.updatePOStatus;
            if (!data.status) return toast.error(data.message);
            Modal.success({
              content: `Status has been changed successfully.`,
              onOk: () => window.location.reload(),
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
                            <Row gutter={25}>
                              <Col md={12} sm={24}>
                                {(singlePO.data.postatus.slug === 'new' ||
                                  singlePO.data.postatus.slug === 'canceled') &&
                                  checkPermission('submit-po', 'edit') && (
                                    <>
                                      {/* Submit PO to vendor */}
                                      <br />
                                      <Button type="primary" onClick={submitPO} style={{ marginBottom: 15 }}>
                                        Submit PO to vendor
                                      </Button>
                                    </>
                                  )}
                                {/* Action with resend link to vendor */}
                                {singlePO.data.postatus.slug === 'submitted' &&
                                  checkPermission('send-po-link', 'edit') && (
                                    <>
                                      <br />
                                      <Button type="primary" onClick={sendPOLink} style={{ marginBottom: 15 }}>
                                        Send PO link to vendor
                                      </Button>
                                    </>
                                  )}
                                {singlePO.data.postatus.slug === 'submitted' && checkPermission('send-po', 'edit') && (
                                  <>
                                    <br />
                                    {/* Action with Pdf to vendor */}
                                    <Button type="primary" onClick={sendPO} style={{ marginBottom: 15 }}>
                                      Send PO to vendor
                                    </Button>
                                  </>
                                )}

                                {singlePO?.data?.order_id && (
                                  <>
                                    <br />
                                    <Button type="primary" onClick={() => setViewOrderModalOpen(true)}  style={{ marginBottom: 15 }}>
                                      View order
                                    </Button>
                                  </>
                                )}
                                <br />
                                <Button type="primary" onClick={() => null}>
                                  Generate PDF
                                </Button>
                              </Col>
                              <Col md={12} sm={24}>
                                {singlePO.data.postatus.slug === 'new' && checkPermission('hold-po', 'edit') && (
                                  <>
                                    <br />
                                    <Button
                                      type="primary"
                                      onClick={() => poStatus('hold')}
                                      style={{ marginBottom: 15 }}
                                    >
                                      Hold PO
                                    </Button>
                                  </>
                                )}

                                {(singlePO.data.postatus.slug === 'submitted' ||
                                  singlePO.data.postatus.slug === 'new' ||
                                  singlePO.data.postatus.slug === 'view') &&
                                  checkPermission('cancel-po', 'edit') && (
                                    <>
                                      <br />
                                      <Button
                                        type="primary"
                                        onClick={() => poStatus('cancel')}
                                        style={{ marginBottom: 15 }}
                                      >
                                        Cancel PO
                                      </Button>
                                    </>
                                  )}
                                {singlePO.data.postatus.slug === 'canceled' && checkPermission('kill-po', 'edit') && (
                                  <>
                                    <br />
                                    <Button
                                      type="primary"
                                      onClick={() => poStatus('kill')}
                                      style={{ marginBottom: 15 }}
                                    >
                                      Kill PO
                                    </Button>
                                  </>
                                )}
                              </Col>
                            </Row>
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
