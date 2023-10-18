import {DataTypes, Model, ModelCtor} from "sequelize";
import sequelize from "../configs/database.config";

export interface IProduct extends Model {
    id: number;
    title: string;
    image: string;
    price: number;
    user_id: number;
}

export const ProductModel:ModelCtor<IProduct> = sequelize.define<IProduct>(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);

export default ProductModel;