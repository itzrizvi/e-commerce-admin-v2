import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Table, Spin, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { SearchOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient, { attributeMutation, attributeQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const ListCoupon = () => {
    const dummyData = [...Array(10).keys()].map(i => ({
        n: `Coupon${i + 1}`,
        c: i + 1,
        t: 'aaa',
        aa: 102,
        mia: 100,
        maa: 1000,
        sd: "18 oct 2022",
        ed: '18 oct 2022',
        status: true,
        d: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, architecto quod quidem fuga assumenda temporibus quam quae sapiente cupiditate voluptatum.",
        so: i + 1
    }))
    const [attributeGroups, setAttributeGroups] = useState({ data: dummyData, isLoading: false })
    // const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true })
    const [filteredAttributeGroups, setFilteredAttributeGroups] = useState([])
    const [searchText, setSearchText] = useState('')

    // useEffect(() => {
    //     apolloClient.query({
    //         query: attributeQuery.GET_ALL_ATTR_GROUPS,
    //         context: {
    //             headers: {
    //                 TENANTID: process.env.REACT_APP_TENANTID,
    //                 Authorization: Cookies.get('psp_t')
    //             }
    //         }
    //     }).then(res => {

    //         const data = res?.data?.getAllAttrGroups

    //         if (!data?.status) return
    //         setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }))

    //     }).catch(err => {
    //         setAttributeGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
    //     }).finally(() => {
    //         setAttributeGroups(s => ({ ...s, isLoading: false }))
    //     })

    // }, [])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'n',
            key: 'n',
            sorter: (a, b) => a.n.toUpperCase() > b.n.toUpperCase() ? 1 : -1,
        },
        {
            title: 'CODE',
            dataIndex: 'c',
            key: 'c',
            sorter: (a, b) => a.c.toUpperCase() > b.c.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Type',
            dataIndex: 't',
            key: 't',
            sorter: (a, b) => a.t.toUpperCase() > b.t.toUpperCase() ? 1 : -1,
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'd',
        //     key: 'd',
        //     width: 10,
        //     ellipsis: true,
        //     render: (value, record) => <p>{value}</p>,
        //     sorter: (a, b) => a.d.toUpperCase() > b.d.toUpperCase() ? 1 : -1,
        // },
        {
            title: 'Amount',
            dataIndex: 'aa',
            key: 'aa',
            sorter: (a, b) => (a.aa === b.aa) ? 0 : a.aa ? -1 : 1,
        },
        {
            title: <p>Minimum<br />Amount</p>,
            dataIndex: 'mia',
            key: 'mia',
            sorter: (a, b) => (a.mia === b.mia) ? 0 : a.mia ? -1 : 1,
        },
        {
            title: <p>Maximum<br />Amount</p>,
            dataIndex: 'maa',
            key: 'maa',
            sorter: (a, b) => (a.maa === b.maa) ? 0 : a.maa ? -1 : 1,
        },
        {
            title: 'Start Date',
            dataIndex: 'sd',
            key: 'sd',
            sorter: (a, b) => (a.sd === b.sd) ? 0 : a.sd ? -1 : 1,
        },
        {
            title: 'End Date',
            dataIndex: 'ed',
            key: 'ed',
            sorter: (a, b) => (a.ed === b.ed) ? 0 : a.ed ? -1 : 1,
        },

        // {
        //     title: 'Name',
        //     dataIndex: 'n',
        //     key: 'n',
        //     sorter: (a, b) => a.n.toUpperCase() > b.n.toUpperCase() ? 1 : -1,
        // },
        {
            title: 'Sort Order',
            dataIndex: 'so',
            key: 'so',
            align: 'center',
            sorter: (a, b) => (a.so === b.so) ? 0 : a.so ? -1 : 1,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            sorter: (a, b) => (a.status === b.status) ? 0 : a.status ? -1 : 1,
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
            onFilter: (value, record) => record.attrgroup_status === value,
            render: (value, record) => (
                <Switch
                    defaultChecked={value} title='Status'
                    onChange={checked => handleStatusChange(record, checked)}
                />
            )
        },

        {
            title: 'Action',
            dataIndex: 'attr_group_uuid',
            key: 'attr_group_uuid',
            width: 70,
            align: 'right',
            render: (value, record) => (
                <>
                    <Link to={`/admin/products/add-coupon?id=${value}&name=${record.n}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
        },
    ]

    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredAttributeGroups(attributeGroups.data.filter(attr => attr?.g_n.toLowerCase().includes(value.toLowerCase())))
    }

    const handleStatusChange = (record, checked) => {
        const variables = { data: { attr_group_uuid: record.attr_group_uuid, attrgroup_status: checked } }
        console.log(variables)
        // return;
        apolloClient.mutate({
            mutation: attributeMutation.UPDATE_ATTR_GROUP,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                },
            },

        }).then(res => {
            const data = res?.data?.updateAttrGroup
            if (!data.status) return toast.error(data.message);
            toast.success(`${record.attr_group_name} status updated successfully`);

        }).catch(err => {
            console.log("got error on status update", err)
            return toast.error('Something Went wrong !!')
        })

    }


    return (
        <>
            <PageHeader
                title="Coupons"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/products/add-coupon">
                            <Button size="small" title="Add Attribute Group" type="primary">
                                <FeatherIcon icon="file-plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>
                            {attributeGroups.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Permission..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            scroll={{ x: "max-content" }}
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'g_s'}
                                            size="small"
                                            dataSource={searchText ? filteredAttributeGroups : attributeGroups.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        // pagination={false}
                                        // pagination={{
                                        //     defaultPageSize: config.PERMISSIONS_PER_PAGE,
                                        //     total: searchText ? filteredPermissions.length : permissions.length,
                                        //     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                        // }}
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

export default ListCoupon;
