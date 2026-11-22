const mongoose = require('mongoose');

const AdmissionSettingsSchema = new mongoose.Schema(
  {
    session: {
      type: String,
      default: '2026–27',
      required: true,
    },
    title: {
      type: String,
      default: 'Admissions Open for 2026–27',
      required: true,
    },
    subtitle: {
      type: String,
      default:
        "Enrol your child at one of Katihar's finest CBSE schools. Limited seats available for Nursery to Class XII.",
      required: true,
    },
    applyBtnText: {
      type: String,
      default: 'Apply Now',
    },
    feeStructureBtnText: {
      type: String,
      default: 'View Fee Structure',
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdmissionSettingsModel = mongoose.model(
  'AdmissionSettings',
  AdmissionSettingsSchema
);

module.exports = AdmissionSettingsModel;
