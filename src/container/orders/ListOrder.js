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


const ListOrder = () => {
    const dummyData = [...Array(10).keys()].map(i => ({
        o_u: 'asdasd5asd5asd676d67asd6as',
        o_a: 2000,
        o_da: 410,
        o_ga: 320,
        o_ci: "dasda57da7sd66das6d6ad66766da6a797",
        o_s: "pending",
        o_d: "166627543598"
    }))

    const [customerGroups, setCustomerGroups] = useState({ data: dummyData, isLoading: false })
    // const [customerGroups, setCustomerGroups] = useState({ data: [], isLoading: true })

    const [filteredCustomerGroups, setFilteredCustomerGroups] = useState([])
    const [searchText, setSearchText] = useState('')

    const handleStatusChange = (record, checked) => {
        const variables = {
            data: {
                customer_group_uuid: record.customer_group_uuid,
                customergroup_status: checked,
            }
        }
        console.log(variables)
        apolloClient.mutate({
            mutation: customerMutation.UPDATE_CUSTOMER_GROUP,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                },
            },

        }).then(res => {
            const data = res?.data?.updateCustomerGroup
            if (!data.status) return toast.error(data.message);
            toast.success(`${record.customer_group_name} Group Status Updated successfully`);
        }).catch(err => {
            console.log("got error on updateStatus", err)
            return toast.error('Something Went wrong !!')
        })

    }

    const columns = [
        {
            title: 'UID',
            dataIndex: 'o_u',
            key: 'o_u',
            width: 70,
            ellipsis: true,
            sorter: (a, b) => a.o_u.toUpperCase() > b.o_u.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Amount',
            dataIndex: 'o_a',
            key: 'o_a',
            sorter: (a, b) => a.o_a.toUpperCase() > b.o_a.toUpperCase() ? 1 : -1,
        },

        {
            title: 'Sort Order',
            dataIndex: 'customergroup_sortorder',
            key: 'customergroup_sortorder',
            width: 100,
            align: 'center',
            sorter: (a, b) => (a.customergroup_sortorder === b.customergroup_sortorder) ? 0 : a.customergroup_sortorder ? -1 : 1,
        },
        {
            title: 'Status',
            dataIndex: 'customergroup_status',
            key: 'customergroup_status',
            align: 'center',
            width: 100,
            sorter: (a, b) => (a.customergroup_status === b.customergroup_status) ? 0 : a.customergroup_status ? -1 : 1,
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
            onFilter: (value, record) => record.customergroup_status === value,
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
                    <Link to={`/admin/customers/add-group?id=${record.customer_group_uuid}&name=${record.customer_group_name}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]


    // LOAD CUSTOMER GROUPS
    useEffect(() => {
        return
        apolloClient.query({
            query: customerQuery.GET_ALL_CUSTOMER_GROUPS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCustomerGroups

            if (!data?.status) return
            setCustomerGroups(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setCustomerGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setCustomerGroups(s => ({ ...s, isLoading: false }))
        })

    }, [])




    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredCustomerGroups(customerGroups.data.filter(group => (group?.customer_group_name + group?.customergroup_description + group.customergroup_sortorder).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Orders"
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
                                    <Input placeholder="Search Orders.." prefix={<SearchOutlined />} onChange={onChangeSearch} />
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

export default ListOrder;
