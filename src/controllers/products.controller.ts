import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {IProduct} from "../models/Product.model";
import {
    countProducts, createOneProduct,
    deleteOneProduct,
    findProductById,
    getProducts,
    updateOneProduct
} from "../services/products.service";

dotenv.config();

/**
 * @async
 * @description update product data
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function updateProduct  (req: Request, res: Response): Promise<Response> {
    // TODO: upload image buy multer and use the path in the body im image
    // TODO: validate data
    try {
        const { id} = req.params;
        const { title, price } = req.body;
        const {user}: jwt.JwtPayload = req;
        const image = req.file;
        let image_path : string|null = null;

        if(image !== undefined){
             image_path = `${req.hostname}:${process.env.PORT || 3000}/${image?.path}`;
        }

        const existingProduct:IProduct|null = await findProductById(parseInt(id));

        if(!existingProduct) return res.status(404).json({ message: "product not found" });
        if(existingProduct.user_id !== user?.id) return res.status(401).json({ message: "unauthorized: you can only update your own product" });

        const product:[affectedCount: number] = await updateOneProduct(parseInt(id), { title, price, image:image_path ?? existingProduct.image });

        return res
            .status(200)
            .json({
                message: "product data updated successfully",
                affected_rows: product.length === 1 ? product[0] : product
            });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }

}
/**
 * @async
 * @description create product
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function createProduct  (req: Request, res: Response): Promise<Response> {
    // TODO: validate data
    try {
        const { title, price } = req.body;
        const {user}: jwt.JwtPayload = req;
        const image = req.file;

        if(image === undefined) return res.status(400).json({ message: "image is required" });

        const image_path: string = `${req.hostname}:${process.env.PORT || 3000}/${image?.path}`;

        const product:IProduct = await createOneProduct( { title, price, user_id: user?.id, image:image_path });

        return res
            .status(201)
            .json({
                message: "product created successfully",
                product
            });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
}

/**
 * @async
 * @description delete user
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function deleteProduct (req: Request, res: Response): Promise<Response> {
    try {
        const  id: number = parseInt( req.params.id );
        const product: IProduct|null = await findProductById(id);
        const {user}: jwt.JwtPayload = req;

        if(!product) return res.status(404).json({ message: "product not found" });
        if(product.user_id !== user?.id) return res.status(401).json({ message: "unauthorized: you can only delete your own product" });


        const affectedRow: number = await deleteOneProduct(id);
        return res
            .status(200)
            .json({message: "product deleted successfully", affectedRow });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
}

/**
 * @async
 * @description list users with pagination
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async  function getAllProducts (req: Request, res: Response): Promise<Response> {
    try {
        const { page = 1, count = 10 } = req.query;
        const offset = (parseInt(page.toString()) - 1) * parseInt(count.toString());

        const products: IProduct[] = await getProducts(offset,parseInt(count.toString()));
        const productsCount: number = await countProducts();

        return res.status(200).json({ data: products, total: productsCount });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
}

/**
 * @async
 * @description return user by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async  function getProduct (req: Request, res: Response): Promise<Response> {
    try {

        const { id } = req.params;
        const product: IProduct|null = await findProductById(parseInt(id));

        return res.status(200).json({ data: product });

    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
}