import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

import dotenv from "dotenv";
dotenv.config();

const MONGODB = process.env.MONGODB_URI;

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    await mongoose.connect(MONGODB);
    console.log("MongoDB Connected");

    const { url } = await startStandaloneServer(server, {
      listen: { port: 7000 },
    });
    console.log(`Server running at ${url}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
}
startApolloServer();
