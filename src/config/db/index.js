import "dotenv/config";
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
});

async function dbConnect() {
  try {
    await db.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Failed to connect to databse", error.message);
    process.exit(1);
  }
}

export { dbConnect, db };
