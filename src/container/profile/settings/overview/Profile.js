import React, { useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
import { useSelector } from 'react-redux';
import apolloClient, { authMutation } from '../../../../utility/apollo';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const { Option } = Select;
const Profile = () => {
  const [form] = Form.useForm();
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false)
  const maxLength = 30;

  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });

  const handleSubmit = values => {

    setIsLoading(true)
    const variables = { data: { ...values, uid: user.uid } }
    console.log(variables);

    apolloClient.mutate({
      mutation: authMutation.ADMIN_UPDATE,
      variables,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: Cookies.get('psp_t')
        }
      }
    }).then(res => {
      const status = res?.data?.adminUpdate?.status
      if (!status) return toast.error(data.message)
      toast.success(`Profile updated successfully.`)
    }).catch(err => {
      console.log("🚀 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err", err);
      toast.error(`Something went wrong!!`)
    }).finally(() => {
      setIsLoading(false)

    })
  };


  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };




  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Edit Profile</Heading>
          <span>Set Up Your Personal Information</span>
        </div>
      }
    >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form name="editProfile" onFinish={handleSubmit}>
              <Form.Item
                // name="first_name"
                // initialValue={user.first_name}
                label="Email"
              >
                {/* <Input /> */}
                <p> {user.email}</p>
              </Form.Item>
              <Form.Item
                name="first_name"
                initialValue={user.first_name}
                label="First Name"
                rules={[{ required: true, max: maxLength, message: "Please enter First Name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                initialValue={user.last_name}
                label="Last Name"
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input />
              </Form.Item>


              <div className="setting-form-actions">
                <Button
                  size="default"
                  htmlType="submit"
                  type="primary"
                  loading={isLoading}
                // disabled={isLoading}
                >
                  {isLoading ? 'Processing' : 'Update Profile'}

                </Button>
                &nbsp; &nbsp;
                <Link to="/admin" >
                  <Button size="default" type="light">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Profile;
