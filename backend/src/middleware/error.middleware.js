const ApiError = require('../utils/ApiError');

/**
 * Global Error Handling Middleware
 * Catches all operational and unexpected errors, sanitizes error responses,
 * and prevents server crashes or hanging requests.
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of our custom ApiError, standardize it
  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";
    let errors = [];

    // Mongoose bad ObjectId (CastError)
    if (error.name === "CastError") {
      statusCode = 400;
      message = `Resource not found with id: ${error.value}`;
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      statusCode = 400;
      message = "Validation Error";
      errors = Object.values(error.errors || {}).map((val) => val.message);
    }

    // MongoDB duplicate key error
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0] || "field";
      message = `Duplicate value entered for '${field}'. Please provide an alternative value.`;
    }

    // JWT errors
    if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid authentication token. Please log in again.";
    }

    if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Authentication token expired. Please log in again.";
    }

    error = new ApiError(statusCode, message, errors, err.stack);
  }

  // Construct response payload
  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
