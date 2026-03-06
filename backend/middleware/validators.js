const { body, validationResult } = require('express-validator');
const { ApiError } = require('./errorHandler');

// Runs after validation chains; sends 400 with standard format if invalid
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  throw new ApiError(400, 'Validation failed', {
    errors: errors.array()
  });
};

// Register: email valid, password minimum 6 characters
const registerRules = [
  body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateRegister = [...registerRules, validate];


const taskRules = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').notEmpty().trim().withMessage('Description is required')
];

const validateTask = [...taskRules, validate];

module.exports = {
  validate,
  validateRegister,
  validateTask
};
