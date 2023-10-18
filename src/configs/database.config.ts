import { databaseConfig } from './constants.config';
import { Sequelize, Dialect } from "sequelize";

const sequelize = new Sequelize(databaseConfig.name, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect as Dialect,
});

export default sequelize;