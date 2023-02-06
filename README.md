# GET :/id

import { useParams } from 'react-router-dom';
const params = useParams();

# GET Params

import queryString from 'query-string';
const { search } = useLocation();
const params = queryString.parse(search);

# Cancel Button

<Form.Item>
<CancelButton url="/admin/po/list" title="Do you want to exit from PO?" />
</Form.Item>

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

<!-- Message -->

message.success()
message.warning()
message.error()

InternalErrorMessage()
