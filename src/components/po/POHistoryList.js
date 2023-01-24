import { Table } from 'antd';
import React from 'react';
import Moment from 'react-moment';
import { nameFormat } from '../../utility/stringModify';

export default function POHistoryList({ history }) {
  const column = [
    {
      title: 'Date Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
      ),
    },
    {
      title: 'Rep',
      dataIndex: 'activity_by',
      key: 'activity_by',
      width: 120,
      ellipsis: true,
      render: (obj) => nameFormat(obj)
    },
    {
      title: 'Action Type',
      dataIndex: 'action_type',
      key: 'action_type',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Table
        className="table-responsive search-product-table"
        columns={column}
        style={{ marginTop: 20 }}
        dataSource={history}
        pagination={false}
        rowKey="id"
        rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
      />
    </div>
  );
}
