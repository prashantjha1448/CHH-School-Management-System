
const  mongoose  = require("mongoose");

const studentSchema = new mongoose.Schema({
    full_Name: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "First name must be at least 3 characters"],
            maxlength: [25, "First name cannot exceed 25 characters"],
            trim: true
        },

        middleName: {
            type: String,
            minlength: [3, "Middle name must be at least 3 characters"],
            maxlength: [10, "Middle name cannot exceed 10 characters"],
            trim: true
        },

        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [3, "Last name must be at least 3 characters"],
            maxlength: [10, "Last name cannot exceed 10 characters"],
            trim: true
        }

    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique:  true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    enrollmentNo: {
        type: String,
        required: [true, "Enrollment number is required"],
        unique: true,
        trim: true,
        uppercase: true,
        match: [/^[A-Z0-9]+$/, "Enrollment number can contain only letters and numbers"]
    },
    admissionNumber: {
        type: String,
        required: [true, "Admission number is required"],
        unique: true,
        trim: true,
        uppercase: true
    },
    phone: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: {
            type: String,
            match: [/^\d{6}$/, "Invalid pincode"]
        }
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Graduated", "Transferred", "Expelled"],
        default: "Active"
    },
    category: {
        type: String,
        enum: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS",
            "Other",
            "RTE"
        ],
        default: "General"
    },
   admissionDate: {
        type: Date,
        default: Date.now
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true
    },
},{
    timestamps : true
})

const student_Model = mongoose.model('Students',studentSchema)
module.exports = student_Model