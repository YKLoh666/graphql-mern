import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/schema.js";
import { config } from "dotenv";
config();
import { connectDB } from "./config/db.js";
import cors from "cors";
import colors from "colors";
const PORT = process.env.PORT || 5000;

const app = express();

await connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
