import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

import {UserModel,IUser} from "../models/User.model";
import {authConfig} from "../configs/constants.config";

/**
 * @async
 * @description create user
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function register (req: Request, res: Response):Promise<Response> {
    try {
        const { name, username, password } = req.body;
        const existedUser:IUser|null = await UserModel.findOne({ where: { username } });
        if(existedUser !== null){
            return res.status(400).json({message: "username already existed"})
        }
        const hashedPassword:string = await bcrypt.hash(password, 10);
        const newUser: IUser = await UserModel.create({name, username, password: hashedPassword});
        const token:string = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
            },
            authConfig.jwt_secret,
        );
        return res.status(200).json({ token });
    } catch (error) {
        return  res.status(400).json({error});
    }
}

/**
 * @async
 * @description login
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function login (req: Request, res: Response): Promise<Response>{
    try {
        const { username, password } = req.body;
        const user:IUser|null = await UserModel.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        const passwordMatch:boolean = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            authConfig.jwt_secret,
        );
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error });
    }
}