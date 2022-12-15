import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Spin, Card } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
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
	DollarCircleOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UsergroupAddOutlined
} from "@ant-design/icons";
import CountUp from 'react-countup';
import { dashboardAnalytics } from '../../apollo/dashboard';

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
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			sorter: (a, b) => (a.id > b.id) ? 1 : -1,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			// render: val => <b>{val}</b>,
			sorter: (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: val => <a href={`tel:${val}`} >{val}</a>,
			sorter: (a, b) => a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			sorter: (a, b) => a.phone.toUpperCase() > b.phone.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			// width: 200,
			ellipsis: true,
			sorter: (a, b) => a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1,
		},
		{
			title: 'Message',
			dataIndex: 'message',
			key: 'message',
			// width: 300,
			ellipsis: true,
			render: val => <p
				style={{
					maxWidth: "250px",
					whiteSpace: "normal"
				}}
			>{val}</p>,
			sorter: (a, b) => a.message.toUpperCase() > b.message.toUpperCase() ? 1 : -1,
		},
		{
			title: 'View',
			dataIndex: 'id',
			width: 70,
			align: 'right',
			render: (val, record) => (
				<>
					<Link to={`/admin/supports/message?id=${val}`}>
						<FontAwesome name="eye" style={{ margin: ".5em 1em" }} />
					</Link>
				</>
			),
			key: 'id',
		},
	]


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
			boxShadow: "3px 3px 4px -4px #5f63f2"
		},
		cardHeadTextStyles: {
			textTransform: "uppercase",
			color: "rgb(0 0 0 / 64%)",
			marginBottom: 20
		},
		cardMainNumberTextStyles: {
			fontSize: 20,
			fontWeight: 600
		},
		cardNumberTextStyles: {
			fontSize: 12,
			color: "rgba(0, 0, 0, 0.64)",
			fontWeight: 400
		},
		iconStyles: {
			color: "rgb(16 33 21)",
			fontSize: "22px",
			backgroundColor: "rgb(95 99 242 / 36%)",
			padding: "9px",
			borderRadius: "3px"

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

						<Col className="gutter-row" span={6}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card
								style={styles.countingCardStyles}
								bordered={true}
								hoverable={true}>
								<h3 style={styles.cardHeadTextStyles}>Total Revenue</h3>
								<Row gutter={25}>
									<Col span={18}>
										<p style={styles.cardMainNumberTextStyles}>$<CountUp duration={2} end={analytics.data.revenueCount} /></p>
									</Col>
									<Col span={6}>
										<DollarCircleOutlined style={styles.iconStyles} />
									</Col>
								</Row>
								<Row gutter={25}>
									<Col span={24}>
										<p style={styles.cardNumberTextStyles}>Today Revenue<br /><CountUp duration={2} end={analytics.data.todayRevenue} /></p>
									</Col>
								</Row>
							</Card>)}

						</Col>
						<Col className="gutter-row" span={6}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles}
								bordered={true}
								hoverable={true}>
								<h3 style={styles.cardHeadTextStyles}>Total Orders</h3>
								<Row gutter={25}>
									<Col span={18}>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.orderCount} /></p>
									</Col>
									<Col span={6}>
										<ShoppingCartOutlined style={styles.iconStyles} />
									</Col>
								</Row>
								<Row gutter={25}>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>Today Pending<br /><CountUp duration={2} end={analytics.data.todayOrderPendingCount} /></p>
									</Col>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>Today Delivered<br /> <CountUp duration={2} end={analytics.data.todayDeliveredOrderCount} /></p>
									</Col>
								</Row>
							</Card>)}
						</Col>
						<Col className="gutter-row" span={6}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles}
								bordered={true}
								hoverable={true}>
								<h3 style={styles.cardHeadTextStyles}>Today Product Sold</h3>
								<Row gutter={25}>
									<Col span={18}>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.todayProductSoldCount} /></p>
									</Col>
									<Col span={6}>
										<ShoppingOutlined style={styles.iconStyles} />
									</Col>
								</Row>
								<Row gutter={25}>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>Today Pending<br /><CountUp duration={2} end={analytics.data.todayProductPendingCount} /></p>
									</Col>
								</Row>
							</Card>)}
						</Col>
						<Col className="gutter-row" span={6}>
							{isLoading ? (
								<div style={{ textAlign: 'center', paddingTop: 64 }}>
									<Spin tip="processing..." />
								</div>
							) : (<Card style={styles.countingCardStyles}
								bordered={true}
								hoverable={true}>
								<h3 style={styles.cardHeadTextStyles}>Total Customer</h3>
								<Row gutter={25}>
									<Col span={18}>
										<p style={styles.cardMainNumberTextStyles}><CountUp duration={2} end={analytics.data.customerCount} /></p>
									</Col>
									<Col span={6}>
										<UsergroupAddOutlined style={styles.iconStyles} />
									</Col>
								</Row>
								<Row gutter={25}>
									<Col span={12}>
										<p style={styles.cardNumberTextStyles}>New Customers<br /> <CountUp duration={2} end={analytics.data.newCustomer} /></p>
									</Col>
								</Row>
							</Card>)}
						</Col>


					</Row>
				</div>
				<Row gutter={25}>
					<Col span={12}>
						<Cards headless>
							<h3 style={{ fontWeight: "700", marginBottom: "1em" }}>Unread Messages</h3>
							{messages.isLoading ?
								<div className="spin">
									<Spin />
								</div>
								:
								<>

									<Table
										scroll={{ x: "max-content" }}
										className="table-responsive"
										columns={messageColumns}
										rowKey={'id'}
										size="small"
										dataSource={messages.data}
										rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
										// pagination={false}
										pagination={{
											defaultPageSize: config.CONTACT_US_MESSAGE_PER_PAGE,
											total: messages.data.length,
											showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
										}}
									/>
								</>}
						</Cards>
					</Col>
				</Row>
			</Main>
		</>
	);
};

export default Dashboard;
