import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "graphql-mern",
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};
