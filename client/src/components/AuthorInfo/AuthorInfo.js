import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AuthorInfo.css"; // Importa el archivo CSS de la card
import Nav from "../Nav/Nav";


function AuthorInfo() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const authorResponse = await axios.get(
          `http://localhost:8010/authors/${id}`
        );
        setAuthor(authorResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBooksData = async () => {
      try {
        const booksResponse = await axios.get(`http://localhost:8010/books`);
        const filteredBooks = booksResponse.data.filter(
          (book) => book.author._id === id
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAuthorData(), fetchBooksData()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
    <Nav />
    <div className="cardi">
      {" "}
      {/* Agrega la clase "card" a la div principal */}
      {loading ? (
        <p>Cargando información del autor...</p>
      ) : (
        <div>
          <h1>
            {author.firstName} {author.lastName}
          </h1>
          <img src={author.photo} alt="Author" />
          <h2>Libros del autor</h2>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <p>{book.name}</p>
                <p>{book.description}</p>
                <img src={book.image} alt="Book" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}

export default AuthorInfo;
