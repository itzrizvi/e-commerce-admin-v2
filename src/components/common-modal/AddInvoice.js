import { InboxOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { poQuery } from '../../apollo/po';
import configMessage from '../../config/config_message';
import { apolloUploadClient } from '../../utility/apollo';
import InternalErrorMessage from '../esential/InternalErrorMessage';

export default function AddInvoice({ po_id, addInvoiceModalOpen, setAddInvoiceModalOpen, setChangeInvoice }) {
  const [invoiceForm] = Form.useForm();
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);

  /* ------------------------- Add Address Form Submit ------------------------ */
  const handleSubmit = async () => {
    await invoiceForm.validateFields(['invoice_no']);
    const values = await invoiceForm.getFieldsValue(true);
    const { invoice_no } = values;
    setSubmitting(true);
    apolloUploadClient
      .mutate({
        mutation: poQuery.CREATE_PO_INVOICE,
        variables: {
          data: {
            po_id,
            invoice_no,
            invoicefile: invoiceFile,
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
        const data = res?.data?.createPOInvoice;
        if (!data?.status) return InternalErrorMessage();
        setChangeInvoice(prev => !prev);
        setAddInvoiceModalOpen(false);
        setInvoiceFile(null);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Assign File
  const beforeImageUpload = file => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error(configMessage.ONLY_PDF_FILE_UPLOAD)
      return false;
    }
    if (isPDF) setInvoiceFile(file);
    return false;
  };

  return (
    <Modal
      title="Add Invoice"
      style={{ top: 20 }}
      width={400}
      open={addInvoiceModalOpen}
      destroyOnClose={true}
      okText="Add Invoice"
      onOk={() => invoiceForm.submit()}
      onCancel={() => setAddInvoiceModalOpen(false)}
      confirmLoading={submitting}
    >
      <Form
        preserve={false}
        style={{ width: '100%' }}
        form={invoiceForm}
        name="addressForm"
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Row gutter={25}>
          <Col md={24}>
            <Form.Item name="invoice_no" label="Invoice No" style={{ marginBottom: 15 }} rules={[{ required: true, message: 'Invoice No is required' }]}>
              <Input placeholder="Invoice No" />
            </Form.Item>

            <Form.Item label="Invoice File">
              <Upload.Dragger
                beforeUpload={beforeImageUpload}
                multiple={false}
                maxCount={1}
                onRemove={() => setInvoiceFile(null)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <Button type="link">Drag or browse file to upload</Button>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
