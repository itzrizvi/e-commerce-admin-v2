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
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const ListAttributes = () => {
    viewPermission('attribute');
    const dummyData = [...Array(6).keys()].map(i => ({ a_n: `Attribute ${i + 1}`, a_g: `Group 2`, g_s: i + 1 }))

    const [attributes, setAttributes] = useState({ data: dummyData, isLoading: true })
    const [filteredAttributes, setFilteredAttributes] = useState([])
    const [searchText, setSearchText] = useState('')



    const columns = [
        {
            title: 'Attribute Name',
            dataIndex: 'attribute_name',
            key: 'attribute_name',
            sorter: (a, b) => a.attribute_name.toUpperCase() > b.attribute_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Attribute Group',
            dataIndex: 'attribute_group.attr_group_name',
            key: 'attribute_group.attr_group_name',
            sorter: (a, b) => a.attribute_group.attr_group_name.toUpperCase() > b.attribute_group.attr_group_name.toUpperCase() ? 1 : -1,
            render: (value, record) => record?.attribute_group?.attr_group_name
        },
        {
            title: 'Status',
            dataIndex: 'attribute_status',
            key: 'attribute_status',
            align: 'right',
            sorter: (a, b) => (a.attribute_status === b.attribute_status) ? 0 : a.attribute_status ? -1 : 1,
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
            onFilter: (value, record) => record.attribute_status === value,
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
                    <Link to={`/admin/attributes/add?id=${record.id}`}>
                        {/* <Button size="default" type="white" title='Edit'> */}
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                        {/* </Button> */}
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]

    useEffect(() => {
        // return
        apolloClient.query({
            query: attributeQuery.GET_ALL_ATTRIBUTES,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllAttributes

            if (!data?.status) return
            setAttributes(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setAttributes(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setAttributes(s => ({ ...s, isLoading: false }))
        })

    }, []);

    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredAttributes(attributes.data.filter(attr => (attr?.attribute_name + attr?.attribute_group?.attr_group_name).toLowerCase().includes(value.toLowerCase())))
    }

    const handleStatusChange = (record, checked) => {
        const variables = { data: { attribute_id: record.id, attribute_status: checked } }
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
            if (!data.status) return InternalErrorMessage();
            toast.success(`${record.attribute_name} attribute status updated.`);
        }).catch(err => {
            console.log("got error on addPermission", err)
            return toast.error('Something Went wrong !!')
        })
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
                                    <Input placeholder="Search Attribute..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />

                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'g_s'}
                                            size="small"
                                            dataSource={searchText ? filteredAttributes : attributes.data}
                                            rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
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
