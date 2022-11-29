import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer"
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

//Complexity and Depht Limit (avoid overload for overnested on server)
import depthLimit from "graphql-depth-limit";
import createComplexityLimitRule from "graphql-validation-complexity";

const host = '0.0.0.0';
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//Verify Token returned by signIn or signUp with the token on environment file
const getUser = token => {
  if(token){
    try{
      const res = jwt.verify(token, process.env.JWT_KEY);
      //return user id which is decoded from token of header and JWT_KEY
      return res
    } catch (err){
      //if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};


//importando conexion a db de mongoose
import db from "./db.js";
//Importando modelos de mongoose
//Se requiere exportar porque ahora es usa en otros archivos
//que el archivo de mutation y query
import models from "./models/index.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
import {typeDefs} from "./schema.js";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
import {resolvers} from "./resolvers/index.js";

//Connecting to DB
db.connect(DB_HOST);

const app = express();
const httpServer = http.createServer(app);


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

await server.start();

app.use(
  '/',
  cors(),
  bodyParser.json({limit: '50mb'}),
  expressMiddleware(server,{
    context: async ({req}) => {
      const token= req.headers.authorization;
      const user = getUser(token);
      return {models,user};
    },
  }),
)

await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));
console.log(`Server ready at http://localhost:4000`);
