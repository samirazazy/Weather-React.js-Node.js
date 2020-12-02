const mongoose = require('mongoose');

const dbName = 'azazy';
const dbPassword = 'veheU09jZmhAVZGf';
const db = `mongodb+srv://azazy:${dbPassword}@cluster0.4m96e.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('mongoDB connected ✨✨✨');
  } catch (err) {
    console.log(err.message);

    //Exit process with field
    process.exit(1);
  }
};

module.exports = connectDB;
