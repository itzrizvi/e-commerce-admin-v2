import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Redirect  } from "react-router-dom";
import { toast } from 'react-toastify';
import apolloClient from '../apollo';
import { authQuery } from '../apollo/auth';
import { logOut } from '../redux/authentication/actionCreator';
var gate = true;

const AuthVerify = ({ history }) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  history.listen(() => {  
    if(gate){
      gate = false;
      apolloClient.mutate({
        mutation: authQuery.VALIDATE_TOKEN,
        variables: {
          token: token
        },
        context: {
          headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
        }
      },
    }).then(res => {
        const stataus = res?.data?.validateToken?.status;
        if(!stataus){
          dispatch(logOut());
        }
      }).catch(err => {
         toast.error(err)
      })
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerify);