import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user-slice'
import rootReducer from './features/project-slice'

export const makeStore = () => {
  return configureStore({
     reducer: {
    // user:userSlice,
    projects:rootReducer,
  },
  })
}
