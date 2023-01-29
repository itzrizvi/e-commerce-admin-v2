import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const authError = useSelector(state => state.auth.error);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password, history));
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      {/* <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="#">Sign up now</NavLink>
      </p> */}
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          // onFinish={handleSubmit}
          onSubmitCapture={handleSubmit}
          layout="vertical"
        >
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or email!', required: true }]}
            initialValue={email}
            label="Username or Email Address"
          >
            <Input
              placeholder="Username or Email Address"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ message: 'Please input your password!', required: true }]}
            initialValue={password}
            label="Password"
          >
            <Input.Password placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          {/* <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div> */}
          <Form.Item>
            <Button disabled={isLoading} className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>

          {authError && <p style={{ color: '#ff4d4f' }}>{authError}</p>}

          {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
