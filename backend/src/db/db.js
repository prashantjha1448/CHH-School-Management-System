const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        mongoose.connect()
    } catch (error) {
        console.log(error);
    }
}