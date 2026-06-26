import app from "./app.js";
import { dbConnect, db } from "./config/db/index.js";

dbConnect().then(() => {
  db.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Tables created/updated");
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  });
}).catch((err) => {
    console.log("Database connection error.")
})
