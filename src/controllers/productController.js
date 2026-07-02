const { validationResult } = require("express-validator")
const productModel = require("../model/productModel")
exports.addNewProduct = async (req, res, next) => {
const{name,sku,quantity,price,category}=req.body
    const productOwnerId=req.user.id
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        })
    }

    try {
        const newProduct = await productModel.addProductToDataBase(name,sku,quantity,price,category,productOwnerId);
        res.status(201).json({
            message: " New Product Created Successfully",
            data: {
                id: newProduct.rows[0].id,
                name: newProduct.rows[0].name,
                sku: newProduct.rows[0].sku,
                quantity: newProduct.rows[0].quantity,
                price: newProduct.rows[0].price,
                category: newProduct.rows[0].category,
                createdat: newProduct.rows[0].createdat,
                ProductOwnerId: newProduct.rows[0].productownerid,
            }
        })
    } catch (error) {
        next(error)
    }




}

exports.getAllProducts=async(req,res,next)=>{
    try {
        const Products=await productModel.getProducts();
        if(req.user.role==="admin"){
    
           return res.status(200).json({
                message:"Products Fetched Successfully",
                data:[
                    ...Products.rows
                ]
            })
        }
        const limiteddata = Products.rows.map(product => {
            return ({
                name: product.name,
                price: product.price,
                category: product.category,
                sku: product.sku,
                quantity: product.quantity

            })
        })
        res.status(200).json({
            message:"Products Fetched Successfully",
            data:[
...limiteddata
            ]

        })
    } catch (error) {
        next(error)
    }
    
}