import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
import { config } from "dotenv";
config();
import { connectDB } from "./config/db.js";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRoute.js";
// Port
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Connect to database
await connectDB();

// cors middleware for cross port connection
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// cookie parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

// graphiql interface enabled if in development mode
app.use("/graphql", (req, res) => {
  return graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })(req, res);
});

// Server listen on port initialized
app.listen(PORT, console.log(`Server running on port ${PORT}`));
