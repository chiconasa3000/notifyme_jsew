
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    //It will be indexed by username
    username: {
      type: String,
      required: true,
      index: {unique: true}
    },

    email: {
      type: String,
      required: true,
      index: {unique: true}
    },

    password: {
      type: String,
      required: true
    },

    avatar: {
      type: String
    }
  },
  {
    //Assign createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

//create modelo of mongoose and save on User
const User = mongoose.model('User', UserSchema);

module.exports = User;
