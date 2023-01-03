import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { customerQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import config from '../../config/config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';
import { viewPermission } from '../../utility/utility';

const ListUser = () => {
    viewPermission('customer');
    const token = useSelector(state => state.auth.token);
    const [searchText, setSearchText] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [staffs, setStaffs] = useState({
        data: [],
        isLoading: true,
        error: ''
    })

    useEffect(() => {
        apolloClient.query({
            query: customerQuery.GET_ALL_CUSTOMER,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res.data.getAllCustomer
            if (!data?.status) return

            setStaffs(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setStaffs(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setStaffs(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
            sorter: (a, b) => a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1,

        },
        {
            title: 'Image',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            render: (text, record) => (<LazyLoadImage effect="blur" width="40" src={renderImage(record.id, record.image, 'user', '128x128', true)} onError={errorImageSrc} alt={record.id} />)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
            ellipsis: true,
            sorter: (a, b) => a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1,

        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a.first_name.toUpperCase() > b.first_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: (a, b) => a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Verified',
            dataIndex: 'email_verified',
            key: 'email_verified',
            width: 100,
            align: 'center',
            render: (email_verified) => email_verified.toString(),
            sorter: (a, b) => (a.email_verified === b.email_verified) ? 0 : a.email_verified ? -1 : 1,
            filters: [
                {
                    text: 'Verified',
                    value: true,
                },
                {
                    text: 'Not Verified',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.email_verified === value,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: 90,
            align: 'center',
            render: (id, record) => (
                <>
                    <Link to={`/admin/customers/edit/${id}`} style={{marginRight: "10px"}}>
                        <FontAwesome name="edit" />
                    </Link>
                    <Link to={`/admin/customers/view/${id}`}>
                        <FontAwesome name="eye" />
                    </Link>
                </>
            ),
        },
    ]


    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredUser(staffs.data.filter(user => (user?.email + user?.first_name + user?.last_name + user?.roles?.role).toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <>
            <PageHeader
                title="Customers"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/customers/add">
                            <Button size="small" title="Add Customer" type="primary">
                                <FeatherIcon icon="user-plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {/* {(staffs.isLoading || allRole.isLoading) ? */}
                            {staffs.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                staffs.error ?
                                    <p>{staffs.error}</p>
                                    :
                                    <>
                                        <Input placeholder="Search user" prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                        <br /><br />

                                        <span className={"psp_list"} >
                                            <Table
                                                className="table-responsive"
                                                columns={columns}

                                                rowKey={'uid'}
                                                size="small"
                                                dataSource={searchText ? filteredUser : staffs.data}
                                                rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                                // pagination={false}
                                                pagination={{
                                                    defaultPageSize: config.CUSTOMER_PER_PAGE,
                                                    total: searchText ? filteredUser.length : staffs.data.length,
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

export default ListUser;
