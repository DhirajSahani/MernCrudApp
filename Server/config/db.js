import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "myDatabase",
    });
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
