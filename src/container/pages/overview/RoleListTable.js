import React, { useEffect, useState } from 'react';
import { Input, message, Spin, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { rolesDataRead } from '../../../redux/roles/actionCreator';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import apolloClient, { authMutation } from '../../../utility/apollo';
import Cookies from 'js-cookie';
import config from '../../../config/config';
import InternalErrorMessage from '../../../components/esential/InternalErrorMessage';

const RoleListTable = () => {
  const dispatch = useDispatch();
  const { rolesData } = useSelector(state => {
    return {
      rolesData: state.roles.data ?? [],
    };
  });

  let rolesTableData = [];
  const [filteredRoles, setFilteredRoles] = useState([]);

  rolesData.map(roles => {
    const { id, role, createdAt, role_description, permissions, role_status } = roles;
    return rolesTableData.push({
      key: id,
      name: role,
      role_description,
      permissions,
      role_status,
      createdAt: createdAt,
      dateTime: <span className={'status-text'}>{<Moment format="DD MMMM  YYYY ">{parseInt(createdAt)}</Moment>}</span>,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });

  useEffect(() => {
    dispatch(rolesDataRead());
  }, [dispatch]);

  const handleStatusChange = (record, checked) => {
    const variables = { data: { id: record.key, role_status: checked } };

    apolloClient
      .mutate({
        mutation: authMutation.UPDATE_ROLE,
        variables,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.updateRole;
        if (!data?.status) return InternalErrorMessage();
        message.success(`${record.name} Role Status updated successfully.`);
      });
  };

  const rolesTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Description',
      dataIndex: 'role_description',
      key: 'role_description',
      sorter: (a, b) => (a.role_description.toUpperCase() > b.role_description.toUpperCase() ? 1 : -1),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      // width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.permissions.length > b.permissions.length ? -1 : 1),
      render: permissions => {
        const data = permissions
          .filter(item => item.read_access || item.edit_access)
          .map(elem => elem.rolesPermission.roles_permission_name)
          .join(', ');

        return <p>{data}</p>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'role_status',
      key: 'role_status',
      width: 100,
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Inactive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.role_status === value,
      sorter: (a, b) => (a.role_status === b.role_status ? 0 : a.role_status ? -1 : 1),
      render: (role_status, record) => (
        <Switch defaultChecked={role_status} title="Status" onChange={checked => handleStatusChange(record, checked)} />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'action',
      width: 90,
      align: 'center',
      render: (text, record) => (
        <Link to={`/admin/roles/update?id=${record.key}`} style={{ cursor: 'pointer' }}>
          <FontAwesome name="edit" style={{ margin: '.5em 1em', color: '#5F63F2' }} />
        </Link>
      ),
    },
  ];

  const [searchText, setSearchText] = useState('');
  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredRoles(
      rolesTableData.filter(role => (role.name + role.role_description).toLowerCase().includes(value.toLowerCase())),
    );
  };

  return (
    <Cards headless>
      {!rolesTableData.length ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <>
          <Input
            prefix={<FeatherIcon icon="search" size={14} />}
            placeholder="Search Roles.."
            onChange={onChangeSearch}
            style={{ marginBottom: '1em' }}
          />

          <span className={'psp_list'}>
            <Table
              dataSource={searchText ? filteredRoles : rolesTableData}
              columns={rolesTableColumns}
              size="small"
              rowClassName={(record, index) => (index % 2 === 0 ? '' : 'altTableClass')}
              rowKey={'key'}
              pagination={{
                defaultPageSize: config.ROLES_PER_PAGE,
                total: searchText ? filteredRoles.length : rolesTableData.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </span>
        </>
      )}
    </Cards>
  );
};

export default RoleListTable;
