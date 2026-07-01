const userModel=require("../model/userModel")
const {validationResult}=require("express-validator")
exports.registerUser=async(req , res , next)=>{
    try {

const error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({
        error:error.array()
    })
}


        const name = req.body.name;
        const email = req.body.email;
        const password= req.body.password
        const role = req.body.role
        
      const registeredUser=  await userModel.RegisterUser(name,email,password,role)
    } catch (error) {
        next(error)
    }
}