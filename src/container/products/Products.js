import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { viewPermission } from '../../utility/utility';
import apolloClient, { productQuery } from '../../utility/apollo';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import config from '../../config/config';

const Products = () => {
    viewPermission('product');
    const [products, setProducts] = useState({ data: [], isLoading: true })
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        // return
        apolloClient.query({
            query: productQuery.GET_PRODUCT_LIST,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getProductList

            if (!data?.status) return
            setProducts(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setProducts(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setProducts(s => ({ ...s, isLoading: false }))
        })

    }, [])

    const handleStatusChange = (record, checked) => {
        return
        const variables = { data: { attribute_uuid: record.attribute_uuid, attribute_status: checked } }
        console.log(variables)
        // return;
        apolloClient.mutate({
            mutation: attributeMutation.UPDATE_ATTRIBUTE,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                },
            },

        }).then(res => {
            const data = res?.data?.updateAttribute
            if (!data.status) return toast.error(data.message);
            toast.success(`${record.attribute_name} attribute status updated.`);
        }).catch(err => {
            console.log("got error on addPermission", err)
            return toast.error('Something Went wrong !!')
        })
    }


    const columns = [
        {
            title: 'UID',
            dataIndex: 'prod_uuid',
            key: 'prod_uuid',
            width: 70,
            // width: "70%",
            ellipsis: true,
            sorter: (a, b) => a.prod_uuid.toUpperCase() > b.prod_uuid.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Product Name',
            dataIndex: 'prod_name',
            key: 'prod_name',
            ellipsis: true,
            sorter: (a, b) => a.prod_name.toUpperCase() > b.prod_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Product SKU',
            dataIndex: 'prod_sku',
            key: 'prod_sku',
            ellipsis: true,
            sorter: (a, b) => a.prod_sku.toUpperCase() > b.prod_sku.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Model',
            dataIndex: 'prod_model',
            key: 'prod_model',
            ellipsis: true,
            sorter: (a, b) => a.prod_model.toUpperCase() > b.prod_model.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Regular Price',
            dataIndex: 'prod_regular_price',
            key: 'prod_regular_price',
            ellipsis: true,
            sorter: (a, b) => a.prod_regular_price > b.prod_regular_price ? 1 : -1,
        },
        {
            title: 'Sales Price',
            dataIndex: 'prod_sale_price',
            key: 'prod_sale_price',
            ellipsis: true,
            sorter: (a, b) => a.prod_sale_price > b.prod_sale_price ? 1 : -1,
        },


        {
            title: 'Status',
            dataIndex: 'prod_status',
            key: 'prod_status',
            align: 'right',
            sorter: (a, b) => (a.prod_status === b.prod_status) ? 0 : a.prod_status ? -1 : 1,
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
            onFilter: (value, record) => record.prod_status === value,
            render: (value, record) => (
                <Switch
                    defaultChecked={value} title='Status'
                    onChange={checked => handleStatusChange(record, checked)}
                />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    {/* <Link to={`/admin/attributes/add?id=${record.attribute_uuid}&name=${record.attribute_name}&g_id=${record.attribute_group.attr_group_uuid}`}> */}
                    {/* <Button size="default" type="white" title='Edit'> */}
                    <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                    {/* </Button> */}
                    {/* </Link> */}
                </>
            ),
            key: 'last_name',
        },
    ]


    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredProducts(products.data.filter(attr => (attr?.attribute_name + attr?.attribute_group?.attr_group_name).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Products"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/products/add">
                            <Button size="small" title="Add Product" type="primary">
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
                            {products.isLoading ?
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
                                            dataSource={searchText ? filteredProducts : products.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.PRODUCTS_PER_PAGE,
                                                total: searchText ? filteredProducts.length : products.data.length,
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

export default Products;