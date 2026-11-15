const ApiError = require('../utils/ApiError')

const errorHandler = (err , req , res , next )=>{
    let error = err;

    if(error instanceof ApiError){
        const statusCode = error.statusCode || (error.name === "validationError" ? 400 : 500);
        const message = error.message || "Internal Server Error" ;
        error = new ApiError(statusCode , message , error.errors || [] , err.stack);
    }










}


module.exports = errorHandler 