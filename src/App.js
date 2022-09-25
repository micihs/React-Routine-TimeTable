import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';
import configureStore from "@reduxjs/toolkit";
import * as R from 'ramda';
import moment from 'moment';
import { Provider } from 'react-redux';
import { autoRehydrate, createTransform, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from "./reducers";
import registerScreens, { TIMETABLE } from "./screens";

const store = configureStore(
  rootReducer,
  composeWithDevTools(
    autoRehydrate(),
  ),
);

function recursiveToDate(value) {
  if (R.is(Object, value) && !R.is(String, value)) {
    return R.map(recursiveToDate, value);
  }
  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value);
  }
  return value;
}

const dateTransform = createTransform(values => values, R.map(recursiveToDate));

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['form'],
  transforms: [dateTransform],
});
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: TIMETABLE,
  },
});