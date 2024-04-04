import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/userAPI';
const initialState = {
  userData: [],
  userAllData:[],
  userOneData:[],
  userCount:0,
  status: 'idle',
  error: null,
};

export const showAllUserReducer = createAsyncThunk('users/showUser', async () => {
  const response = await UserAPI().showAllCSVUser();
  return response.data.response;
});

export const showUserReducer = createAsyncThunk('users/showAllUsers', async ({page,size,search,keyword}) => {
  console.log("hi")
  console.log(`page=${page},size=${size},search=${search},keyword=${keyword}`)
  const response = await UserAPI().showAllUser({page,size,search,keyword});
  return response.data.response;
});
export const showOneUserReducer = createAsyncThunk('users/showOneUser', async (id) => {
  console.log("slice id showone user",id)
  const response = await UserAPI().showOneUser(id);
  return response.data.response;
});
export const addUserReducer = createAsyncThunk('users/addUser', async (UserData) => {
  const response = await UserAPI().addUser(UserData);
  return response.data.response;
});

export const updateUserReducer = createAsyncThunk('users/updateUser', async (UserData) => {
  const response = await UserAPI().updateUser(UserData);
  return response.data.response;
});

export const deleteUserReducer = createAsyncThunk('users/deleteUser', async (UserId) => {
  await UserAPI().deleteUser(UserId);
  return UserId;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showUserReducer.fulfilled, (state, action) => {
        
        state.status = 'succeeded';
        state.userData = action.payload.rows;
        state.userCount = action.payload.count;
      })
      .addCase(showAllUserReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userAllData = action.payload.rows;
      })
      .addCase(showOneUserReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userOneData = action.payload;
      })
      .addCase(addUserReducer.fulfilled, (state, action) => {
        state.userData.push(action.payload);
      })
      .addCase(updateUserReducer.fulfilled, (state, action) => {
        const index = state.userData.findIndex((User) => User.id === action.payload.id);
        if (index !== -1) {
          state.userData[index] = action.payload;
        }
      })
      .addCase(deleteUserReducer.fulfilled, (state, action) => {
        state.userData = state.userData.filter((User) => User.id !== action.payload);
      });
  },
});


export default userSlice.reducer;
