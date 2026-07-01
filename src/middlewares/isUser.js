exports.isUser=(req , res, next)=>{
    if(req.user.role==="user"){
        next()

    }else{
      return  res.status(403).json({
            error:"Admin is not  Allowed for that Specific Route"
        })
    }
}