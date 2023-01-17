import { Button, Col, Input, Modal, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { vendorQuery } from '../../utility/apollo';

export default function VendorSearch({
  vendorSearchModalOpen,
  setVendorSearchModalOpen,
  selectedVendor,
  setSelectedVendor,
}) {
  const [searchString, setSearchString] = useState(null);
  const [searchedVendor, setSearchedVendor] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const searchVendorHandler = () => {
    setLoading(true);
    apolloClient
      .query({
        query: vendorQuery.GET_SEARCHED_VENDOR,
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
        const data = res?.data?.getSearchedVendors;
        setSearchedVendor(data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addVendorHandler = record => {
    setSelectedVendor(record);
    setVendorSearchModalOpen(false);
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
      title: 'Name',
      dataIndex: 'company_name',
      key: 'company_name',
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
          disabled={selectedVendor?.id === id}
          title="Add "
          type="primary"
          onClick={() => addVendorHandler(record)}
        >
          {selectedVendor?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Vendor Search"
        style={{ top: 20 }}
        width={900}
        open={vendorSearchModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => {
          setVendorSearchModalOpen(false);
          setSearchedVendor([]);
        }}
      >
        <Row gutter={25}>
          <Col xs={24} md={12}>
            <Input
              style={{ padding: '8px 11px' }}
              size="default"
              type="text"
              onChange={e => setSearchString(e.target.value)}
              onPressEnter={searchVendorHandler}
              placeholder="Vendor Name/Vendor Email/Vendor ID"
            />
          </Col>
          <Col xs={24} md={12}>
            <Button
              style={{ height: 36 }}
              title="Search Vendor"
              htmlType="button"
              type="primary"
              onClick={searchVendorHandler}
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
              dataSource={searchedVendor}
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
