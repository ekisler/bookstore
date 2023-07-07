   const express = require("express");
   const router = express.Router();
   const Author = require("../models/author");

   // Ruta para obtener todos los autores
   router.get("/", async (req, res) => {
     try {
       const authors = await Author.find();
       res.json(authors);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   router.get("/:id", async (req, res) => {
     const id = req.params.id;

     try {
       const author = await Author.findById(id);
       if (!author) {
         return res.status(404).json({ message: "Autor no encontrado" });
       }
       res.json(author);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   // Ruta para crear un nuevo autor
   router.post("/", async (req, res) => {
     const author = new Author({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       photo: req.body.photo,
     });

     try {
       const newAuthor = await author.save();
       res.status(201).json(newAuthor);
     } catch (err) {
       res.status(400).json({ message: err.message });
     }
   });

   router.put("/:id", async (req, res) => {
     const id = req.params.id;

     try {
       const updatedAuthor = await Author.findByIdAndUpdate(
         id,
         {
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           photo: req.body.photo,
         },
         { new: true }
       );

       if (!updatedAuthor) {
         return res.status(404).json({ message: "Autor no encontrado" });
       }

       res.json(updatedAuthor);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });


   router.delete("/:id", async (req, res) => {
     const id = req.params.id;

     try {
       const deletedAuthor = await Author.findByIdAndDelete(id);
       if (!deletedAuthor) {
         return res.status(404).json({ message: "Autor no encontrado" });
       }
       res.json({ message: "Autor eliminado correctamente" });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });


   // Resto de las rutas y controladores para actualizar y eliminar autores

   module.exports = router;

