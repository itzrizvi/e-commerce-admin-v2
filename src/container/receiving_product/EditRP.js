import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Spin, Tabs, Select, Table } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient from '../../utility/apollo';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import Products from './Products';
import { useSelector } from 'react-redux';
import { receivingProductQuery } from './../../apollo/receiving_product/index';
import Moment from 'react-moment';

const EditRP = () => {
  viewPermission('receiving-product');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [singleRP, setSingleRP] = useState({ data: [], isLoading: true });
  const [productItem, setProductItem] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  // ============+ for product START +====================
  // const initialData = {
  //   key: new Date().getTime(),
  //   id: '',
  //   price: '',
  //   quantity: '',
  //   recieved_quantity: 0,
  //   isNew: true,
  // };

  /* ------------------------ Get Single PO Order Start ----------------------- */
  useEffect(() => {
    if (!params?.id) return history.push('/admin/rp/list');
    apolloClient
      .query({
        query: receivingProductQuery.GET_SINGLE_RECEIVING_PRODUCT,
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
        const data = res?.data?.getSingleReceivingProduct;
        console.log("🚀 ~ file: EditRP.js:59 ~ useEffect ~ data", data)
        if (!data.status) return;
        setSingleRP({ data: data?.data, isLoading: false, message: data.message });
        setProductItem(data?.data?.receivingitems.map(item => ({ ...item, receiving_quantity: 0, new_serials: [] })));
        form.setFieldsValue({
          status: data?.data?.status,
        });
      })
      .catch(err => {
        console.log(err);
        setSingleRP({ data: {}, isLoading: false, error: 'Something went worng' });
      })
      .finally(() => {
        setSingleRP(s => ({ ...s, isLoading: false }));
      });

    apolloClient
      .query({
        query: receivingProductQuery.GET_HISTORY,
        variables: {
          query: {
            receiving_id: parseInt(params?.id),
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
        const data = res?.data?.getReceivingHistory;
        if (!data?.status) return;
        setHistoryData(data?.data);
      });
  });
  /* ------------------------- Get Single PO Order End ------------------------ */

  const handleSubmit = values => {
    for (let i of productItem) {
      if (i.new_serials.length > 0 || i.product.is_serial) {
        if (i.new_serials.length !== parseInt(i.receiving_quantity)) {
          return toast.error(`${i.product.prod_sku} Serial Is Miss Match!`);
        } else if (i.new_serials.length > i.remaining_quantity) {
          return toast.error(`${i.product.prod_sku} Serial Can Not Cross The Remaining Quantity!`);
        }
      }
    }
    setIsLoading(true);
    const variables = {
      data: {
        id: parseInt(params?.id),
        status: values.status,
        receivedProducts: productItem.map(item => ({
          receiving_item_id: item.id,
          prod_id: item.product.id,
          quantity: item.quantity,
          receiving_quantity: parseInt(item.receiving_quantity),
          serials: item.new_serials,
        })),
      },
    };
    apolloClient
      .mutate({
        mutation: receivingProductQuery.UPDATE_RO,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: receivingProductQuery.GET_SINGLE_RECEIVING_PRODUCT,
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
          },
          {
            query: receivingProductQuery.GET_ALL_RP,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
        ],
      })
      .then(res => {
        const data = res?.data?.updateReceiving;
        if (!data.status) return toast.error(data.message);
        setTimeout(() => {
          history.push('/admin/rp/list');
        }, 1000);
        toast.success(data.message);
      })
      .catch(err => {
        console.log('got error on updateStatus', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const historyColumns = [
    {
      title: 'Status',
      dataIndex: "status",
      key: 'status',
      width: 100,
      render: value => value?.toUpperCase(),
    },
    {
      title: 'Updated By',
      dataIndex: ['activity_by', 'first_name'],
      key: 'first_name',
      width: 150,
      ellipsis: true,
      render: value => <p>{value}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 200,
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY hh:mm A">{parseInt(text)}</Moment>}</span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={`Manage Receiving Product | Edit Receiving Product `} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleRP.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Tabs>
                  <Tabs.TabPane tab="Receiving Product" key="receiving_product">
                    <Form
                      style={{ width: '100%' }}
                      form={form}
                      name="editVendor"
                      onFinish={handleSubmit}
                      onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                      labelCol={{ span: 4 }}
                    >
                      <Form.Item style={{marginBottom: 0}} label="Company Name">{singleRP?.data?.purchaseOrder?.vendor?.company_name}</Form.Item>
                      <Form.Item style={{marginBottom: 0}} label="Email">{singleRP?.data?.purchaseOrder?.vendor?.email}</Form.Item>
                      <Form.Item style={{marginBottom: 0}} label="Contact Person">{singleRP?.data?.purchaseOrder?.vendor?.contact_person}</Form.Item>
                      <Form.Item style={{marginBottom: 0}} label="Phone">{singleRP?.data?.purchaseOrder?.vendor?.phone_number}</Form.Item>
                      <Form.Item
                        rules={[{ required: true, message: 'Please Select Status' }]}
                        name="status"
                        label="Status"
                      >
                        <Select
                          size="middle"
                          placeholder="Select Status"
                          initialvalues=""
                          style={{ width: '100%' }}
                          optionLabelProp="label"
                        >
                          <Select.Option key="new" value="new" label="New">
                            <div className="demo-option-label-item">New</div>
                          </Select.Option>
                          <Select.Option key="submitted" value="submitted" label="Submitted">
                            <div className="demo-option-label-item">Submitted</div>
                          </Select.Option>
                          <Select.Option key="partially_received" value="partially_received" label="Partially Received">
                            <div className="demo-option-label-item">Partially Received</div>
                          </Select.Option>
                          <Select.Option key="partially_closed" value="partially_closed" label="Partially Closed">
                            <div className="demo-option-label-item">Partially Closed</div>
                          </Select.Option>
                          <Select.Option key="received" value="received" label="Received">
                            <div className="demo-option-label-item">Received</div>
                          </Select.Option>
                          <Select.Option key="canceled" value="canceled" label="Canceled">
                            <div className="demo-option-label-item">Canceled</div>
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Products {...{ products: productItem }} />

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: '3em',
                        }}
                      >
                        <Form.Item>
                          <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                            {isLoading ? 'Processing' : 'Save'}
                          </Button>
                          <Link to="/admin/rp/list">
                            <Button style={{ marginLeft: 10 }} type="light" size="default">
                              Cancel
                            </Button>
                          </Link>
                        </Form.Item>
                      </div>
                    </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="History" key="history">
                    <Table
                      rowKey="id"
                      columns={historyColumns}
                      dataSource={historyData}
                      pagination={{
                        defaultPageSize: 10,
                        total: historyData.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </Tabs.TabPane>
                </Tabs>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};
export default EditRP;
