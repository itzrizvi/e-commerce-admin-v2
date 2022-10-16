import { Button, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
const { Option } = Select;



const AttributeTab = () => {
    const initalData = [{
        attribute: '',
        type: '',
        value: ''
    }]
    const [attributes, setAttributes] = useState(initalData)
    // List For Table Column
    const column = [
        {
            title: 'Attribute',
            dataIndex: 'Attribute',
            key: 'Attribute',
            render: (text, record) => <Input placeholder="Title" />
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            render: (text, record) => {
                // const [type, setType] = useState("")
                return (<>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select type"
                    >
                        <Option value="TexT" >Text</Option>
                        <Option value="Link" >Link</Option>
                        <Option value="File" >File</Option>
                    </Select>
                    <Input placeholder="Title" />
                </>)
            }
        },
        // {
        //     title: 'Sort Order',
        //     dataIndex: 'sort_order',
        //     key: 'sort_order',
        //     width: 150,
        //     render: (text, record) => <Input type="number" placeholder="Sort Order" onChange={(e) => record.sort_order = e.target.value} />
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            render: (text, record) => <Button size="" title="Remove" type="danger"
            // onClick={() => removeRow(record.id)}
            ><FeatherIcon icon="minus" size={15} /></Button>
        },
    ];

    return (
        <>
            <Table
                columns={column}
                dataSource={attributes}
            />
        </>
    );
};

export default AttributeTab;