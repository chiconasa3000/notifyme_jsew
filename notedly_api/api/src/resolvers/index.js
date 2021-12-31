const Query = require('./query');
const Mutation = require('./mutation');

const Note = require('./note');
const User = require('./user');

//para validacion de fecha
const {GraphQLDateTime} = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime
};
