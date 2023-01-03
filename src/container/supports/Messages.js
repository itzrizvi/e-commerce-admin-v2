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
        setFilteredMessages(messages.data.filter(mess => (mess?.email + mess?.message + mess?.name + mess?.phone + mess?.subject).toLowerCase().includes(value.toLowerCase())))
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
                                            scroll={{ x: "max-content" }}
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={searchText ? filteredMessages : messages.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.CONTACT_US_MESSAGE_PER_PAGE,
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
