const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    category: {
      type: String,
      enum: [
        'General',
        'Admission',
        'Examination',
        'Holiday',
        'Event',
        'CBSE',
        'Important',
      ],
      default: 'General',
    },
    content: {
      type: String,
      required: [true, 'Notice content is required'],
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    isHighPriority: {
      type: Boolean,
      default: false,
    },
    pdfUrl: {
      type: String,
      default: '',
    },
    pdfPublicId: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'School Administration',
    },
  },
  {
    timestamps: true,
  }
);

const NoticeModel = mongoose.model('Notice', NoticeSchema);

module.exports = NoticeModel;
