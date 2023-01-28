import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Spin, Switch, Typography } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from '../../components/buttons/buttons';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import config from '../../config/config';
import { logOut } from '../../redux/authentication/actionCreator';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { errorImageSrc, renderImage } from '../../utility/images';
import { viewPermission } from '../../utility/utility';

const handleStatusChange = (record, checked) => {
  const variables = { data: { id: record.id, user_status: checked, sendEmail: false } };

  apolloClient
    .mutate({
      mutation: authMutation.ADMIN_UPDATE,
      variables,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: Cookies.get('psp_t'),
        },
      },
    })
    .then(res => {
      const status = res?.data?.adminUpdate?.status;
      if (!status) return toast.error(res?.data?.adminUpdate.message);
      toast.success(`${record.email} user Status updated successfully.`);
    })
    .catch(err => {
      console.log('🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err', err);
      toast.error(`Something went wrong!!`);
    });
};

const AllAdmin = () => {
  viewPermission('user');
  const token = useSelector(state => state.auth.token);
  const [searchText, setSearchText] = useState('');
  const [filteredUser, setFilteredUser] = useState([]);
  const [staffs, setStaffs] = useState({
    data: [],
    isLoading: true,
    error: '',
  });

  // Load admin list
  useEffect(() => {
    apolloClient
      .query({
        query: authQuery.GET_ALL_STAFF,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        if (!res?.data?.getAllStaff?.isAuth) {
          dispatch(logOut());
        } else {
          setStaffs(s => ({ ...s, data: res?.data?.getAllStaff?.data, error: '' }));
        }
      })
      .catch(err => {
        setStaffs(s => ({ ...s, error: 'Something went Wrong.!! ' }));
      })
      .finally(() => {
        setStaffs(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
    },
    {
      title: 'Image',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: (text, record) => (
        <LazyLoadImage
          effect="blur"
          width="40"
          src={renderImage(record.id, record.image, 'user', '128x128')}
          onError={errorImageSrc}
          alt={record.id}
        />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      ellipsis: true,
      sorter: (a, b) => (a.first_name > b.first_name ? 1 : -1),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      ellipsis: true,
      sorter: (a, b) => (a.last_name > b.last_name ? 1 : -1),
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      // width: 150,
      ellipsis: true,
      sorter: (a, b) => (a.roles.length > b.roles.length ? -1 : 1),
      render: roles => {
        const data = roles.map(role => role.role).join(', ');
        return <p>{data}</p>;
      },
    },
    {
      title: 'Verified',
      dataIndex: 'email_verified',
      key: 'email_verified',
      width: 100,
      align: 'center',
      render: email_verified => email_verified.toString().toUpperCase(),
      sorter: (a, b) => (a.email_verified === b.email_verified ? 0 : a.email_verified ? -1 : 1),
      filters: [
        {
          text: 'Verified',
          value: true,
        },
        {
          text: 'Not Verified',
          value: false,
        },
      ],
      onFilter: (value, record) => record.email_verified === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
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
      onFilter: (value, record) => record.user_status === value,
      render: (text, record) => (
        <Switch
          defaultChecked={record.user_status}
          title="Status"
          onChange={checked => handleStatusChange(record, checked)}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 90,
      align: 'center',
      render: (text, record) => (
        <>
          <Link to={`/admin/admin/add-admin?id=${record.id}`}>
            <FontAwesome name="edit" style={{ color: '#5F63F2' }} />
          </Link>
        </>
      ),
      key: 'last_name',
    },
  ];

  const onChangeSearch = e => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredUser(
      staffs.data.filter(user =>
        (user?.email + user?.first_name + user?.last_name + user?.roles?.role)
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <PageHeader
        title="Users"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/admin/add-admin">
              <Button size="small" title="Add user" type="primary">
                <FeatherIcon icon="user-plus" />
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {staffs.isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : staffs.error ? (
                <p>{staffs.error}</p>
              ) : (
                <>
                  <Input placeholder="Search user" prefix={<SearchOutlined />} onChange={onChangeSearch} />
                  <br />
                  <br />

                  <span className={'psp_list'}>
                    <Table
                      className="table-responsive"
                      columns={columns}
                      rowKey={'id'}
                      size="small"
                      dataSource={searchText ? filteredUser : staffs.data}
                      pagination={{
                        defaultPageSize: config.USERS_PER_PAGE,
                        total: searchText ? filteredUser.length : staffs.data.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </span>
                </>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AllAdmin;
