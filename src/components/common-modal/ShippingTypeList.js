import { Button, Col, Modal, Row, Table } from 'antd';
import React from 'react';

export default function ShippingTypeList({
  shippingMethodSelectModalOpen,
  setShippingMethodSelectModalOpen,
  selectedShippingMethod,
  setSelectedShippingMethod,
  shippingMethod,
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
          disabled={selectedShippingMethod?.id === id}
          title="Add "
          type="primary"
          onClick={() => selectShippingMethodHandler(record)}
        >
          {selectedShippingMethod?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  const selectShippingMethodHandler = record => {
    setSelectedShippingMethod(record);
    setShippingMethodSelectModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Shipping Method List"
        style={{ top: 20 }}
        width={500}
        open={shippingMethodSelectModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setShippingMethodSelectModalOpen(false)}
      >
        <Row gutter={25}>
          <Col span={24}>
            <Table
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={shippingMethod}
              pagination={false}
              rowKey="id"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
