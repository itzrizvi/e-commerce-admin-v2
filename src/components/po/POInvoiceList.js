import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apolloClient from '../../apollo';
import { poQuery } from '../../apollo/po';
import config from '../../config/config';
import { getFile } from '../../utility/images';
import UpdateInvoice from '../common-modal/UpdateInvoice';
import InternalErrorMessage from '../esential/InternalErrorMessage';

export default function POInvoiceList({ invoiceList, setChangeInvoice }) {
  const [updateInvoiceModalOpen, setUpdateInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
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
      dataIndex: 'invoice_file',
      key: 'invoice_file',
      width: 200,
      ellipsis: true,
      render: (text, record) => <Link to={{ pathname: getFile(`${config.ADMIN_DOC_BUCKET_NAME}/PO/${record.purchaseOrder.po_number}/invoice/${record.id}/${text}`)}} target="_blank">{text}</Link>,
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
      confirmLoading: submitting,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.DELETE_PO_INVOICE,
            variables: {
              data: {
                id: record.id,
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
            const data = res?.data?.deletePOInvoice;
            if (!data?.status) return InternalErrorMessage();
            setChangeInvoice(prev => !prev);
          })
          .finally(() => {
            setSubmitting(false);
          });
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
      />
      <UpdateInvoice
        {...{ invoice: selectedInvoice, updateInvoiceModalOpen, setUpdateInvoiceModalOpen, setChangeInvoice }}
      />
    </div>
  );
}
