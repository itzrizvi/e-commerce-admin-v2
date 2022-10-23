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


const ListVendor = () => {
    const dummyData = [...Array(10).keys()].map(i => ({
        v_n: `Vendor ${i + 1}`,
        v_e: `Vendor${i + 1}@gmail.com`,
        v_a: `Address, aaaa${i + 1},bbb${i + 1}`,
        v_c: `Test Vendor City${i + 1}`,
        v_c1: `Vendor Country${i + 1}`,
        v_c_n: `Vendor Company${i + 1}`,
        v_d: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde obcaecati sed alias repellendus adipisci ullam ea eveniet quaerat voluptate dolore veniam soluta aliquam labore ratione, quidem iusto, sit aspernatur!`,
        // v_s: i + 1,
        v_s: true,


    }))

    // const [customerGroups, setCustomerGroups] = useState({ data: [], isLoading: true })
    const [customerGroups, setCustomerGroups] = useState({ data: dummyData, isLoading: false })

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
            title: 'Name',
            dataIndex: 'v_n',
            key: 'v_n',
            sorter: (a, b) => a.v_n.toUpperCase() > b.v_n.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Email',
            dataIndex: 'v_e',
            key: 'v_e',
            ellipsis: true,
            sorter: (a, b) => a.v_e.toUpperCase() > b.v_e.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Address',
            dataIndex: 'v_a',
            key: 'v_a',
            // width: 200,
            ellipsis: true,
            sorter: (a, b) => a.v_a.toUpperCase() > b.v_a.toUpperCase() ? 1 : -1,
        },
        {
            title: 'City',
            dataIndex: 'v_c',
            key: 'v_c',
            ellipsis: true,
            sorter: (a, b) => a.v_c.toUpperCase() > b.v_c.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Country',
            dataIndex: 'v_c1',
            key: 'v_c1',
            ellipsis: true,
            sorter: (a, b) => a.v_c1.toUpperCase() > b.v_c1.toUpperCase() ? 1 : -1,
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'v_d',
        //     key: 'v_d',
        //     // width: 200,
        //     ellipsis: true,
        //     sorter: (a, b) => a.v_d.toUpperCase() > b.v_d.toUpperCase() ? 1 : -1,
        // },
        {
            title: 'company Name',
            dataIndex: 'v_c_n',
            key: 'v_c_n',
            // width: 200,
            ellipsis: true,
            sorter: (a, b) => a.v_c_n.toUpperCase() > b.v_c_n.toUpperCase() ? 1 : -1,
        },
        // {
        //     title: 'Sort Order',
        //     dataIndex: 'customergroup_sortorder',
        //     key: 'customergroup_sortorder',
        //     width: 100,
        //     align: 'center',
        //     sorter: (a, b) => (a.customergroup_sortorder === b.customergroup_sortorder) ? 0 : a.customergroup_sortorder ? -1 : 1,
        // },
        {
            title: 'Status',
            dataIndex: 'v_s',
            key: 'v_s',
            align: 'center',
            width: 100,
            sorter: (a, b) => (a.v_s === b.v_s) ? 0 : a.v_s ? -1 : 1,
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
            onFilter: (value, record) => record.v_s === value,
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
                    <Link to={`/admin/vendor/add?id=${record.customer_group_uuid}&name=${record.v_n}`}>
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
        return;
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
                title="Vendors"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/vendor/add">
                            <Button size="small" title="Add Vendors" type="primary">
                                <FeatherIcon icon="plus" />
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
                                    <Input placeholder="Search Vendor..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
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

export default ListVendor;
