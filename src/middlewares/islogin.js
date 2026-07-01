const jwt=require("jsonwebtoken")
exports.islogin=async(req , res , next)=>{
    let header=req.headers.Authorization || req.headers.authorization
    
    if(!header || !header.startsWith('Bearer')){
        return res.status(401).json({
            error:"Please login first"
        })
    }
    let token=header.split(" ")[1];
    if(!token){
       return res.status(401).json({
            error:"Please login first"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.secretKey)
        req.user={
            id:decode.id,
            email:decode.email,
            role : decode.role
        }
        next()
    } catch (error) {
        error.status=401;
        next(error)
    }
    
}