import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
const { confirm } = Modal;

export default function CancelButton({ url = "/", title = "Do you want to cancel this task?", }) {
  const history = useHistory();
  // Confirmation for Cancel Po
  const cancelConfirm = () => {
    confirm({
      title,
      icon: <ExclamationCircleFilled />,
      content: null,
      onOk() {
        history.push(url);
      },
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  return (
    <div>
      <Button style={{ marginRight: 10 }} type="secondary" raised onClick={cancelConfirm}>
        Cancel
      </Button>
    </div>
  );
}
