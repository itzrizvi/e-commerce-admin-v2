import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Checkbox, DatePicker, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { viewPermission } from '../../utility/utility';
import apolloClient, { productQuery, utilityQuery } from '../../utility/apollo';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import config from '../../config/config';
import { errorImageSrc, renderImage } from '../../utility/images';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { gql } from '@apollo/client';
const { RangePicker } = DatePicker;

const Products = () => {
    viewPermission('product');
    const [products, setProducts] = useState({ data: [], isLoading: true })
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isFilter, setIsFilter] = useState(true)
    const [categories, setCategories] = useState({ data: [], isLoading: true })
    const [attributes, setAttributes] = useState({ data: [], isLoading: true })
    const [availability, setAvailability] = useState({ data: [], isLoading: true })
    const [conditions, setConditions] = useState({ data: [], isLoading: true })
    const [filterDate, setFilterDate] = useState({
        availability: [],
        categories: [],
        condition: [],
        attributes: [],
        startDate: '',
        endDate: '',
        minPrice: '',
        maxPrice: ''
    })


    useEffect(() => {
        // return
        // Load Product List 
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

        // Load filter data
        // 1.load category
        apolloClient.query({
            query: productQuery.GET_ALL_CATEGORIES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCategories
            if (!data.status) return;
            // setCategories(data.categories)


            if (!data.categories.length) return
            let arrData = []

            data.categories.forEach(item => {

                const parent = item.cat_name

                arrData.push({ cat_name: parent, cat_id: item.cat_id })
                if (item.subcategories) {
                    item.subcategories.forEach(subCat => {
                        const sub = subCat.cat_name
                        arrData.push({ cat_name: `${parent} > ${sub}`, cat_id: subCat.cat_id })
                        if (subCat.subsubcategories) {
                            subCat.subsubcategories.forEach(subSubCat => {
                                const subSub = subSubCat.cat_name
                                arrData.push({ cat_name: `${parent} > ${sub} > ${subSub}`, cat_id: subSubCat.cat_id })
                            })
                        }
                    })

                }
            })
            // console.log(arrData);
            setCategories({ data: arrData, isLoading: false })

        }).catch(err => {

        })



        // 2.load Arrributes
        apolloClient.query({
            query: gql`
            query getAllAttributes {
                getAllAttributes {
                  message
                  status
                  tenant_id
                  data {
                    attribute_uuid
                    attribute_name
                  }
                }
              }
            `,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllAttributes
            if (!data.status) return;
            setAttributes({ data: data.data, isLoading: false })
        })

        // 3.load Availability
        apolloClient.query({
            query: utilityQuery.GET_ALL_AVAILABILITY,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllProductAvailabilityStatus
            if (!data.status) return;
            setAvailability({ data: data.data, isLoading: false })
        })

        // 4.load Conditions
        apolloClient.query({
            query: utilityQuery.GET_ALL_CONDITIONS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllProductCondition
            if (!data.status) return;
            setConditions({ data: data.data, isLoading: false })
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
            title: 'Logo',
            dataIndex: 'prod_uuid',
            key: 'prod_uuid',
            width: 70,
            render: (text, record) => (<LazyLoadImage effect="blur" width="40" src={renderImage(record.prod_uuid, record.prod_thumbnail, 'product/image/thumbnail', '128x128')} onError={errorImageSrc} alt={record.prod_uuid} />)
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
            title: 'Part NO',
            dataIndex: 'prod_partnum',
            key: 'prod_partnum',
            ellipsis: true,
            sorter: (a, b) => a.prod_partnum.toUpperCase() > b.prod_partnum.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Regular Price',
            dataIndex: 'prod_regular_price',
            key: 'prod_regular_price',
            ellipsis: true,
            align: "center",
            sorter: (a, b) => a.prod_regular_price > b.prod_regular_price ? 1 : -1,
        },
        {
            title: 'Sales Price',
            dataIndex: 'prod_sale_price',
            key: 'prod_sale_price',
            ellipsis: true,
            align: "center",
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
                    <Link to={`/admin/products/add?id=${record.prod_uuid}&name=${record.prod_name}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]

    // All filter
    useEffect(() => {
        if (searchText) {
            setFilteredProducts(products.data.filter(prod => (prod?.prod_name + prod?.prod_sku).toLowerCase().includes(searchText.toLowerCase())))
        }
    }, [searchText])

    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredProducts(products.data.filter(prod => (prod?.prod_name + prod?.prod_sku).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Products"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="white" onClick={() => setIsFilter(state => !state)}>
                            <FeatherIcon icon="filter" />
                            Filter
                        </Button>
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
                                    <Input
                                        placeholder="Search Products..."
                                        prefix={<SearchOutlined />}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setSearchText(value)
                                        }}

                                    />
                                    <br /><br />

                                    {isFilter && <div style={{ marginBottom: "2.5em" }}>
                                        <Row gutter={16} >
                                            <Col span={8} >
                                                Availability : <br />
                                                <Select
                                                    style={{ width: "100%" }}
                                                    placeholder="Select status"
                                                    size="middle"
                                                    mode="multiple"

                                                    onChange={val => {
                                                        setFilterDate(s => ({ ...s, availability: val }))
                                                    }}
                                                    options={availability.data.map(item => (
                                                        {
                                                            label: item.name,
                                                            value: item.name
                                                        }
                                                    ))}
                                                />

                                            </Col>
                                            <Col span={8} >
                                                Category: <br />
                                                <Select
                                                    style={{ width: "100%" }}
                                                    placeholder={categories.isLoading ? "Loading.." : "select category"}
                                                    size="middle"
                                                    mode="multiple"
                                                    optionFilterProp='label'
                                                    onChange={val => {
                                                        setFilterDate(s => ({ ...s, categories: val }))
                                                    }}
                                                    options={categories.data.map(item => (
                                                        {
                                                            label: item.cat_name,
                                                            value: item.cat_id
                                                        }
                                                    ))}
                                                />
                                            </Col>

                                            <Col span={8} >
                                                Date: <br />
                                                <RangePicker
                                                    style={{ height: '40px', width: '100%' }}
                                                    size="small"
                                                    onChange={val => {
                                                        console.log(val);
                                                        setFilterDate(s => (
                                                            {
                                                                ...s,
                                                                startDate: val[0]._d,
                                                                endDate: val[1]._d,
                                                            }
                                                        ))
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row gutter={16} style={{ marginTop: '.5em' }} >
                                            <Col span={8} >
                                                Condition: <br />
                                                <Select
                                                    style={{ width: "100%" }}
                                                    placeholder="Select Condition"
                                                    size="middle"
                                                    mode="multiple"
                                                    onChange={value => setFilterDate(s => ({ ...s, condition: value }))}
                                                    options={conditions.data.map(item => (
                                                        {
                                                            label: item.name,
                                                            value: item.name
                                                        }
                                                    ))}
                                                />
                                            </Col>
                                            <Col span={8} >
                                                Attributes: <br />

                                                <Select
                                                    style={{ width: "100%" }}
                                                    placeholder={attributes.isLoading ? "Loading.." : "select Attribute"}
                                                    size="middle"
                                                    mode="multiple"
                                                    onChange={value => setFilterDate(s => ({ ...s, attributes: value }))}
                                                    options={attributes.data.map(item => (
                                                        {
                                                            label: item.attribute_name,
                                                            value: item.attribute_uuid
                                                        }
                                                    ))}
                                                />
                                            </Col>

                                            <Col span={8} >
                                                Price: <br />
                                                <Input.Group
                                                    compact
                                                    size="default"
                                                >
                                                    <Input type='number' placeholder='Min' style={{ width: "50%" }}
                                                        onChange={e => {
                                                            console.log(filterDate);
                                                        }}
                                                    />
                                                    <Input type='number' placeholder='Max' style={{ width: "50%" }} />

                                                </Input.Group>
                                            </Col>


                                        </Row>
                                    </div>}


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