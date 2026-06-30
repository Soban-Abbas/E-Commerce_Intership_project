const userModel=require("../model/userModel")
exports.registerUser=async(req , res , next)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password= req.body.password
        const role = req.body.role
        
      const registeredUser=  await userModel.RegisterUser(name,email,password,role)
    } catch (error) {
        next(error)
    }
}