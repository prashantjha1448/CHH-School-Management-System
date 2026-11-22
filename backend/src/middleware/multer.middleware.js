const multer = require('multer');
const ApiError = require('../utils/ApiError');

// In-memory storage for streaming directly to Cloudinary
const storage = multer.memoryStorage();

// File filter for images and documents (PDFs)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
    'application/pdf',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type '${file.mimetype}'. Only JPG, PNG, WEBP, and PDF documents are allowed.`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max file size
  },
  fileFilter,
});

module.exports = upload;
