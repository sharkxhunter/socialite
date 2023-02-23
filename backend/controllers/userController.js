const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find()
    .sort([['createdAt', '-1']])
    .limit(20)

  res.status(200).json(user)
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Create user
  const newUser = await User.create({
    name,
    email,
    password,
  })

  const user = await User.findById(newUser._id)

  if (user) {
    const token = generateToken(user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      contact: {
        url: user.contact.url,
        phone: user.contact.phone,
      },
      job: user.job,
      position: user.position,
      studied: user.studied,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      contact: {
        url: user.contact.url,
        phone: user.contact.phone,
      },
      job: user.job,
      position: user.position,
      studied: user.studied,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Update users info
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  // Make sure that user is owned the post
  if (user._id.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, bio, url, phone, job, position, studied } = req.body

  if (name) {
    user.name = name
  }

  if (email) {
    user.email = email
  }

  if (bio) {
    user.bio = bio
  }

  if (url) {
    user.contact.url = url
  }

  if (phone) {
    user.contact.phone = phone
  }

  if (job) {
    user.job = job
  }
  if (position) {
    user.position = position
  }
  if (studied) {
    user.studied = studied
  }

  await user.save()

  const token = generateToken(user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      contact: {
        url: user.contact.url,
        phone: user.contact.phone,
      },
      job: user.job,
      position: user.position,
      studied: user.studied,
      token,
    })
  } else {
    throw new Error('Something went wrong updating profile.')
  }
})

// @desc    Get single user by id
// @route   GET /api/users/:id
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json(user)
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getSingleUser,
  getAllUsers,
}
