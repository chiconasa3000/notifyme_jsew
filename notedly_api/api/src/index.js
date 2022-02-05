require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server');

const host = '0.0.0.0';
const port = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;

//Complexity and Depht Limit (avoid overload for overnested on server)
const depthLimit = require('graphql-depth-limit');
const {createComplexityLimitRule} = require('graphql-validation-complexity');

//Verify Token returned by signIn or signUp with the token on environment file
const getUser = token => {
  if(token){
    try{
      res = jwt.verify(token, process.env.JWT_KEY);
      //return user id which is decoded from token of header and JWT_KEY
      return res
    } catch (err){
      //if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

//importando conexion a db de mongoose
const db = require('./db');

//Importando modelos de mongoose
//Se requiere exportar porque ahora es usa en otros archivos
//que el archivo de mutation y query
const models = require('./models');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./schema');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = require('./resolvers');

//Connecting to DB
db.connect(DB_HOST);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({req}) => {
    //get the user token from the headers
    const token = req.headers.authorization;

    //try to retrieve a user with the token
    //comparing the token with token on environment
    const user = getUser(token);
    //const user = "vacio"
    //for now, let's log the user to the console
    //console.log(user); 

    //Add the db models to the context
    return {models,user};
  }
});

// The `listen` method launches a web server.
//server.listen().then(({ host,port}) => {
//  console.log(`🚀  Server ready at ${host} with port ${port}`);
//  console.log(`Conectando a la db: ${DB_HOST}`)
//});

server.listen({ port:process.env.PORT || 4000 }).then( ({url}) => {
  console.log(`App is running on port ${port}`);
});
