import {DataTypes, Model, ModelCtor} from "sequelize";
import sequelize
 from "../configs/database.config";
export interface IUser extends Model {
    id: number;
    username: string;
    name: string;
    password: string;
}
export const UserModel:ModelCtor<IUser> = sequelize.define<IUser>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
);

