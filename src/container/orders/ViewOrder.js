import React from 'react';
import { Row, Col, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useState } from 'react';
import style from './ListOrder.module.css'

const ViewOrder = () => {
    const column = [
        {
            title: 'Item',
            dataIndex: 'p_i',
            key: 'p_i',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'p_d',
            key: 'p_d',
            // ellipsis: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'p_q',
            key: 'p_q',
            width: 110,
            align: "right",
            ellipsis: true,
            // sorter: (a, b) => a.p_q.toUpperCase() > b.p_q.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Unit Cost',
            dataIndex: 'p_u',
            key: 'p_u',
            width: 120,
            align: "right",
            render: val => `$${val}`,
            // sorter: (a, b) => a.p_u.toUpperCase() > b.p_u.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Line Total',
            dataIndex: 'p_i',
            key: 'p_i',
            width: 130,
            align: "right",
            render: (val, record) => `$${record.p_q * record.p_u}`,
            // sorter: (a, b) => a.p_i.toUpperCase() > b.p_i.toUpperCase() ? 1 : -1,
        },

    ]
    const dummyData = [...Array(3).keys()].map(i => ({
        p_i: "Intel core i6",
        p_d: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptates culpa sint id sit similique architecto vitae qui aut deleniti.",
        p_q: (i + 1) * 2,
        p_u: 103,
    }))
    const [products, setProducts] = useState(dummyData)


    return (
        <>
            <PageHeader
                title="Order"
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            <div>
                                <p><b>Customer ID: </b>{"100"}</p>
                                <p><b>Customer Name: </b>{'Test customer'}</p>
                                <p><b>Email: </b>{'Test@customer.com'}</p>
                            </div>
                            <br /><br />
                            <div className={"productTable"} >
                                <Table
                                    columns={column}
                                    dataSource={products}
                                    pagination={false}
                                />
                            </div>

                            <div className={style.tableFooter}>
                                <div>
                                    <p><b>Payment Details:</b></p>
                                    <p style={{ marginLeft: "2em" }}>
                                        using bank account <br />
                                        ..... <br /> .....
                                    </p>
                                    <p><b>Delivery Option:</b> FedEx</p>
                                </div>

                                <div className={style.total} >
                                    <p><b>SUBTOTAL</b>$1203</p>
                                    <p><b>TAX</b>$2421</p>
                                    <p><b>TOTAL</b><b>$4242</b></p>
                                </div>
                            </div>

                            <div className={style.addresses} >
                                <div className={style.billing}>
                                    <p><b>BILL TO:</b></p>
                                    <p><b>Full Name:</b> Test Customer</p>
                                    <p><b>Email:</b> test@customer.com</p>
                                    <p><b>Phone:</b> 971-801-6172</p>
                                    <p><b>Address 1:</b> 2687 Mattson Street</p>
                                    <p><b>Address 2:</b> 2687 Mattson Street</p>
                                    <p><b>country:</b> United State</p>
                                    <p><b>City:</b> Tigard</p>
                                    <p><b>State:</b> Oregon</p>
                                    <p><b>Zip:</b> 97223</p>
                                </div>
                                <div className={style.billing}>
                                    <p><b>SHIP TO:</b></p>
                                    <p><b>Full Name:</b> Test Customer</p>
                                    <p><b>Email:</b> test@customer.com</p>
                                    <p><b>Phone:</b> 971-801-6172</p>
                                    <p><b>Address 1:</b> 2687 Mattson Street</p>
                                    <p><b>Address 2:</b> 2687 Mattson Street</p>
                                    <p><b>country:</b> United State</p>
                                    <p><b>City:</b> Tigard</p>
                                    <p><b>State:</b> Oregon</p>
                                    <p><b>Zip:</b> 97223</p>

                                </div>



                            </div>


                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default ViewOrder;
