import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
import { config } from "dotenv";
config();
import { connectDB } from "./config/db.js";
import cors from "cors";
import colors from "colors";
// Port
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Connect to database
await connectDB();

// cors middleware for cross port connection
app.use(cors());

// graphiql interface enabled if in development mode
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Server listen on port initialized
app.listen(PORT, console.log(`Server running on port ${PORT}`));
