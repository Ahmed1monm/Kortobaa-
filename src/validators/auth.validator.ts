import { body } from "express-validator";

import validationMiddleware from "../middlewares/validator.middleware"

export const loginValidator = [
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("username")
        .isString()
        .withMessage("Username must be a string"),
    validationMiddleware
];

export const registerValidator = [
    body("username")
        .isString()
        .withMessage("username must be a string"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("name")
        .isString()
        .withMessage("Name must be a string"),
    validationMiddleware
];