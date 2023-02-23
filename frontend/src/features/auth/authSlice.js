import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  users: [],
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: null,
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors
        : error.errors
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user
export const updateProfile = createAsyncThunk(
  'auth/update/profile',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateUser(data.id, data.formData, token)
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get All Users (Limit 6)
export const getAllUsers = createAsyncThunk(
  '/auth/getusers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const id = thunkAPI.getState().auth.user._id
      return await authService.getUsers(id, token)
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Single User Profile
export const getSingleUser = createAsyncThunk(
  '/auth/getsingleuser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.getOneUser(id, token)
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.errors = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.errors = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.errors = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.errors = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {


        localStorage.removeItem('user')

        const user = JSON.stringify(action.payload)

        localStorage.setItem('user', user)

        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.errors = null

      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
        state.errors = null
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        state.errors = null
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
