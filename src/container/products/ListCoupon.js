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
import apolloClient, { couponMutation, couponQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import config from '../../config/config';
import { viewPermission } from '../../utility/utility';

const ListCoupon = () => {
    viewPermission('coupon');
    const [isLoading, setIsLoading] = useState(false)
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
    // const [attributeGroups, setAttributeGroups] = useState({ data: dummyData, isLoading: false })
    const [coupons, setCoupons] = useState({ data: [], isLoading: true })
    const [filteredCoupons, setFilteredCoupons] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        apolloClient.query({
            query: couponQuery.GET_ALL_COUPONS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllCoupons

            if (!data?.status) return
            setCoupons(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setCoupons(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setCoupons(s => ({ ...s, isLoading: false }))
        })

    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'coupon_name',
            key: 'coupon_name',
            sorter: (a, b) => a.coupon_name.toUpperCase() > b.coupon_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'CODE',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
            sorter: (a, b) => a.coupon_code.toUpperCase() > b.coupon_code.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Type',
            dataIndex: 'coupon_type',
            key: 'coupon_type',
            sorter: (a, b) => a.coupon_type.toUpperCase() > b.coupon_type.toUpperCase() ? 1 : -1,
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
            dataIndex: 'coupon_amount',
            key: 'coupon_amount',
            align: "center",
            sorter: (a, b) => (a.coupon_amount === b.coupon_amount) ? 0 : a.coupon_amount ? -1 : 1,
        },
        {
            title: "Min Amount",
            dataIndex: 'coupon_minamount',
            key: 'coupon_minamount',
            align: "center",
            sorter: (a, b) => (a.coupon_minamount === b.coupon_minamount) ? 0 : a.coupon_minamount ? -1 : 1,
        },
        {
            title: "Max Amount",
            dataIndex: 'coupon_maxamount',
            key: 'coupon_maxamount',
            align: "center",
            sorter: (a, b) => (a.coupon_maxamount === b.coupon_maxamount) ? 0 : a.coupon_maxamount ? -1 : 1,
        },
        {
            title: 'Start Date',
            dataIndex: 'coupon_startdate',
            key: 'coupon_startdate',
            sorter: (a, b) => (a.coupon_startdate === b.coupon_startdate) ? 0 : a.coupon_startdate ? -1 : 1,
            render: (value, record) => new Date(parseInt(value)).toLocaleDateString()
        },
        {
            title: 'End Date',
            dataIndex: 'coupon_enddate',
            key: 'coupon_enddate',
            sorter: (a, b) => (a.coupon_enddate === b.coupon_enddate) ? 0 : a.coupon_enddate ? -1 : 1,
            render: (value, record) => new Date(parseInt(value)).toLocaleDateString()
        },

        // {
        //     title: 'Name',
        //     dataIndex: 'n',
        //     key: 'n',
        //     sorter: (a, b) => a.n.toUpperCase() > b.n.toUpperCase() ? 1 : -1,
        // },
        {
            title: 'Sort Order',
            dataIndex: 'coupon_sortorder',
            key: 'coupon_sortorder',
            align: 'center',
            sorter: (a, b) => (a.coupon_sortorder === b.coupon_sortorder) ? 0 : a.coupon_sortorder ? -1 : 1,
        },
        {
            title: 'Status',
            dataIndex: 'coupon_status',
            key: 'coupon_status',
            align: 'center',
            sorter: (a, b) => (a.coupon_status === b.coupon_status) ? 0 : a.coupon_status ? -1 : 1,
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
            dataIndex: 'id',
            key: 'id',
            width: 70,
            align: 'right',
            render: (value, record) => (
                <>
                    <Link to={`/admin/products/add-coupon?id=${value}`}>
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
        setFilteredCoupons(coupons.data.filter(coupon => (coupon?.coupon_name + coupon.coupon_description + coupon.coupon_code).toLowerCase().includes(value.toLowerCase())))
    }

    const handleStatusChange = (record, checked) => {
        const variables = { data: { coupon_id: record.id, coupon_status: checked } }
        console.log(variables)
        // return;
        apolloClient.mutate({
            mutation: couponMutation.UPDATE_COUPON,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                },
            },

        }).then(res => {
            const data = res?.data?.updateCoupon
            if (!data.status) return toast.error(data.message);
            toast.success(`${record.coupon_name} status updated successfully`);

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
                            <Button size="small" title="Add Coupons" type="primary">
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
                            {coupons.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Coupons..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            scroll={{ x: "max-content" }}
                                            className="table-responsive"
                                            size="small"
                                            columns={columns}
                                            rowKey={'id'}
                                            dataSource={searchText ? filteredCoupons : coupons.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.COUPON_GROUPS_PER_PAGE,
                                                total: searchText ? filteredCoupons.length : coupons.data.length,
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

export default ListCoupon;
