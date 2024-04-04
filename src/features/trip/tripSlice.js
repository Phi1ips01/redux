import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TripAPI from '../../api/tripAPI';

const initialState = {
  tripAllData:[],
  tripCount:0,
  tripOneData:[],
  tripData: [],
  status: 'idle',
  error: null,
};

export const showAllTripReducer = createAsyncThunk('trips/showTrips', async () => {
  const response = await TripAPI().showAllCSVTrip();
  console.log("Response showall",response)
  return response.data.response;
});

export const showTripReducer = createAsyncThunk('trips/showAllTrips', async ({page,size,search,keyword}) => {
  console.log("response tripslice",search,keyword)
  const response = await TripAPI().showAllTrip(page,size,search,keyword);
  return response.data.response;
});
export const showOneTripReducer = createAsyncThunk('trips/showOneTrips', async (id) => {
  const response = await TripAPI().showOneTrip(id);
  return response.data.response;
});
export const addTripReducer = createAsyncThunk('trips/addTrip', async (tripData) => {
  const response = await TripAPI().addTrip(tripData);
  return response.data;
});

export const updateTripReducer = createAsyncThunk('trips/updateTrip', async (tripData) => {
  const response = await TripAPI().updateTrip(tripData);
  console.log("update slice",response)
  return response.data.response;
});

export const deleteTripReducer = createAsyncThunk('trips/deleteTrip', async (tripId) => {
  await TripAPI().deleteTrip(tripId);
  return tripId;
});

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showTripReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tripData = action.payload.rows;
        state.tripCount = action.payload.count
      })
      .addCase(showAllTripReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tripAllData = action.payload;
      })
      .addCase(showOneTripReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tripOneData = action.payload;
      })
      .addCase(addTripReducer.fulfilled, (state, action) => {
        state.tripData.push(action.payload);
      })
      .addCase(updateTripReducer.fulfilled, (state, action) => {
        const index = state.tripData.findIndex((Trip) => Trip.id === action.payload.id);
        if (index !== -1) {
          state.tripData[index] = action.payload;
        }
      })
      .addCase(deleteTripReducer.fulfilled, (state, action) => {
        state.tripData = state.tripData.filter((Trip) => Trip.id !== action.payload);
      });
  },
});


export default tripSlice.reducer;
