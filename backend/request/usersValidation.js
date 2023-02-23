const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'registerUserValidation': {
      return [
        body('name').notEmpty().withMessage('Name is required').trim().escape(),
        body('email')
          .isEmail()
          .withMessage('Please put a valid email')
          .normalizeEmail()
          .trim()
          .escape(),
        // password must be at least 5 chars long
        body('password')
          .notEmpty()
          .withMessage('Password is required')
          .isLength({ min: 7 })
          .withMessage('Password must be 7 characters long')
          .trim()
          .escape(),
      ]
    }

    case 'loginUserValidation': {
      return [
        body('email').isEmail().withMessage('Please put a valid email'),
        // password must be at least 5 chars long
        body('password').notEmpty().withMessage('Password is required'),
      ]
    }

    case 'updateUserValidation': {
      return [
        body('email').isEmail().withMessage('Please put a valid email'),
        // password must be at least 5 chars long
        body('name').notEmpty().withMessage('Name is required'),
      ]
    }

    default: {
      throw new Error('Invalid validation')
    }
  }
}
