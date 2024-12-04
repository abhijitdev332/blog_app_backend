
function globalError (err,req,res,next){
    return new Error("handled by globals",{err})
}

export default globalError