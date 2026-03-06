const generateToken = (user) => {
  const { generateToken } = require('./jwt');
  return generateToken({ userId: user._id, role: user.role });
};

module.exports = generateToken;

