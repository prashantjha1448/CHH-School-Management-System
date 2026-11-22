const express = require('express');
const {
  getGalleryItems,
  getGalleryCategories,
  createGalleryItem,
  deleteGalleryItem,
} = require('../controller/gallery.controller');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const router = express.Router();

// Public Routes
router.get('/', getGalleryItems);
router.get('/categories', getGalleryCategories);

// Admin Protected Routes (Supports photo file upload via key: 'image')
router.post(
  '/',
  verifyJWT,
  authorizeRoles('admin'),
  upload.single('image'),
  createGalleryItem
);

router.delete('/:id', verifyJWT, authorizeRoles('admin'), deleteGalleryItem);

module.exports = router;
