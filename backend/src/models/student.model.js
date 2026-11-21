const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    full_Name: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "First name cannot exceed 50 characters"],
        trim: true,
      },
      middleName: {
        type: String,
        maxlength: [50, "Middle name cannot exceed 50 characters"],
        trim: true,
        default: "",
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [50, "Last name cannot exceed 50 characters"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    enrollmentNo: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9-]+$/, "Enrollment number can contain only letters, numbers, and hyphens"],
    },
    admissionNumber: {
      type: String,
      required: [true, "Admission number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "Katihar" },
      state: { type: String, default: "Bihar" },
      pincode: {
        type: String,
        match: [/^\d{6}$/, "Invalid 6-digit postal pincode"],
      },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated", "Transferred", "Expelled"],
      default: "Active",
    },
    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "EWS", "Other", "RTE"],
      default: "General",
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    class: {
      type: String,
      required: [true, "Class is required (e.g. Class X)"],
      trim: true,
    },
    section: {
      type: String,
      default: "A",
      trim: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
