import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import FontAwesome from 'react-fontawesome';
import { toast } from 'react-toastify';
import config from '../../config/config';
import { logOut } from '../../redux/authentication/actionCreator';
import { useDispatch } from 'react-redux';



const ListPermission = () => {
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState({ data: [], loading: true, error: '' })
    const [searchText, setSearchText] = useState('');
    const [filteredPermissions, setFilteredPermissions] = useState([]);

    useEffect(() => {
        apolloClient.query({
            query: authQuery.GET_ALL_ROLES_PERMISSION,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {

            const data = res?.data?.getAllRolesPermission

            if (!data?.isAuth) return dispatch(logOut())
            setPermissions(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setPermissions(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setPermissions(s => ({ ...s, loading: false }))
        })

    }, [])

    const handleStatusChange = (record, checked) => {
        const variables = { data: { roles_permission_uuid: record.roles_permission_uuid, roles_permission_status: checked } }

        apolloClient.mutate({
            mutation: authMutation.UPDATE_ROLES_PERMISSION,
            variables,
            context: {
                headers: {
                    TENANTID: process.env.REACT_APP_TENANTID,
                    Authorization: Cookies.get('psp_t')
                }
            }
        }).then(res => {
            const data = res?.data?.updateRolesPermission
            if (!data.isAuth) return
            if (!data?.status) return toast.error(data?.message)
            toast.success(`${record.roles_permission_name} Permission Status updated successfully.`)
        }).catch(err => {
            console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
            toast.error(`Something went wrong!!`)
        })

    }

    const columns = [
        {
            title: 'Permission Name',
            dataIndex: 'roles_permission_name',
            key: 'roles_permission_name',
            sorter: (a, b) => a.roles_permission_name.toUpperCase() > b.roles_permission_name.toUpperCase() ? 1 : -1,
        },
        {
            title: 'Status',
            dataIndex: 'roles_permission_status',
            key: 'roles_permission_status',
            align: 'right',
            sorter: (a, b) => (a.roles_permission_status === b.roles_permission_status) ? 0 : a.roles_permission_status ? -1 : 1,
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
            onFilter: (value, record) => record.roles_permission_status === value,
            render: (text, record) => (
                <Switch defaultChecked={text} title='Status' onChange={checked => handleStatusChange(record, checked)} />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/permission/add?name=${record.roles_permission_name}&status=${record.roles_permission_status}&id=${record.roles_permission_uuid}`}>
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
        setFilteredPermissions(permissions.data.filter(permission => permission?.roles_permission_name.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Permissions"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/permission/add">
                            <Button size="small" title="Add Permission" type="primary">
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
                            {permissions.loading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                permissions.error ?
                                    <p>{permissions.error}</p>
                                    :
                                    <>
                                        <Input placeholder="Search Permission..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                        <br /><br />

                                        <span className={"psp_list"} >
                                            <Table
                                                className="table-responsive"
                                                columns={columns}
                                                rowKey={'roles_permission_uuid'}
                                                size="small"
                                                dataSource={searchText ? filteredPermissions : permissions.data}
                                                rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                                // pagination={false}
                                                pagination={{
                                                    defaultPageSize: config.PERMISSIONS_PER_PAGE,
                                                    total: searchText ? filteredPermissions.length : permissions.length,
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

export default ListPermission;
