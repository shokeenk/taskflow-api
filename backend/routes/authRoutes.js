const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { validateRegister } = require('../middleware/validators');
const User = require('../models/User');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', login);

// Example admin-only route
router.get('/users', protect, authorizeRoles(User.ROLES.ADMIN), async (req, res) => {
  const User = require('../models/User');
  const users = await User.find().select('-password');
  return require('../utils/apiResponse').success(res, { data: { users } });
});

module.exports = router;

