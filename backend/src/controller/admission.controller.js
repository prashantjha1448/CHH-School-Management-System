const AdmissionSettings = require('../models/admission.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get current admission banner settings
 * @route   GET /api/v1/admission
 * @access  Public
 */
const getAdmissionSettings = asyncHandler(async (req, res) => {
  let settings = await AdmissionSettings.findOne();

  // If no settings exist in DB yet, create default entry matching official website
  if (!settings) {
    settings = await AdmissionSettings.create({
      session: '2026–27',
      title: 'Admissions Open for 2026–27',
      subtitle:
        "Enrol your child at one of Katihar's finest CBSE schools. Limited seats available for Nursery to Class XII.",
      applyBtnText: 'Apply Now',
      feeStructureBtnText: 'View Fee Structure',
      isOpen: true,
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        settings,
        'Admission banner settings retrieved successfully'
      )
    );
});

/**
 * @desc    Update admission banner settings
 * @route   PUT /api/v1/admission
 * @access  Private/Admin
 */
const updateAdmissionSettings = asyncHandler(async (req, res) => {
  const { session, title, subtitle, applyBtnText, feeStructureBtnText, isOpen } =
    req.body;

  let settings = await AdmissionSettings.findOne();
  if (!settings) {
    settings = new AdmissionSettings();
  }

  if (session) settings.session = session;
  if (title) settings.title = title;
  if (subtitle) settings.subtitle = subtitle;
  if (applyBtnText) settings.applyBtnText = applyBtnText;
  if (feeStructureBtnText) settings.feeStructureBtnText = feeStructureBtnText;
  if (isOpen !== undefined) settings.isOpen = isOpen;

  await settings.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        settings,
        'Admission settings updated successfully'
      )
    );
});

module.exports = {
  getAdmissionSettings,
  updateAdmissionSettings,
};
