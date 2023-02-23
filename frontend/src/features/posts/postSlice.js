import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  post: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: null,
  commentError: null,
}

// Get All Posts
export const getAllPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getPosts(token) // Return all posts
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get All Posts
export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getSinglePost(id, token) // Return post
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Add Post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.addPost(postData, token) // Return all posts
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete Post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(id, token) // Return all posts
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Add Comment
export const createComment = createAsyncThunk(
  'posts/addComment',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.addComment(data, token) // Return comments
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors
          : error.errors
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errors = null
      state.posts = []
      state.post = null
      state.commentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
        state.errors = null
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.posts = []
        state.errors = action.payload
      })
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
        state.errors = null
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.posts = []
        state.post = null
        state.errors = action.payload
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = [action.payload, ...state.posts] // Push in the beginning of array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.commentError = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        )
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = { ...state.post, comments: action.payload }
        state.isError = false
        state.errors = null
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
