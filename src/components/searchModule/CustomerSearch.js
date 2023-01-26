import { Button, Col, Input, Modal, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { productSchema } from '../../apollo/product';

export default function CustomerSearch({
  customerSearchModalOpen,
  setCustomerSearchModalOpen,
  selectedCustomer,
  setSelectedCustomer,
  setSelectedBillingAddress,
  setSelectedShippingAddress,
  setContactPerson,
}) {
  const [searchString, setSearchString] = useState(null);
  const [searchedCustomer, setSearchedCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const searchCustomerHandler = () => {
    setLoading(true);
    apolloClient
      .query({
        query: productSchema.GET_SEARCH_CUSTOMER,
        variables: {
          query: {
            searchQuery: searchString,
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
        const data = res?.data?.getSearchedCustomers;
        setSearchedCustomer(data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addCustomerHandler = record => {
    setSelectedBillingAddress(record.addresses.filter(item => item.type === 'billing' && item.isDefault)[0] ?? null);
    setSelectedShippingAddress(record.addresses.filter(item => item.type === 'shipping' && item.isDefault)[0] ?? null);
    setContactPerson(record?.contactPersons ?? []);
    setSelectedCustomer(record);
    setCustomerSearchModalOpen(false);
  };

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      ellipsis: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (id, record) => (
        <Button
          disabled={selectedCustomer?.id === id}
          title="Add "
          type="primary"
          onClick={() => addCustomerHandler(record)}
        >
          {selectedCustomer?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Customer Search"
        style={{ top: 20 }}
        width={900}
        open={customerSearchModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => {
          setCustomerSearchModalOpen(false);
          setSearchedCustomer([]);
        }}
      >
        <Row gutter={25}>
          <Col xs={24} md={12}>
            <Input
              style={{ padding: '8px 11px' }}
              size="default"
              type="text"
              onChange={e => setSearchString(e.target.value)}
              onPressEnter={searchCustomerHandler}
              placeholder="First Name/Last Name/Email/Customer ID"
            />
          </Col>
          <Col xs={24} md={12}>
            <Button
              style={{ height: 36 }}
              title="Search Customer"
              htmlType="button"
              type="primary"
              onClick={searchCustomerHandler}
            >
              Search
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={loading}
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={searchedCustomer}
              pagination={false}
              rowKey="id"
              rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
