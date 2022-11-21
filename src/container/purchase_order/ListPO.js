import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Input, Table, Switch, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import config from '../../config/config';
import apolloClient, { customerMutation } from '../../utility/apollo';
import { toast } from 'react-toastify';
import { viewPermission } from '../../utility/utility';
import { useSelector } from 'react-redux';
import { poQuery } from '../../apollo/po';


const ListPO = () => {
    viewPermission('purchase-order');
    const [po, setPO] = useState({ data: [], isLoading: true })
    const [filteredPO, setFilteredPO] = useState([])
    const [searchText, setSearchText] = useState('')
    const token = useSelector(state => state.auth.token);

    const handleStatusChange = (record, checked) => {
        const variables = {
            data: {
                id: record.id,
                status: checked,
            }              
        }
        apolloClient.mutate({
            mutation: poQuery.UPDATE_PO_STATUS,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                },
            },

        }).then(res => {
            const data = res?.data?.updatePOStatus
            if (!data.status) return toast.error(data.message);
            toast.success(`${record.po_id} Status Updated successfully`);
        }).catch(err => {
            console.log("got error on updateStatus", err)
            return toast.error('Something Went wrong !!')
        })

    }

    const columns = [
        {
            title: 'PO ID',
            dataIndex: 'po_id',
            key: 'po_id',
            sorter: (a, b) => a.po_id.toUpperCase() > b.po_id.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Total Amount',
            dataIndex: 'grandTotal_price',
            key: 'grandTotal_price',
            sorter: (a, b) => parseFloat(a.grandTotal_price) > parseFloat(b.grandTotal_price),
        },
        {
            title: 'Order Via',
            dataIndex: 'order_placed_via',
            key: 'order_placed_via',
            sorter: (a, b) => a.phone_number.toUpperCase() > b.phone_number.toUpperCase() ? 1 : -1,
            render: (value) => value.toUpperCase()
        },
        {
            title: 'Comments',
            dataIndex: 'comment',
            key: 'comment',
            width: 250,
            ellipsis: true,
            sorter: (a, b) => a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 200,
            sorter: (a, b) => a.comment.toUpperCase() > b.comment.toUpperCase() ? 1 : -1,
            filters: [
                {
                    text: 'New',
                    value: 'new',
                },
                {
                    text: 'Submitted',
                    value: 'submitted',
                },
                {
                    text: 'Partially Received',
                    value: 'partially_received',
                },
                {
                    text: 'Received',
                    value: 'received',
                }
            ],
            onFilter: (value, record) => record.status === value,
            render: (value, record) => (
                <Select
                    size="middle"
                    defaultValue={value}
                    onChange={checked => handleStatusChange(record, checked)}
                    style={{ width: 180 }}
                    options={
                        [{
                            value: "new",
                            label: "New",
                        },
                        {
                            value: "submitted",
                            label: "Submitted",
                        },
                        {
                            value: "partially_received",
                            label: "Partially Received",
                        },
                        {
                            value: "received",
                            label: "Received",
                        }]
                    }
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
                    <Link to={`/admin/po/edit?id=${record.id}`}>
                        <FontAwesome name="edit" style={{ margin: ".5em 1em" }} />
                    </Link>
                </>
            ),
            key: 'id',
        },
    ]


    // LOAD CUSTOMER GROUPS
    useEffect(() => {
        apolloClient.query({
            query: poQuery.GET_ALL_PO,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getPurchaseOrderList
            if (!data?.status) return
            setPO(s => ({ ...s, data: data?.data, error: '' }))
        }).catch(err => {
            setPO(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setPO(s => ({ ...s, isLoading: false }))
        })

    }, [])




    const onChangeSearch = e => {
        const value = e.target.value
        setSearchText(value)
        setFilteredPO(po.data.filter(po => (po?.id + po?.comment + po.grandTotal_price + po.order_placed_via + po.po_id + po.status).toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Purchase Order"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/po/add">
                            <Button size="small" title="Add Purchase Order" type="primary">
                                <FeatherIcon icon="plus" />
                            </Button>
                        </Link>
                    </div>
                ]}
            />
            <Main>
                <Row gutter={25}>
                    <Col sm={24} xs={24}>
                        <Cards headless>

                            {po.isLoading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                <>
                                    <Input placeholder="Search Purchase Order..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                    <br /><br />
                                    <span className={"psp_list"} >
                                        <Table
                                            className="table-responsive"
                                            columns={columns}
                                            rowKey={'id'}
                                            size="small"
                                            dataSource={searchText ? filteredPO : po.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                            // pagination={false}
                                            pagination={{
                                                defaultPageSize: config.PO_PER_PAGE,
                                                total: searchText ? filteredPO.length : po.data.length,
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

export default ListPO;
