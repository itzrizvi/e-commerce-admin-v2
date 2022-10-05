import actions from './actions';

const {
  ROLES_READ_BEGIN,
  ROLES_READ_SUCCESS,
  ROLES_READ_ERR,
} = actions;

const initialState = {
  data: [],
  url: null,
  fileLoading: false,
  loading: false,
  error: null,
};

const rolesCrudReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ROLES_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ROLES_READ_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case ROLES_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { rolesCrudReducer };
