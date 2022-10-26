import Cookies from 'js-cookie';
import { authQuery } from '../../apollo/auth';
import apolloClient, { authMutation } from '../../utility/apollo';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, updateUser } = actions;

const login = (email, password, history) => {
  return async dispatch => {
    dispatch(loginBegin());
    apolloClient.mutate({
      mutation: authMutation.LOGIN_MUTATION,
      variables: { email, password },
      context: {
        headers: {
          TENANTID: process.env.REACT_APP_TENANTID
        }
      }
    }).then(res => {
      const adminSignIn = res?.data?.adminSignIn

      if (adminSignIn?.status) {
        Cookies.set('logedIn', true);
        Cookies.set('psp_t', adminSignIn?.authToken);
        Cookies.set('r_i', adminSignIn?.roleNo);
        Cookies.set('user', JSON.stringify(adminSignIn));
        const permissions = [];

        apolloClient.mutate({
          mutation: authQuery.GET_AUTH_PERMISSION,
          variables: { 
            query: {
              "uid": adminSignIn?.uid
            } 
          },
          context: {
            headers: {
              TENANTID: process.env.REACT_APP_TENANTID,
              Authorization: adminSignIn?.authToken
            }
          }
        }).then( res => {
            const roles = res?.data?.getSingleAdmin?.data?.roles;
            roles.forEach(per => {
              per.permissions.forEach( permission => {
                permissions.push(
                  {
                    edit_access: permission.edit_access,
                    read_access: permission.read_access,
                    permission_name: permission?.rolesPermission?.roles_permission_slug
                  }
                )
              });
            });

            Cookies.set('permissions', JSON.stringify(permissions));
        })
 

        dispatch(loginSuccess({
          login: true,
          token: adminSignIn?.authToken,
          roleId: adminSignIn?.roleNo,
          user: adminSignIn,
          permissions
        }));
        history.push('/admin');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        dispatch(loginErr('wrong email or password'));
      }
    }).catch(err => {
      dispatch(loginErr('Something went wrong'));
    })


    // FN - OLD CODES//
    // try {
    //   dispatch(loginBegin());
    //   setTimeout(() => {
    //     Cookies.set('logedIn', true);
    //     return dispatch(loginSuccess(true));
    //   }, 1000);
    // } catch (err) {
    //   dispatch(loginErr(err));
    // }
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      Cookies.remove('psp_t');
      Cookies.remove('r_i');
      Cookies.remove('user');
      Cookies.remove('permissions');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

const changeUser = user => {
  return async dispatch => {
    dispatch(updateUser({ user }))
    Cookies.set('user', JSON.stringify(user));
  }
}

export { login, logOut, changeUser };
