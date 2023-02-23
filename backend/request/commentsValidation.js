const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'addCommentValidation': {
      return [
        body('text').notEmpty().withMessage('Text is required').trim().escape(),
      ]
    }

    default: {
      throw new Error('Invalid validation')
    }
  }
}
