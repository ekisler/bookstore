import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./BookCreate.css";

const BookCreate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const authorId = searchParams.get("authorId");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState(authorId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear un objeto con los datos del libro
    const newBook = {
      name,
      description,
      image,
      author,
    };

    try {
      // Realizar la petición POST para crear el libro
      const response = await axios.post("http://localhost:8010/books", newBook);

      // Manejar la respuesta del servidor
      console.log(response.data);

      // Reiniciar los campos del formulario
      setName("");
      setDescription("");
      setImage("");
      setAuthor("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Nav />
      <h2>Crear un nuevo libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Autor:</label>
          <input id="author" type="text" value={author} readOnly />
        </div>
        <div>
          <label htmlFor="name">Nombre del libro:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">URL de la imagen:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Crear libro</button>
      </form>
    </div>
  );
};

export default BookCreate;
