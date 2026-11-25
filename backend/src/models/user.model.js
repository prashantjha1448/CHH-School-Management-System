const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    enrollmentId: {
      type: String,
      trim: true,
      uppercase: true,
      sparse: true, // Allows null/missing for non-students while ensuring uniqueness when present
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Do not return password by default in queries
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "faculty", "student", "parent"],
        message: "{VALUE} is not a valid role (admin, faculty, student, parent)",
      },
      lowercase: true,
      default: "student",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
      default: "",
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "Katihar" },
      state: { type: String, default: "Bihar" },
      pincode: { type: String, default: "" },
    },
    emergencyContact: {
      name: { type: String, default: "" },
      relation: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
    achievements: [
      {
        title: { type: String, required: true },
        year: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    facultyDetails: {
      department: { type: String, default: "" },
      qualification: { type: String, default: "" },
      experienceYears: { type: Number, default: 0 },
      subjectsHandled: [{ type: String }],
    },
    studentDetails: {
      currentClass: { type: String, default: "" },
      section: { type: String, default: "" },
      rollNumber: { type: String, default: "" },
      admissionYear: { type: String, default: "2026" },
      fatherName: { type: String, default: "" },
      motherName: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password with bcrypt
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method to check password validity
UserSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT Access Token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      enrollmentId: this.enrollmentId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }
  );
};

// Generate JWT Refresh Token
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    }
  );
};

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
