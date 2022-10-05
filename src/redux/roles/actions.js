const actions = {
 
    ROLES_READ_BEGIN: 'ROLES_READ_BEGIN',
    ROLES_READ_SUCCESS: 'ROLES_READ_SUCCESS',
    ROLES_READ_ERR: 'ROLES_READ_ERR',
    
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
    }
  };
  
  export default actions;
  