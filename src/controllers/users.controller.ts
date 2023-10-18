import { Request, Response } from "express";

import {
    getUsers,
    countUsers,
    findUserById,
    updateOneUser,
    deleteOneUser
} from "../services/users.service";
import {Model} from "sequelize/types";

/**
 * @async
 * @description update user data
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function updateUser  (req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { username, password, name } = req.body;

        const oldUser:Model|null = await findUserById(parseInt(id));
        if(!oldUser) return res.status(404).json({ message: "user not found" });
        const user:[affectedCount: number] = await updateOneUser(parseInt(id), { username, password, name });

        return res
            .status(200)
            .json({ message: "user updated successfully", affected_rows: user.length === 1 ? user[0] : user });
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
export async function deleteUser (req: Request, res: Response): Promise<Response> {
    try {
        const  id: number = parseInt( req.params.id );
        const user: Model|null = await findUserById(id);

        if(!user) return res.status(404).json({ message: "user not found" });

        const affectedRow: number = await deleteOneUser(id);
        return res
            .status(200)
            .json({message: "user deleted successfully", affectedRow });
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
export async  function getAllUsers (req: Request, res: Response): Promise<Response> {
    try {
        const { page = 1, count = 10 } = req.query;
        const offset = (parseInt(page.toString()) - 1) * parseInt(count.toString());

        const users: Model[] = await getUsers(offset,parseInt(count.toString()));
        const usersCount: number = await countUsers();

        return res.status(200).json({ data: users, total: usersCount });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
}