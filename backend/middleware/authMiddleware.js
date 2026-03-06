const User = require('../models/User');
const { verifyToken: verifyJwt } = require('../utils/jwt');

const verifyToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token', data: {} });
  }

  try {
    const decoded = verifyJwt(token);
    req.auth = decoded; // { userId, role, iat, exp }
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found', data: {} });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed', data: {} });
  }
};

const roleMiddleware = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient role', data: {} });
  }
  next();
};

module.exports = {
  // requested exports
  verifyToken,
  roleMiddleware,

  // backward-compatible aliases (used elsewhere in this repo)
  protect: verifyToken,
  authorizeRoles: roleMiddleware
};

