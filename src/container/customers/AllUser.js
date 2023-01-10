import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Spin, Select, DatePicker } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { RetweetOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { customerQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import config from '../../config/config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';
import { viewPermission } from '../../utility/utility';
import Moment from 'react-moment';
import moment from 'moment';
const { RangePicker } = DatePicker;


let checkPoint = false;

const ListUser = () => {
    viewPermission('customer');
    const token = useSelector(state => state.auth.token);
    const [isFilter, setIsFilter] = useState(false);
    const [searchButton, setSearchButton] = useState(false);
    const [searchDisable, setSearchDisable] = useState(true);
    const [dateRange, setChangeDateRange] = useState(null);
    const [staffs, setStaffs] = useState({ data: [], loading: false, error: '' });
    const [filterParams, setFilterParams] = useState({
        customerStatus: [],
        customerEntryStartDate: '',
        customerEntryEndDate: '',
        emailVerified: '',
        customerStatus: '',
        searchQuery: ''
    });


    const searchCustomerAdmin = () => {
        setStaffs(s => ({ ...s, loading: true }));
        // return
        apolloClient.query({
            query: customerQuery.GET_ALL_CUSTOMER,
            variables: {
                query: {
                    searchQuery: filterParams.searchQuery ?? '',
                    customerStatus: filterParams.customerStatus ?? '',
                    emailVerified: filterParams.emailVerified ?? '',
                    customerEntryStartDate: filterParams.customerEntryStartDate ?? '',
                    customerEntryEndDate: filterParams.customerEntryEndDate ?? '',
                }
            },
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: token
                }
            }
        }).then(res => {
            const data = res?.data?.getAllCustomer
            if (!data?.status) return
            setStaffs(data)

        }).catch(err => {
            setStaffs(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setStaffs(s => ({ ...s, loading: false }));
            setSearchButton(!searchButton)
        })
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
            sorter: (a, b) => a.id > b.id ? 1 : -1
        },
        {
            title: 'Image',
            dataIndex: 'id',
            key: 'id',
            width: 90,
            render: (text, record) => (<LazyLoadImage effect="blur" width="40" src={renderImage(record.id, record.image, 'user', '128x128', true)} onError={errorImageSrc} alt={record.id} />)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            ellipsis: true,
            sorter: (a, b) => a.email > b.email ? 1 : -1,

        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            width: 150,
            key: 'first_name',
            sorter: (a, b) => a.first_name > b.first_name ? 1 : -1,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            width: 150,
            key: 'last_name',
            sorter: (a, b) => a.last_name > b.last_name ? 1 : -1,
        },
        {
            title: 'Verified',
            dataIndex: 'email_verified',
            key: 'email_verified',
            width: 120,
            align: 'center',
            render: (email_verified) => email_verified.toString(),
            sorter: (a, b) => (a.email_verified === b.email_verified) ? 0 : a.email_verified ? -1 : 1,
            filters: [
                {
                    text: 'Verified',
                    value: true,
                },
                {
                    text: 'Not Verified',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.email_verified === value,
        },
        {
            title: 'Status',
            dataIndex: 'user_status',
            key: 'user_status',
            width: 120,
            align: 'center',
            render: (user_status) => user_status.toString(),
            sorter: (a, b) => (a.user_status === b.user_status) ? 0 : a.user_status ? -1 : 1,
            filters: [
                {
                    text: 'Enabled',
                    value: true,
                },
                {
                    text: 'Disabled',
                    value: false,
                }
            ],
            onFilter: (value, record) => record.user_status === value,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            align: 'center',
            sorter: (a, b) => (a.createdAt === b.createdAt ? 0 : a.createdAt ? -1 : 1),
            render: (text, record) => (
                <span className={'status-text'}>{<Moment format="DD-MMM-YYYY">{parseInt(text)}</Moment>}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: 90,
            align: 'center',
            render: (id, record) => (
                <>
                    <Link to={`/admin/customers/edit/${id}`} style={{ marginRight: "10px" }}>
                        <FontAwesome name="edit" style={{ color: '#5F63F2' }} />
                    </Link>
                    <Link to={`/admin/customers/view/${id}`}>
                        <FontAwesome name="eye" style={{ color: 'rgb(46, 204, 113)' }} />
                    </Link>
                </>
            ),
        },
    ]

    const onDateRangeChange = dateRange => {
        if (dateRange) {
            setFilterParams(s => ({ ...s, customerEntryStartDate: dateRange[0]._d ?? '', customerEntryEndDate: dateRange[1]._d ?? '' }))
            setChangeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
        } else {
            setChangeDateRange(null);
        }
    };
    const returnMomentDateRange = (start, finish) => {
        return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
    };

    useEffect(() => {
        if (checkPoint) {
            if (filterParams.searchQuery !== '' ||
                filterParams.customerEntryStartDate !== '' ||
                filterParams.customerEntryEndDate !== '' ||
                filterParams.emailVerified !== '' ||
                filterParams.customerStatus !== '') {
                setSearchDisable(false)
            } else {
                setSearchDisable(true)
            }
        }
        checkPoint = true;
    }, [filterParams]);

    return (
        <>
            <PageHeader
                title="Customers"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button
                            size="small"
                            type="white"
                            onClick={() => setIsFilter(state => !state)}
                        >
                            <FeatherIcon icon="filter" />
                            Filter
                        </Button>
                        <Button size="small" type="white" onClick={() => {
                            setChangeDateRange(null)
                            setSearchDisable(true)
                            setFilterParams({
                                customerEntryStartDate: '',
                                customerEntryEndDate: '',
                                emailVerified: '',
                                customerStatus: '',
                                searchQuery: ''
                            })
                        }}>
                            <RetweetOutlined />
                            Reset Filter
                        </Button>
                        <Link to="/admin/customers/add">
                            <Button size="small" title="Add Customer" type="primary">
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

                            {staffs.loading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                staffs.error ?
                                    <p>{staffs.error}</p>
                                    :
                                    <>
                                        <Row gutter={25}>
                                            <Col span={18}>
                                                <Input
                                                    style={{ height: "42px" }}
                                                    placeholder="Search Customer..."
                                                    prefix={<SearchOutlined />}
                                                    value={filterParams?.searchQuery}
                                                    onChange={e => {
                                                        e.persist()
                                                        const value = e.target.value;
                                                        setFilterParams(s => ({ ...s, searchQuery: value }));
                                                    }}
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <Button
                                                    style={{ height: "42px" }}
                                                    size="large"
                                                    type="primary"
                                                    disabled={searchDisable}
                                                    onClick={searchCustomerAdmin}
                                                >
                                                    Search
                                                </Button>
                                            </Col>
                                        </Row>
                                        <br /><br />
                                        {isFilter && (
                                            <div style={{ marginBottom: '2.5em' }}>
                                                <Row gutter={16}>
                                                    <Col span={8}>
                                                        Customer Status: <br />
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            placeholder="Select customer status"
                                                            size="middle"
                                                            mode='single'
                                                            value={filterParams?.customerStatus === 'true' ? true : filterParams?.customerStatus === 'false' ? false : ''}
                                                            onDeselect={(val) => setFilterParams(prev => ({ ...prev, customerStatus: prev.customerStatus.filter(item => item !== val) }))}
                                                            onSelect={val => {
                                                                setFilterParams(s => ({ ...s, customerStatus: val.toString() }));
                                                            }}
                                                            options={[
                                                                {
                                                                    label: 'Select customer status',
                                                                    value: '',
                                                                    hidden: true
                                                                },
                                                                {
                                                                    label: 'Enable',
                                                                    value: true
                                                                },
                                                                {
                                                                    label: 'Disable',
                                                                    value: false
                                                                }
                                                            ]}

                                                        />
                                                    </Col>
                                                    <Col span={8}>
                                                        Email Verified: <br />
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            placeholder="Select email status"
                                                            size="middle"
                                                            mode='single'
                                                            value={filterParams?.emailVerified === 'true' ? true : filterParams?.emailVerified === 'false' ? false : ''}
                                                            onDeselect={(val) => setFilterParams(prev => ({ ...prev, emailVerified: prev.emailVerified.filter(item => item !== val) }))}
                                                            onSelect={val => {
                                                                setFilterParams(s => ({ ...s, emailVerified: val.toString() }));
                                                            }}
                                                            options={[
                                                                {
                                                                    label: 'Select email status',
                                                                    value: '',
                                                                    disabled: true

                                                                },
                                                                {
                                                                    label: 'Verified',
                                                                    value: true
                                                                },
                                                                {
                                                                    label: 'Not Verified',
                                                                    value: false
                                                                }
                                                            ]}

                                                        />
                                                    </Col>


                                                    <Col span={8}>
                                                        Date Added: <br />
                                                        <RangePicker
                                                            style={{ height: '40px', width: '100%' }}
                                                            size="small"
                                                            allowClear={true}
                                                            picker="date"
                                                            value={dateRange !== "" ? dateRange : ""}
                                                            onChange={onDateRangeChange}
                                                        />
                                                    </Col>
                                                </Row>

                                            </div>
                                        )}

                                        <span className={"psp_list"} >
                                            <Table
                                                className="table-responsive"
                                                columns={columns}

                                                rowKey={'uid'}
                                                size="small"
                                                dataSource={staffs.data ? staffs.data : []}
                                                rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                                // pagination={false}
                                                pagination={{
                                                    defaultPageSize: config.CUSTOMER_PER_PAGE,
                                                    total: staffs.data ? staffs.data.length : 0,
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

export default ListUser;
