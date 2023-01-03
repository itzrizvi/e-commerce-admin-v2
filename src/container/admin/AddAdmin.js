import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Spin, Switch, Checkbox, Typography } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import { viewPermission } from '../../utility/utility';
const { Paragraph } = Typography;

const AddAdmin = () => {
  viewPermission('user');
  const history = useHistory();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const maxLength = 30;
  const [userStatus, setUserStatus] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sendEmail, setSendEmail] = useState(true);
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
      .catch(err => {
        console.log('Error on get all role', err);
      })
      .finally(() => {
        setRoles(state => ({ ...state, isLoading: false }));
      });
  });

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
      .catch(err => {
        console.log('Error on loading single user', err);
      })
      .finally(() => {
        setRoles(state => ({ ...state, isLoading: false }));
      });
  });

  const handleSubmit = values => {
    if (!selectedRoles.length) return toast.warn('Select At List 1 Role..');

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
          if (!data.status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/admin/admins');
          }, 1000);
          toast.success(`${values.email} added successfully.`);
        })
        .catch(err => {
          console.log('Error on add admin', err);
          toast.error('Something went wrong !!');
        })
        .finally(() => setIsLoading(false));
    }

    // UPDATE ADMIN
    else {
      const { first_name, last_name } = values;
      const variables = {
        data: {
          id: parseInt(params.id),
          first_name,
          last_name,
          role_ids: selectedRoles.map(item => ({ role_id: item })),
          user_status: userStatus,
          sendEmail,
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
          const status = res?.data?.adminUpdate?.status;
          if (!status) return toast.error(data.message);
          setTimeout(() => {
            history.push('/admin/admin/admins');
          }, 1000);
          toast.success(`${params.email} user Status updated successfully.`);
        })
        .catch(err => {
          console.log('Error on update admin', err);
          toast.error(`Something went wrong!!`);
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
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setIsResetLoading(false));
  };

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
                  name="addProduct"
                  onFinish={handleSubmit}
                  onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                  labelCol={{ span: 4 }}
                  initialValues={
                    params.id
                      ? {
                          first_name: singleUser.data.first_name,
                          last_name: singleUser.data.last_name,
                        }
                      : null
                  }
                >
                  <Form.Item
                    rules={[{ required: true, max: maxLength, message: 'Please enter First Name' }]}
                    name="first_name"
                    label="First Name"
                  >
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: 'Please enter Last Name' }]}
                    name="last_name"
                    label="Last Name"
                  >
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                  {!params.id && (
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
                    >
                      <Input type="email" placeholder="Enter Email Address" />
                    </Form.Item>
                  )}
                  <Form.Item name="userStatus" label="User Status">
                    <Switch checked={userStatus} onChange={checked => setUserStatus(checked)} />
                  </Form.Item>

                  <Form.Item name="role_ids" initialValue="" label="Role">
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
                          <Row>
                            {roles.roles.map(item => (
                              <Col span={12} key={item.id}>
                                <Checkbox value={item.id}>{item.role}</Checkbox>
                                <br />
                                <Paragraph
                                  style={{
                                    marginLeft: '2em',
                                    color: 'gray',
                                    width: 'calc(100% - 4em)',
                                  }}
                                  ellipsis={{ tooltip: item.role_description, rows: 1 }}
                                >
                                  {item.role_description}
                                </Paragraph>
                              </Col>
                            ))}
                          </Row>
                        </Checkbox.Group>
                      </>
                    )}
                  </Form.Item>

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
