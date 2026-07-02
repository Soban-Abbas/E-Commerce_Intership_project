const express=require("express");
const router=express.Router();
const productControllers=require("../controllers/productController")
const { validateProductInfo }=require("../middlewares/productInputValidation")
const {islogin}=require("../middlewares/islogin")
const {isAdmin}=require("../middlewares/isAdmin")
router.post("/product", islogin, isAdmin,validateProductInfo,productControllers.addNewProduct)
router.get("/product",islogin,productControllers.getAllProducts)
module.exports=router