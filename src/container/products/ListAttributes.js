import React, { useState } from 'react';
import { Row, Col, Input, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { SearchOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const ListAttributes = () => {
    const dummyData = [...Array(6).keys()].map(i => ({ a_n: `Attribute ${i + 1}`, a_g: `Group 2`, g_s: i + 1 }))

    const [attributes, setAttributes] = useState({ data: dummyData, isLoading: false })
    const [filteredAttributes, setFilteredAttributes] = useState([])
    const [searchText, setSearchText] = useState('')



    const columns = [
        {
            title: 'Attribute Name',
            dataIndex: 'a_n',
            key: 'a_n',
            sorter: (a, b) => a.a_n.toUpperCase() > b.a_n.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Attribute Group',
            dataIndex: 'a_g',
            key: 'a_g',
            sorter: (a, b) => a.a_g.toUpperCase() > b.a_g.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Sort Order',
            dataIndex: 'g_s',
            key: 'g_s',
            sorter: (a, b) => (a.g_s === b.g_s) ? 0 : a.g_s ? -1 : 1,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/attributes/add?id=${1}&name=${record.a_n}`}>
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
        setSearchText(value)
        setFilteredAttributes(attributes.data.filter(attr => attr?.a_n.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Attributes"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/attributes/add">
                            <Button size="small" title="Add Attribute" type="primary">
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
                            {attributes.isLoading ?
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
                                            dataSource={searchText ? filteredAttributes : attributes.data}
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

export default ListAttributes;
