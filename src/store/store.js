import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import busReducer from '../features/bus/busSlice'
import tripReducer from '../features/trip/tripSlice'
import busOperatorReducer from '../features/busOperator/busOperatorSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    buses: busReducer,
    busOperators: busOperatorReducer, 
    trips: tripReducer
  },
});

export default store;
