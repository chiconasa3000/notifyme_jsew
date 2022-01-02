
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{
  AuthenticationError,
  ForbiddenError
} = require('apollo-server');

const gravatar = require('../util/gravatar');
const JWT_KEY = process.env.JWT_KEY;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
module.exports = {
  newNote: async (parent, args, {models, user}) => {
    //checking user
    if(!user){
      throw new AuthenticationError('You must be signed in to create a note');
    }

    //contruyendo nueva nota temporal
    return await models.Note.create({
      //id generado por mongoose
      content: args.content,
      //author: "Chris"
      author: mongoose.Types.ObjectId(user.id)
    });
  },
  
  //puedes nombrar los argumentos entre parentesis
  //dependiendo de como se llamen
  deleteNote: async(parent, {id}, {models, user}) =>{
    //if not a user, throw an Authentication Error
    if(!user){
      throw new AuthenticationError('You must be signed in to delete a note');
    }

    //find the note
    const note = await models.Note.findById(id);
    
    //if the note owner and current user don't match, throw a forbidden error
    //remember note.author is ObjectId so It must transformed in String
    if(note && String(note.author) !== user.id){
      throw new ForbiddenError("You don't have permisssions to delete the note");
    }

    //If all above is done so remove note
    try{
      //await models.Note.findOneAndRemove({_id: id});
      await note.remove();
      //Se ha eliminado con exito
      return true;
    } catch (err){
      //Borrado fallido debido a un error
      return false
    }
  },

  updateNote: async(parent, {content, id}, {model, user }) => {
    if(!user){
      throw new AuthenticationError('You must be signed in to update a note');
    } 

    //find the note
    const note = await models.Note.findById(id);

    //if the note owner and current user don't match, throw a forbidden error
    if(note && String(note.author) !== user.id){
      throw new ForbiddenError("You don't have permissions to update the note ");
    }

    //Update the note in the db and return the updated note
    return await models.Note.findOneAndUpdate(
      { 
        _id: id,
      },
      {
        $set: {
          content
        }
      },
      {
        //When it is updating return new note updated
        new: true
      }
    );
  },

  signUp: async (parent, {username, email, password}, {models}) => {
    //normalize email adress
    email = email.trim().toLowerCase();
    
    //hash the password with additive salt of 10
    const hashed = await bcrypt.hash(password, 10);

    //create the gravatar url
    const avatar = gravatar(email);
    //const avatar = "helloavatar";
    
    try{
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });
      //return encoded token using user id and JWT_KEY
      return jwt.sign({id: user._id}, process.env.JWT_KEY);
    } catch (err){
      console.log(err);
      //If there's a problem creating the account, throw an error
      throw new Error('Error creating account');
    }
  },

  signIn: async (parent, {username, email, password}, {models}) =>{
    //using the JWT, which have already created
    if(email){
      //normalize email address
      email = email.trim().toLowerCase();
    }

    //buscando el usuario by email y username because is the key
    const user = await models.User.findOne({
      $or: [{email}, {username}]
    });

    //if no user is found, throw an authentication error
    if(!user){
      throw new AuthenticationError('Error signing in');
    }

    //Chekc password user with password sending by parameter
    //but bcrypt compare the JWT obtained by hashed password
    //if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
      throw new AuthenticationError('Error signing in');
    }

    //create and return the json web token which have already existed 
    //on mongoose database with this you could operations CRUD
    return jwt.sign({id: user._id}, process.env.JWT_KEY);
    
  },

  //Turn off or Turn on favorite notes
  toggleFavorite:  async (parent, {id}, {models, user}) => {
    if(!user){
      throw new AuthenticationError();
    }

    //check to see if the user has already favorited the note
    let noteCheck = await models.Note.findById(id);
    //Search on list of id users on field favoritedBy
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    //if the user exists in the list
    //pull them from the list and reduce the favoriteCount by 1
    if(hasUser >= 0){
      return await models.Note.findByIdAndUpdate(
        id,
        {
          //get out the user from the list
          $pull:{
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          //reduce the number of users in other words
          //reduce favorites or likes (so every user have 1 like at much)
          $inc: {
            favoiteCount: -1
          }
        },
        {
          //Set new to true to return the updated doc
          new: true
        }
      );
    } else {

      //if the user doesn't exist in the list
      //add them to the list and increment the favoriteCount by 1
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
  }
}


