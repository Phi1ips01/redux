import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {KEYS} from '../../dataKeys'
import Login from '../../api/login';
const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk('auth/signIn', async (payload) => {
  try {
    const data = await Login().login(payload);
    localStorage.setItem(KEYS.ACCESS_TOKEN, payload.data.token);
    return data;
  } catch (error) {
    throw error;
  }
});


const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('ACCESS_TOKEN');
      state.loading = false;
      state.error = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
