import { Button, DatePicker, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import apolloClient, { customerQuery } from '../../../utility/apollo';
import Cookies from 'js-cookie';

const DiscountTab = ({ discount, setDiscount }) => {

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
            dataIndex: 'customer_group_id',
            key: 'customer_group_id',
            render: (text, record, index) => <Select
                style={{ width: "150px" }}
                placeholder={customerGroups.isLoading ? "Loading.." : "customer group"}
                defaultValue={text || null}
                onSelect={value => {
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, customer_group_id: value }
                        console.log(copy)
                        return copy;
                    })

                }}
            >
                {customerGroups?.data?.map(item => (
                    <Select.Option key={item.id} value={item.id} >{item.customer_group_name}</Select.Option>
                ))}
            </Select>
        },
        {
            title: 'Quantity',
            dataIndex: 'discount_quantity',
            key: 'discount_quantity',
            width: 100,
            render: (val, record, index) => <Input defaultValue={val} type="number" placeholder="Quantity" style={{ width: "100px" }}
                onBlur={e => {
                    console.log(e.target.value)
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, discount_quantity: e.target.value }
                        console.log(copy)
                        return copy;
                    })
                }}
            />
        },
        {
            title: 'Priority',
            dataIndex: 'discount_priority',
            key: 'discount_priority',
            width: 100,
            render: (val, record, index) => <Input type="number" placeholder="Priority" style={{ width: "100px" }}
                defaultValue={val}
                onBlur={e => {
                    console.log(e.target.value)
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, discount_priority: e.target.value }
                        console.log(copy)
                        return copy;
                    })
                }}
            />
        },
        {
            title: 'Price',
            dataIndex: 'discount_price',
            key: 'discount_price',
            width: 100,
            render: (val, record, index) => <Input type="number" placeholder="Price" style={{ width: "100px" }}
                defaultValue={val}
                onBlur={e => {
                    console.log(e.target.value)
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, discount_price: e.target.value }
                        console.log(copy)
                        return copy;
                    })
                }}
            />
        },
        {
            title: 'Date Start',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => <DatePicker
                onChange={value => {
                    const dateGmt = new Date(value._d).toGMTString()
                    console.log(dateGmt)
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, discount_startdate: dateGmt }
                        console.log(copy)
                        return copy;
                    })
                }}
            />
        },
        {
            title: 'Date End',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => <DatePicker
                onChange={value => {
                    const dateGmt = new Date(value._d).toGMTString()
                    console.log(dateGmt)
                    setDiscount(state => {
                        let data = state[index];
                        const copy = [...state];
                        copy[index] = { ...data, discount_enddate: dateGmt }
                        console.log(copy)
                        return copy;
                    })
                }}
            />
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
                customer_group_id: "",
                discount_quantity: "",
                discount_priority: "",
                discount_price: "",
                discount_startdate: "",
                discount_enddate: ""
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