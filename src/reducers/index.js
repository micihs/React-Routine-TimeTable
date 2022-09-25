import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import tasks from './tasks';
import appointments from './appointments';

const rootReducer = combineReducers({
  form,
  appointments,
  tasks,
});

export default rootReducer;