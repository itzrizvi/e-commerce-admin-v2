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

const AttributeGroup = () => {
    // const dummyData = [...Array(10).keys()].map(i => ({ g_n: `Group ${i + 1}`, g_s: i + 1 }))
    const [attributeGroups, setAttributeGroups] = useState({ data: [], isLoading: true })
    const [filteredAttributeGroups, setFilteredAttributeGroups] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        apolloClient.query({
            query: attributeQuery.GET_ALL_ATTR_GROUPS,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllAttrGroups

            if (!data?.status) return
            setAttributeGroups(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setAttributeGroups(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAttributeGroups(s => ({ ...s, isLoading: false }))
        })

    }, [])


    const columns = [
        {
            title: 'Group Name',
            dataIndex: 'attr_group_name',
            key: 'attr_group_name',
            sorter: (a, b) => a.attr_group_name.toUpperCase() > b.attr_group_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Sort Order',
            dataIndex: 'attrgroup_sortorder',
            key: 'attrgroup_sortorder',
            sorter: (a, b) => (a.attrgroup_sortorder === b.attrgroup_sortorder) ? 0 : a.attrgroup_sortorder ? -1 : 1,
        },
        {
            title: 'Status',
            dataIndex: 'attrgroup_status',
            key: 'attrgroup_status',
            align: 'right',
            sorter: (a, b) => (a.attrgroup_status === b.attrgroup_status) ? 0 : a.attrgroup_status ? -1 : 1,
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
                    <Link to={`/admin/attributes/add-group?id=${value}&name=${record.attr_group_name}&s=${record.attrgroup_sortorder}&status=${record.attrgroup_status}`}>
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
