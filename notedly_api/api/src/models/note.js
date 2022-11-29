
//Require the mongoose library
import mongoose from "mongoose";

//Define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    //Assigns createAt and updateAt field with a Date type
    timestamps: true
  }

);

//Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

//Export the module
export {Note};
