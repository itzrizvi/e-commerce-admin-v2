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
import apolloClient, { authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import FontAwesome from 'react-fontawesome';



const ListPermission = () => {
    const [permissions, setPermissions] = useState({ data: [], loading: true, error: '' })
    const [searchTest, setSearchTest] = useState('');
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

            if (!data?.isAuth) return setPermissions(s => ({ ...s, error: 'You Are not Authorized' }))
            setPermissions(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setPermissions(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setPermissions(s => ({ ...s, loading: false }))
        })

    }, [])

    const columns = [
        {
            title: 'Permission Name',
            dataIndex: 'roles_permission_name',
            key: 'roles_permission_name',
        },
        {
            title: 'Status',
            dataIndex: 'roles_permission_status',
            key: 'roles_permission_status',
            render: (text, record) => (
                <Switch defaultChecked={text} title='Status' />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Link to={`/admin/admin/add-admin?email=${record.email}&first_name=${record.first_name}&last_name=${record.last_name}`}>
                        <Button size="default" type="white" title='Edit'>
                            <FontAwesome name="edit" />
                        </Button>
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]

    const onChangeSearch = e => {
        const value = e.target.value
        setSearchTest(value)
        setFilteredPermissions(permissions.data.filter(permission => permission?.roles_permission_name.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Permissions"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/permission/add">
                            <Button size="small" title="Add user" type="primary">
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

                                        <Table
                                            className="table-responsive"
                                            pagination={false}
                                            columns={columns}
                                            rowKey={'roles_permission_uuid'}
                                            size="small"
                                            dataSource={searchTest ? filteredPermissions : permissions.data}
                                            rowClassName={(record, index) => (index % 2 == 0 ? "" : "altTableClass")}
                                        />
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
