const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    avatar: {
      type: String,
      default:
        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    },
    bio: {
      type: String,
    },
    contact: {
      url: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    job: {
      type: String,
    },
    position: {
      type: String,
    },
    studied: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Method for matching entered password and hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt) // hash the password before saving
})

module.exports = mongoose.model('User', userSchema)
