import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Switch, Checkbox, Typography, Table, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';
import config from '../../config/config';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';
import configMessage from '../../config/config_message';

const AddAdmin = () => {
  viewPermission('user');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [singleUser, setSingleUser] = useState({ data: {}, isLoading: true });

  const [roles, setRoles] = useState({
    roles: [],
    isLoading: true,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [existingRoles, setExistingRoles] = useState({ data: [], isLoading: true });

  const [form] = Form.useForm();

  useEffect(() => {
    // get all roles
    setRoles(state => ({ ...state, isLoading: true }));

    apolloClient
      .query({
        query: authQuery.GET_ALL_ROLES,
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllRoles;
        if (data.status) {
          setRoles(state => ({ ...state, roles: data.data }));
        }
      })
      .finally(() => {
        setRoles(state => ({ ...state, isLoading: false }));
      });
  }, []);

  useEffect(() => {
    // get Single admin - update admin
    if (!params.id) return;

    apolloClient
      .query({
        query: authQuery.GET_SINGLE_ADMIN,
        variables: { query: { id: parseInt(params.id) } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleAdmin;
        if (data.status) {
          setSingleUser({ data: data.data, isLoading: false });
          const roles = data?.data?.roles;
          const rolesArray = roles.map(item => item.id);
          setExistingRoles({ data: rolesArray, isLoading: false });
          setSelectedRoles(rolesArray);
        }
      })
      .finally(() => {
        setRoles(state => ({ ...state, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    if (!selectedRoles.length) return message.warn(configMessage.ROLE_EMPTY);

    setIsLoading(true);
    if (!params.id) {
      // ADD NEW ADMIN
      const variables = {
        data: { ...values, role_ids: selectedRoles.map(item => ({ role_id: item })), userStatus, sendEmail: true },
      };
      apolloClient
        .mutate({
          mutation: authMutation.ADMIN_SIGN_UP,
          variables,
          refetchQueries: [
            {
              query: authQuery.GET_ALL_STAFF,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllStaff'],
          ],
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res.data.adminSignUp;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/admin/admins');
          }, 1000);
          message.success(`${values.email} added successfully.`);
        })
        .finally(() => setIsLoading(false));
    }

    // UPDATE ADMIN
    else {
      const { first_name, last_name, phone, fax } = values;
      const variables = {
        data: {
          id: parseInt(params.id),
          first_name,
          phone,
          fax,
          last_name,
          role_ids: selectedRoles.map(item => ({ role_id: item })),
          user_status: userStatus,
          sendEmail: true,
        },
      };

      apolloClient
        .mutate({
          mutation: authMutation.ADMIN_UPDATE,
          variables,
          refetchQueries: [
            {
              query: authQuery.GET_ALL_STAFF,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllStaff'],
          ],
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
        })
        .then(res => {
          const data = res?.data?.adminUpdate;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/admin/admins');
          }, 1000);
          message.success(data.message);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const resetPassword = () => {
    setIsResetLoading(true);
    apolloClient
      .mutate({
        mutation: authQuery.SEND_RESET_PASSWORD,
        variables: { data: { email: singleUser.data.email, permissionName: 'user' } },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.resetPassword;
        if (data?.status) {
          message.success(data.message);
        } else {
          InternalErrorMessage();
        }
      })
      .finally(() => setIsResetLoading(false));
  };

  const roleColumns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      ellipsis: true,
      render: (text, render) => <Checkbox value={render.id}>{render.role}</Checkbox>,
      sorter: (a, b) => a.role > b.role ? 1 : -1
    },
    {
      title: 'Role Descrption',
      dataIndex: 'role_description',
      key: 'role_description',
      width: 120,
      render: (text) => text
    }
  ]

  return (
    <>
      <PageHeader
        title={
          params.id
            ? `Manage User | Edit user ${singleUser.isLoading ? '' : `(${singleUser.data.email})`}`
            : 'Add Admin'
        }
        buttons={[
          params.id && (
            <div key="1" className="page-header-actions">
              <Button
                disabled={singleUser.isLoading}
                loading={isResetLoading}
                onClick={resetPassword}
                size="small"
                title="Reset Password"
                type="primary"
              >
                <FeatherIcon icon="settings" />
                {isLoading ? 'Processing' : 'Reset Password'}
              </Button>
            </div>
          ),
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singleUser.isLoading ? (
                <div div className="spin">
                  <Spin />
                </div>
              ) : (
                <Form
                  style={{ width: '100%' }}
                  form={form}
                  name="addAdmin"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                  initialValues={
                    params.id
                      ? {
                        first_name: singleUser.data.first_name,
                        last_name: singleUser.data.last_name,
                        phone: singleUser.data.phone,
                        fax: singleUser.data.fax
                      }
                      : null
                  }
                >
                  <Row gutter={25}>
                    <Col span={10}>
                      <Form.Item
                        rules={[{ required: true, max: maxLength, message: 'Please enter First Name' }]}
                        name="first_name"
                        label="First Name"
                        labelCol={{ style: { width: "40%" } }}
                      >
                        <Row>
                          <Col span={20}>
                            <Input defaultValue={singleUser?.data?.first_name} placeholder="Enter First Name" />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={25}>
                    <Col span={10}>
                      <Form.Item
                        rules={[{ required: true, message: 'Please enter Last Name' }]}
                        name="last_name"
                        label="Last Name"
                        labelCol={{ style: { width: "40%" } }}
                      >
                        <Row>
                          <Col span={20}>
                            <Input defaultValue={singleUser?.data?.last_name} placeholder="Enter Last Name" />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>

                  {!params.id && (
                    <Row gutter={25}>
                      <Col span={10}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'Please enter an email',
                              max: maxLength,
                            },
                          ]}
                          name="email"
                          label="Email"
                          labelCol={{ style: { width: "40%" } }}
                        >
                          <Row>
                            <Col span={20}>
                              <Input type="email" placeholder="Enter Email Address" />
                            </Col>
                          </Row>
                        </Form.Item>
                      </Col>
                    </Row>

                  )}

                  <Row gutter={25}>
                    <Col span={10}>
                      <Form.Item
                        label="Phone"
                        name="phone"
                        labelCol={{ style: { width: "40%" } }}>
                        <Row>
                          <Col span={20}>
                            <Input type="text" defaultValue={singleUser?.data?.phone} placeholder="Enter Phone Number" />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={25}>
                    <Col span={10}>
                      <Form.Item
                        label="Fax"
                        name="fax"
                        labelCol={{ style: { width: "40%" } }}>
                        <Row>
                          <Col span={20}>
                            <Input type="text" defaultValue={singleUser?.data?.fax} placeholder="Enter Fax Number" />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="userStatus" label="User Status">
                    <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                  </Form.Item>

                  <Row gutter={25}>
                    <Col span={20} offset={2}>
                      <Form.Item name="role_ids" initialValue="" >
                        {(params.id && existingRoles.isLoading) || roles.isLoading ? (
                          <div className="spin">
                            <Spin />
                          </div>
                        ) : (
                          <>
                            <Checkbox.Group
                              style={{
                                width: '100%',
                                marginTop: '1em',
                              }}
                              defaultValue={existingRoles.data}
                              onChange={checkedValues => setSelectedRoles(checkedValues)}
                            >
                              <span className={"psp_list"} >
                                <h2 style={{ fontSize: "15px", fontWeight: "600" }}>Select Roles:</h2>
                                <Table
                                  className="table-responsive"
                                  columns={roleColumns}
                                  rowKey={'id'}
                                  style={{ borderRadius: "0px" }}
                                  size="small"
                                  dataSource={roles.roles ? roles.roles : []}
                                  rowClassName={(record, index) => (index % 2 === 0 ? "" : "altTableClass")}
                                  pagination={{
                                    defaultPageSize: config.CUSTOMER_PER_PAGE,
                                    total: roles.roles ? roles.roles.length : 0,
                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                  }}
                                />
                              </span>

                            </Checkbox.Group>
                          </>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>


                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '3em',
                    }}
                  >
                    <Form.Item>
                      <Button
                        loading={isLoading}
                        disabled={roles.isLoading}
                        size="default"
                        htmlType="submit"
                        type="primary"
                        raised
                      >
                        {isLoading ? 'Processing' : 'Save'}
                      </Button>
                      <Link to="/admin/admin/admins">
                        <Button style={{ marginLeft: 10 }} type="light" size="default">
                          Cancel
                        </Button>
                      </Link>
                    </Form.Item>
                  </div>
                </Form>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddAdmin;
