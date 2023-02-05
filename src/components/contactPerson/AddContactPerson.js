import { Form, Input, Modal, Switch } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { contactPersonsSchema } from '../../apollo/contactPerson';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function AddContactPerson({
  contactPersonAddModalOpen,
  setContactPersonAddModalOpen,
  parent,
  id,
  setCPSuccess,
}) {
  const [personForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);

  const handleContactPerson = async () => {
    await personForm.validateFields(['name', 'email', 'phone']);
    const values = personForm.getFieldsValue(true);
    setLoading(true);
    apolloClient
      .mutate({
        mutation: contactPersonsSchema.ADD_CONTACT_PERSON,
        variables: {
          data: {
            ref_id: id,
            type: parent.toLowerCase(),
            contact_persons: [values],
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(res => {
        const data = res?.data?.createContactPerson;
        if (!data?.status) return;
        setCPSuccess(true);
        setContactPersonAddModalOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Modal
        title="Add Contact Person"
        style={{ top: 20 }}
        width={600}
        open={contactPersonAddModalOpen}
        onOk={handleContactPerson}
        onCancel={() => setContactPersonAddModalOpen(false)}
        okText="Save"
        confirmLoading={loading}
      >
        <Form
          preserve={false}
          style={{ width: '100%' }}
          form={personForm}
          name="personForm"
          layout="horizontal"
        >
          <Form.Item
            {...formItemLayout}
            rules={[{ required: true, message: 'Please Enter Name' }]}
            name="name"
            label="Name"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            rules={[{ required: true, message: 'Please Enter Email' }]}
            name="email"
            label="Email"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please Enter Phone' }]}
            {...formItemLayout}
            name="phone"
            label="Phone"
          >
            <Input style={{ width: '50%' }} placeholder="Phone" />
          </Form.Item>
          <Form.Item {...formItemLayout} name="fax" label="Fax">
            <Input style={{ width: '50%' }} placeholder="Fax" />
          </Form.Item>
          <Form.Item {...formItemLayout} name="status" label="Status" initialValue={true}>
            <Switch defaultChecked={true} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
