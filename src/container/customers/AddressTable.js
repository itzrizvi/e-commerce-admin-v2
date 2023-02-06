import { Button, Checkbox, Input, Select, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { addressSchema } from '../../apollo/address';
import apolloClient from '../../utility/apollo';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddressTable = ({ initialData, addresses, setAddresses, defaultAddressId, setDefaultAddressId }) => {
  // Change State After Country Change
  const [countries, setCountries] = useState([]);
  const [newInitialData, setNewInitialData] = useState({ data: [], loading: true });
  useEffect(() => {
    // Get Country List
    apolloClient
      .query({
        query: addressSchema.GET_COUNTRY_LIST,
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID },
        },
      })
      .then(res => {
        const data = res.data.getCountryList;
        if (!data?.status) return InternalErrorMessage();
        setCountries(data?.data);
      });

    // Get State List
    apolloClient
      .query({
        query: addressSchema.GET_STATE_LISTS,
        variables: {
          query: {
            code: '',
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
        if (!data?.status) return InternalErrorMessage();
        setNewInitialData({ data: { ...initialData, states: data?.data }, loading: false });
        setAddresses(
          addresses.map(item => {
            return { ...item, states: data?.data?.filter(a => a.country_code === item.countryCode.code) };
          }),
        );
      })
      .finally(() => {
        setNewInitialData(prev => ({ ...prev, loading: false }));
      });
  }, []);
  const column = [
    {
      title: 'Country',
      dataIndex: ['countryCode', 'name'],
      key: 'name',
      render: (_, record) => (
        <Select
          onSelect={country => {
            setAddresses(
              addresses.map(item => {
                if (item.id === record.id) {
                  return {
                    ...item,
                    country,
                    states: newInitialData.data.states.filter(a => a.country_code === country),
                  };
                }
                return item;
              }),
            );
          }}
          style={{ width: '100%' }}
          placeholder="Country"
          defaultValue={record?.countryCode?.code}
          options={countries?.map(item => ({
            label: item?.name,
            value: item?.code,
          }))}
        />
      ),
    },
    {
      title: 'Address 1',
      dataIndex: 'address1',
      key: 'address1',
      width: 400,
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
      width: 400,
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
      width: 150,
      render: (text, record) => (
        <Input defaultValue={text} type="text" placeholder="City" onChange={e => (record.city = e.target.value)} />
      ),
    },
    {
      title: 'State',
      dataIndex: 'states',
      key: 'states',
      width: 150,
      render: (states, record) => (
        <Select
          style={{ width: '100%' }}
          placeholder="State"
          options={states?.map(item => ({
            label: item.state,
            value: item.abbreviation,
          }))}
          onSelect={val => (record.state = val)}
          defaultValue={record.state}
        />
      ),
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      key: 'zip_code',
      width: 150,
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
      title: 'Default',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      width: 70,
      render: (val, record) => (
        <Checkbox
          checked={defaultAddressId === val ? true : false}
          onChange={e => {
            record.isDefault = e.target.checked;
            setDefaultAddressId(val);
          }}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      width: 90,
      render: (text, record) => (
        <Switch defaultChecked={text} title="Status" onChange={checked => (record.status = checked)} />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)}>
          <FeatherIcon icon="trash-2" />
        </Button>
      ),
    },
  ];

  // Adding new row on table
  const addNewRow = () => {
    setAddresses(prevState => {
      return [...prevState, { ...newInitialData.data, id: new Date().getTime() }];
    });
  };

  const removeRow = id => {
    setAddresses(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  };

  return (
    <div>
      <Table
        className="table-responsive"
        columns={column}
        pagination={false}
        rowKey={'id'}
        size="small"
        dataSource={addresses}
        loading={newInitialData?.loading}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
        <Button
          disabled={newInitialData?.loading}
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

export default AddressTable;
