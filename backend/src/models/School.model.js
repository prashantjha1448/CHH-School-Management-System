const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "School name is required"],
      trim: true,
      minlength: [3, "School name must be at least 3 characters"],
      maxlength: [120, "School name cannot exceed 120 characters"],
      default: "Children's Happy Home",
    },
    shortName: {
      type: String,
      default: "CHH Katihar",
    },
    cbseAffiliationNo: {
      type: String,
      default: "330759",
    },
    schoolCode: {
      type: String,
      default: "65759",
    },
    establishedYear: {
      type: Number,
      default: 1972,
    },
    principalName: {
      type: String,
      default: "Mr. Ajay Kumar Mishra",
    },
    address: {
      type: String,
      default: "Near Gas Godown, Rojidpur, Katihar, Bihar - 854105",
    },
    contactPhone: {
      type: String,
      default: "+91 78588 79081",
    },
    contactEmail: {
      type: String,
      default: "contact@childrenshappyhome.com",
    },
  },
  {
    timestamps: true,
  }
);

const SchoolModel = mongoose.model("School", SchoolSchema);

module.exports = SchoolModel;
