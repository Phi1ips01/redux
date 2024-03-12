import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBusOperator, showAllBusOperator,deleteBusOperator, updateBusOperator,showOneBusOperator,showAllCSVBusOperator } from '../../api/busOperatorAPI';

const initialState = {
  busOperatorData: [],
  status: 'idle',
  error: null,
};

export const showBusOperatorReducer = createAsyncThunk('busOperators/showBusOperators', async (page,size,search,keyword) => {
  const response = await showAllBusOperator(page,size,search,keyword);
  console.log("showBusOperator",response.data.response)

  return response.data;
});
export const showAllBusOperatorReducer = createAsyncThunk('busOperators/showAllBusOperators', async () => {
  
    const response = await showAllCSVBusOperator();
    console.log("showAllBusOperatorReducer",response.data.response)  
    return response.data.response;
  });

export const addBusOperatorReducer = createAsyncThunk('busOperators/addBusOperator', async (busOperatorData) => {
  const response = await addBusOperator(busOperatorData);
  return response.data.response;
});

export const updateBusOperatorReducer = createAsyncThunk('busOperators/updateBusOperator', async (busOperatorData) => {
  const response = await updateBusOperator(busOperatorData);
  return response.data;
});

export const deleteBusOperatorReducer = createAsyncThunk('busOperators/deleteBusOperator', async (busOperatorId) => {
  await deleteBusOperator(busOperatorId);
  return busOperatorId;
});

const busOperatorSlice = createSlice({
  name: 'busOperators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorData = action.payload;
      })
      .addCase(showAllBusOperatorReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.busOperatorData = action.payload;
      })
      .addCase(addBusOperatorReducer.fulfilled, (state, action) => {
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
