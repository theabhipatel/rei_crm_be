import mongoose from "mongoose";

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully ...");
  } catch (error) {
    console.log("Database not connected !!!");
  }
};
