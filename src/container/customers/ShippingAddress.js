import { Button, Checkbox, Input, Select, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { addressSchema } from '../../apollo/address';
import apolloClient from '../../utility/apollo';

const ShippingAddress = ({ defaultShipping, initialData, shippingAddress, setShippingAddress, setDefaultShipping }) => {
  // Change State After Country Change
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  useEffect(() => {
    apolloClient
      .query({
        query: addressSchema.GET_STATE_LISTS,
        variables: {
          query: {
            code: selectedCountryCode,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getStateList;
        if (!data?.status) return;
        setStates(data?.data);
      });
  }, [selectedCountryCode]);

  useEffect(() => {
    apolloClient
      .query({
        query: addressSchema.GET_COUNTRY_LIST,
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID },
        },
      })
      .then(res => {
        const data = res.data.getCountryList;
        if (!data.status) return true;
        setCountries(data?.data);
      });
  }, []);
  const column = [
    {
      title: 'Country',
      dataIndex: ['countryCode', 'name'],
      key: 'name',
      render: (text, record) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Country"
          defaultValue={text}
          options={countries?.map(item => ({
            label: item.name,
            value: item.code,
          }))}
          onSelect={(val, item) => {
            record.country = val;
            setSelectedCountryCode(val);
          }}
        />
      ),
    },
    {
      title: 'Address 1',
      dataIndex: 'address1',
      key: 'address1',
      width: 200,
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
      width: 200,
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
      width: 150,
      render: (text, record) => (
        <Select
          style={{ width: '100%' }}
          placeholder="State"
          defaultValue={text}
          options={states?.map(item => ({
            label: item.state,
            value: item.abbreviation,
          }))}
          onSelect={val => (record.state = val)}
        />
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
        <Checkbox
          name="isDefault"
          checked={defaultShipping === record.id ? true : false}
          onChange={e => setDefaultShipping(record.id)}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)}>
          <FeatherIcon icon="trash-2" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    setShippingAddress(prevState => [...prevState, { ...initialData, id: new Date().getTime() }]);
  };

  const removeRow = id => {
    setShippingAddress(prevState => {
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
        dataSource={shippingAddress}
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

export default ShippingAddress;
