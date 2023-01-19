import { Button, Col, Modal, Row, Table } from 'antd';
import React from 'react';

export default function ShippingAccountList({
  shippingAccountModalOpen,
  setShippingAccountModalOpen,
  selectedShippingAccount,
  setSelectedShippingAccount,
  shippingMethodAccountList,
}) {
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
      dataIndex: 'name',
      key: 'name',
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
          disabled={selectedShippingAccount?.id === id}
          title="Add "
          type="primary"
          onClick={() => selectShippingAccountHandler(record)}
        >
          {selectedShippingAccount?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  const selectShippingAccountHandler = record => {
    setSelectedShippingAccount(record);
    setShippingAccountModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Shipping Account List"
        style={{ top: 20 }}
        width={500}
        open={shippingAccountModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setShippingAccountModalOpen(false)}
      >
        <Row gutter={25}>
          <Col span={24}>
            <Table
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={shippingMethodAccountList}
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
