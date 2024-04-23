import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user-slice'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import combinedProjectSlice from './features/project-slice'
import { combineReducers } from '@reduxjs/toolkit'
const persistConfig = {
    key: 'root',
    storage
};
const rootReducer = combineReducers({
  user:userSlice,
  projects:combinedProjectSlice ,
});

export const makeStore = () => {
  return configureStore({
     reducer:rootReducer
,
  })
}
// const persistedReducer = persistReducer(persistConfig, rootReducer)