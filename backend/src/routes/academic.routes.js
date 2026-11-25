const express = require('express');
const router = express.Router();
const {
  getClassesAndSections,
  createClass,
  createSection,
  enrollStudent,
  recordDailyAttendance,
  getStudentAttendance,
} = require('../controller/academic.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');

// Public/Class list
router.get('/classes', getClassesAndSections);

// Authenticated
router.use(verifyJWT);

// Admin structure setup
router.post('/classes', authorizeRoles('admin'), createClass);
router.post('/sections', authorizeRoles('admin'), createSection);
router.post('/students', authorizeRoles('admin'), enrollStudent);

// Attendance (Faculty / Admin)
router.post('/attendance', authorizeRoles('admin', 'faculty'), recordDailyAttendance);
router.get('/attendance/student/:studentId', getStudentAttendance);

module.exports = router;
