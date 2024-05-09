import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import global from 'global/globalSlice';

const rootReducer = combineReducers({
  global
});

export function setupStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.MODE === 'development'
  });
  return store;
}
// devTools: process.env.NODE_ENV !== 'production',


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
