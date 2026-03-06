
class ApiError extends Error {
  constructor(statusCode, message, data = {}) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';
  const data = err.data || {};

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    data.errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  }
  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate value';
  }

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    data
  });
};

module.exports = {
  ApiError,
  errorHandler
};
