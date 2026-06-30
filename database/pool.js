const {Pool}=require("pg");
exports.pool=new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.databaseName,
    password: process.env.databasePassword ,
    port: process.env.databasePort,
})

