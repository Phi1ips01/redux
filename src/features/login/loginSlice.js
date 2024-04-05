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
    console.log("login started")
    const response =  Login().login(payload)
    console.log("token login",response.data.token)
    return response.data.payload;
  } catch (error) {
    throw error;
  }
});
export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  try {
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
    return true; // Indicate successful logout
  } catch (error) {
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logOut(state) {
    //   localStorage.removeItem(KEYS.ACCESS_TOKEN);
    //   console.log("remove item ",localStorage.getItem(KEYS.ACCESS_TOKEN))
    //   state.loading = false;
    //   state.error = false;
    //   state.user = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.payload;
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
// export const { logOut } = loginSlice.actions;
