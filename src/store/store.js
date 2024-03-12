import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import busReducer from '../features/bus/busSlice'
import tripReducer from '../features/trip/tripSlice'
import busOperatorReducer from '../features/busOperator/busOperatorSlice'; // Fixed import

const store = configureStore({
  reducer: {
    user: userReducer,
    buses: busReducer,
    busOperators: busOperatorReducer, // Fixed key name
    trips: tripReducer
  },
});

export default store;
