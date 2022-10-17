import { Button, DatePicker, Input, Table } from 'antd';
import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

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
    const column = [
        {
            title: 'Customer Group',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Input placeholder="Title" />
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