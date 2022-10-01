import Cookies from 'js-cookie';
import apolloClient, { authMutation } from '../../utility/apollo';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (email, password, history) => {
  return async dispatch => {
    dispatch(loginBegin());
    apolloClient.mutate({
      mutation: authMutation.LOGIN_MUTATION,
      variables: { email, password },
      context: {
        headers: {
          TENANTID: 100001
        }
      }
    }).then(res => {
      console.log("🚀 ~ file: actionCreator.js ~ line 19 ~ login ~ res", res);
      const adminSignIn = res?.data?.adminSignIn
      console.log("🚀 ~ file: actionCreator.js ~ line 21 ~ login ~ adminSignIn", adminSignIn);
      console.log("🚀 ~ file: actionCreator.js ~ line 21 ~ login ~ adminSignIn.status", adminSignIn.status);

      if (adminSignIn?.status) {
        console.log("🚀 ~ file: actionCreator.js ~ line 21 ~ login ~ adminSignIn.status1", adminSignIn.status);

        Cookies.set('logedIn', true);
        Cookies.set('psp_t', adminSignIn?.authToken);
        Cookies.set('r_i', adminSignIn?.roleNo);
        Cookies.set('user', adminSignIn?.email);


        dispatch(loginSuccess({
          login: true,
          token: adminSignIn?.authToken,
          roleId: adminSignIn?.roleNo,
          user: adminSignIn?.email,
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

export { login, logOut };
