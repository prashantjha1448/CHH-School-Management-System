const express = require('express');
const router = express.Router();
const {
  getFeeStructures,
  createFeeStructure,
  generateInvoice,
  recordFeePayment,
  getStudentFeeHistory,
  getFeeAnalytics,
} = require('../controller/fee.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');

// Public / Semi-public: Anyone logged in can view structures
router.get('/structures', getFeeStructures);

// Authenticated routes
router.use(verifyJWT);

// Admin-only management
router.post('/structures', authorizeRoles('admin'), createFeeStructure);
router.post('/invoices', authorizeRoles('admin'), generateInvoice);
router.get('/analytics', authorizeRoles('admin'), getFeeAnalytics);

// Payments & Student History
router.post('/payments', recordFeePayment);
router.get('/student/:studentId', getStudentFeeHistory);

module.exports = router;
