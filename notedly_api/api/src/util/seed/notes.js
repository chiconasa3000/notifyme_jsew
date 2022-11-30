/* Helper file for testing or local dev
/* Generates 25 fake notes */

import faker from "faker";
import mongoose from "mongoose";
//const fetch = require('node-fetch');
//import fetch from 'node-fetch';

const seedNotes = async users => {
  console.log('Seeding notes...');
  let notes = [];

  // generate notes
  for (var i = 0; i < 25; i++) {
    // pick a random user from the array
    let random = [Math.floor(Math.random() * users.length)];
    let content;

    content = faker.lorem.paragraph();

    let note = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(users[random]._id)
    };
    notes.push(note);
  }
  return notes;
};

export {seedNotes};
