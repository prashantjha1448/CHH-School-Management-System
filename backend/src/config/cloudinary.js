const cloudinary = require('cloudinary').v2;
const fs = require('fs');

/**
 * Cloudinary Configuration
 * Reads credentials from environment variables
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload Buffer directly to Cloudinary (Works with multer memoryStorage)
 * @param {Buffer} fileBuffer - The file buffer from req.file.buffer
 * @param {Object} options - Cloudinary upload options (folder, resource_type, etc.)
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinaryFromBuffer = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'chh_school_management',
        resource_type: options.resource_type || 'auto',
        ...options,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete Asset from Cloudinary by public_id
 * @param {string} publicId - The public ID of the resource
 * @param {string} resourceType - 'image', 'raw' (for pdfs), etc.
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) return null;
    return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error(`Error deleting asset from Cloudinary: ${error.message}`);
    return null;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinaryFromBuffer,
  deleteFromCloudinary,
};
