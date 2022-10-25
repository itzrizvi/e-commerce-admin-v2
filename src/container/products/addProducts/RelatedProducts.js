import { Button, Form, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';

const RelatedProducts = ({ products, selectedRelatedProducts, setSelectedRelatedProducts, relatedProductQuantities, setRelatedProductQuantities }) => {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
                defaultValue={"1"}
                type="number"
                placeholder="Quantity"
                onBlur={e => {
                    console.log(e.target.value);

                    setRelatedProductQuantities(state => {
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
                    console.log(text, record, index)
                    const copy = [...selectedRelatedProducts]
                    copy.splice(index, 1)
                    setSelectedRelatedProducts(copy)
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
                    value={selectedRelatedProducts}
                    placeholder={products.isLoading ? "Loading.." : "Select Product.."}
                    options={products?.data?.map(item => (
                        {
                            label: item.prod_name,
                            value: item.prod_name,
                            uid: item.prod_uuid,
                            name: item.prod_name,
                            sku: item.prod_sku,
                        }

                    ))
                    }
                    // value={[]}
                    onChange={(newVal, items) => {
                        setSelectedRelatedProducts(items)
                    }}
                />

                <Table
                    dataSource={selectedRelatedProducts}
                    columns={columns}
                    pagination={false}
                    rowKey="uid"
                />

            </Form.Item>
        </div>
    );
};

export default RelatedProducts;