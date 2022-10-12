import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Checkbox } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient, { productQuery } from '../../utility/apollo';
import config from '../../config/config';

const categories1 = [
    {
        cat_id: "824a68e1-f826-4d3c-bf60-0e90c67f8d7c",
        cat_name: "Motherboard",
        cat_sort_order: 11,
        subcategories: [
            {
                cat_id: "d3fd1ea0-ba74-4f96-a9e6-4310b660d089",
                cat_name: "Desktop Board",
                subsubcategories: [
                    {
                        cat_id: "df688b28-4314-4334-a553-51ff752381fa",
                        cat_name: "Inspiron Board"
                    },
                    {
                        cat_id: "ed7b4a33-8954-49a5-91a0-7e1767d98b94",
                        cat_name: "Eaglelake"
                    }
                ]
            },
            {
                cat_id: "a8d2c712-3e14-47d3-9f90-938c9d1a2565",
                cat_name: "Laptop Board",
                subsubcategories: []
            },
            {
                cat_id: "8d0cd401-d00f-4ed5-829d-545e11173c46",
                cat_name: "Server Board",
                subsubcategories: []
            }
        ]
    },
    {
        cat_id: "e3a7a796-8506-4e87-a430-300b057453f0",
        cat_name: "Cables",
        cat_sort_order: 18,
        subcategories: [
            {
                cat_id: "0fc4ac2f-e3d3-41e9-b4a1-f505c865ac96",
                cat_name: "Fiber Cable",
                subsubcategories: []
            },
            {
                cat_id: "84b1e480-90e6-4753-bddf-8719b2e1f482",
                cat_name: "Backplane Cable",
                subsubcategories: []
            },
            {
                cat_id: "28975bc5-90ae-4fb0-8d91-d3c7e31f5b47",
                cat_name: "Antenna Cable",
                subsubcategories: []
            }
        ]
    },

]

const ListCategories = () => {
    const [categories, setCategories] = useState([])
    const [categoriesData, setCategoriesData] = useState({ data: [], loading: true })
    const [filteredCategoryData, setFilteredCategoryData] = useState([])

    const [isFilter, setIsFilter] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [isFeatured, setIsFeatured] = useState(false)



    useEffect(() => {
        apolloClient.query({
            query: productQuery.GET_ALL_CATEGORIES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    // Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCategories
            if (!data.status) return;
            setCategories(data.categories)
        }).catch(err => {

        })

    }, [])

    useEffect(() => {

        if (!categories.length) return
        let arrData = []

        categories.forEach(item => {

            const parent = item.cat_name
            const cat_sort_order = item.cat_sort_order

            arrData.push({ cat_name: parent, cat_id: item.cat_id, cat_sort_order, cat_des: item.cat_description, cat_isFeatured: item.is_featured, cat_status: item.cat_status })
            if (item.subcategories) {
                item.subcategories.forEach(subCat => {
                    const sub = subCat.cat_name
                    arrData.push({ cat_name: `${parent} > ${sub}`, cat_id: subCat.cat_id, cat_des: subCat.cat_description, cat_isFeatured: subCat.is_featured, cat_status: subCat.cat_status })
                    if (subCat.subsubcategories) {
                        subCat.subsubcategories.forEach(subSubCat => {
                            const subSub = subSubCat.cat_name
                            arrData.push({ cat_name: `${parent} > ${sub} > ${subSub}`, cat_id: subSubCat.cat_id, cat_des: subSubCat.cat_description, cat_isFeatured: subSubCat.is_featured, cat_status: subSubCat.cat_status })
                        })
                    }
                })

            }
        })

        setCategoriesData({ data: arrData, loading: false })

    }, [categories])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'cat_id',
            key: 'cat_id',
            width: 50,
            ellipsis: true,
            sorter: (a, b) => a.cat_id.toUpperCase() > b.cat_id.toUpperCase() ? 1 : -1,

        },
        {
            title: 'Logo',
            dataIndex: 'cat_id',
            key: 'cat_id',
            width: 70,
            render: (text, record) => (<img src={require('../../static/img/avatar/NoPath (3).png')} alt="" />),
        },
        {
            title: 'Category Name',
            dataIndex: 'cat_name',
            ellipsis: true,
            key: 'cat_name',
            sorter: (a, b) => a.cat_name.toUpperCase() > b.cat_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Description',
            dataIndex: 'cat_des',
            key: 'cat_des',
            ellipsis: true,
            sorter: (a, b) => a.cat_des.toUpperCase() > b.cat_des.toUpperCase() ? 1 : -1,
        },
        // {
        //     title: 'Sort Order',
        //     dataIndex: 'cat_sort_order',
        //     key: 'cat_sort_order',
        //     align: 'center',
        //     width: 90,
        // },
        {
            title: 'Featured',
            dataIndex: 'cat_isFeatured',
            width: 110,
            align: 'center',
            key: 'cat_isFeatured',
            sorter: (a, b) => (a.cat_isFeatured === b.cat_isFeatured) ? 0 : a.cat_isFeatured ? -1 : 1,
            filters: [
                {
                    text: 'Featured',
                    value: true,
                },
                {
                    text: 'Not Featured',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.cat_isFeatured === value,
            render: (value, record) => (
                <Checkbox
                    defaultChecked={value}
                // onChange={onChange}
                />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 90,
            key: 'cat_status',
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
            onFilter: (value, record) => record.cat_status === value,
            render: (value, record) => (
                <Switch
                    defaultChecked={value}
                    title='Status'
                // onChange={checked => handleStatusChange(record, checked)}
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
                    <Link to={`/admin/categories/add?id=${record.cat_id}&name=${record.cat_name}`}>
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
        console.log("🚀 ~ file: ListCategories.js ~ line 216 ~ onChangeSearch ~ value", value);
        setSearchText(value)
        setFilteredCategoryData(categoriesData.data.filter(category => (category?.cat_name + category?.cat_des + category?.cat_id + category?.cat_sort_order).toLowerCase().includes(value.toLowerCase())))
    }

    // Search & filter
    // useEffect(() => { }, [])


    return (
        <>
            <PageHeader
                title="Categories"
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <Button
                            size="small"
                            onClick={() => setIsFilter(state => !state)}
                            outlined
                            type="white"
                        >
                            <FeatherIcon icon="filter" />
                            filter
                        </Button> */}
                        <Link to="/admin/categories/add">
                            <Button size="small" title="Add Category" type="primary">
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

                            {categoriesData.loading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :

                                <>


                                    <Input
                                        placeholder="Search Permission..."
                                        prefix={<SearchOutlined />}
                                        onChange={onChangeSearch}
                                    /> <br /> <br />

                                    {/* {isFilter &&
                                        <div style={{
                                            marginBottom: '1.5em',
                                            display: 'flex',
                                            gap: "2em"
                                        }}
                                        >
                                            <Checkbox >Is Featured</Checkbox>
                                            <span>Status:  <Switch>Status</Switch>
                                            </span>

                                        </div>} */}

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'cat_id'}
                                            size="small"
                                            // dataSource={categoriesData.data}
                                            dataSource={searchText ? filteredCategoryData : categoriesData.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.CATEGORY_PER_PAGE,
                                                total: searchText ? filteredCategoryData.length : categoriesData.data.length,
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

export default ListCategories;
