const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controller/enquiry.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

// Rate limiter for enquiry form submissions to prevent spam (max 5 submissions per 15 min per IP)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many enquiry submissions from this IP. Please try again after 15 minutes.',
  },
});

// Public Route (Submit contact/admission enquiry)
router.post('/', enquiryLimiter, submitEnquiry);

// Admin Protected Routes
router.get('/', verifyJWT, authorizeRoles('admin'), getAllEnquiries);
router.patch('/:id/status', verifyJWT, authorizeRoles('admin'), updateEnquiryStatus);
router.delete('/:id', verifyJWT, authorizeRoles('admin'), deleteEnquiry);

module.exports = router;
