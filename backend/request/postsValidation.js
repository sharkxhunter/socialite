const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'addPostValidation': {
      return [
        body('text').notEmpty().withMessage('Text is required').trim().escape(),
        // body('tags').notEmpty().withMessage('Tags is required').trim().escape(),
      ]
    }

    default: {
      throw new Error('Invalid validation')
    }
  }
}
