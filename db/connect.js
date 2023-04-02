const mongoose = require("mongoose");
const connectDB = (url) => {
  if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }
  return mongoose.connect(process.env.MONGO_URI, {
    //this are almost default needded to get rid of errors
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
