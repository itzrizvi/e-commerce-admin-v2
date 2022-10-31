import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';

const NotFound404 = () => {
  const { goBack } = useHistory();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={goBack} type="primary">
            Go Back
          </Button>
        }
      />
    </>
  );
}
export default NotFound404;
