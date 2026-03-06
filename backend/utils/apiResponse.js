
const success = (res, options = {}) => {
  const { statusCode = 200, message = '', data = {} } = options;
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

module.exports = { success };
