const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Verify JWT Middleware
 * Validates access tokens passed via Authorization Bearer header or cookies
 */
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Authentication required: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User no longer exists");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account suspended. Please contact school administration.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, error?.message || "Invalid or expired access token");
  }
});

/**
 * Role-Based Access Control Middleware
 * Restricts endpoint access to specific roles (e.g. 'admin', 'faculty', 'student')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role?.toLowerCase())) {
      throw new ApiError(
        403,
        `Access denied: Role '${req.user?.role || "anonymous"}' is not authorized to access this resource`
      );
    }
    next();
  };
};

module.exports = {
  verifyJWT,
  authorizeRoles,
};
