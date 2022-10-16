import React, { useState } from 'react';
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


const CustomerGroups = () => {
    const dummyData = [...Array(10).keys()].map(i => ({ g_n: `Customer Group ${i + 1}`, g_s: i + 1, g_status: true }))

    const [customerGroups, setCustomerGroups] = useState({ data: dummyData, isLoading: false })
    const [filteredCustomerGroups, setFilteredCustomerGroups] = useState([])
    const [searchText, setSearchText] = useState('')

    const handleStatusChange = (record, checked) => {
        // const variables = { data: { roles_permission_uuid: record.roles_permission_uuid, roles_permission_status: checked } }

        // apolloClient.mutate({
        //     mutation: authMutation.UPDATE_ROLES_PERMISSION,
        //     variables,
        //     context: {
        //         headers: {
        //             TENANTID: process.env.REACT_APP_TENANTID,
        //             Authorization: Cookies.get('psp_t')
        //         }
        //     }
        // }).then(res => {
        //     const data = res?.data?.updateRolesPermission
        //     if (!data.isAuth) return
        //     if (!data?.status) return toast.error(data?.message)
        //     toast.success(`${record.roles_permission_name} Permission Status updated successfully.`)
        // }).catch(err => {
        //     console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
        //     toast.error(`Something went wrong!!`)
        // })

    }

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'g_n',
            key: 'g_n',
            sorter: (a, b) => a.g_n.toUpperCase() > b.g_n.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Sort Order',
            dataIndex: 'g_s',
            key: 'g_s',
            sorter: (a, b) => (a.g_s === b.g_s) ? 0 : a.g_s ? -1 : 1,
        },
        {
            title: 'Status',
            dataIndex: 'g_status',
            key: 'g_status',
            align: 'right',
            sorter: (a, b) => (a.g_status === b.g_status) ? 0 : a.g_status ? -1 : 1,
            filters: [
                {
                    text: 'Active',
                    value: true,
                },
                {
                    text: 'Inactive',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.g_status === value,
            render: (value, record) => (
                <Switch defaultChecked={value} title='Status' onChange={checked => handleStatusChange(record, checked)} />
            )
        },

        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/customers/add-group?id=${1}&name=${record.g_n}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]

    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredCustomerGroups(customerGroups.data.filter(attr => attr?.g_n.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Customers Group"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/customers/add-group">
                            <Button size="small" title="Add Customer Groups" type="primary">
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

                            {customerGroups.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Permission..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'g_s'}
                                            size="small"
                                            dataSource={searchText ? filteredCustomerGroups : customerGroups.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.CUSTOMER_GROUPS_PER_PAGE,
                                                total: searchText ? filteredCustomerGroups.length : customerGroups.data.length,
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

export default CustomerGroups;
