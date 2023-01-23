import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { poQuery } from '../../apollo/po';

export default function UpdateInvoice({
  invoice,
  updateInvoiceModalOpen,
  setUpdateInvoiceModalOpen,
  setChangeInvoice,
}) {
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
    apolloClient
      .mutate({
        mutation: poQuery.CREATE_PO_INVOICE,
        variables: {
          data: {
            po_id,
            invoice_no,
            invoice_file: invoiceFile,
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
        if (!data.status) return;
        setChangeInvoice(prev => !prev);
        setAddInvoiceModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Assign File
  const beforeImageUpload = file => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) toast.error('You can only upload PDF file.');
    if (isPDF) setInvoiceFile(file);
    return false;
  };


  return (
    <Modal
      title="Update Invoice"
      style={{ top: 20 }}
      width={400}
      open={updateInvoiceModalOpen}
      destroyOnClose={true}
      okText="Update Invoice"
      onOk={() => invoiceForm.submit()}
      onCancel={() => setUpdateInvoiceModalOpen(false)}
      confirmLoading={submitting}
    >
      <Form
        preserve={false}
        style={{ width: '100%' }}
        form={invoiceForm}
        name="addressForm"
        layout="horizontal"
        size="small"
        onFinish={handleSubmit}
      >
        <Row gutter={25}>
          <Col md={24}>
            <Form.Item name="invoice_no" label="Invoice No" style={{ marginBottom: 15 }} initialValue={invoice?.invoice_no}>
              <Input placeholder="Invoice No" defaultValue={invoice?.invoice_no} />
            </Form.Item>

            <Form.Item label="Invoice File">
              <Upload
                listType="picture-card"
                className="avatar-uploader-po"
                name="invoice_file"
                beforeUpload={beforeImageUpload}
                showUploadList={false}
                fileList={[]}
              >
                {invoiceFile?.name ? invoiceFile?.name : <Button type="link">Drag or browse file to upload</Button>}
              </Upload>
              {}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
