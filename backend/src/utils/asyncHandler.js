const ansyncHandler = (requestHandler)=>{
    return (req , res , next )=>{
        Promise.resolve(requestHandler(req, res , next)).catch((err)=> next(err))
    }
}

module.export = ansyncHandler 
