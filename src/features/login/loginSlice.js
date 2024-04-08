import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Login from '../../api/login';
const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk('auth/signIn', async (payload) => {
  try {
    console.log("login started")
    const response = await Login().login(payload)
    console.log("token login",response.data.token)
    console.log("token payload",response.data.payload.role)
    return response.data.payload;
  } catch (error) {
    throw error;
  }
});
export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  try {
    localStorage.clear()
    return true; // Indicate successful logout
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.role;
        console.log("user",state.user)
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default loginSlice.reducer;
