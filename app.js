const express = require("express");
require('dotenv').config()
const { pool } = require("./database/pool")
const { createTables } = require("./database/initTables")

const app = express();



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