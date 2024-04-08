import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import busReducer from '../features/bus/busSlice'
import tripReducer from '../features/trip/tripSlice'
import busOperatorReducer from '../features/busOperator/busOperatorSlice';
import loginReducer from '../features/login/loginSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    buses: busReducer,
    busOperators: busOperatorReducer, 
    trips: tripReducer,
    login: loginReducer
  },
});

export default store;
