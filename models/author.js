   const mongoose = require("mongoose");

   const authorSchema = new mongoose.Schema({
     firstName: String,
     lastName: String,
     photo: String,
   });

   const Author = mongoose.model("Author", authorSchema);

   module.exports = Author;

