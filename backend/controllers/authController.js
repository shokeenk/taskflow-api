const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { success } = require('../utils/apiResponse');
const { ApiError } = require('../middleware/errorHandler');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, 'User already exists');
  }

  await User.create({
    name,
    email,
    password,
    role
  });

  return success(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: {}
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const token = generateToken(user);

  return success(res, {
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  });
};
