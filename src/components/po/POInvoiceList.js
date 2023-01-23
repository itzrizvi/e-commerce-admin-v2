import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import UpdateInvoice from '../common-modal/UpdateInvoice';

export default function POInvoiceList({ invoiceList, setChangeInvoice }) {
  const [updateInvoiceModalOpen, setUpdateInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const column = [
    {
      title: 'Invoice No',
      dataIndex: 'invoice_no',
      key: 'invoice_no',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'File Name',
      dataIndex: 'file_name',
      key: 'file_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'right',
      render: (id, record) => (
        <>
          <Tooltip placement="topLeft" title="Edit">
            <EditOutlined
              onClick={() => {
                setSelectedInvoice(record);
                setUpdateInvoiceModalOpen(true);
              }}
              style={{ margin: '.5em', color: 'var(--primary)', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Delete">
            <DeleteOutlined
              onClick={() => confirmRemove(record)}
              style={{ margin: '.5em', color: 'var(--danger)', cursor: 'pointer' }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const confirmRemove = record => {
    Modal.confirm({
      title: 'Do you want to remove invoice?',
      icon: <CheckCircleOutlined />,
      content: `Invoice No: ${record.invoice_no}`,
      onOk() {
        // To Do Remove Query
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  return (
    <div>
      <Table
        className="table-responsive search-product-table"
        columns={column}
        style={{ marginTop: 20 }}
        dataSource={invoiceList}
        pagination={false}
        rowKey="id"
        rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
      />
      <UpdateInvoice
        {...{ invoice: selectedInvoice, updateInvoiceModalOpen, setUpdateInvoiceModalOpen, setChangeInvoice }}
      />
    </div>
  );
}
