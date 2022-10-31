import { Button, Form, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';


const PartsOfProductTab = ({ products, setProducts, selectedPartsOfProducts, setSelectedPartsOfProducts, partOfProductQuantities, setPartOfProductQuantities }) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'label',
            key: 'label',
            // render: (val, record) => record.label
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Quantity',
            dataIndex: 'q',
            key: 'q',
            width: 120,
            render: (text, record) => <Input
                defaultValue={record.quantity || "1"}
                type="number"
                placeholder="Quantity"
                onBlur={e => {
                    setPartOfProductQuantities(state => {
                        const copy = { ...state }
                        copy[record.uid] = e.target.value
                        console.log(copy)
                        return copy
                    }
                    )
                }}
            />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text, record, index) => <Button size="" title="Remove" type="danger"
                // onClick={() => removeRow(record.id)}
                onClick={() => {
                    const copy = [...selectedPartsOfProducts]
                    copy.splice(index, 1)
                    setSelectedPartsOfProducts(copy)
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
                    value={selectedPartsOfProducts}
                    placeholder={products.isLoading ? "Loading.." : "Select Product.."}
                    optionFilterProp="label"

                    options={products?.data?.map(item => (
                        {
                            label: item.prod_name,
                            value: item.prod_uuid,
                            uid: item.prod_uuid,
                            key: item.prod_uuid,
                            name: item.prod_name,
                            sku: item.prod_sku,
                        }
                    ))}
                    // value={[]}
                    onChange={(newVal, items) => {
                        setSelectedPartsOfProducts(items)
                    }}
                />

                <Table
                    dataSource={selectedPartsOfProducts}
                    columns={columns}
                    pagination={false}
                    rowKey="uid"
                />

            </Form.Item>
        </div>
    );
};

export default PartsOfProductTab;