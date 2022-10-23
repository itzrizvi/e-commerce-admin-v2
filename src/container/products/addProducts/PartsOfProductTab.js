import { Button, Form, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';




const PartsOfProductTab = () => {
    const dummyData = [
        {
            n: "Test Prod",
            s: "SFASF-321",
            q: ''
        },
        {
            n: "Test Prod2",
            s: "SFASF-322",
            q: ''
        },
        {
            n: "Test Prod3",
            s: "SFASF-323",
            q: ''
        }
    ]
    // const [data, setData] = useState(dummyData)
    const [data, setData] = useState([])
    const columns = [
        // {
        //     title: 'UID',
        //     dataIndex: 'T',
        //     key: 'T',
        // },
        {
            title: 'Name',
            dataIndex: 'n',
            key: 'n',
        },
        {
            title: 'SKU',
            dataIndex: 's',
            key: 's',
        },
        {
            title: 'Quantity',
            dataIndex: 'q',
            key: 'q',
            width: 120,
            render: (text, record) => <Input defaultValue={"1"} type="number" placeholder="Quantity" />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text, record, index) => <Button size="" title="Remove" type="danger"
                // onClick={() => removeRow(record.id)}
                onClick={() => {
                    console.log(text, record, index)
                    const copy = [...data]
                    copy.splice(index, 1)
                    setData(copy)
                }}

            ><FeatherIcon icon="minus" /></Button>
        }
    ]

    return (
        <div>
            <Form.Item
                // rules={[{ required: true, message: "Please enter Model" }]}
                // name="model"
                label="Products"
            >

                <Select
                    style={{ marginBottom: "2em" }}
                    mode="multiple"
                    value={data}
                    options={[
                        {
                            label: 'p1',
                            value: 'p1',
                            n: "p1",
                            s: 'sku-1'
                        },
                        {
                            label: 'p2',
                            value: 'p2',
                            n: "p2",
                            s: 'sku-2'
                        },
                    ]}
                    // value={[]}
                    onChange={(newVal, items) => {
                        console.log(newVal)
                        console.log(items)
                        setData(items)
                    }}
                // onSelect={(newVal, item) => {
                //     console.log("select")
                //     console.log(newVal)
                //     console.log(item)
                //     setData(state => [...state, item])
                // }}
                />

                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />

            </Form.Item>
        </div>
    );
};

export default PartsOfProductTab;