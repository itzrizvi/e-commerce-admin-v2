import { Button, DatePicker, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import apolloClient, { customerQuery } from '../../../utility/apollo';
import Cookies from 'js-cookie';

const DiscountTab = () => {
    const initialData = {
        id: new Date().getTime(),
        CustomerGroup: "",
        Quantity: "",
        Priority: "",
        Price: "",
        Date_Start: "",
        Date_End: ""
    }
    const [discount, setDiscount] = useState([initialData])
    const [customerGroups, setCustomerGroups] = useState({ data: [], isLoading: true })

    // LOAD CUSTOMER GROUPS
    useEffect(() => {
        apolloClient.query({
            query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCustomerGroups

            if (!data?.status) return
            setCustomerGroups(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setCustomerGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setCustomerGroups(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const column = [
        {
            title: 'Customer Group',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Select style={{ width: "150px" }} placeholder={customerGroups.isLoading ? "Loading.." : "customer group"} >
                {customerGroups?.data?.map(item => (
                    <Select.Option key={item.customer_group_uuid} value={item.customer_group_uuid} >{item.customer_group_name}</Select.Option>
                ))}
            </Select>
        },
        {
            title: 'Quantity',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input type="number" placeholder="Title" />
        },
        {
            title: 'Priority',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input type="number" placeholder="Title" />
        },
        {
            title: 'Price',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input placeholder="Title" />
        },
        {
            title: 'Date Start',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <DatePicker />
        },
        {
            title: 'Date End',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <DatePicker />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button size="" title="Remove" type="danger" onClick={() => removeRow(record.id)} ><FeatherIcon icon="minus" /></Button>
        }
    ]

    // Adding new row on table
    const addNewRow = () => {
        const newData = (
            {
                id: new Date().getTime(),
                CustomerGroup: "",
                Quantity: "",
                Priority: "",
                Price: "",
                Date_Start: "",
                Date_End: ""
            }
        )
        setDiscount(prevState => [...prevState, newData])
    }
    // Removing new row on table
    const removeRow = (id) => {
        setDiscount(prevState => {
            return prevState.filter((value) => value.id !== id)
        })
    }

    return (
        <>
            <Table
                className="table-responsive"
                columns={column}
                pagination={false}
                rowKey={'id'}
                size="small"
                dataSource={discount}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
                <Button title="Add Banner" htmlType="button" type="primary" onClick={addNewRow} style={{ marginRight: ".5em" }}>
                    <FeatherIcon icon="plus" />
                </Button>
            </div>
        </>
    );
};

export default DiscountTab;