import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";

import usersRoutes from "./src/routes/users.routes";
import authRoutes from "./src/routes/auth.routes";
import productsRoutes from "./src/routes/products.routes";
import sequelize from "./src/configs/database.config";

import { UserModel } from "./src/models/User.model";
import {ProductModel} from "./src/models/Product.model";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/assets")));

const port = process.env.PORT || 3000;

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productsRoutes);

// database relations
// user to product => one to many
UserModel.hasMany(ProductModel,{ foreignKey: "user_id" } );
ProductModel.belongsTo(UserModel, { foreignKey: "user_id" });

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running ....`);
  });
});
