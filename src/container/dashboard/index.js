import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Spin, Card } from 'antd';
import FeatherIcon from "feather-icons-react";
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import { menuPermission } from '../../utility/utility';
import { logOut } from '../../redux/authentication/actionCreator';
import apolloClient from '../../apollo';
import { contactUsQueries } from '../../apollo/contactUs';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import config from '../../config/config';
import { Link } from 'react-router-dom';
import {
	ShoppingCartOutlined,
	ShoppingOutlined,
	SnippetsOutlined,
	UsergroupAddOutlined
} from "@ant-design/icons";
import CountUp from 'react-countup';
import { dashboardAnalytics } from '../../apollo/dashboard';
import Moment from 'react-moment';

const Dashboard = () => {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const [isLoading, setIsLoading] = useState(true);
	const [analytics, setAnalytics] = useState({ data: [], loading: true, error: '' });
	setTimeout(() => {
		if (!menuPermission('dashboard')) dispatch(logOut());
	}, 2000);


	const [messages, setMessages] = useState({ data: [], isLoading: true })


	const messageColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 40,
			sorter: (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			ellipsis: true,
			width: 40,
			render: val => <a href={`mailto:${val}`} >{val}</a>,
			sorter: (a, b) => a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 40,
			render: val => <a href={`tel:${val}`} >{val}</a>,
			sorter: (a, b) => a.phone.toUpperCase() > b.phone.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			ellipsis: true,
			width: 40,
			sorter: (a, b) => a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1,
		},
		{
			title: 'View',
			dataIndex: 'id',
			width: 20,
			align: 'right',
			render: (val, record) => (
				<>
					<Link to={`/admin/supports/message?id=${val}`}>
						<FontAwesome name="eye" style={{ margin: ".5em 1em", color: "rgb(30, 216, 151)" }} />
					</Link>
				</>
			),
			key: 'id',
		},
	]

	const recentOrderColumns = [
		{
			title: 'Customer Email',
			dataIndex: ['customer', 'email'],
			key: 'email',
			width: 40,
			ellipsis: true,
			sorter: (a, b) => (a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Total Amount',
			dataIndex: 'total',
			key: 'total',
			align: 'center',
			width: 40,
			render: val => `$${val}`,
			sorter: (a, b) => (a.total > b.total ? 1 : -1),
		},
		{
			title: 'Status',
			dataIndex: ['orderStatus', 'name'],
			key: 'name',
			align: 'center',
			width: 40,
			render: val => (
				<span
					style={{
						borderRadius: '4em',
						padding: '.5em 1.5em',
						color: val === 'Pending' ? '#feaf00' : val === 'Delivered' ? '#2fb083' : '',
						background: val === 'Pending' ? '#fef6e6' : val === 'Delivered' ? '#ebf9f4' : '',
					}}
				>
					{val}
				</span>
			),
			sorter: (a, b) => (a.orderStatus.toUpperCase() > b.orderStatus.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center',
			width: 40,
			render: (text, record) => (
				<span className={'status-text'}>{<Moment format="DD-MM-YYYY">{parseInt(text)}</Moment>}</span>
			),
		}
	];

	const recentPurchaseOrders = [
		{
			title: 'PO ID',
			dataIndex: ['recentPurchaseOrders', 'po_id'],
			key: 'po_id',
			width: 40,
			ellipsis: true,
			sorter: (a, b) => (a.po_id.toUpperCase() > b.po_id.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Order ID',
			dataIndex: ['recentPurchaseOrders', 'order_id'],
			key: 'order_id',
			align: 'center',
			width: 40,
			render: val => `${val}`,
			sorter: (a, b) => (a.order_id > b.order_id ? 1 : -1),
		},
		{
			title: 'Type',
			dataIndex: ['recentPurchaseOrders', 'type'],
			key: 'type',
			align: 'center',
			width: 40,
			render: val => ({ val }),
			sorter: (a, b) => (a.type.toUpperCase() > b.type.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Total Amount',
			dataIndex: ['recentPurchaseOrders', 'grandTotal_price'],
			key: 'grandTotal_price',
			align: 'center',
			width: 40,
			render: val => `$${val}`,
			sorter: (a, b) => (a.grandTotal_price > b.grandTotal_price ? 1 : -1),
		}
	];

	const recentQuotes = [
		{
			title: 'Quoted By',
			dataIndex: ['recentQuotes', 'quotedby', 'name'],
			key: 'name',
			width: 40,
			ellipsis: true,
			sorter: (a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Email',
			dataIndex: ['recentQuotes', 'quotedby', 'email'],
			key: 'email',
			width: 40,
			ellipsis: true,
			sorter: (a, b) => (a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Status',
			dataIndex: ['recentQuotes', 'status'],
			key: 'status',
			align: 'center',
			width: 40,
			render: val => (
				<span
					style={{
						borderRadius: '4em',
						padding: '.5em 1.5em',
						color: val === 'new' ? '#feaf00' : val === 'submitted' ? '#2fb083' : '',
						background: val === 'new' ? '#fef6e6' : val === 'submitted' ? '#ebf9f4' : '',
					}}
				>
					{val}
				</span>
			),
			sorter: (a, b) => (a.status.toUpperCase() > b.status.toUpperCase() ? 1 : -1),
		},
		{
			title: 'Initial Amount',
			dataIndex: ['recentQuotes', 'grand_total'],
			key: 'grand_total',
			align: 'center',
			width: 40,
			render: val => `$${val}`,
			sorter: (a, b) => (a.grand_total > b.grand_total ? 1 : -1),
		},
		{
			title: 'Date',
			dataIndex: ['recentQuotes', 'createdAt'],
			key: 'createdAt',
			align: 'center',
			width: 40,
			render: (text, record) => (
				<span className={'status-text'}>{<Moment format="DD-MM-YYYY">{parseInt(text)}</Moment>}</span>
			),
		}
	];


	// LOAD Messages
	useEffect(() => {
		apolloClient.query({
			query: contactUsQueries.GET_CONTACT_US_UNREAD_MSG_LIST,
			context: {
				headers: {
					TENANTID: process.env.REACT_APP_TENANTID,
					Authorization: Cookies.get('psp_t')
				}
			}
		}).then(res => {
			const data = res?.data?.getContactUsUnreadMsgList
			if (!data?.status) return
			setMessages(s => ({ ...s, data: data?.data, error: '' }))
		}).catch(err => {
			setMessages(s => ({ ...s, error: 'Something went Wrong.!! ' }))
		}).finally(() => {
			setMessages(s => ({ ...s, isLoading: false }))
		})

	}, []);


	// GET ANALYTICS DATA
	useEffect(() => {
		apolloClient
			.query({
				query: dashboardAnalytics.GET_DASHBOARD_ANALYTICS,
				context: {
					headers: {
						TENANTID: process.env.REACT_APP_TENANTID,
						Authorization: token,
					},
				},
			})
			.then(res => {
				const data = res?.data?.getDashboardAnalytics;
				if (!data?.status) return
				setAnalytics({ data: data, error: '' });
			})
			.finally(() => setIsLoading(false));
	}, []);

	// Greetings Function
	const getGreetings = (date) => {
		var myDate = date;
		var hrs = myDate.getHours();

		var greet;

		if (hrs < 12)
			greet = 'Good Morning';
		else if (hrs >= 12 && hrs <= 17)
			greet = 'Good Afternoon';
		else if (hrs >= 17 && hrs <= 24)
			greet = 'Good Evening';

		return greet;
	}

	// Styles
	const styles = {
		countingColumnStyles: {
			borderRadius: 0,
			padding: 0
		},
		countingCardStyles: {
			borderRadius: 0,
			padding: 0,
			transition: ".5s",
			boxShadow: "rgb(95 99 242) -2px 0px 21px -7px",
			border: "1px solid rgb(136, 97, 224)"
		},
		countingCardStyles1: {
			borderRadius: 0,
			padding: 0,
			transition: ".5s",
			boxShadow: "rgb(95 99 242) -2px 0px 21px -7px",
			backgroundColor: "#8861E0",
			minHeight: 200,
			backgroundImage: `url(${require("../../static/img/delivery-truck-delivery.png")})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundBlendMode: "multiply"
		},
		countingCardStyles2: {
			borderRadius: 0,
			padding: 0,
			transition: ".5s",
			boxShadow: "rgb(95 99 242) -2px 0px 21px -7px",
			backgroundColor: "#1ed897",
			minHeight: 200,
			backgroundImage: `url(${require("../../static/img/shoppingCart.png")})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "center",
		},
		countingCardStyles3: {
			borderRadius: 0,
			padding: 0,
			transition: ".5s",
			boxShadow: "rgb(95 99 242) -2px 0px 21px -7px",
			backgroundColor: "#2196f3",
			minHeight: 200,
			backgroundImage: `url(${require("../../static/img/qoute.png")})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "center",
		},
		countingCardStyles4: {
			borderRadius: 0,
			padding: 0,
			transition: ".5s",
			boxShadow: "rgb(95 99 242) -2px 0px 21px -7px",
			backgroundColor: "#ffaf02",
			minHeight: 200,
			backgroundImage: `url(${require("../../static/img/e-customer.png")})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundBlendMode: "multiply"
		},
		cardHeadTextStyles: {
			textTransform: "uppercase",
			color: "#FFFFFF",
			marginBottom: 0,
			fontSize: "14px"
		},
		cardMainNumberTextStyles: {
			fontSize: 30,
			color: "#FFFFFF",
			fontWeight: 600,
			marginBottom: 10,
		},
		cardNumberTextStyles: {
			fontSize: 13,
			color: "#FFFFFF",
			fontWeight: 600,
			marginBottom: 10,
		},
		iconStyles1: {
			color: "#8861E0",
			fontSize: "28px",
			backgroundColor: "#FFFFFF",
			padding: "9px",
			borderRadius: "3px",
			float: "right",
			overflow: "hidden"
		},
		iconStyles2: {
			color: "#1ed897",
			fontSize: "28px",
			backgroundColor: "#FFFFFF",
			padding: "9px",
			borderRadius: "3px",
			float: "right",
			overflow: "hidden"
		},
		iconStyles3: {
			color: "#2196f3",
			fontSize: "28px",
			backgroundColor: "#FFFFFF",
			padding: "9px",
			borderRadius: "3px",
			float: "right",
			overflow: "hidden"
		},
		iconStyles4: {
			color: "#ffaf02",
			fontSize: "28px",
			backgroundColor: "#FFFFFF",
			padding: "9px",
			borderRadius: "3px",
			float: "right",
			overflow: "hidden"
		},
		styledButton1: {
			padding: "5px 8px",
			fontSize: 10,
			borderRadius: "0px",
			backgroundColor: "#FFFFFF",
			color: "#000",
			boxShadow: "1px 1px 7px -2px #000000",
			marginTop: "6px",
			width: "100%",
			display: "inline-block",
			whiteSpace: "nowrap",
			height: "auto"
		},
		customeTableStyle: {
			minHeight: "300px"
		}
	}



	return (
		<>
			<Main>
				<Row gutter={25}>
					<Col lg={24} xs={24}>
						<div style={{ marginTop: 10 }}>
							<h2 style={{ marginBottom: 0 }}>{getGreetings(new Date())}, {user?.first_name} {user?.last_name}</h2>
							<p>Here's what's happening with your e-commerce today.</p>
						</div>
					</Col>
				</Row>
				<div className="counting-columns">
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: 30, marginTop: 20 }}>

						<Col className="gutter-row" xs={24} sm={12} md={12} lg={6} style={{ marginBottom: 20 }}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card
								style={styles.countingCardStyles1}
								bordered={false}
								hoverable={true}>
								<Row gutter={25}>
									<Col span={18}>
										<h3 style={styles.cardHeadTextStyles}>Shipped Orders</h3>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics?.data?.totalShippedOrder} /></p>
									</Col>
									<Col span={6}>
										<FeatherIcon icon="truck" size={48} style={styles.iconStyles1} />
									</Col>
								</Row>

								<Row gutter={25} style={{ marginTop: 10 }}>
									<Col xs={12} sm={12} md={12} lg={12} >
										<p style={styles.cardNumberTextStyles}>Today Shipped:<br /><CountUp style={{ fontSize: 15 }} duration={2} end={analytics.data.todayShippedOrder} /></p>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<p style={styles.cardNumberTextStyles}>In-Progress:<br /><CountUp style={{ fontSize: 15 }} duration={2} end={analytics.data.shippingInProgress} /></p>
									</Col>
								</Row>
							</Card>)}

						</Col>
						<Col className="gutter-row" xs={24} sm={12} md={12} lg={6} style={{ marginBottom: 20 }}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles2}
								bordered={false}
								hoverable={true}>
								<Row gutter={25}>
									<Col span={18}>
										<h3 style={styles.cardHeadTextStyles}>Orders</h3>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.orderCount} /></p>
									</Col>
									<Col span={6}>
										<ShoppingCartOutlined style={styles.iconStyles2} />
									</Col>
								</Row>

								<Row gutter={25} style={{ marginTop: 10 }}>
									<Col span={10}>
										<p style={styles.cardNumberTextStyles}>New Order<br /><CountUp duration={2} style={{ fontSize: 15 }} end={analytics.data.newOrderCount} /></p>
									</Col>
									<Col span={14}>
										<Button style={styles.styledButton1} type="primary">Manage <br /> Today Orders</Button>
									</Col>
								</Row>
							</Card>)}
						</Col>
						<Col className="gutter-row" xs={24} sm={12} md={12} lg={6} style={{ marginBottom: 20 }}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles3}
								bordered={false}
								hoverable={true}>
								<Row gutter={25}>
									<Col span={18}>
										<h3 style={styles.cardHeadTextStyles}>Quotes</h3>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.totalQuotes} /></p>
									</Col>
									<Col span={6}>
										<SnippetsOutlined style={styles.iconStyles3} />
									</Col>
								</Row>

								<Row gutter={25} style={{ marginTop: 10 }}>
									<Col span={10}>
										<p style={styles.cardNumberTextStyles}>New Quotes<br /><CountUp style={{ fontSize: 15 }} duration={2} end={analytics.data.todayQuotes} /></p>
									</Col>
									<Col span={14}>
										<Button style={styles.styledButton1} type="primary">Manage <br /> New Quotes</Button>
									</Col>
								</Row>
							</Card>)}
						</Col>
						<Col className="gutter-row" xs={24} sm={12} md={12} lg={6} style={{ marginBottom: 20 }}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles4}
								bordered={false}
								hoverable={true}>
								<Row gutter={25}>
									<Col span={18}>
										<h3 style={styles.cardHeadTextStyles}>New Customers</h3>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.newCustomer} /></p>
									</Col>
									<Col span={6}>
										<UsergroupAddOutlined style={styles.iconStyles4} />
									</Col>
								</Row>

								<Row gutter={25} style={{ marginTop: 10 }}>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>Total<br /> <CountUp style={{ fontSize: 15 }} duration={2} end={analytics.data.totalCustomer} /></p>
									</Col>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>Verified<br /> <CountUp style={{ fontSize: 15 }} duration={2} end={analytics.data.verifiedCustomer} /></p>
									</Col>
								</Row>
							</Card>)}
						</Col>


					</Row>
				</div>
				<Row gutter={25} style={{ marginBottom: 0, marginTop: 20 }}>
					<Col sm={12} xs={24} style={{ marginBottom: 30 }}>
						<Card headless style={styles.countingCardStyles}>
							<h3 style={{ fontWeight: "700", marginBottom: "1em", color: "rgb(136, 97, 224)" }}>Recent Orders</h3>
							{isLoading ? (
								<div className="spin">
									<Spin />
								</div>
							) : (
								<>
									<Table
										style={styles.customeTableStyle}
										className="table-responsive"
										columns={recentOrderColumns}
										rowKey={'id'}
										size="small"
										dataSource={analytics?.data?.recentOrders}
										rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
										pagination={{
											defaultPageSize: 5,
											total: analytics?.data?.recentOrders?.length,
											showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
										}}
									/>
								</>
							)}
						</Card>
					</Col>
					<Col sm={12} xs={24} style={{ marginBottom: 30 }}>
						<Card headless style={styles.countingCardStyles}>
							<h3 style={{ fontWeight: "700", marginBottom: "1em", color: "#EE5A24" }}>Recent PO's</h3>
							{isLoading ? (
								<div className="spin">
									<Spin />
								</div>
							) : (
								<>
									<Table
										style={styles.customeTableStyle}
										className="table-responsive"
										columns={recentPurchaseOrders}
										rowKey={'id'}
										size="small"
										dataSource={analytics?.data?.recentPurchaseOrders}
										rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
										pagination={{
											defaultPageSize: 5,
											total: analytics?.data?.recentPurchaseOrders?.length,
											showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
										}}
									/>
								</>
							)}
						</Card>
					</Col>
				</Row>
				<Row gutter={25} style={{ marginBottom: 0, marginTop: 10 }}>
					<Col sm={12} xs={24} style={{ marginBottom: 30 }}>
						<Card headless style={styles.countingCardStyles}>
							<h3 style={{ fontWeight: "700", marginBottom: "1em", color: "#ED4C67" }}>Unread Messages</h3>
							{messages.isLoading ?
								<div className="spin">
									<Spin />
								</div>
								:
								<>

									<Table
										style={styles.customeTableStyle}
										className="table-responsive"
										columns={messageColumns}
										rowKey={'id'}
										size="small"
										dataSource={messages.data}
										rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
										pagination={{
											defaultPageSize: 5,
											total: messages?.data?.length,
											showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
										}}
									/>
								</>}
						</Card>
					</Col>
					<Col sm={12} xs={24} style={{ marginBottom: 30 }}>
						<Card headless style={styles.countingCardStyles}>
							<h3 style={{ fontWeight: "700", marginBottom: "1em", color: "#0984e3" }}>Recent Quotes</h3>
							{isLoading ? (
								<div className="spin">
									<Spin />
								</div>
							) : (
								<>
									<Table
										style={styles.customeTableStyle}
										className="table-responsive"
										columns={recentQuotes}
										rowKey={'id'}
										size="small"
										dataSource={analytics?.data?.recentQuotes}
										rowClassName={(record, index) => (index % 2 == 0 ? '' : 'altTableClass')}
										pagination={{
											style: {},
											defaultPageSize: 5,
											total: analytics?.data?.recentQuotes?.length,
											showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
										}}
									/>
								</>
							)}
						</Card>
					</Col>
				</Row>
			</Main>
		</>
	);
};

export default Dashboard;
