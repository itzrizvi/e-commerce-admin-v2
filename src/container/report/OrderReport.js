import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Tooltip, Select, DatePicker } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { FileExcelOutlined, FilePdfOutlined, SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { couponQuery, customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { reportQuery } from '../../apollo/report';
import { CSVLink } from 'react-csv';
import { orderQuery } from '../../apollo/order';
import { methodQuery } from '../../apollo/method';
const { RangePicker } = DatePicker;

const OrderReport = () => {
    viewPermission('report');
    const [orders, setOrders] = useState({ data: [], loading: true, error: '' });
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [enableExport, setEnableExport] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [customer, setCustomer] = useState({ data: [], isLoading: true });
    const [customerEmail, setCustomerEmail] = useState({ data: [], isLoading: true });
    const [status, setStatus] = useState({ data: [], isLoading: true });
    const [paymentMethod, setPaymentMethod] = useState({ data: [], isLoading: true });
    const [shippingMethod, setShippingMethod] = useState({ data: [], isLoading: true });
    const [coupon, setCoupon] = useState({ data: [], isLoading: true });
    const [filterDate, setFilterDate] = useState({
        customer: [],
        customerEmail: [],
        status: [],
        paymentMethod: [],
        shippingMethod: [],
        coupon: [],
        startDate: '',
        endDate: '',
        minPrice: '',
        maxPrice: '',
    });
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


        // Load filter data
        // 1.load Customer
        apolloClient
            .query({
                query: customerQuery.GET_ALL_CUSTOMER,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getAllCustomer;
                if (!data.status) return;

                setCustomer({ data: data.data, isLoading: false });
                setCustomerEmail({ data: data.data, isLoading: false });
            })
            .catch(err => { });

        // 2. Load Order Status
        apolloClient
            .query({
                query: orderQuery.GET_ORDER_STATUS_LIST,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getOrderStatusList;
                if (!data.status) return;
                setStatus({ data: data.data, isLoading: false });
            })
            .catch(err => { });

        // 3. Load Payment Methods
        apolloClient
            .query({
                query: methodQuery.GET_PAYMENT_METHOD_LIST,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getPaymentMethodListPublic;
                if (!data.status) return;
                setPaymentMethod({ data: data.data, isLoading: false });
            })
            .catch(err => { });

        // 3. Load Shipping Methods
        apolloClient
            .query({
                query: methodQuery.GET_SHIPPING_METHOD_LIST_ADMIN,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getShippingMethodListAdmin;
                if (!data.status) return;
                setShippingMethod({ data: data.data, isLoading: false });
            })
            .catch(err => { });

        // 3. Load Coupon
        apolloClient
            .query({
                query: couponQuery.GET_ALL_COUPONS,
                context: {
                    headers: {
                        TENANTID: process.env.REACT_APP_TENANTID,
                        Authorization: token,
                    },
                },
            })
            .then(res => {
                const data = res?.data?.getAllCoupons;
                if (!data.status) return;
                setCoupon({ data: data.data, isLoading: false });
            })
            .catch(err => { });


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
                <span className={'status-text'}>{<Moment format="DD MMMM YYYY">{text}</Moment>}</span>
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


    // All filter
    useEffect(() => {
        if (orders.loading) return;
        let filteredData = orders.data;
        const totalDataLength = filteredData.length;

        if (searchText) {
            filteredData = orders.data.filter(order =>
                (
                    order?.id +
                    order?.customer_name +
                    order?.customer_email +
                    order?.orderStatus +
                    order?.payment_name +
                    order?.total
                ).toLowerCase().includes(searchText.toLowerCase()),
            );
        }


        if (filterDate.startDate) {
            const startDate = new Date(filterDate.startDate).valueOf();
            const endDate = new Date(filterDate.endDate).valueOf();

            filteredData = filteredData.filter(order => {
                const createdAt = new Date(order.createdAt).getTime();
                const c1 = createdAt >= startDate;
                const c2 = createdAt <= endDate;
                return c1 && c2;
            });
        }

        if (filterDate.customer.length) {
            filteredData = filteredData.filter(order => {
                return filterDate.customer.includes(order.customer_name);
            });
        }

        if (filterDate.customerEmail.length) {
            filteredData = filteredData.filter(order => {
                return filterDate.customerEmail.includes(order.customer_email);
            });
        }

        if (filterDate.status.length) {
            filteredData = filteredData.filter(order => filterDate.status.includes(order.orderstatus));
        }

        if (filterDate.paymentMethod.length) {
            filteredData = filteredData.filter(order => filterDate.paymentMethod.includes(order.paymentmethod));
        }

        if (filterDate.shippingMethod.length) {
            filteredData = filteredData.filter(order => filterDate.shippingMethod.includes(order.shippingmethod));
        }

        if (filterDate.coupon.length) {
            filteredData = filteredData.filter(order => filterDate.coupon.includes(order.coupon_code));
        }

        if (filterDate.minPrice) {
            filteredData = filteredData.filter(order => order.total_amount >= parseFloat(filterDate.minPrice));
        }

        if (filterDate.maxPrice) {
            filteredData = filteredData.filter(order => order.total_amount <= parseFloat(filterDate.maxPrice));
        }

        setFilteredOrders(filteredData);
        if (totalDataLength > filteredData.length) setEnableExport(true)
        else setEnableExport(false)

    }, [orders, searchText, filterDate]);


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

    //
    const csvButtonStyles = {
        csvButtonStyle1: {
            backgroundColor: "#2ecc71",
            color: "#FFFFFF"
        },
        csvButtonStyle2: {
            backgroundColor: "#DEDEDE",
            color: "#e74c3c"
        },
    }


    return (
        <>
            <PageHeader
                title="Order Report"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <CSVLink
                            onClick={() => enableExport}
                            data={filteredOrders}
                            headers={OrderListReportheaders}
                            filename={`orderreport-${new Date().toGMTString()}.csv`}>
                            <Button size="small" title="Export Order List" style={enableExport ? csvButtonStyles.csvButtonStyle1 : csvButtonStyles.csvButtonStyle2}>
                                <FileExcelOutlined />
                                Generate & Download Report
                            </Button>
                        </CSVLink>
                        <Button size="small" type="white" onClick={() => setIsFilter(state => !state)}>
                            <FeatherIcon icon="filter" />
                            Filter
                        </Button>
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
                                    <Input
                                        placeholder="Search Orders..."
                                        prefix={<SearchOutlined />}
                                        onChange={e => {
                                            const value = e.target.value;
                                            setSearchText(value);
                                        }}
                                    />
                                    <br />
                                    <br />

                                    {isFilter && (
                                        <div style={{ marginBottom: '2.5em' }}>
                                            <Row gutter={25}>

                                                <Col span={6}>
                                                    Customer Name: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Or Search Customer"
                                                        size="middle"
                                                        mode="multiple"
                                                        onChange={val => {
                                                            setFilterDate(s => ({ ...s, customer: val }));
                                                        }}
                                                        options={customer.data.map(item => ({
                                                            label: item.first_name + ' ' + item.last_name,
                                                            value: item.first_name + ' ' + item.last_name,
                                                        }))}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Customer Email: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Or Search Customer Email"
                                                        size="middle"
                                                        mode="multiple"
                                                        optionFilterProp="label"
                                                        onChange={val => {
                                                            setFilterDate(s => ({ ...s, customerEmail: val }));
                                                        }}
                                                        options={customerEmail.data.map(item => ({
                                                            label: item.email,
                                                            value: item.email,
                                                        }))}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Date: <br />
                                                    <RangePicker
                                                        style={{ height: '40px', width: '100%' }}
                                                        size="small"
                                                        onChange={val => {
                                                            setFilterDate(s => {
                                                                return {
                                                                    ...s,
                                                                    startDate: val ? val[0]._d : null,
                                                                    endDate: val ? val[1]._d : null,
                                                                };
                                                            });
                                                        }}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Order Status: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Order Status"
                                                        size="middle"
                                                        mode="multiple"
                                                        onChange={value => setFilterDate(s => ({ ...s, status: value }))}
                                                        options={status.data.map(item => ({
                                                            label: item.name,
                                                            value: item.name,
                                                        }))}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row gutter={25} style={{ marginTop: '.5em' }}>
                                                <Col span={6}>
                                                    Select Payment Method: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Payment Method"
                                                        size="middle"
                                                        mode="multiple"
                                                        onChange={value => setFilterDate(s => ({ ...s, paymentMethod: value }))}
                                                        options={paymentMethod.data.map(item => ({
                                                            label: item.name,
                                                            value: item.name,
                                                        }))}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Select Shipping Method: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Shipping Method"
                                                        size="middle"
                                                        mode="multiple"
                                                        onChange={value => setFilterDate(s => ({ ...s, shippingMethod: value }))}
                                                        options={shippingMethod.data.map(item => ({
                                                            label: item.name,
                                                            value: item.name,
                                                        }))}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Select Coupon: <br />
                                                    <Select
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Order Coupons"
                                                        size="middle"
                                                        mode="multiple"
                                                        onChange={value => setFilterDate(s => ({ ...s, coupon: value }))}
                                                        options={coupon.data.map(item => ({
                                                            label: item.coupon_code,
                                                            value: item.coupon_code,
                                                        }))}
                                                    />
                                                </Col>

                                                <Col span={6}>
                                                    Select Amount: <br />
                                                    <Input.Group compact size="default">
                                                        <Input
                                                            type="number"
                                                            placeholder="Min"
                                                            style={{ width: '50%' }}
                                                            onBlur={e => {
                                                                setFilterDate(s => ({ ...s, minPrice: e?.target?.value }));
                                                            }}
                                                        />
                                                        <Input
                                                            type="number"
                                                            placeholder="Max"
                                                            style={{ width: '50%' }}
                                                            onBlur={e => {
                                                                setFilterDate(s => ({ ...s, maxPrice: e?.target?.value }));
                                                            }}
                                                        />
                                                    </Input.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    <span className={'psp_list'}>
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={isFilter ? filteredOrders : orders.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
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
