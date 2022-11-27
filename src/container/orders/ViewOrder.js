import React from 'react';
import { Row, Col, Table, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { useState } from 'react';
import style from './ListOrder.module.css'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { orderQuery } from '../../apollo/order';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Invoice from '../../utility/invoice/invoice';
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer"
import Invoice1 from '../../utility/invoice/invoice1';

const ViewOrder = () => {
    const column = [
        {
            title: 'Item',
            dataIndex: 'prod_name',
            key: 'prod_name',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
            // ellipsis: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 110,
            align: "right",
            ellipsis: true,
            // sorter: (a, b) => a.quantity.toUpperCase() > b.quantity.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Unit Cost',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: "right",
            render: val => `$${val}`,
            // sorter: (a, b) => a.price.toUpperCase() > b.price.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Line Total',
            dataIndex: 'total',
            key: 'total',
            width: 130,
            align: "right",
            render: (val, record) => `$${val}`,
            // sorter: (a, b) => a.total.toUpperCase() > b.total.toUpperCase() ? 1 : -1,
        },

    ]
    const dummyData = [...Array(3).keys()].map(i => ({
        p_i: "Intel core i6",
        p_d: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptates culpa sint id sit similique architecto vitae qui aut deleniti.",
        p_q: (i + 1) * 2,
        p_u: 103,
    }))
    // const [products, setProducts] = useState(dummyData)
    const [products, setProducts] = useState([])


    // old---
    // new===
    const { search } = useLocation();
    const params = queryString.parse(search);

    const token = useSelector(state => state.auth.token);
    const [singleOrder, setSingleOrder] = useState({ data: {}, isLoading: true });
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => { // get Single Order
        apolloClient
            .query({
                query: orderQuery.GET_SINGLE_ORDER_ADMIN,
                variables: {
                    query: {
                        order_id: parseInt(params.id)
                    }
                },
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res.data.getSingleOrderAdmin
                if (!data.status) return toast.error(data.message)
                setSingleOrder({ data: data.data, isLoading: false })

                let sub_total = 0
                const prods = data.data?.orderitems?.map(item => {
                    const { quantity, price, product: { prod_name, prod_short_desc } } = item
                    const total = price * quantity
                    sub_total += total
                    return ({
                        prod_name,
                        quantity,
                        price,
                        total,
                        des: prod_short_desc
                    })
                })
                setProducts(prods)
                setSubTotal(sub_total)
            })

    }, [])


    return (
        <>
            <PageHeader
                title="Order"
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {singleOrder.isLoading ? (
                                <div className="spin">
                                    <Spin />
                                </div>
                            ) : (
                                <>

                                    <div>
                                        <p><b>Customer ID: </b>{singleOrder.data.id}</p>
                                        <p><b>Customer Name: </b>
                                            {singleOrder?.data?.customer?.first_name} {singleOrder?.data?.customer?.last_name}</p>
                                        <p><b>Email: </b> {singleOrder?.data?.customer?.email} </p>
                                    </div>
                                    <br /><br />
                                    <div className={"productTable"} >
                                        <Table
                                            columns={column}
                                            dataSource={products}
                                            pagination={false}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
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
                                            <p><b>SUBTOTAL</b>${subTotal}</p>
                                            <p><b>Shipping Cost</b>${singleOrder.data?.shipping_cost}</p>
                                            <p><b>TAX</b>${singleOrder.data?.tax_amount}</p>
                                            <p><b>TOTAL</b><b>$
                                                {subTotal + singleOrder.data?.shipping_cost + singleOrder.data?.tax_amount}
                                            </b></p>
                                        </div>
                                    </div>

                                    <div className={style.addresses} >
                                        <div className={style.billing}>
                                            <p><b>BILL TO:</b></p>
                                            {/* <p><b>Full Name:</b> Test Customer</p> */}
                                            <p><b>Email:</b> {singleOrder?.data?.payment?.billingAddress?.email}</p>
                                            <p><b>Phone:</b> {singleOrder?.data?.payment?.billingAddress?.phone}</p>
                                            <p><b>Address 1:</b> {singleOrder?.data?.payment?.billingAddress?.address1}</p>
                                            <p><b>Address 2:</b> {singleOrder?.data?.payment?.billingAddress?.address2}</p>
                                            <p><b>country:</b> {singleOrder?.data?.payment?.billingAddress?.country}</p>
                                            <p><b>City:</b> {singleOrder?.data?.payment?.billingAddress?.city}</p>
                                            <p><b>State:</b> {singleOrder?.data?.payment?.billingAddress?.state}</p>
                                            <p><b>Zip:</b> {singleOrder?.data?.payment?.billingAddress?.zip_code}</p>
                                        </div>
                                        <div className={style.billing}>
                                            <p><b>SHIP TO:</b></p>
                                            {/* <p><b>Full Name:</b> Test Customer</p> */}
                                            <p><b>Email:</b> {singleOrder?.data?.shippingAddress?.email}</p>
                                            <p><b>Phone:</b> {singleOrder?.data?.shippingAddress?.phone}</p>
                                            <p><b>Address 1:</b> {singleOrder?.data?.shippingAddress?.address1}</p>
                                            <p><b>Address 2:</b> {singleOrder?.data?.shippingAddress?.address2}</p>
                                            <p><b>country:</b> {singleOrder?.data?.shippingAddress?.country}</p>
                                            <p><b>City:</b> {singleOrder?.data?.shippingAddress?.city}</p>
                                            <p><b>State:</b> {singleOrder?.data?.shippingAddress?.state}</p>
                                            <p><b>Zip:</b> {singleOrder?.data?.shippingAddress?.zip_code}</p>

                                        </div>



                                    </div>

                                </>)}
                        </Cards>
                    </Col>
                    <Col sm={24} xs={24}>
                        {/* <Invoice /> */}
                        <PDFDownloadLink document={<Invoice1 />}>
                            {({ loading }) => (loading
                                ? <button>Loading....</button>
                                : <button>Download</button>

                            )}
                        </PDFDownloadLink>

                        {/* <PDFViewer
                            style={{
                                height: '1000px',
                                width: '1500px'
                            }}
                        ><Invoice1 /></PDFViewer> */}

                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default ViewOrder;
