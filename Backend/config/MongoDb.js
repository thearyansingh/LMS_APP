import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv(); 

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);

    if (connect) console.log("✅ Mongodb connected");
  } catch (error) {
    console.log("❌ Database Connection Problem:", error);
  }
};
