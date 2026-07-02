const { pool } = require("../../database/pool")
const { check } = require("express-validator")
exports.validateProductInfo = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage("Product Name Cannot be Empty")
        .bail()
        .isLength({ min: 4, max: 20 })
        .withMessage("Product name length is not proper"),
    check('sku')
        .trim()
        .notEmpty()
        .withMessage("sku cannot be empty")
        .bail()
        .isLength({ min: 1, max: 15 })
        .withMessage("sku length should be in between 1 to 20")
        .custom(async (value, { req }) => {
            try {
                const skuExist = await pool.query('select sku from products where sku=$1', [value])
                if (skuExist.rowCount > 0) {
                    throw new Error("sku already exist")

                }
                return true
            } catch (error) {
                throw error
            }
        }),
    check('quantity')
        .trim()
        .notEmpty()
        .withMessage("Quantity cannot be empty")
        .isInt({ min: 1, max: 100 })
        .withMessage("quantity must be in between 1 and 100"),

    check("price")
        .trim()
        .notEmpty()
        .withMessage("Price cannot be empty")
        .isFloat({ min: 0.01, max: 99999999.99 })
        .withMessage("price must be in between 99999999.99 "),
    check('category')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("Invalid category")
]