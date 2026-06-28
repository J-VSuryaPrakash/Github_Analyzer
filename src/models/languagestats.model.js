import { DataTypes } from "sequelize";
import { db } from "../config/db/index.js";

const languageStatsModel = db.define("LanguageStats", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profileId: {    
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: "Profile",
        key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    },
});

export default languageStatsModel;