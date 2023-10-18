import ProductModel, {IProduct} from "../models/Product.model";

/**
 * @async
 * @description list products with pagination
 * @param  {int} offset - pag. offset
 * @param  {int} count - pag. limit
 */
export async function getProducts (offset: number, count: number):Promise<IProduct[]>{
    return await ProductModel.findAll({
        limit: count,
        offset: offset,
    });
}

/**
 * @async
 * @description count products
 */
export async function countProducts ():Promise<number> {
    return await ProductModel.count();
}

/**
 * @async
 * @description find product by id
 * @param  {int} id - user id
 */
export async function findProductById (id: number):Promise<IProduct | null> {
    return await ProductModel.findOne({where: {id}});
}

/**
 * @async
 * @description update product data
 * @param  {int} id - user id
 * @param  {object} data - user data
 */
export async function updateOneProduct (id:number, data: Object): Promise<[affectedCount: number]> {
    return await ProductModel.update( data, { where: { id } } );
}

/**
 * @async
 * @description update product data
 * @param  {object} data - user data
 */
export async function createOneProduct (data: {}): Promise<IProduct> {
    return await ProductModel.create(data );
}

/**
 * @async
 * @description delete product
 * @param  {int} id - user id
 */
export async function deleteOneProduct (id: number): Promise<number> {
    return await ProductModel.destroy({where: {id}});
}