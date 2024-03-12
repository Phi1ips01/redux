import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTrip, showAllTrip,deleteTrip,updateTrip,showOneTrip,showAllCSVTrip } from '../../api/tripAPI';

const initialState = {
  tripData: [],
  setSelectedOperatedId:'',
  status: 'idle',
  error: null,
};

export const showAllTripReducer = createAsyncThunk('trips/showTrips', async () => {
  const response = await showAllCSVTrip();
  return response.data;
});

export const showTripReducer = createAsyncThunk('trips/showAllTrips', async (page,size,search,keyword) => {
  const response = await showAllTrip(page,size,search,keyword);
  return response.data;
});

export const addTripReducer = createAsyncThunk('trips/addTrip', async (tripData) => {
  const response = await addTrip(tripData);
  return response.data;
});

export const updateTripReducer = createAsyncThunk('trips/updateTrip', async (tripData) => {
  const response = await updateTrip(tripData);
  return response.data;
});

export const deleteTripReducer = createAsyncThunk('trips/deleteTrip', async (tripId) => {
  await deleteTrip(tripId);
  return tripId;
});

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setSelectedOperatorId(state, action) {
      state.selectedOperatorId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showTripReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tripData = action.payload;
      })
      .addCase(addTripReducer.fulfilled, (state, action) => {
        state.tripData.push(action.payload);
      })
      .addCase(updateTripReducer.fulfilled, (state, action) => {
        const index = state.trips.findIndex((Trip) => Trip.id === action.payload.id);
        if (index !== -1) {
          state.tripData[index] = action.payload;
        }
      })
      .addCase(deleteTripReducer.fulfilled, (state, action) => {
        state.tripData = state.trips.filter((Trip) => Trip.id !== action.payload);
      });
  },
});

export const { setSelectedOperatorId } = tripSlice.actions;

export default tripSlice.reducer;
