import express, {Router} from "express";
import {uploadFile} from "../middlewares/uploadfile.middleware";

import {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct
} from "../controllers/products.controller";
import {auth} from "../middlewares/auth.middleware";


const router: Router = express.Router();

router.route("/")
    .get(auth,getAllProducts)
    .post(auth, uploadFile, createProduct);
router.route("/:id")
    .patch(auth, uploadFile, updateProduct)
    .delete(auth, deleteProduct);

export default router;