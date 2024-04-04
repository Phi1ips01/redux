import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BusAPI from '../../api/busAPI';

const initialState = {
  busData: [],
  busOneData:[],
  busAllData:[],
  busCount:0,
  status: 'idle',
  error: null,
};

export const showBusReducer = createAsyncThunk('buses/showBus', async ({page,size,search,keyword}) => {
  const response = await BusAPI().showAllBus(page,size,search,keyword);
  console.log("showBusReducer",response.data.response)
  return response.data.response;
});


export const showAllBusReducer = createAsyncThunk('buses/showAllBus', async () => {
  const response = await BusAPI().showAllCSVBus();
  console.log("showALlBusReducer",response.data.response)
  return response.data.response;
});

export const showOneBusReducer = createAsyncThunk('bus/showOneBus', async (payload) => {
  try {
    const response = await BusAPI().showOneBus(payload)
    return response.data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
});
export const clearBusReducer = createAsyncThunk('bus/clearBus', async () => {
  try {
    
    const response ={}
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
});
export const addBusReducer = createAsyncThunk('buses/addBus', async (BusData) => {
  const response = await BusAPI().addBus(BusData);
  return response.data;
});

export const updateBusReducer = createAsyncThunk('buses/updateBus', async (BusData) => {
  const response = await BusAPI().updateBus(BusData);
  return response.data.response;
});

export const deleteBusReducer = createAsyncThunk('buses/deleteBus', async (BusId) => {
  await BusAPI().deleteBus(BusId);
  return BusId;
});

const busSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(showBusReducer.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(showBusReducer.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.busData = action.payload.rows;
      state.busCount = action.payload.count
    })
    .addCase(showBusReducer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })

      .addCase(showAllBusReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(showAllBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busAllData = action.payload;
      })
      .addCase(showAllBusReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(showOneBusReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(showOneBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOneData = action.payload;
      })
      .addCase(showOneBusReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(clearBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload;
      })

      .addCase(addBusReducer.fulfilled, (state, action) => {
        state.busData.push(action.payload);
      })
      .addCase(addBusReducer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addBusReducer.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(updateBusReducer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateBusReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.busData.findIndex((Bus) => Bus.id === action.payload.id);
        console.log("bus slice update",index)
        if (index !== -1) {
          state.busData[index] = action.payload;
        }
      })
      .addCase(updateBusReducer.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(deleteBusReducer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteBusReducer.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteBusReducer.fulfilled, (state, action) => {
        state.busData = state.busData.filter((Bus) => Bus.id !== action.payload);
      });

  },
});

export default busSlice.reducer;
