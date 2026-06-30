const { pool } = require("../database/pool")
exports.createTables = async () => {
    try {
        await Promise.all([
            pool.query(`CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE,
        password VARCHAR(250) NOT NULL,
        role VARCHAR(250) NOT NULL,
        createdAt timestamp NOT NULL DEFAULT NOW()

    )

    `),
            pool.query(`CREATE TABLE IF NOT EXISTS products
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        sku VARCHAR(50)  UNIQUE,
        quantity INTEGER  NOT NULL,
        price NUMERIC(10,2) NOT NULL ,
        category VARCHAR,
        createdAt timestamp NOT NULL DEFAULT NOW(),
        updatedAt timestamp,
 productOwnerId INTEGER NOT NULL,
    CONSTRAINT FK_USER_PRODUCT
    FOREIGN KEY(productOwnerId)
    REFERENCES  users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE



        

    )`)
        ])
    } catch (error) {
        console.log(error)
    }
}