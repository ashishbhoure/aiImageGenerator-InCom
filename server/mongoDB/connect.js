import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected ");
  } catch (err) {
    console.log("ERROR :: ", err);
  }
};

export default connectDB;
