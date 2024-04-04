import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BusOperatorAPI from '../../api/busOperatorAPI';

const initialState = {
  busOperatorData: [],
  busOperatorAllData:[],
  busOperatorOneData:[],
  busOperatorCount:0,
  busOperatorTotalAmount:0,
  busOperatorProfit:0,
  status: 'idle',
  error: null,
};

export const showBusOperatorReducer = createAsyncThunk('busOperators/showBusOperators', async ({page, size, search, keyword}) => {
  const response = await BusOperatorAPI().showAllBusOperator(page, size, search, keyword);
  console.log("showBusOperator", response.data.response);
  return response.data.response;
});

export const showAllBusOperatorReducer = createAsyncThunk('busOperators/showAllBusOperators', async () => {
  try {
    const response = await BusOperatorAPI().showAllCSVBusOperator();
    console.log("fire", response.data);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const showOneBusOperatorReducer = createAsyncThunk('busOperators/showOneBusOperators', async (id) => {
  try {
    const response = await BusOperatorAPI().showOneBusOperator(id);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

export const addBusOperatorReducer = createAsyncThunk('busOperators/addBusOperator', async (busOperatorData) => {
  const response = await BusOperatorAPI().addBusOperator(busOperatorData);
  console.log("response busoperator add",response)
  return response.data.response
});

export const updateBusOperatorReducer = createAsyncThunk('busOperators/updateBusOperator', async (busOperatorData) => {
  const response = await BusOperatorAPI().updateBusOperator(busOperatorData);
  return response.data.response;
});

export const deleteBusOperatorReducer = createAsyncThunk('busOperators/deleteBusOperator', async (busOperatorId) => {
  await BusOperatorAPI().deleteBusOperator(busOperatorId);
  return busOperatorId;
});
export const getTotalBusOperatorReducer = createAsyncThunk('busOperators/getTotalBusOperator',async ()=>{
  const response = await BusOperatorAPI().getTotalBusOperator()
  console.log("getTotalBusOperator",response)
  return response.data.response
})

const busOperatorSlice = createSlice({
  name: 'busOperators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorData = action.payload.rows;
        state.busOperatorCount = action.payload.count
      })
      .addCase(showAllBusOperatorReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(showAllBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorAllData = action.payload;
        console.log("extra", state.busOperatorAllData);

      })
      .addCase(showAllBusOperatorReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(showOneBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorOneData = action.payload;
      })
      .addCase(getTotalBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorTotalAmount = action.payload.total_ta;
        state.busOperatorProfit = action.payload.total_profit
      })
      .addCase(addBusOperatorReducer.fulfilled, (state, action) => {
        console.log("action.payload",action.payload)
        state.busOperatorData.push(action.payload);
      })
      .addCase(updateBusOperatorReducer.fulfilled, (state, action) => {
        const index = state.busOperatorData.findIndex((busOperator) => busOperator.id === action.payload.id);
        if (index !== -1) {
          state.busOperatorData[index] = action.payload;
        }
      })
      .addCase(deleteBusOperatorReducer.fulfilled, (state, action) => {
        state.busOperatorData = state.busOperatorData.filter((busOperator) => busOperator.id !== action.payload);
      });
  },
});

export default busOperatorSlice.reducer;
