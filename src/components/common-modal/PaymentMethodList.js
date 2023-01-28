import { Button, Col, Modal, Row, Table } from 'antd';
import React from 'react';

export default function PaymentMethodList({
  paymentMethodSelectModalOpen,
  setPaymentMethodSelectModalOpen,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentMethod,
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
          disabled={selectedPaymentMethod?.id === id}
          title="Add "
          type="primary"
          onClick={() => selectPaymentMethodHandler(record)}
        >
          {selectedPaymentMethod?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  const selectPaymentMethodHandler = record => {
    setSelectedPaymentMethod(record);
    setPaymentMethodSelectModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Payment Method List"
        style={{ top: 20 }}
        width={500}
        open={paymentMethodSelectModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setPaymentMethodSelectModalOpen(false)}
      >
        <Row gutter={25}>
          <Col span={24}>
            <Table
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={paymentMethod}
              pagination={false}
              rowKey="id"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
