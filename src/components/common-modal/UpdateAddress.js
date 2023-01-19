import { Col, Form, Input, Modal, Row, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import apolloClient from '../../apollo';
import { addressSchema } from '../../apollo/address';
import { strCamelCase } from '../../utility/stringModify';

export default function UpdateAddress({ type, address, addressModalOpen, setAddressModalOpen, handleSubmit }) {
  const [addressForm] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');

  useEffect(() => {
    // Get Country List
    apolloClient
      .query({
        query: addressSchema.GET_COUNTRY_LIST,
        context: {
          headers: { TENANTID: process.env.REACT_APP_TENANTID },
        },
      })
      .then(res => {
        const data = res.data.getCountryList;
        if (!data.status) return true;
        setCountries(data?.data);
      });
  }, []);

  useEffect(() => {
    // Get State List
    apolloClient
      .query({
        query: addressSchema.GET_STATE_LISTS,
        variables: {
          query: {
            code: selectedCountryCode,
          },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
          },
        },
      })
      .then(res => {
        const data = res?.data?.getStateList;
        if (!data?.status) return;
        setStates(data?.data);
      });
  }, [selectedCountryCode]);
  return (
    <Modal
      title={`Update ${strCamelCase(type)} Address`}
      style={{ top: 20 }}
      width={600}
      open={addressModalOpen}
      destroyOnClose={true}
      okText="Update"
      onOk={() => handleSubmit(type, addressForm.getFieldsValue(true))}
      onCancel={() => setAddressModalOpen(false)}
    >
      <Form
        preserve={false}
        style={{ width: '100%' }}
        form={addressForm}
        name="addressForm"
        layout="vertical"
        size="small"
      >
        <Row gutter={25}>
          <Col md={24}>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="country"
                  initialValue={address?.countryCode?.code}
                  label="Country"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    onChange={val => setSelectedCountryCode(val)}
                    defaultValue={address?.countryCode?.code}
                    options={countries?.map(item => ({
                      label: item.name,
                      value: item.code,
                    }))}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              rules={[{ required: true, message: 'Please Enter Address 1' }]}
              initialValue={address?.address1}
              name="address1"
              label="Address 1"
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="Address 1" />
            </Form.Item>
            <Form.Item initialValue={address?.address2} name="address2" label="Address 2" style={{ marginBottom: 5 }}>
              <Input placeholder="Address 2" />
            </Form.Item>
            <Row gutter={25}>
              <Col xs={24} md={12}>
                <Form.Item
                  initialValue={address?.city}
                  rules={[{ required: true, message: 'Please Enter City' }]}
                  name="city"
                  label="City"
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  initialValue={address?.zip_code}
                  name="zip_code"
                  rules={[{ required: true, message: 'Please Enter Zip Code' }]}
                  label="Zip Code"
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder="Zip Code" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{}}>
              <Col xs={24} md={12}>
                <Form.Item
                  initialValue={address?.state}
                  name="state"
                  rules={[{ required: true, message: 'Please Enter State' }]}
                  label="State"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="State"
                    defaultValue={address?.state}
                    options={states?.map(item => ({
                      label: item.state,
                      value: item.abbreviation,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} style={{ paddingLeft: 15 }}>
                <Form.Item initialValue={address?.isDefault} name="isDefault" label="Default" style={{ marginBottom: 0 }}>
                  <Switch defaultChecked={address?.isDefault} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
