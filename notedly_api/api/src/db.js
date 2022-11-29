
//Require the mongoose library
import mongoose from "mongoose";

const datab = {
  //connection properties
  connect: DB_HOST => {

    //Connnect to the DB
    mongoose.connect(DB_HOST);

    //Log an error if we fail to connect
    mongoose.connection.on('error', err =>{
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running'
      );
      process.exit();
    });

  },

  close: () =>{
    mongoose.connection.close();
  }

};

export default datab;
