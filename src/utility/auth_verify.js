import React from 'react';
import { withRouter, Redirect  } from "react-router-dom";


const AuthVerify = ({ history }) => {
  history.listen(() => {  
    // console.log(history);
  });
  return <div></div>;
};

export default withRouter(AuthVerify);