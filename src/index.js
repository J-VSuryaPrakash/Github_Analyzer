import "dotenv/config";
import app from "./app.js";
import { dbConnect, db } from "./config/db/index.js";
import profileModel  from '../src/models/profile.model.js';
import profileStatsModel  from '../src/models/profileStats.model.js';

const startServer = async () => {
  try {
    await dbConnect();
    await db.sync({ alter: true }).then(() => {
      app.listen(process.env.PORT || 8000, () => {
        console.log("Tables created/updated");
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    });
  } catch (error) {
    console.error("Failed to start server.", error.message);
    process.exit(1);
  }
};

startServer();
