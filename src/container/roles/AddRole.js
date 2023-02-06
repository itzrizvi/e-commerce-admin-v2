import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Table, Spin, Switch, Checkbox, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useHistory } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddRole = () => {
  viewPermission('role');
  const history = useHistory();

  const token = useSelector(state => state.auth.token);
  const [selectedPermission, setSelectedPermission] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [role_status, setRole_status] = useState(true);
  const [allPermission, setAllPermission] = useState({
    data: [],
    isLoading: true,
    error: '',
  });
  const maxLength = 30;
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Permission Name',
      dataIndex: 'roles_permission_name',
    },
    {
      title: 'Access',
      dataIndex: 'id',
      render: (value, item, index) => (
        <Checkbox
          onChange={e => {
            const isChecked = e.target.checked;
            setSelectedPermission(state => {
              let copy = [...state];
              let data = { ...copy[index], read_access: isChecked };
              copy[index] = data;
              return copy;
            });
          }}
        />
      ),
    },
    {
      title: 'Modify',
      dataIndex: 'Modify',
      render: (value, item, index) => (
        <Checkbox
          onChange={e => {
            const isChecked = e.target.checked;
            setSelectedPermission(state => {
              let copy = [...state];
              let data = { ...copy[index], edit_access: isChecked };
              copy[index] = data;
              return copy;
            });
          }}
        />
      ),
    },
  ];

  // get all permission
  useEffect(() => {
    apolloClient
      .query({
        query: authQuery.GET_ALL_ROLES_PERMISSION,
        context: {
          headers: {
            TENANTID: 100001,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getAllRolesPermission;

        if (!data?.isAuth) return setAllPermission(s => ({ ...s, error: 'You Are not Authorized' }));
        setAllPermission(s => ({ ...s, data: data?.data, error: '' }));
        setSelectedPermission(state => {
          const newState = data?.data.map(item => ({
            permission_id: item.id,
            read_access: false,
            edit_access: false,
          }));
          return newState;
        });
      })
      .finally(() => {
        setAllPermission(s => ({ ...s, isLoading: false }));
      });
  }, []);

  const handleSubmit = values => {
    setIsLoading(true);
    const data = { ...values, role_status: role_status, permissionsData: selectedPermission };

    // return;
    apolloClient
      .mutate({
        mutation: authMutation.CREATE_ROLE_WITH_PERMISSION,
        variables: { data },
        context: {
          headers: {
            TENANTID: 100001,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.createRoleWithPermission;
        if (!data?.status) return InternalErrorMessage();
        setTimeout(() => {
          history.push('/admin/roles/list');
        }, 1000);
        message.success(`${values.role} role created successfully.`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <PageHeader title="Add Role" />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <Form
                style={{ width: '100%' }}
                form={form}
                name="addRole"
                onFinish={handleSubmit}
                onFinishFailed={errorInfo => console.log('form error info:\n', errorInfo)}
                labelCol={{ span: 4 }}
              >

                <Row gutter={25}>
                  <Col span={10}>
                    <Form.Item
                      rules={[{ required: true, max: maxLength, message: 'Please enter Role Name' }]}
                      name="role"
                      label="Name"
                      labelCol={{ style: { width: "40%" } }}
                    >
                      <Row>
                        <Col span={22}>
                          <Input placeholder="Enter Role Name" />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={25}>
                  <Col span={18}>
                    <Form.Item
                      rules={[{ required: true, message: 'Please enter Role Description' }]}
                      name="roleDescription"
                      label="Description"
                      labelCol={{ style: { width: "21.5%" } }}
                    >
                      <Row>
                        <Col span={18}>
                          <TextArea rows={4} placeholder="Enter Role Description" />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>


                <Form.Item name="role_status" label="Status">
                  <Switch checked={role_status} onChange={checked => setRole_status(checked)} />
                </Form.Item>
                <Row gutter={25}>
                  <Col span={24} >
                    <h2 style={{ fontSize: "15px", fontWeight: "600" }}>Select Permissions For This Role:</h2>
                    <Form.Item name="permissionsData">
                      {allPermission.isLoading ? (
                        <div className="spin">
                          <Spin />
                        </div>
                      ) : allPermission.error ? (
                        <p>{allPermission.error}</p>
                      ) : (
                        <Table pagination={false} columns={columns} rowKey={'id'} dataSource={allPermission.data} />
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
                    <Button loading={isLoading} size="default" htmlType="submit" type="primary" raised>
                      {isLoading ? 'Processing' : 'Save'}
                    </Button>
                    <Link to="/admin/roles/list">
                      <Button style={{ marginLeft: 10 }} type="light" size="default">
                        Cancel
                      </Button>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddRole;
