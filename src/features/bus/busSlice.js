import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBus, showAllBus, deleteBus,updateBus,showOneBus,showAllCSVBus } from '../../api/busAPI';

const initialState = {
  busData: [],
  busAllData:[],
  status: 'idle',
  error: null,
};

export const showBusReducer = createAsyncThunk('buses/showBus', async (page,size,search,keyword) => {
  const response = await showAllBus(page,size,search,keyword);
  console.log("showBusReducer",response.data.response)
  return response.data.response;
});


export const showAllBusReducer = createAsyncThunk('buses/showAllBus', async () => {
  const response = await showAllCSVBus();
  console.log("showALlBusReducer",response.data.response)
  return response.data.response;
});

export const addBusReducer = createAsyncThunk('buses/addBus', async (BusData) => {
  const response = await addBus(BusData);
  return response.data;
});

export const updateBusReducer = createAsyncThunk('buses/updateBus', async (BusData) => {
  const response = await updateBus(BusData);
  return response.data;
});

export const deleteBusReducer = createAsyncThunk('buses/deleteBus', async (BusId) => {
  await deleteBus(BusId);
  return BusId;
});

const busSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busData = action.payload;
      })
      .addCase(showAllBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busData = action.payload;
      })
      .addCase(addBusReducer.fulfilled, (state, action) => {
        state.busAllData.push(action.payload);
      })
      .addCase(updateBusReducer.fulfilled, (state, action) => {
        const index = state.busAllData.findIndex((Bus) => Bus.id === action.payload.id);
        if (index !== -1) {
          state.buses[index] = action.payload;
        }
      })
      .addCase(deleteBusReducer.fulfilled, (state, action) => {
        state.buses = state.busAllData.filter((Bus) => Bus.id !== action.payload);
      });
  },
});

export default busSlice.reducer;
