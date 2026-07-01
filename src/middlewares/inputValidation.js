const { check } = require("express-validator")
const { pool } = require("../../database/pool")
exports.inputValidation = [
    check("name").trim().notEmpty().isLength({ min: 4, max: 15 }).withMessage("Name must be greater then 4 digit and less then 15").bail().isAlpha().withMessage("Only letters are allowed"),
    check("email").trim().isEmail().normalizeEmail().withMessage("Invalid Email").bail().custom(async (value, { req }) => {
        try {
            const userExist = await pool.query(' SELECT id FROM  users WHERE  email=$1',[value])
            if (userExist.rowCount>0) {
                throw new Error("User already registered")
            }
            return true
        } catch (error) {
            throw error
        }
    }),
    check('password')
        .notEmpty()
        .withMessage("Password Cannot be empty")
        .bail()
        .isLength({ min: 5, max: 15 })
        .withMessage("Password length must be in between 5 to 15"),
    check('confirmPassword')
        .notEmpty()
        .withMessage("Confirm-Password Cannot be empty")
        .bail()
        .isLength({ min: 5, max: 15 })
        .withMessage("confirm-Password length must be inbetween 5 to 15")
        .bail()
        .custom((value, { req }) => {

            try {
                if (value !== req.body.password) {
                    throw new Error("Password and Confirm Password Mismatch")
                }
                return true
            } catch (error) {
                throw error;
            }
        }),

        check('role').isIn(['admin','user']).withMessage("Invalid role ")

]
