const e = require("express");
const express=require("express");
const userControllers=require("../controllers/userController")
const { inputValidation }=require("../../src/middlewares/inputValidation")
const router=express.Router();


router.post('/register',inputValidation,userControllers.registerUser)
router.post('/login',userControllers.loginUser)


module.exports=router