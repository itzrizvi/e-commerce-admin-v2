import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { userReducer } from './users/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import { rolesCrudReducer } from './roles/reducers';

const rootReducers = combineReducers({
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  users: userReducer,
  auth: authReducer,
  roles: rolesCrudReducer,
  ChangeLayoutMode,
});

export default rootReducers;
