import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import { authQuery } from '../../../../apollo/auth';
import apolloClient from '../../../../apollo';
import { toast } from 'react-toastify';
import AuthLayout from '../Index';

const ResetPassword = () => {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [form] = Form.useForm();
  let { codeHashed } = useParams();
  const handleSubmit = values => {
    setLoading(true);
    const {verificationCode, newPassword, confirmPassword} = values
    if(newPassword !== confirmPassword){
      setLoading(false);
      return toast.error("New Password and Confirm Password not Matched!")
    }
    apolloClient
      .mutate({
        mutation: authQuery.RESET_PASSWORD,
        variables: {
          data: {
            codeHashed,
            verificationCode: parseInt(verificationCode),
            newPassword,
            confirmPassword
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.setPassword
        if(data.status){
          toast.success(data.message)
          history.push("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }else{
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Something Went wrong !!');
      })
      .finally(() => setLoading(false));
  };
  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Reset <span className="color-secondary">Password</span>
          </Heading>
          <Form.Item
            name="verificationCode"
            rules={[{ message: 'Please input your verification code!', required: true }]}
            label="Verification Code"
          >
            <Input placeholder="Verification Code" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ message: 'Please input your new password!', required: true }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ message: 'Please input your confirm password!', required: true }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} className="btn-signin" htmlType="submit" type="primary" size="large">
              {loading ? 'Loading...' : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default AuthLayout(ResetPassword);
