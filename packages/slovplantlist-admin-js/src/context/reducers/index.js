import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { user } from './user';
import { datagrid } from './datagrid';

export default combineReducers({
  authentication,
  datagrid,
  user,
});
