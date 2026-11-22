const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    category: {
      type: String,
      enum: ['Campus', 'Events', 'Sports', 'Annual Function', 'Classrooms'],
      required: [true, 'Category is required (Campus, Events, Sports, Annual Function, Classrooms)'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    imagePublicId: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryModel = mongoose.model('Gallery', GallerySchema);

module.exports = GalleryModel;
