const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const postShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
)

// tags: {
//   type: String,
//   required: true,
// },

module.exports = mongoose.model('Post', postShema)
