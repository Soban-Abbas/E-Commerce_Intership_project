const express = require("express");
require('dotenv').config()
const { pool } = require("./database/pool")
const { createTables } = require("./database/initTables")
const userRoutes=require("./src/routes/userRoutes")
const bodyParser=require("body-parser")
const { globalErrorMiddleware }=require("./src/middlewares/globalErrorHandling")
const app = express();
app.use(bodyParser.json())







app.use('/api/tasks',userRoutes);






app.use('/',async(req,res, next)=>{
    res.status(200).json({
        message:"Wellcome to Online shop"
    })
})



app.use(globalErrorMiddleware)


async function StartApp() {
    try {
        await createTables();
        app.listen(3000,()=>{
            console.log("App Started at 3000 port")
        })
    } catch (error) {
        console.log(error)
    }
}
StartApp();