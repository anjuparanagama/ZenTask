import dotenv from "dotenv";
import app from "./app";
import db from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

db.getConnection()
  .then(() => {
    console.log("TiDB connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
