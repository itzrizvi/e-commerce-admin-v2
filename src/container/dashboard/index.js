import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Spin } from 'antd';
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

const Dashboard = () => {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
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

	}, [])






	return (
		<>
			<PageHeader
				ghost
				title="Dashboard"

			/>
			<Main>
				<Row gutter={25}>
					<Col lg={24} xs={24}>
						<Cards headless>
							{/* <div style={{ minHeight: 'calc(100vh - 320px)' }}> */}
							<div>
								<h2>Welcome {user?.first_name} {user?.last_name}</h2>
							</div>
						</Cards>

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
