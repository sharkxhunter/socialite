import axios from 'axios'

const API_URL = '/api/posts/'

// Get All Posts on the server
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data // return all posts
}

// Get Single Posts on the server
const getSinglePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await axios.get(API_URL + id, config)

  return data // return single posts
}

// Add post
const addPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, postData, config)

  return response.data // return all posts
}

// Delete Post
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

// Add comment
const addComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `${API_URL}/${data.id}/comments`,
    data.commentData,
    config
  )

  return response.data // return all posts
}

const postService = {
  getPosts,
  addPost,
  deletePost,
  getSinglePost,
  addComment,
}

export default postService
