const  mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Name is required"],
        trim : true
    },
    email : {
        type : String ,
        required : [true , "email is required"],
        unique : true,
        lowercase : true,
        trim : true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
        
    },
    password : {
        type : String,
        select : false,
        required: [true, "Password is required"]
    },
    role : {
        type : String,
        enum : ['Admin', 'Teacher', 'Student', 'Parent'],
        default : 'Student',
    },
    isActive : {
        type : Boolean,
        default : true,
    },
    refreshToken : {
        type : String,
        default : "",
    },
    avatar : {
        type : String,
        default : ""
    }
    
},{
    timestamps : true
})

const userModel = mongoose.model('users', UserSchema)

module.exports = userModel