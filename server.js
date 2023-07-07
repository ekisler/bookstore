const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authorsRouter = require("./routes/authors.js");
const booksRouter = require("./routes/books.js");

const server = express();

server.use(cors())
server.use(express.json());

// Conexión a la base de datos
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
connectDB();

server.use("/authors", authorsRouter);
server.use("/books", booksRouter);

server.use("*", (req, res) => {
  res.status(404).send("Not found");
});

server.use((err, req, res, next) => {
  res.status(err.statsCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = server;
