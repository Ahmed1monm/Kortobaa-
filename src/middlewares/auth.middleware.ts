import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import {authConfig} from "../configs/constants.config";

declare global {
    namespace Express {
        interface Request {
            user?: jwt.JwtPayload | string;
        }
    }
}

export async function auth (req: Request, res: Response, next: NextFunction):Promise<Response|void> {
    let accessToken:string|undefined = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json("You are not authenticated!");
    }
    accessToken = accessToken.split(" ")[1];
    try {
        const user:jwt.JwtPayload|string = jwt.verify(accessToken, authConfig.jwt_secret);
        if (!user) {
            return res.status(401).json("You are not authenticated!");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: `invalid token,  ${error}`});
    }
}