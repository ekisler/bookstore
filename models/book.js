   const mongoose = require("mongoose");

   const bookSchema = new mongoose.Schema({
     author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Author",
     },
     name: String,
     description: String,
     image: String,
   });

   const Book = mongoose.model("Book", bookSchema);

   module.exports = Book;


