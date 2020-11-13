import {combineReducers} from 'redux';

import places from './places';
import ui from './ui';
import auth from './auth';

export const allReducers = combineReducers({
  places, ui, auth
});
