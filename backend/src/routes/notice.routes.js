const express = require('express');
const {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} = require('../controller/notice.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const router = express.Router();

// Public Routes
router.get('/', getAllNotices);
router.get('/:id', getNoticeById);

// Admin Protected Routes (Supports PDF file upload via key: 'pdf')
router.post(
  '/',
  verifyJWT,
  authorizeRoles('admin'),
  upload.single('pdf'),
  createNotice
);

router.put(
  '/:id',
  verifyJWT,
  authorizeRoles('admin'),
  upload.single('pdf'),
  updateNotice
);

router.delete('/:id', verifyJWT, authorizeRoles('admin'), deleteNotice);

module.exports = router;
