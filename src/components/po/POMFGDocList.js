import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apolloClient from '../../apollo';
import { poQuery } from '../../apollo/po';
import config from '../../config/config';
import { getFile } from '../../utility/images';
import UpdateMFG from '../common-modal/UpdateMFG';

export default function POMFGDocList({ mfgList, setChangeMfg }) {
  const [updateMfgModalOpen, setUpdateMfgModalOpen] = useState(false);
  const [selectedMfg, setSelectedMfg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
  const column = [
    {
      title: 'Doc Name',
      dataIndex: 'pomfg_file',
      key: 'pomfg_file',
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <Link
          to={{
            pathname: getFile(
              `${config.ADMIN_DOC_BUCKET_NAME}/PO/${record.purchaseOrder.po_number}/mfg/${record.id}/${text}`,
            ),
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
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
                setSelectedMfg(record);
                setUpdateMfgModalOpen(true);
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
      title: 'Do you want to remove Mfg Doc?',
      icon: <CheckCircleOutlined />,
      content: null,
      confirmLoading: submitting,
      onOk() {
        apolloClient
          .mutate({
            mutation: poQuery.DELETE_MFG_DOC,
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
            const data = res?.data?.deletePOMFGDOC;
            if (!data.status) return toast.error(data.message);
            setChangeMfg(prev => !prev);
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
        dataSource={mfgList}
        pagination={false}
        rowKey="id"
      />
      <UpdateMFG {...{ mfg: selectedMfg, updateMfgModalOpen, setUpdateMfgModalOpen, setChangeMfg }} />
    </div>
  );
}
