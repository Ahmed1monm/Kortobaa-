import express, {Router} from "express";
import {uploadFile} from "../middlewares/uploadfile.middleware";

import {
    getAllProducts,
    updateProduct,
    deleteProduct,
    createProduct
} from "../controllers/products.controller";
import {
    createProductValidator,
    updateProductValidator,
    } from "../validators/product.validator";
import {auth} from "../middlewares/auth.middleware";


const router: Router = express.Router();

router.route("/")
    .get(auth,getAllProducts)
    .post(auth, uploadFile, createProductValidator, createProduct);
router.route("/:id")
    .patch(auth, uploadFile, updateProductValidator, updateProduct)
    .delete(auth, deleteProduct);

export default router;