import { DataTypes } from "sequelize";
import { db } from "../config/db/index.js";

const profileStatsModel = db.define("ProfileStats", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  totalRepos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  publicRepos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  privateRepos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default profileStatsModel;