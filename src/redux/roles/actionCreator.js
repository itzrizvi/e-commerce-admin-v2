import Cookies from 'js-cookie';
import apolloClient, { authQuery } from '../../utility/apollo';
import { logOut } from '../authentication/actionCreator';
import actions from './actions';

const {
  rolesReadBegin,
  rolesReadSuccess,
  rolesReadErr,
  roleAddBegin,
  roleAddSuccess,
  roleAddError
} = actions;

const rolesDataRead = () => {
  return async dispatch => {
    await dispatch(rolesReadBegin());
    apolloClient.query({
      query: authQuery.GET_ALL_ROLES,
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: Cookies.get('psp_t')
        }
      }
    }).then(res => {
      if (!res?.data?.getAllRoles?.status) {
        dispatch(logOut())
      }
      dispatch(rolesReadSuccess(res.data.getAllRoles.data));
    })

  }
};

export {
  rolesDataRead
};
