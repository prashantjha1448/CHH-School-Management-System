const  mongoose  = require("mongoose");

const School_Schema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true,"School name is required"],
        trim: true,
        minlength: [3, "School name must be at least 3 characters"],
        maxlength: [100, "School name cannot exceed 100 characters"]
        
    }
})