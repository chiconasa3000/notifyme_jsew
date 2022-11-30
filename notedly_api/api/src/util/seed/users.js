/* Helper file for testing or local dev
/* Generates 10 fake users */

import faker from "faker";
import bcrypt from "bcrypt";

import {gravatar} from "../gravatar.js";

const seedUsers = async () => {
  console.log('Seeding users...');
  let users = [];

  // generate 10 user profiles
  // remember that it is the final input for mongoose databases register
  // so it will be identity to mutation signin requirements in order to create a new user
  for (var i = 0; i < 10; i++) {
    let user = {
      username: faker.internet.userName(),
      password: await bcrypt.hash('password',10),
      email: faker.internet.email().trim().toLowerCase()
    };
    user.avatar = gravatar(user.email);
    users.push(user);
  }
  return users;
};

export {seedUsers};
