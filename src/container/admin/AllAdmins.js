import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Spin, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const handleStatusChange = (record, checked) => {
    const variables = { data: { uid: record.uid, user_status: checked } }

    apolloClient.mutate({
        mutation: authMutation.ADMIN_UPDATE,
        variables,
        context: {
            headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: Cookies.get('psp_t')
            }
        }
    }).then(res => {
        const status = res?.data?.adminUpdate?.status
        if (!status) return toast.error(data.message)
        toast.success(`${record.email} user Status updated successfully.`)
    }).catch(err => {
        console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
        toast.error(`Something went wrong!!`)
    })

}


const columns = [
    {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
        width: 120,
        ellipsis: true
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        ellipsis: true
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
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles',
        width: 60,
        ellipsis: true,
        render: (roles) => (
            <p>
                {roles.map(role => (
                    <>{role.role},</>
                ))}
            </p>
        ),
        // sorter: (a, b) => a?.roles?.role_no - b?.roles?.role_no,
    },
    {
        title: 'Verified',
        dataIndex: 'email_verified',
        key: 'email_verified',
        render: (email_verified) => email_verified.toString(),
        sorter: (a, b) => Number(b.email_verified) - Number(a.email_verified)
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
            <Switch defaultChecked={record.user_status} title='Status' onChange={checked => handleStatusChange(record, checked)} />
        )
    },
    {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
            <>
                <Link to={`/admin/admin/add-admin?uid=${record.uid}&first_name=${record.first_name}&last_name=${record.last_name}&email=${record.email}&status=${record.status}`}>
                    {/* <Button size="default" type="white" title='Edit'> */}
                    <FontAwesome name="edit" />
                    {/* </Button> */}
                </Link>
            </>
        ),
        key: 'last_name',
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
                    TENANTID: process.env.REACT_APP_TENANTID,
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
        setFilteredUser(staffs.data.filter(user => (user?.email + user?.first_name + user?.last_name + user?.roles?.role).toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <>
            <PageHeader
                title="Users"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/admin/add-admin">
                            <Button size="small" title="Add user" type="primary">
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
                                                pagination={false}
                                                columns={columns}
                                                rowKey={'uid'}
                                                size="small"
                                                dataSource={searchTest ? filteredUser : staffs.data}
                                                rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
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

export default AllAdmin;
