const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getSingleUser,
  getAllUsers,
} = require('../controllers/userController')

const userRequest = require('../request/usersValidation')

const { protect } = require('../middleware/authMiddleware')

router
  .route('/')
  .get(protect, getAllUsers)
  .post(userRequest.validate('registerUserValidation'), registerUser)
router.post('/login', userRequest.validate('loginUserValidation'), loginUser)
router.get('/me', protect, getMe)
router
  .route('/:id')
  .put(protect, userRequest.validate('updateUserValidation'), updateUser)
  .get(protect, getSingleUser)

module.exports = router
