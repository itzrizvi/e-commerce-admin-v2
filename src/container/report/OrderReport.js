import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { FileExcelOutlined, FilePdfOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { reportQuery } from '../../apollo/report';
import { CSVLink } from 'react-csv';

const OrderReport = () => {
    viewPermission('report');
    const [orders, setOrders] = useState({ data: [], loading: true, error: '' });
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        setOrders(s => ({ ...s, loading: true }));
        apolloClient
            .query({
                query: reportQuery.GET_ORDER_LIST_REPORT,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getOrderListReport;
                if (!data.status) return;

                setOrders(s => ({ ...s, data: data.data, error: '' }));
            })
            .catch(err => {
                setOrders(s => ({ ...s, error: 'Something went Wrong.!! ' }));
            })
            .finally(() => {
                setOrders(s => ({ ...s, loading: false }));
            });
    }, []);

    const columns = [
        {
            title: 'Order Id',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 100,
            ellipsis: true,
            sorter: (a, b) => (a.order_id.toUpperCase() > b.order_id.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 150,
            // render:(val, record)=>record.
            // sorter: (a, b) => (a.customer_name.toUpperCase() > b.customer.first_name.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Customer Email',
            dataIndex: 'customer_email',
            key: 'customer_email',
            width: 200,
            ellipsis: true,
            sorter: (a, b) => (a.customer_email.toUpperCase() > b.customer_email.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Total',
            dataIndex: 'total_amount',
            key: 'total_amount',
            align: 'center',
            width: 120,
            render: val => `$${val}`,
            sorter: (a, b) => (a.total_amount > b.total_amount ? 1 : -1),
        },
        {
            title: 'Sub Total',
            dataIndex: 'sub_total',
            key: 'sub_total',
            align: 'center',
            width: 120,
            render: val => `$${val}`,
            sorter: (a, b) => (a.sub_total > b.sub_total ? 1 : -1),
        },
        {
            title: 'Shipping Cost',
            dataIndex: 'shipping_cost',
            key: 'shipping_cost',
            align: 'center',
            width: 120,
            render: val => `$${val}`,
            sorter: (a, b) => (a.shipping_cost > b.shipping_cost ? 1 : -1),
        },
        {
            title: 'Discount',
            dataIndex: 'discount_amount',
            key: 'discount_amount',
            align: 'center',
            width: 120,
            render: val => `$${val}`,
            sorter: (a, b) => (a.discount_amount > b.discount_amount ? 1 : -1),
        },
        {
            title: 'Tax Amount',
            dataIndex: 'tax_amount',
            key: 'tax_amount',
            align: 'center',
            width: 120,
            render: val => `$${val}`,
            sorter: (a, b) => (a.tax_amount > b.tax_amount ? 1 : -1),
        },
        {
            title: 'Total Product',
            dataIndex: 'totalproducts',
            key: 'totalproducts',
            align: 'center',
            width: 120,
            render: val => `${val}`,
            sorter: (a, b) => (a.totalproducts > b.totalproducts ? 1 : -1),
        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalquantity',
            key: 'totalquantity',
            align: 'center',
            width: 120,
            render: val => `${val}`,
            sorter: (a, b) => (a.totalquantity > b.totalquantity ? 1 : -1),
        },
        {
            title: 'Status',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
            align: 'center',
            width: 150,
            render: val => (
                <span
                    style={{
                        borderRadius: '4em',
                        padding: '.5em 1.5em',
                        color: val === 'Pending' ? '#feaf00' : val === 'Delivered' ? '#2fb083' : val === 'Cancelled' ? '#FFFFFF' : val === 'In Progress' ? '#d35400' : '',
                        background: val === 'Pending' ? '#fef6e6' : val === 'Delivered' ? '#ebf9f4' : val === 'Cancelled' ? '#c0392b' : val === 'In Progress' ? '#f39c12' : '',
                    }}
                >
                    {val}
                </span>
            ),
            sorter: (a, b) => (a.orderstatus.toUpperCase() > b.orderstatus.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Tax Exempt',
            dataIndex: 'tax_exempt',
            key: 'tax_exempt',
            width: 150,
            render: (tax_exempt) => tax_exempt.toString().toUpperCase(),
            sorter: (a, b) => (a.tax_exempt.toUpperCase() > b.tax_exempt.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentmethod',
            key: 'paymentmethod',
            width: 150,
            sorter: (a, b) => (a.paymentmethod.toUpperCase() > b.paymentmethod.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Shipping Method',
            dataIndex: 'shippingmethod',
            key: 'shippingmethod',
            width: 150,
            sorter: (a, b) => (a.shippingmethod.toUpperCase() > b.shippingmethod.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Coupon Name',
            dataIndex: 'coupon_name',
            key: 'coupon_name',
            width: 150,
            sorter: (a, b) => (a.coupon_name.toUpperCase() > b.coupon_name.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Coupon Code',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
            width: 150,
            sorter: (a, b) => (a.coupon_code.toUpperCase() > b.coupon_code.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Coupon Type',
            dataIndex: 'coupon_type',
            key: 'coupon_type',
            width: 150,
            sorter: (a, b) => (a.coupon_type.toUpperCase() > b.coupon_type.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Coupon Amount',
            dataIndex: 'coupon_amount',
            key: 'coupon_amount',
            width: 150,
            sorter: (a, b) => (a.coupon_amount.toUpperCase() > b.coupon_amount.toUpperCase() ? 1 : -1),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: 150,
            render: (text, record) => (
                <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
            ),
        },
        {
            title: 'View',
            dataIndex: 'order_id',
            width: 70,
            align: 'right',
            key: 'order_id',
            render: (text, record) => (
                <>
                    <Link to={`/admin/order/view?id=${text}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="eye" style={{ margin: '.5em 1em', color: "#2ecc71" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
        },
        {
            title: 'Export',
            dataIndex: 'export',
            width: 70,
            align: 'center',
            key: 'createdAt',
            render: (text, record) => (
                <>
                    <Tooltip placement="topLeft" title="Export Single Order Report" color="cyan">
                        {/* <Link to={`/admin/order/add`}> */}
                        <FilePdfOutlined style={{ margin: '.5em 1em', color: "#f39c12", fontSize: 17 }} />
                        {/* </Link> */}
                    </Tooltip>
                    {/* <Tooltip placement="topLeft" title="Export Single Order Report PDF" color="cyan">
                        <Link to={`/admin/po/add?order_id=${record.id}`}>
                            <FontAwesome name="cart-plus" style={{ margin: '.5em 1em' }} />
                        </Link>
                    </Tooltip> */}
                </>
            ),
        },
    ];

    const onChangeSearch = e => {
        const value = e.target.value;
        setIsFilter(value);
        setFilteredOrders(
            orders.data.filter(order =>
                (
                    order?.id +
                    order?.customer_name +
                    order?.customer_email +
                    order?.orderStatus +
                    order?.payment_name +
                    order?.total
                )
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            ),
        );
    };

    // CSV FORMATION
    const OrderListReportheaders = [
        { label: "Order ID", key: "order_id" },
        { label: "Customer Name", key: "customer_name" },
        { label: "Customer Email", key: "customer_email" },
        { label: "Total Amount", key: "total_amount" },
        { label: "Sub Total", key: "sub_total" },
        { label: "Shipping Cost", key: "shipping_cost" },
        { label: "Discount Amount", key: "discount_amount" },
        { label: "Tax Amount", key: "tax_amount" },
        { label: "Total Products", key: "totalproducts" },
        { label: "Total Quantity", key: "totalquantity" },
        { label: "Order Status", key: "orderstatus" },
        { label: "Tax Exempt", key: "tax_exempt" },
        { label: "Payment Method", key: "paymentmethod" },
        { label: "Shipping Method", key: "shippingmethod" },
        { label: "Coupon Name", key: "coupon_name" },
        { label: "Coupon Code", key: "coupon_code" },
        { label: "Coupon Type", key: "coupon_type" },
        { label: "Coupon Amount", key: "coupon_amount" },
        { label: "Order Date", key: "createdAt" },
    ];

    return (
        <>
            <PageHeader
                title="Order Report"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <CSVLink data={orders?.data} headers={OrderListReportheaders} filename={"orderlistreport.csv"}>
                            <Button size="small" title="Export Order List" type="primary">
                                Export Order List Report
                                <FileExcelOutlined />
                            </Button>
                        </CSVLink>
                    </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {orders.loading ? (
                                <div className="spin">
                                    <Spin />
                                </div>
                            ) : (
                                <>
                                    <Input placeholder="Search Orders.." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br />
                                    <br />

                                    <span className={'psp_list'}>
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={isFilter ? filteredOrders : orders.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.ORDER_PER_PAGE,
                                                total: isFilter ? filteredOrders.length : orders.data.length,
                                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                            }}
                                        />
                                    </span>
                                </>
                            )}
                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default OrderReport;
