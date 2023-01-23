import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import UpdateMFG from '../common-modal/UpdateMFG';

export default function POMFGDocList({ mfgList, setChangeMfg }) {
  const [updateMfgModalOpen, setUpdateMfgModalOpen] = useState(false);
  const [selectedMfg, setSelectedMfg] = useState(null);
  const column = [
    {
      title: 'Doc Name',
      dataIndex: 'doc_file',
      key: 'doc_file',
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
      title: 'Do you want to remove MFG?',
      icon: <CheckCircleOutlined />,
      content: null,
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
        dataSource={mfgList}
        pagination={false}
        rowKey="id"
        rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
      />
      <UpdateMFG
        {...{ mfg: selectedMfg, updateMfgModalOpen, setUpdateMfgModalOpen, setChangeMfg }}
      />
    </div>
  );
}
