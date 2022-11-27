import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation, customerQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { contactUsQueries } from '../../apollo/contactUs';


const Messages = () => {
    viewPermission('customer-group');

    const [messages, setMessages] = useState({ data: [], isLoading: true })

    const [filteredMessages, setFilteredMessages] = useState([])
    const [searchText, setSearchText] = useState('')


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            // width: 200,
            ellipsis: true,
            sorter: (a, b) => a.message.toUpperCase() > b.message.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    {/* <Link to={`/admin/customers/add-group?id=${record.id}`}> */}
                    <FontAwesome name="eye" style={{ margin: ".5em 1em" }} />
                    {/* </Link> */}
                </>
            ),
            key: 'last_name',
        },
    ]


    // LOAD Messages
    useEffect(() => {
        apolloClient.query({
            query: contactUsQueries.GET_CONTACT_US_MSG_LIST,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getContactUsMsgList
            if (!data?.status) return
            setMessages(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setMessages(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setMessages(s => ({ ...s, isLoading: false }))
        })

    }, [])




    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredMessages(messages.data.filter(group => (group?.customer_group_name + group?.customergroup_description + group.customergroup_sortorder).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Messages"
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {messages.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Message..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={searchText ? filteredMessages : messages.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.CUSTOMER_GROUPS_PER_PAGE,
                                                total: searchText ? filteredMessages.length : messages.data.length,
                                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                            }}
                                        />
                                    </span>



                                </>

                            }



                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default Messages;
