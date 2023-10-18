import { body, param } from "express-validator";

import validationMiddleware from "../middlewares/validator.middleware"

export const createProductValidator = [
    body("title")
        .isString()
        .withMessage("title must be a string"),
    body("price")
        .isInt()
        .custom((value) => {
            if (value < 0) {
                return Promise.reject("price must be a positive number");
            }
            return Promise.resolve();
        })
        .optional()
        .withMessage("price must be a number"),
    validationMiddleware
];

export const updateProductValidator = [
    body("title")
        .optional()
        .isString()
        .withMessage("title must be a string"),
    body("price")
        .optional()
        .isInt()
        .custom((value) => {
            if (value < 0) {
                return Promise.reject("price must be a positive number");
            }
            return Promise.resolve();
        })
        .optional()
        .withMessage("price must be a number"),
    validationMiddleware
];
