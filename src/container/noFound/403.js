import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
const NotFound403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to="/admin"><Button type="primary">Back Dashboard</Button></Link>}
  />
);
export default NotFound403;