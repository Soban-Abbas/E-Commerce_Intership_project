const userModel=require("../model/userModel")
const {validationResult}=require("express-validator")
const bycrypt=require("bcryptjs")
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
        const saltRound=10;
        const encryptedPassword=await bycrypt.hash(password,saltRound)
      const registeredUser=  await userModel.RegisterUser(name,email,encryptedPassword,role)
      res.status(201).json({
        message:"User Register Successfully",
        data:{
            id: registeredUser.rows[0].id,
            name: registeredUser.rows[0].name,
            email: registeredUser.rows[0].email,
            role: registeredUser.rows[0].role,
            createdat: registeredUser.rows[0].createdat
        }
      })
    } catch (error) {
        next(error)
    }
}