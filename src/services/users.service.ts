import {IRouterHandler} from "express";
import {IUser, UserModel} from "../models/User.model";
import {Model} from "sequelize/types";

/**
 * @async
 * @description list users
 * @param  {int} offset - pag. offset
 * @param  {int} count - pag. limit
 */
export async function getUsers (offset: number, count: number):Promise<IUser[]>{
    return await UserModel.findAll({
        limit: count,
        offset: offset,
    });
}

/**
 * @async
 * @description count users
 */
export async function countUsers ():Promise<number> {
    return await UserModel.count();
}

/**
 * @async
 * @description find user
 * @param  {int} id - user id
 */
export async function findUserById (id: number):Promise<IUser | null> {
    return await UserModel.findOne({where: {id}});
}

/**
 * @async
 * @description update user data
 * @param  {int} id - user id
 * @param  {object} data - user data
 */
export async function updateOneUser (id:number, data: Object): Promise<[affectedCount: number]> {
    return await UserModel.update( data, { where: { id } } );
}

/**
 * @async
 * @description delete user
 * @param  {int} id - user id
 */
export async function deleteOneUser (id: number): Promise<number> {
    return await UserModel.destroy({where: {id}});
}