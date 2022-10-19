import Cookies from 'js-cookie';
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


        dispatch(loginSuccess({
          login: true,
          token: adminSignIn?.authToken,
          roleId: adminSignIn?.roleNo,
          user: adminSignIn,
        }));
        history.push('/admin');
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
