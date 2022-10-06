const actions = {
 
    ROLES_READ_BEGIN: 'ROLES_READ_BEGIN',
    ROLES_READ_SUCCESS: 'ROLES_READ_SUCCESS',
    ROLES_READ_ERR: 'ROLES_READ_ERR',

    ROLE_ADD_BEGIN: 'ROLE_ADD_BEGIN',
    ROLE_ADD_SUCCESS: 'ROLE_ADD_SUCCESS',
    ROLE_ADD_ERR: 'ROLE_ADD_ERR',
    
    rolesReadBegin: () => {
      return {
        type: actions.ROLES_READ_BEGIN,
      };
    },
  
    rolesReadSuccess: data => {
      return {
        type: actions.ROLES_READ_SUCCESS,
        data,
      };
    },
  
    rolesReadErr: err => {
      return {
        type: actions.ROLES_READ_ERR,
        err,
      };
    },

    roleAddBegin: () => {
      return {
        type: actions.ROLE_ADD_BEGIN,
      };
    },

    roleAddSuccess: data => {
      return {
        type: actions.ROLE_ADD_SUCCESS,
        data,
      };
    },

    roleAddError: err => {
      return {
        type: actions.ROLE_ADD_ERR,
        err,
      };
    },

  };
  
  export default actions;
  