const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

const generateToken = ({ userId, role }) => {
  return jwt.sign({ userId, role }, getJwtSecret(), { expiresIn: '1d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  generateToken,
  verifyToken
};

