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


const ListOrder = () => {
    viewPermission('order');
    const dummyData = [...Array(10).keys()].map(i => ({
        o_i: 10001 + i,
        o_ci: 100 + 2 * i,
        o_a: 2000,
        o_dd: "20-12-2022",
        o_ds: 'Completed',
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
            title: 'Order Id',
            dataIndex: 'o_i',
            key: 'o_i',
            width: 120,
            ellipsis: true,
            sorter: (a, b) => a.o_i.toUpperCase() > b.o_i.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Customer',
            dataIndex: 'o_ci',
            key: 'o_ci',
            sorter: (a, b) => a.o_ci.toUpperCase() > b.o_ci.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Amount',
            dataIndex: 'o_a',
            key: 'o_a',
            render: (val) => `$${val}`,
            sorter: (a, b) => a.o_a.toUpperCase() > b.o_a.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Delivery Date',
            dataIndex: 'o_dd',
            key: 'o_dd',
            sorter: (a, b) => a.o_dd.toUpperCase() > b.o_dd.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Delivery Status',
            dataIndex: 'o_ds',
            key: 'o_ds',
            sorter: (a, b) => a.o_ds.toUpperCase() > b.o_ds.toUpperCase() ? 1 : -1,
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
            title: 'View',
            dataIndex: 'o_i',
            width: 70,
            align: 'right',
            key: 'o_i',
            render: (text, record) => (
                <>
                    <Link to={`/admin/order/view?id=${text}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="eye" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            key: 'last_name',
            render: (text, record) => (
                <>
                    <Link to={`/admin/order/add?id=${text}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
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
                        {/* <Link to="/admin/customers/add-group"> */}
                        <Button size="small" title="Add Customer Groups" type="primary">
                            <FeatherIcon icon="user-plus" />
                        </Button>
                        {/* </Link> */}
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
