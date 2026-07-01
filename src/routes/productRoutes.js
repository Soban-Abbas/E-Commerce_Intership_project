const express=require("express");
const router=express.Router();
const productControllers=require("../controllers/productController")
const {islogin}=require("../middlewares/islogin")
const {isAdmin}=require("../middlewares/isAdmin")
router.post("/product",islogin,isAdmin,productControllers.addNewProduct)

module.exports=router