import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import apolloClient, { rolesMutation, rolesQuery } from '../../utility/apollo';
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

const roleDataAdd = (data) => {
  return async dispatch => {
    await dispatch(roleAddBegin());
    apolloClient.mutate({
      mutation: rolesMutation.ADD_ROLE_MUTATION,
      variables: { data: { role: data.role, role_status: JSON.parse(data.status) } },
      refetchQueries: [
        {
          query: rolesQuery.GET_ALL_ROLES_QUERY,
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: Cookies.get('psp_t')
            }
          }
        },
        'getAllRoles'
      ],
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID,
          Authorization: Cookies.get('psp_t')
        }
      }
    }).then(res => {
      dispatch(roleAddSuccess(res));
      toast.success("User group added successfully");
    }).catch(err => {
      dispatch(roleAddError(err));
      toast.error("User group added failed!");
    })
  }
}



export {
  rolesDataRead,
  roleDataAdd
};
