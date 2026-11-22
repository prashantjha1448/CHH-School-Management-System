const Gallery = require('../models/gallery.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const {
  uploadToCloudinaryFromBuffer,
  deleteFromCloudinary,
} = require('../config/cloudinary');

/**
 * @desc    Get gallery items with optional category filtering
 * @route   GET /api/v1/gallery
 * @access  Public
 */
const getGalleryItems = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const query = {};
  if (category && category !== 'All') {
    query.category = category;
  }

  const items = await Gallery.find(query).sort({
    displayOrder: 1,
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, items, 'Gallery items retrieved successfully'));
});

/**
 * @desc    Get dynamic list of gallery categories
 * @route   GET /api/v1/gallery/categories
 * @access  Public
 */
const getGalleryCategories = asyncHandler(async (req, res) => {
  const categories = [
    'All',
    'Campus',
    'Events',
    'Sports',
    'Annual Function',
    'Classrooms',
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, 'Gallery categories retrieved successfully')
    );
});

/**
 * @desc    Add new photo to gallery with Cloudinary image upload
 * @route   POST /api/v1/gallery
 * @access  Private/Admin
 */
const createGalleryItem = asyncHandler(async (req, res) => {
  const { title, category, caption, displayOrder } = req.body;

  if (!title || !category) {
    throw new ApiError(400, 'Title and Category are required');
  }

  let imageUrl = req.body.imageUrl || '';
  let imagePublicId = '';

  if (req.file) {
    try {
      const uploadResult = await uploadToCloudinaryFromBuffer(req.file.buffer, {
        folder: 'chh_school_management/gallery',
        resource_type: 'image',
      });
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    } catch (uploadError) {
      console.error('Cloudinary image upload error:', uploadError);
      throw new ApiError(500, 'Failed to upload photo to Cloudinary');
    }
  }

  if (!imageUrl) {
    throw new ApiError(400, 'An image file or valid imageUrl is required');
  }

  const galleryItem = await Gallery.create({
    title: title.trim(),
    category,
    imageUrl,
    imagePublicId,
    caption: caption || '',
    displayOrder: displayOrder ? Number(displayOrder) : 0,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, galleryItem, 'Gallery item added successfully')
    );
});

/**
 * @desc    Delete gallery item and remove image from Cloudinary
 * @route   DELETE /api/v1/gallery/:id
 * @access  Private/Admin
 */
const deleteGalleryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Gallery.findById(id);
  if (!item) {
    throw new ApiError(404, `Gallery item not found with ID: ${id}`);
  }

  if (item.imagePublicId) {
    await deleteFromCloudinary(item.imagePublicId, 'image');
  }

  await Gallery.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Gallery item deleted successfully'));
});

module.exports = {
  getGalleryItems,
  getGalleryCategories,
  createGalleryItem,
  deleteGalleryItem,
};
