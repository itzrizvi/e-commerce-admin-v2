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
import { viewPermission } from '../../utility/utility';
import Moment from 'react-moment';
import apolloClient from '../../apollo';
import { useSelector } from 'react-redux';
import { productAvailabilityStatusQuery } from '../../apollo/productAvailabilityStatus';


const ListProductAvailabilityStatus = () => {
    viewPermission('product-availability-status');
    const [availability, setAvailability] = useState({ data: [], isLoading: true })
    const token = useSelector(state => state.auth.token);
    const [filteredAvailability, setFilteredAvailability] = useState([])
    const [searchText, setSearchText] = useState('')

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Alias',
            dataIndex: 'slug',
            key: 'slug',
            sorter: (a, b) => a.slug.toUpperCase() > b.slug.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            align: 'center',
            render: (text, record) => (
                <span className={"status-text"}>{<Moment format="DD MMMM YYYY">{parseInt(text)}</Moment>}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/product-availability-status/update?id=${record.id}`}>
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                    </Link>
                </>
            ),
            key: 'slug',
        },
    ]


    // LOAD CUSTOMER GROUPS
    useEffect(() => {
        apolloClient.query({
            query: productAvailabilityStatusQuery.GET_ALL_AVAILABILITY_STATUS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getAllProductAvailabilityStatus
            if (!data?.status) return
            setAvailability(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setAvailability(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAvailability(s => ({ ...s, isLoading: false }))
        })

    });




    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredAvailability(availability.data.filter(con => (con?.name + con?.slug).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Product Availability Status"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/product-availability-status/add">
                            <Button size="small" title="Add Product Availability Status" type="primary">
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

                            {availability.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Product Availability Status..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={searchText ? filteredAvailability : availability.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.PRODUCT_AVAILABILITY_STATUS_PER_PAGE,
                                                total: searchText ? filteredAvailability.length : availability.data.length,
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

export default ListProductAvailabilityStatus;
