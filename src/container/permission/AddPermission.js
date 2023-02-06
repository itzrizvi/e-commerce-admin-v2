import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Switch, Spin, message } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import apolloClient, { authMutation, authQuery } from '../../utility/apollo';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { viewPermission } from '../../utility/utility';
import InternalErrorMessage from '../../components/esential/InternalErrorMessage';

const AddPermission = () => {
  viewPermission('permission');
  const { search } = useLocation();
  const params = queryString.parse(search);
  const history = useHistory();

  const [form] = Form.useForm();
  const maxLength = 30;
  const [permissionStatus, setPermissionStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [singlePermission, setSinglePermission] = useState({ data: [], isLoading: true });

  useEffect(() => {
    if (!params.id) return;
    apolloClient
      .query({
        query: authQuery.GET_SINGLE_ROLES_PERMISSION,
        variables: {
          query: {
            id: parseInt(params.id),
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: Cookies.get('psp_t'),
          },
        },
      })
      .then(res => {
        const data = res?.data?.getSingleRolesPermission;
        setSinglePermission({ data: data.data, isLoading: false });
        setPermissionStatus(data.data.roles_permission_status);
      })

  }, []);

  const handleSubmit = values => {
    console.log(values);
    setIsLoading(true);

    // Add Permission START -------
    if (!params.id) {
      apolloClient
        .mutate({
          mutation: authMutation.CREATE_ROLES_PERMISSION,
          variables: { data: { ...values, permissionStatus } },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
          refetchQueries: [
            {
              query: authQuery.GET_ALL_ROLES_PERMISSION,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllRolesPermission'],
          ],
        })
        .then(res => {
          const data = res?.data?.createRolesPermission;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/permission/list');
          }, 1000);
          message.success(`${values.permissionName} added successfully`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // Add Permission END -------

    // Update Permission START -------
    else {
      const variables = {
        data: {
          id: parseInt(params.id),
          roles_permission_name: values.permissionName,
          roles_permission_status: permissionStatus,
        },
      };
      apolloClient
        .mutate({
          mutation: authMutation.UPDATE_ROLES_PERMISSION,
          variables,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t'),
            },
          },
          refetchQueries: [
            {
              query: authQuery.GET_ALL_ROLES_PERMISSION,
              context: {
                headers: {
                  TENANTID: process.env.REACT_APP_TENANTID,
                  Authorization: Cookies.get('psp_t'),
                },
              },
            },
            ['getAllRolesPermission'],
          ],
        })
        .then(res => {
          const data = res?.data?.updateRolesPermission;
          if (!data?.status) return InternalErrorMessage();
          setTimeout(() => {
            history.push('/admin/permission/list');
          }, 1000);
          message.success(`${values.permissionName} updated successfully`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // Update Permission END -------
  };

  return (
    <>
      <PageHeader
        title={
          params.id
            ? `Manage Permission | Edit Permission ${singlePermission.isLoading ? '' : `(${singlePermission.data.roles_permission_name})`
            }`
            : 'Add Permission'
        }
      />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              {params.id && singlePermission.isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="processing..." />
                </div>
              ) : (
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
                        name="permissionName"
                        label="Name"
                        initialValue={singlePermission?.data?.roles_permission_name}
                        labelCol={{ style: { width: "40%" } }}
                      >
                        <Row>
                          <Col span={22}>
                            <Input defaultValue={singlePermission?.data?.roles_permission_name} placeholder="Enter Permission Name" />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>


                  <Form.Item name="permissionStatus" label="Status">
                    <Switch checked={permissionStatus} onChange={checked => setPermissionStatus(checked)} />
                  </Form.Item>

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
                      <Link to="/admin/permission/list">
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

export default AddPermission;
