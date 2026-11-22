const Enquiry = require('../models/enquiry.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Submit a contact / admission enquiry form
 * @route   POST /api/v1/contact
 * @access  Public
 */
const submitEnquiry = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    throw new ApiError(
      400,
      'Full Name, Email, Subject, and Message are required fields'
    );
  }

  const enquiry = await Enquiry.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone ? phone.trim() : '',
    subject: subject.trim(),
    message: message.trim(),
    status: 'Pending',
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        enquiry,
        'Thank you! Your enquiry has been received. Our admissions desk will reach out shortly.'
      )
    );
});

/**
 * @desc    Get all enquiries with optional status filter
 * @route   GET /api/v1/contact
 * @access  Private/Admin
 */
const getAllEnquiries = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};
  if (status && ['Pending', 'Contacted', 'Resolved'].includes(status)) {
    query.status = status;
  }

  const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, enquiries, 'Enquiries retrieved successfully'));
});

/**
 * @desc    Update enquiry status and notes
 * @route   PATCH /api/v1/contact/:id/status
 * @access  Private/Admin
 */
const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status || !['Pending', 'Contacted', 'Resolved'].includes(status)) {
    throw new ApiError(
      400,
      "Invalid status. Must be one of: 'Pending', 'Contacted', 'Resolved'"
    );
  }

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new ApiError(404, `Enquiry not found with ID: ${id}`);
  }

  enquiry.status = status;
  if (notes !== undefined) enquiry.notes = notes;

  await enquiry.save();

  return res
    .status(200)
    .json(new ApiResponse(200, enquiry, 'Enquiry status updated successfully'));
});

/**
 * @desc    Delete enquiry
 * @route   DELETE /api/v1/contact/:id
 * @access  Private/Admin
 */
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) {
    throw new ApiError(404, `Enquiry not found with ID: ${id}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Enquiry deleted successfully'));
});

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
