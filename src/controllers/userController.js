const userModel=require("../model/userModel")
const {validationResult}=require("express-validator")
const bycrypt=require("bcryptjs")
const {generateJwt}=require("../../util/generateJWT")
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
        const password= (req.body.password).trim();
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
exports.loginUser=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        const registeredUser=await userModel.getUserByEmail(email);
        if(registeredUser.rowCount<1){
            return res.status(401).json({
                error:"Wrong Email Or Password"
            })
        }
        const correctPassword = bycrypt.compare(password.trim(), registeredUser.rows[0].password) 
        if(!correctPassword){
          return  res.status(401).json({
                error:"wrong Email Or Password"
            })
        }



        const token = generateJwt(registeredUser.rows[0].id, registeredUser.rows[0].email, registeredUser.rows[0].role,)


        res.status(200).json({
            message:"login Successfull",
            id: registeredUser.rows[0].id,
            name: registeredUser.rows[0].name,
            email: registeredUser.rows[0].email,
            role: registeredUser.rows[0].role,
            token:token
        })
    } catch (error) {
        next(error)
        
    }


}