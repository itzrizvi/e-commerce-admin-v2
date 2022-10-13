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

const AttributeGroup = () => {
    const dummyData = [...Array(10).keys()].map(i => ({ g_n: `Group ${i + 1}`, g_s: i + 1 }))

    const [attributeGroups, setAttributeGroups] = useState({ data: dummyData, isLoading: false })
    const [filteredAttributeGroups, setFilteredAttributeGroups] = useState([])
    const [searchText, setSearchText] = useState('')

    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'g_n',
            key: 'g_n',
            sorter: (a, b) => a.g_n.toUpperCase() > b.g_n.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Sort Order',
            dataIndex: 'g_s',
            key: 'g_s',
            sorter: (a, b) => a.g_s.toUpperCase() > b.g_s.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 70,
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/attributes/add-group?id=${1}&name=${record.g_n}`}>
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
        setFilteredAttributeGroups(attributeGroups.data.filter(attr => attr?.g_n.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Attribute Groups"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/attributes/add-group">
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

export default AttributeGroup;
