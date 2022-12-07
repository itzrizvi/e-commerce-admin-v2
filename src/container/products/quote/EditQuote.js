import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Table, Select } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../../container/styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../../apollo';
import FeatherIcon from 'feather-icons-react';
import { viewPermission } from '../../../utility/utility';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { quoteQuery } from '../../../apollo/quote';

const EditQuote = () => {
  viewPermission('quote');
  const params = useParams();
  const history = useHistory();
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [quoteData, setQuoteData] = useState([]);
  const [singleQuote, setSingleQuote] = useState({ data: {}, loading: true, error: '' });
  const [total_price, setTotalPrice] = useState(0);

  useEffect(() => {
    apolloClient
      .query({
        query: quoteQuery.GET_SINGLE_QUOTE,
        variables: {
          query: {
            id: parseInt(params.id),
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
        const data = res?.data?.getSingleSubmittedQuote;
        if (!data.status) return;
        setSingleQuote({ data: data?.data, loading: false, error: '' });
        const newQuiteData = data?.data?.submittedquoteitems.map(item => {
          return {
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            total_price: item.total_price,
            prod_name: item.product.prod_name,
            product_id: item.product.id,
            prod_sku: item.product.prod_sku,
            prod_partnum: item.product.prod_partnum,
          };
        });
        setQuoteData(newQuiteData);
        form.setFieldsValue({
          status: data?.data?.status,
        });
      })
      .catch(err => {
        console.log(err);
        setSingleQuote({ data: {}, loading: false, error: 'Something went wrong' });
      });
  }, []);

  //Submit Form
  const handleSubmit = values => {
    const new_product = quoteData.map(item => {
      return {
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
      };
    });

    setIsLoading(true);
    const data = { status: values.status, id: singleQuote?.data?.id, products: new_product };
    apolloClient
      .mutate({
        mutation: quoteQuery.SUBMIT_QUOTE,
        variables: { data },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
        refetchQueries: [
          {
            query: quoteQuery.GET_ALL_QUOTE,
            context: {
              headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: token,
              },
            },
          },
          {
            query: quoteQuery.GET_SINGLE_QUOTE,
            variables: {
              query: {
                id: parseInt(params.id),
              },
            },
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
        const data = res?.data?.updateSubmittedQuote;
        if (!data.status) toast.error(data.message);
        setIsLoading(false);
        toast.success(data.message);
        setTimeout(() => {
          history.push('/admin/products/quote');
        }, 2000);
      })
      .catch(err => {
        toast.error('Something Went wrong !!!');
      });
  };

  // List For Table Column
  const column = [
    {
      title: 'Name',
      dataIndex: 'prod_name',
      key: 'prod_name',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'SKU',
      dataIndex: 'prod_sku',
      key: 'prod_sku',
      width: 150,
    },
    {
      title: 'Part Number',
      dataIndex: 'prod_partnum',
      key: 'prod_partnum',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (text, record) => (
        <Input
          type="number"
          min={0}
          defaultValue={record.price}
          placeholder="Price"
          onChange={e => {
            e.persist();
            setQuoteData(prevState =>
              prevState.map(item => {
                if (item.id === record.id) {
                  return {
                    ...item,
                    price: e.target.value,
                  };
                } else {
                  return item;
                }
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (text, record) => (
        <Input
          defaultValue={record.quantity}
          type="number"
          min={0}
          placeholder="Quantity"
          onChange={e => {
            e.persist();
            setQuoteData(prevState =>
              prevState.map(item => {
                if (item.id === record.id) {
                  return {
                    ...item,
                    quantity: e.target.value,
                  };
                } else {
                  return item;
                }
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 150,
      render: (text, record) => `$ ${parseInt(record.quantity) * parseFloat(record.price)}`,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button
          onClick={() => setQuoteData(prevState => prevState.filter(value => value.product_id !== record.product_id))}
          size="small"
          title="Remove"
          type="danger"
        >
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    const newData = {
      id: new Date().getTime(),
      price: '',
      quantity: '',
      total_price: '',
      prod_name: '',
      prod_sku: '',
      prod_partnum: '',
    };
    setQuoteData(prevState => [...prevState, newData]);
  };

  useEffect(() => {
    let price = 0;
    quoteData.forEach(item => {
      price += parseInt(item.quantity) * parseFloat(item.price);
    });
    setTotalPrice(price);
  }, [quoteData]);

  return (
    <>
      <PageHeader title={`Manage Quote | Edit Quote ${singleQuote?.data?.id ? `(${singleQuote?.data?.id})` : ''}`} />

      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {singleQuote?.loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="edit-quote"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                >
                  <Form.Item name="status" label="Status">
                    <Select
                      defaultValue={singleQuote?.data?.status}
                      style={{ width: '50%' }}
                      options={[
                        {
                          label: 'New',
                          value: 'new',
                          disabled: true,
                        },
                        {
                          label: 'In Progress',
                          value: 'in_progress',
                          disabled: singleQuote?.data?.status !== 'new' ? true : false,
                        },
                        {
                          label: 'Save',
                          value: 'save',
                          disabled:
                            singleQuote?.data?.status !== 'new' && singleQuote?.data?.status !== 'in_progress'
                              ? true
                              : false,
                        },
                        {
                          label: 'Submitted',
                          value: 'submitted',
                          disabled:
                            singleQuote?.data?.status !== 'new' &&
                            singleQuote?.data?.status !== 'in_progress' &&
                            singleQuote?.data?.status !== 'save'
                              ? true
                              : false,
                        },
                      ]}
                    />
                  </Form.Item>

                  <Table
                    className="table-responsive"
                    columns={column}
                    pagination={false}
                    rowKey={'banner_id'}
                    size="small"
                    dataSource={quoteData}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <Table
                      className="table-responsive"
                      style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
                      columns={[
                        { key: 'total', title: 'Total', dataIndex: 'total', render: text => '$ ' + text, width: 100 },
                        { key: 'note', title: 'Note', dataIndex: 'note', width: 300 },
                      ]}
                      dataSource={[
                        {
                          key: 1,
                          total: total_price,
                          note: singleQuote?.data?.note,
                        },
                      ]}
                      pagination={false}
                    />
                    {/* <Button onClick={addNewRow} size="small" title="Add Banner" htmlType="button" type="primary">
                      <FeatherIcon icon="plus" />
                    </Button> */}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item>
                      <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/products/quote">
                        <Button style={{ marginLeft: 10 }} type="light" size="default">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default EditQuote;
