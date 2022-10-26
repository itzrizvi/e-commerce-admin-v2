import Cookies from 'js-cookie';
import actions from './actions';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR, LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR, UPDATE_USER } = actions;

const initState = {
  login: Cookies.get('logedIn'),
  token: Cookies.get('psp_t'),
  roleId: Cookies.get('r_i'),
  user: JSON.parse(Cookies.get('user') || null),
  permissions: JSON.parse(Cookies.get('permissions') || "[]"),
  loading: false,
  error: null,
};

// FN - TODO : ADD token & roleId ON OTHER ACTION_CREATORS

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data.login,
        loading: false,
        user: data.user,
        token: data.token,
        roleId: data.roleId,
        permissions: data.permissions
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
        user: undefined,
        token: undefined,
        roleId: undefined,
        permissions: [],
        error: null,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: data.user,
      }
    default:
      return state;
  }
};
export default AuthReducer;
