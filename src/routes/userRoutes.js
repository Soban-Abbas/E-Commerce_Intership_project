const e = require("express");
const express=require("express");
const userControllers=require("../controllers/userController")
const router=express.Router();


router.post('/register',userControllers.registerUser)


module.exports=router