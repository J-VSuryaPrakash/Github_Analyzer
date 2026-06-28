import { db } from "../config/db/index.js";
import { DataTypes } from "sequelize";

const profileModel = db.define("Profile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socials: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  followers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  following: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default profileModel;