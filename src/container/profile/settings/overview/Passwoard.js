import React, { useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { ChangePasswordWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import apolloClient, { authMutation } from '../../../../utility/apollo';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Password = () => {
  const [form] = Form.useForm();
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = values => {
    const variables = { data: { ...values, uid: user.uid } }
    console.log(variables);

    const check = values.newPassword.match("(?=.{6,})(?=.*[0-9])")
    if (!check) return toast.warning("Password should contain 6 character,  \n And At List 1 number")

    // return
    setIsLoading(true)
    apolloClient.mutate({
      mutation: authMutation.ADMIN_PASSWORD_CHANGE,
      variables,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: Cookies.get('psp_t')
        }
      }
    }).then(res => {
      const data = res.data.adminPasswordChange
      if (!data.status) return toast.error(data.message)
      toast.success(data.message)
    }).catch(err => {
      toast.error(`Something went wrong.!`)
    }).finally(() => {
      setIsLoading(false)
    })

  };
  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <ChangePasswordWrapper>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Password Settings</Heading>
            <span>Change or reset your account password</span>
          </div>
        }
      >
        <Row justify="center">
          <Col lg={12} sm={20} xs={24}>
            <BasicFormWrapper>
              <Form form={form} name="changePassword" onFinish={handleSubmit}>
                <Form.Item name="oldPassword" label="Old Password"
                  rules={[{ required: true, message: "Please enter Old password" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="newPassword" label="New Password"
                  rules={[{ required: true, message: "Please enter a new password" }]}
                >
                  <Input.Password />
                </Form.Item>
                <p className="input-message">Minimum 6 characters & 1 number</p>

                <Form.Item>
                  <div className="setting-form-actions">
                    <Button htmlType="submit" type="primary"
                      loading={isLoading}
                    >
                      Change Password
                    </Button>
                    &nbsp; &nbsp;
                    <Button style={{ marginLeft: 10 }} type="light" size="default" onClick={handleCancel} >
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </ChangePasswordWrapper>
  );
};

export default Password;
