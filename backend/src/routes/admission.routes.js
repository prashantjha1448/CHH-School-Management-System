const express = require('express');
const {
  getAdmissionSettings,
  updateAdmissionSettings,
} = require('../controller/admission.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

// Public Route (Fetches current admission banner status)
router.get('/', getAdmissionSettings);

// Admin Protected Route (Update banner texts and open/closed state)
router.put('/', verifyJWT, authorizeRoles('admin'), updateAdmissionSettings);

module.exports = router;
