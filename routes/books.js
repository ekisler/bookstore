   const express = require("express");
   const router = express.Router();
   const Book = require("../models/book");

     // Ruta para obtener todos los libros
   router.get("/", async (req, res) => {
     try {
       const books = await Book.find().populate("author");
       res.json(books);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   router.get("/:id", async (req, res) => {
     try {
       const book = await Book.findById(req.params.id).populate("author");
       if (book) {
         res.json(book);
       } else {
         res.status(404).json({ message: "Book not found" });
       }
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   // Ruta para crear un nuevo libro
   router.post("/", async (req, res) => {
     const book = new Book({
       author: req.body.author,
       name: req.body.name,
       description: req.body.description,
       image: req.body.image,
     });

     try {
       const newBook = await book.save();
       res.status(201).json(newBook);
     } catch (err) {
       res.status(400).json({ message: err.message });
     }
   });

   router.put("/:id", async (req, res) => {
     const id = req.params.id;

     try {
       const updatedBook = await Book.findByIdAndUpdate(
         id,
         {
           author: req.body.author,
           name: req.body.name,
           description: req.body.description,
           image: req.body.image,
         },
         { new: true }
       ).populate("author");

       if (!updatedBook) {
         return res.status(404).json({ message: "Libro no encontrado" });
       }

       res.json(updatedBook);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });


   router.delete("/:id", async (req, res) => {
     try {
       const deletedBook = await Book.findByIdAndDelete(req.params.id);
       if (!deletedBook) {
         return res.status(404).json({ message: "Libro no encontrado" });
       }
       res.json({ message: "Libro eliminado correctamente" });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });


   // Resto de las rutas y controladores para actualizar y eliminar libros

   module.exports = router;

