import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Spin, Input, Table, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import apolloClient, { authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import FontAwesome from 'react-fontawesome';



const ListBrand = () => {
    const [brand, setBrand] = useState({ data: [], loading: true, error: '' })
    const [search, setSearch] = useState('');
    const [filteredBrand, setFilteredBrand] = useState([]);
    const [isFilter, setIsFilter] = useState(false)

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

            if (!data?.isAuth) return setBrand(s => ({ ...s, error: 'You Are not Authorized' }))
            setBrand(s => ({ ...s, data: data?.data, error: '' }))

        }).catch(err => {
            setBrand(s => ({ ...s, error: 'Something went Wrong.!! ' }))
        }).finally(() => {
            setBrand(s => ({ ...s, loading: false }))
        })

        console.log(brand);

    }, [brand.data])

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
            align: 'right',
            render: (text, record) => (
                <Switch defaultChecked={text} title='Status' />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'right',
            render: (text, record) => (
                <>
                    <Link to={`/admin/brand/edit?id=${record.roles_permission_uuid}`}>
                        <FontAwesome name="edit" />
                    </Link>
                </>
            ),
            key: 'last_name',
        },
    ]

    const onChangeSearch = e => {
        const value = e.target.value
        setSearch(value)
        setFilteredBrand(brand.data.filter(brand => permission?.roles_permission_name.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <>
            <PageHeader
                title="Brand"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Link to="/admin/brand/add">
                            <Button size="small" title="Add Brand" type="primary">
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
                            {brand.loading ?
                                <div className="spin">
                                    <Spin />
                                </div>
                                :
                                brand.error ?
                                    <p>{brand.error}</p>
                                    :
                                    <>
                                        <Input placeholder="Search Brand..." prefix={<SearchOutlined />} onChange={onChangeSearch} />
                                        <br /><br />

                                        <span className={"psp_list"} >
                                            <Table
                                                className="table-responsive"
                                                columns={columns}
                                                pagination={{
                                                    defaultPageSize: 10,
                                                    total: isFilter ? brand.data.length : brand.data.length,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                }}
                                                rowKey={'roles_permission_uuid'}
                                                size="small"
                                                dataSource={search ? filteredBrand : brand.data}
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

export default ListBrand;
