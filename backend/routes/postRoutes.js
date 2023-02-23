const express = require('express')
const router = express.Router()
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getMyPosts,
  likePost,
  addComment,
} = require('../controllers/postController')

const postRequest = require('../request/postsValidation')
const { protect } = require('../middleware/authMiddleware')

const commentRequest = require('../request/commentsValidation')

router
  .route('/')
  .get(protect, getPosts)
  .post(protect, postRequest.validate('addPostValidation'), addPost)

router
  .route('/:id')
  .put(protect, postRequest.validate('addPostValidation'), updatePost)
  .delete(protect, deletePost)

router.get('/:id', getPost)

router.get('/my', protect, getMyPosts)

router.put('/:id/like', protect, likePost)

router.post(
  '/:id/comments',
  protect,
  commentRequest.validate('addCommentValidation'),
  addComment
)

module.exports = router
