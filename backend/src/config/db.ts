import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// Define your MongoDB connection URL. Replace 'your-database-name' with your actual database name.
const dbUrl = process.env.MONGO_URI || "";
// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default mongoose.connection;
