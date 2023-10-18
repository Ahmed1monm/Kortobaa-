import dotenv from 'dotenv';
dotenv.config();

interface IDatabaseConfig {
    name: string;
    password: string;
    username: string;
    host: string;
    port: number;
    dialect: string;
}
interface IAuthConfig {
    jwt_secret: string;
}

export const databaseConfig: IDatabaseConfig = {
    name: process.env.DATABASE_NAME || "kortobaa",
    password: process.env.DATABASE_PASSWORD || "",
    username: process.env.DATABASE_USERNAME || "root",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    dialect: process.env.DATABASE_DIALECT || "mysql",
};

export const authConfig:IAuthConfig = {
    jwt_secret: process.env.JWT_SECRET || "SecretKey"
}