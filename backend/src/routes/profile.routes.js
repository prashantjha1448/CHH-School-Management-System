const express = require('express');
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  getUserProfile,
} = require('../controller/profile.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// All profile routes require authentication
router.use(verifyJWT);

// Current user profile
router.route('/me')
  .get(getMyProfile)
  .put(updateMyProfile);

// Avatar upload to Cloudinary
router.route('/avatar')
  .post(upload.single('avatar'), uploadAvatar);

// Specific user profile view
router.route('/:identifier')
  .get(getUserProfile);

module.exports = router;
