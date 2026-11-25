const User = require('../models/user.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinaryFromBuffer } = require('../config/cloudinary');

/**
 * @desc    Get Current Logged-in User Profile
 * @route   GET /api/v1/profile/me
 * @access  Private (All authenticated users)
 */
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }

  return res.status(200).json(
    new ApiResponse(200, user, 'Profile fetched successfully')
  );
});

/**
 * @desc    Update Current User Profile & Bio
 * @route   PUT /api/v1/profile/me
 * @access  Private (All authenticated users)
 */
const updateMyProfile = asyncHandler(async (req, res) => {
  const allowedUpdates = [
    'name',
    'phone',
    'bio',
    'dateOfBirth',
    'gender',
    'bloodGroup',
    'address',
    'emergencyContact',
    'achievements',
    'facultyDetails',
    'studentDetails',
  ];

  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedUser, 'Profile updated successfully')
  );
});

/**
 * @desc    Upload / Update Avatar Image to Cloudinary
 * @route   POST /api/v1/profile/avatar
 * @access  Private (All authenticated users)
 */
const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please select an image file to upload');
  }

  // Upload buffer to Cloudinary in avatars folder
  const uploadResult = await uploadToCloudinaryFromBuffer(
    req.file.buffer,
    'chh_school/avatars',
    'image'
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: uploadResult.secure_url },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        avatarUrl: uploadResult.secure_url,
        user: updatedUser,
      },
      'Profile avatar updated successfully'
    )
  );
});

/**
 * @desc    Get User Profile by ID or Enrollment ID
 * @route   GET /api/v1/profile/:identifier
 * @access  Private (Admin / Faculty / Authorized)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  let user = null;
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findById(identifier);
  } else {
    user = await User.findOne({ enrollmentId: identifier.toUpperCase() });
  }

  if (!user) {
    throw new ApiError(404, `User not found for identifier: ${identifier}`);
  }

  return res.status(200).json(
    new ApiResponse(200, user, 'User profile retrieved successfully')
  );
});

module.exports = {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  getUserProfile,
};
