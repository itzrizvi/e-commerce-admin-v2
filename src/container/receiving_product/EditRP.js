import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Tabs, Select, Radio, Table } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import apolloClient, { productQuery, vendorQuery } from '../../utility/apollo';
import { poQuery } from '../../apollo/po';
import { toast } from 'react-toastify';
import { ellipsis, viewPermission } from '../../utility/utility';
import Products from './Products';
import { useSelector } from 'react-redux';
import { receivingProductQuery } from './../../apollo/receiving_product/index';
import ExapndableProduct from './ExapndableProduct';
import Moment from 'react-moment';
const { TextArea } = Input;

const EditRP = () => {
  viewPermission('receiving-product');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const token = useSelector(state => state.auth.token);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [singleRP, setSingleRP] = useState({ data: [], isLoading: true });
  const [products, setProducts] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  // ============+ for product START +====================
  const initialData = {
    key: new Date().getTime(),
    id: '',
    price: '',
    quantity: '',
    recieved_quantity: 0,
    isNew: true,
  };

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
        if (!data.status) return;
        setSingleRP({ data: data?.data, isLoading: false, message: data.message });
        const prod_list = data?.data?.poProducts.map(item => {
          return {
            id: item.id,
            price: item.price,
            purchase_order_id: item.purchase_order_id,
            quantity: item.quantity,
            recieved_quantity: item.recieved_quantity,
            remaining_quantity: item.remaining_quantity,
            totalPrice: item.totalPrice,
            prod_id: item.product.id,
            prod_sku: item.product.prod_sku,
            prod_partnum: item.product.prod_partnum,
            prod_short_desc: item.product.prod_short_desc,
            is_serial: item.product.is_serial,
            prod_name: item.product.prod_name,
            serials: item.serials.map(ser => ser.serial),
            serial_options: item.serials.map(ser => {
              return {
                value: ser.serial,
                label: ser.serial,
              };
            }),
            prod_thumbnail: item.product.prod_thumbnail,
            key: item.id,
          };
        });
        setProducts(prod_list);
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
  }, []);
  /* ------------------------- Get Single PO Order End ------------------------ */

  const handleSubmit = values => {
    for (let i of products) {
      if (i.is_serial) {
        if (i.serials.length !== parseInt(i.recieved_quantity)) {
          return toast.error(`${i.prod_sku} Serial Is Missing!`);
        }else if (i.serials.length > i.remaining_quantity){
          return toast.error(`${i.prod_sku} Serial Can Not Cross The Remaining Quantity!`);
        }
      }
    }
    const mod_products = products.map(item => {
      const { prod_id, quantity, recieved_quantity, is_serial, serials } = item;
      return {
        prod_id,
        quantity,
        received_quantity: parseInt(recieved_quantity),
        is_serial,
        serials,
      };
    });
    const variables = {
      data: {
        id: parseInt(params?.id),
        status: values.status,
        receivedProducts: mod_products,
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
      });
  };

  const historyColumns = [
    {
      title: 'Receiving ID',
      dataIndex: 'receiving_id',
      key: 'receiving_id',
      width: 100,
    },
    {
      title: 'Type',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: value => value?.toUpperCase(),
    },
    {
      title: 'Email',
      dataIndex: ['activity_by', 'email'],
      key: 'email',
      width: 150,
      ellipsis: true,
      render: value => <p>{value}</p>,
    },
    {
      title: 'Status',
      dataIndex: ['data', 'status'],
      key: 'status',
      width: 100,
      render: value => value?.toUpperCase(),
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

                      <Products {...{ products }} />

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
                      expandable={{
                        expandedRowRender: record => <ExapndableProduct {...record.data} />,
                        rowExpandable: record => record.data.products.length > 0,
                      }}
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
