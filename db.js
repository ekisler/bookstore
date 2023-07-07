c/*onst mongoose = require("mongoose");
require("dotenv").config();

const database = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Registers connected to DB!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
*/