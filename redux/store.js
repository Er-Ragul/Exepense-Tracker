import { configureStore } from '@reduxjs/toolkit'
import variableReducer from './storageSlice'

export default configureStore({
  reducer: {
    variable: variableReducer
  },
})