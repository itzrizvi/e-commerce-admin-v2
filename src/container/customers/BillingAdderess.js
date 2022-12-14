import { Button, Checkbox, Input, Switch, Table } from 'antd';
import React from 'react';
import FeatherIcon from 'feather-icons-react';

const BillingAdderess = ({
  defaultBilling,
  initialData,
  billingAddress,
  setBillingAddress,
  setDefaultBilling,
}) => {
  const column = [
    {
      title: 'Address 1',
      dataIndex: 'address1',
      key: 'address1',
      render: (text, record) => (
        <Input
          defaultValue={text}
          type="text"
          placeholder="Address 1"
          onChange={e => (record.address1 = e.target.value)}
        />
      ),
    },
    {
      title: 'Address 2',
      dataIndex: 'address2',
      key: 'address2',
      render: (text, record) => (
        <Input
          defaultValue={text}
          type="text"
          placeholder="Address 2"
          onChange={e => (record.address2 = e.target.value)}
        />
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country ',
      key: 'country ',
      render: (text, record) => (
        <Input
          defaultValue={record.country}
          type="text"
          placeholder="Country"
          onChange={e => (record.country = e.target.value)}
        />
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: (text, record) => (
        <Input defaultValue={text} type="text" placeholder="City" onChange={e => (record.city = e.target.value)} />
      ),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        <Input defaultValue={text} type="text" placeholder="State" onChange={e => (record.state = e.target.value)} />
      ),
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      key: 'zip_code',
      render: (text, record) => (
        <Input
          defaultValue={text}
          type="text"
          placeholder="Zip Code"
          onChange={e => (record.zip_code = e.target.value)}
        />
      ),
    },
    {
      title: 'Fax',
      dataIndex: 'fax',
      key: 'fax',
      render: (text, record) => (
        <Input defaultValue={text} type="text" placeholder="Fax" onChange={e => (record.fax = e.target.value)} />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <Input defaultValue={text} type="email" placeholder="Email" onChange={e => (record.email = e.target.value)} />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <Input defaultValue={text} type="text" placeholder="Phone" onChange={e => (record.phone = e.target.value)} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      // width: 90,
      render: (text, record) => (
        <Switch defaultChecked={text} title="Status" onChange={checked => (record.status = checked)} />
      ),
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      align: 'right',
      // width: 90,
      render: (val, record) => (
        <Checkbox checked={defaultBilling === record.id ? true : false} onChange={e => setDefaultBilling(record.id)} />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)}>
          <FeatherIcon icon="minus" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    setBillingAddress(prevState => {
      return [...prevState, { ...initialData, id: new Date().getTime() }];
    });
  };

  const removeRow = id => {
    setBillingAddress(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  };

  return (
    <div>
      <Table
        // className="table-responsive"
        columns={column}
        pagination={false}
        rowKey={'id'}
        size="small"
        dataSource={billingAddress}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
        <Button
          title="Add Address"
          htmlType="button"
          type="primary"
          onClick={addNewRow}
          style={{ marginRight: '.5em' }}
        >
          <FeatherIcon icon="plus" />
        </Button>
      </div>
    </div>
  );
};

export default BillingAdderess;
