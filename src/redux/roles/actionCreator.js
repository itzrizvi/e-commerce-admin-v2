import Cookies from 'js-cookie';
import apolloClient, { rolesQuery } from '../../utility/apollo';
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
        query: rolesQuery.GET_ALL_ROLES_QUERY,
        context: {
            headers: {
                TENANTID: process.env.REACT_APP_TENANTID,
                Authorization: Cookies.get('psp_t')
            }
        }
    }).then(res => {
        dispatch(rolesReadSuccess(res.data.getAllRoles.data));
      }).catch(err => {
        dispatch(rolesReadErr(err));
      })
      
  }
};



export {
    rolesDataRead,
};
