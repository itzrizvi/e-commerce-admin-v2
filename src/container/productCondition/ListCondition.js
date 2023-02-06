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
import { productConditionQuery } from '../../apollo/productCondition';
import { useSelector } from 'react-redux';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';


const ListCondition = () => {
    viewPermission('product-condition');
    const [condition, setCondition] = useState({ data: [], isLoading: true })
    const token = useSelector(state => state.auth.token);
    const [filteredCondition, setFilteredCondition] = useState([])
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
                    <Link to={`/admin/product-condition/update?id=${record.id}`}>
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
            query: productConditionQuery.GET_ALL_CONDITION,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getAllProductCondition
            if (!data?.status) return InternalErrorMessage();
            setCondition(s => ({ ...s, data: data?.data, error: '' }))
        }).finally(() => {
            setCondition(s => ({ ...s, isLoading: false }))
        })

    }, []);




    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredCondition(condition.data.filter(con => (con?.name + con?.slug).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Product Condition"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/product-condition/add">
                            <Button size="small" title="Add Product Condition" type="primary">
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

                            {condition.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Product Condition..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={searchText ? filteredCondition : condition.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.PRODUCT_CONDITION_PER_PAGE,
                                                total: searchText ? filteredCondition.length : condition.data.length,
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

export default ListCondition;
