# GET :/id
import { useParams } from 'react-router-dom';
const params = useParams();

// Confirmation
import { Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
const confirm = () => {
    Modal.confirm({
        title: 'Do you want to confirm',
        icon: <CheckCircleOutlined />,
        content: null,
        onOk() {
        form.submit();
        },
        okText: 'Yes',
        cancelText: 'No',
    });
};

  // Success Message
  const statusUpdate = () => {
    Modal.success({
      content: "Status has been changed successfully.",
      onOk: () => {
        searchPOAdmin();
      },
    });
  };

