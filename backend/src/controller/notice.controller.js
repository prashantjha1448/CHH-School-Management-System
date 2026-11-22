const Notice = require('../models/notice.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const {
  uploadToCloudinaryFromBuffer,
  deleteFromCloudinary,
} = require('../config/cloudinary');

/**
 * @desc    Get all notices with optional search and category filtering
 * @route   GET /api/v1/notices
 * @access  Public
 */
const getAllNotices = asyncHandler(async (req, res) => {
  const { category, search } = req.query;

  const query = {};

  if (category && category !== 'All') {
    if (category === 'Important') {
      query.isHighPriority = true;
    } else {
      query.category = category;
    }
  }

  if (search && search.trim() !== '') {
    query.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { content: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  // Sort by priority first, then by date descending
  const notices = await Notice.find(query).sort({
    isHighPriority: -1,
    date: -1,
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, notices, 'Notices retrieved successfully'));
});

/**
 * @desc    Get single notice by ID
 * @route   GET /api/v1/notices/:id
 * @access  Public
 */
const getNoticeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notice = await Notice.findById(id);
  if (!notice) {
    throw new ApiError(404, `Notice not found with ID: ${id}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notice, 'Notice details retrieved successfully'));
});

/**
 * @desc    Create new notice with optional PDF upload
 * @route   POST /api/v1/notices
 * @access  Private/Admin
 */
const createNotice = asyncHandler(async (req, res) => {
  const { title, category, content, date, isHighPriority, author } = req.body;

  if (!title || !content) {
    throw new ApiError(400, 'Title and Content are required fields');
  }

  let pdfUrl = '';
  let pdfPublicId = '';

  // Handle uploaded PDF via Cloudinary
  if (req.file) {
    try {
      const uploadResult = await uploadToCloudinaryFromBuffer(req.file.buffer, {
        folder: 'chh_school_management/notices',
        resource_type: 'raw',
      });
      pdfUrl = uploadResult.secure_url;
      pdfPublicId = uploadResult.public_id;
    } catch (uploadError) {
      console.error('Cloudinary PDF upload error:', uploadError);
      throw new ApiError(500, 'Failed to upload notice PDF document to Cloudinary');
    }
  }

  const notice = await Notice.create({
    title: title.trim(),
    category: category || 'General',
    content,
    date: date || new Date().toISOString().split('T')[0],
    isHighPriority: isHighPriority === 'true' || isHighPriority === true,
    pdfUrl,
    pdfPublicId,
    author: author || req.user?.name || 'School Administration',
  });

  return res
    .status(201)
    .json(new ApiResponse(201, notice, 'Notice created successfully'));
});

/**
 * @desc    Update existing notice
 * @route   PUT /api/v1/notices/:id
 * @access  Private/Admin
 */
const updateNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, content, date, isHighPriority, author } = req.body;

  const notice = await Notice.findById(id);
  if (!notice) {
    throw new ApiError(404, `Notice not found with ID: ${id}`);
  }

  // Handle replacement PDF if uploaded
  if (req.file) {
    if (notice.pdfPublicId) {
      await deleteFromCloudinary(notice.pdfPublicId, 'raw');
    }
    const uploadResult = await uploadToCloudinaryFromBuffer(req.file.buffer, {
      folder: 'chh_school_management/notices',
      resource_type: 'raw',
    });
    notice.pdfUrl = uploadResult.secure_url;
    notice.pdfPublicId = uploadResult.public_id;
  }

  if (title) notice.title = title.trim();
  if (category) notice.category = category;
  if (content) notice.content = content;
  if (date) notice.date = date;
  if (isHighPriority !== undefined) {
    notice.isHighPriority = isHighPriority === 'true' || isHighPriority === true;
  }
  if (author) notice.author = author;

  await notice.save();

  return res
    .status(200)
    .json(new ApiResponse(200, notice, 'Notice updated successfully'));
});

/**
 * @desc    Delete notice and associated PDF from Cloudinary
 * @route   DELETE /api/v1/notices/:id
 * @access  Private/Admin
 */
const deleteNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notice = await Notice.findById(id);
  if (!notice) {
    throw new ApiError(404, `Notice not found with ID: ${id}`);
  }

  if (notice.pdfPublicId) {
    await deleteFromCloudinary(notice.pdfPublicId, 'raw');
  }

  await Notice.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Notice deleted successfully'));
});

module.exports = {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
};
