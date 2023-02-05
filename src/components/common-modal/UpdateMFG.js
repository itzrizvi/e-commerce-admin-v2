import { InboxOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apolloUploadClient } from '../../apollo';
import { poQuery } from '../../apollo/po';

export default function UpdateMFG({ mfg, updateMfgModalOpen, setUpdateMfgModalOpen, setChangeMfg }) {
  const [mfgForm] = Form.useForm();
  const [mfgFile, setMfgFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);

  /* ------------------------- Add Address Form Submit ------------------------ */
  const handleSubmit = async () => {
    if (!mfgFile) return toast.error('Please select mfg doc file first.');
    setSubmitting(true);
    const { id, po_id } = mfg;
    apolloUploadClient
      .mutate({
        mutation: poQuery.UPDATE_MFG_DOC,
        variables: {
          data: {
            id,
            po_id,
            pomfgfile: mfgFile,
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
        const data = res?.data?.updatePOMFGDOC;
        if (!data.status) return toast.error(data.message);
        setChangeMfg(prev => !prev);
        setUpdateMfgModalOpen(false);
        setMfgFile(null);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Assign File
  const beforeImageUpload = file => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      toast.error('You can only upload PDF file.');
      return false;
    }
    if (isPDF) setMfgFile(file);
    return false;
  };

  return (
    <Modal
      title="Update MFG Doc"
      style={{ top: 20 }}
      width={400}
      open={updateMfgModalOpen}
      destroyOnClose={true}
      okText="Update Mfg Doc"
      onOk={() => mfgForm.submit()}
      onCancel={() => setUpdateMfgModalOpen(false)}
      confirmLoading={submitting}
    >
      <Form
        preserve={false}
        style={{ width: '100%' }}
        form={mfgForm}
        name="mfgForm"
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Row gutter={25}>
          <Col md={24}>
            <Form.Item label="MFG Doc File">
              <Upload.Dragger
                beforeUpload={beforeImageUpload}
                multiple={false}
                maxCount={1}
                onRemove={() => setMfgFile(null)}
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
