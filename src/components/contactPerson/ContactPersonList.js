import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Table } from 'antd';
import React from 'react';

export default function ContactPersonList({
  contactSelectModalOpen,
  setContactSelectModalOpen,
  contactPersons,
  selectedContactPerson,
  setSelectedContactPerson,
  setContactPersonAddModalOpen
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
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
          disabled={selectedContactPerson?.id === id}
          title="Add "
          type="primary"
          onClick={() => selectContactPersonHandler(record)}
        >
          {selectedContactPerson?.id === id ? 'Selected' : 'Select'}
        </Button>
      ),
    },
  ];

  const selectContactPersonHandler = record => {
    setSelectedContactPerson(record);
    setContactSelectModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Contact Person List"
        style={{ top: 20 }}
        width={900}
        open={contactSelectModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setContactSelectModalOpen(false)}
      >
        <Row gutter={25}>
          <Col span={24}>
            <PlusCircleOutlined
              style={{
                cursor: 'pointer',
                color: 'var(--primary)',
                float: 'right'
              }}
              onClick={() => setContactPersonAddModalOpen(true)}
            />
          </Col>
          <Col span={24}>
            <Table
              className="table-responsive search-product-table"
              columns={column}
              style={{ marginTop: 20 }}
              dataSource={contactPersons}
              pagination={false}
              rowKey="id"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
