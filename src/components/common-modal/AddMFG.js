import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apolloClient from '../../apollo';
import { poQuery } from '../../apollo/po';

export default function AddMFG({
  po_id,
  addMfgModalOpen,
  setAddMfgModalOpen,
  setChangeMfg,
}) {
  const [mfgForm] = Form.useForm();
  const [mfgFile, setMfgFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);

  /* ------------------------- Add Address Form Submit ------------------------ */
  const handleSubmit = async () => {
    if(!mfgFile) return toast.error("Please select mfg doc file first.")
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
        setChangeMfg(prev => !prev);
        setAddMfgModalOpen(false);
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
      title="Add MFG DOC"
      style={{ top: 20 }}
      width={400}
      open={addMfgModalOpen}
      destroyOnClose={true}
      okText="Add MFG"
      onOk={() => mfgForm.submit()}
      onCancel={() => setAddMfgModalOpen(false)}
      confirmLoading={submitting}
    >
      <Form
        preserve={false}
        style={{ width: '100%' }}
        form={mfgForm}
        name="addMfgForm"
        layout="horizontal"
        size="small"
        onFinish={handleSubmit}
      >
        <Row gutter={25}>
          <Col md={24}>
            <Form.Item label="MFG Doc File">
              <Upload
                listType="picture-card"
                className="avatar-uploader-po"
                name="mfg_doc"
                beforeUpload={beforeImageUpload}
                showUploadList={false}
                fileList={[]}
              >
                {mfgFile?.name ? mfgFile?.name : <Button type="link">Drag or browse file to upload</Button>}
              </Upload>
              {}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
