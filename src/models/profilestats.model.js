import { DataTypes } from "sequelize";
import { db } from "../config/db/index.js";
import profileModel from "./profile.model.js";

const profileStatsModel = db.define("ProfileStats", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },

  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: profileModel,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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

  topLanguages: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  topRepos: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

profileModel.hasOne(profileStatsModel, {
  foreignKey: "profileId",
  as: "stats",
});

profileStatsModel.belongsTo(profileModel, {
  foreignKey: "profileId",
  as: "profile",
});

export default profileStatsModel;
