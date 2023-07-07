import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import BookCard from "../BookCard";

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8010/books");
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8010/books/${id}`);
      fetchBooks(); // Actualizar la lista de libros después de eliminar uno
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Nav />
      <h1>Lista de Libros</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/bookcard/${book._id}`}>{book.name}</Link>
            <button
              onClick={() => handleDelete(book._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px 10px",
                borderRadius: "4px",
                marginLeft: "10px",
              }}
            >
              Eliminar
            </button>
            <Link
              to={`/bookedit/${book._id}/edit`}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "5px 10px",
                borderRadius: "4px",
                marginLeft: "10px",
              }}
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
