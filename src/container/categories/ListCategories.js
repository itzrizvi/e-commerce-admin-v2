import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const categories = [
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
    const [categoriesData, setCategoriesData] = useState({ data: [], loading: true })

    useEffect(() => {

        if (!categories.length) return
        let arrData = []

        categories.forEach(item => {
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

        setCategoriesData({ data: arrData, loading: false })

    }, [])

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'cat_name',
            key: 'cat_name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`#`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]


    return (
        <>
            <PageHeader
                title="Categories"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary">
                            <FeatherIcon icon="plus" size={14} />
                        </Button>
                    </div>,
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
                                    // onChange={onChangeSearch}
                                    />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            pagination={false}
                                            columns={columns}
                                            rowKey={'cat_id'}
                                            size="small"
                                            dataSource={categoriesData.data}
                                            // dataSource={searchTest ? filteredPermissions : permissions.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
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
