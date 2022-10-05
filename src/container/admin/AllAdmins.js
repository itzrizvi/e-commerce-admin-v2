import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const columns = [
    {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'email_verified',
        render: (roles) => roles.role,
        sorter: (a, b) => a.roles.role_no - b.roles.role_no,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        // filters: [
        //     { text: 'test', value: 'test' },
        //     // { text: 'Female', value: 'female' },
        // ],
        // filterMultiple: false,
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Email Verified',
        dataIndex: 'email_verified',
        key: 'email_verified',
        render: (email_verified) => email_verified.toString(),
        sorter: (a, b) => Number(b.email_verified) - Number(a.email_verified)
    },
    // {
    //     title: 'last_name',
    //     dataIndex: 'last_name',
    //     key: 'last_name',
    // },
]


const AllAdmin = () => {
    const token = useSelector(state => state.auth.token);
    const [searchTest, setSearchTest] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [staffs, setStaffs] = useState({
        data: [],
        isLoading: true,
        error: ''
    })

    useEffect(() => {
        apolloClient.query({
            query: authQuery.GET_ALL_STAFF,
            context: {
                headers: {
                    TENANTID: 100001,
                    Authorization: token
                }
            }
        }).then(res => {
            if (!res?.data?.getAllStaff?.isAuth) return setStaffs(s => ({ ...s, error: 'You Are not Authorized' }))
            setStaffs(s => ({ ...s, data: res?.data?.getAllStaff?.data, error: '' }))

        }).catch(err => {
            setStaffs(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setStaffs(s => ({ ...s, isLoading: false }))
        })

    }, [])


    const onChangeSearch = e => {
        const value = e.target.value
        setSearchTest(value)
        setFilteredUser(staffs.data.filter(user => user.email.includes(value)))
    }

    return (
        <>
            <PageHeader
                title="Users"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/admin/add">
                            <Button size="small" type="primary">
                                <FeatherIcon icon="user-plus" />
                                Add Admin
                            </Button>
                        </Link>
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {staffs.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                staffs.error ?
                                    <p>{staffs.error}</p>
                                    :
                                    <>
                                        <Input placeholder="Search user by Email" prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                        <br /><br />

                                        <Table
                                            className="table-responsive"
                                            pagination={false}
                                            columns={columns}
                                            dataSource={searchTest ? filteredUser : staffs.data}
                                            rowKey={'uid'}
                                        />
                                    </>
                            }


                        </Cards>
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default AllAdmin;
