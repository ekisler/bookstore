import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AuthorList.css";

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8010/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteAuthor = (id) => {
    axios
      .delete(`http://localhost:8010/authors/${id}`)
      .then((response) => {
        setAuthors(authors.filter((author) => author._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateBook = (authorId) => {
    setAuthorId(authorId);
    setRedirect(`/bookcreate?authorId=${authorId}`);
  };
  
  const handleEditAuthor = (authorId) => {
    setAuthorId(authorId);
    setRedirect(`/authoredit/${authorId}`);
  };
 
    if (redirect) {
      return <Navigate to={redirect} />;
    }

  return (
    <div>
      <Nav />
      <h1>Lista de Autores</h1>
      <div className="author-cards">
        {authors.map((author) => (
          <div key={author._id} className="author-card card h-100">
            <Link to={`/authors/${author._id}`}>
              <div className="author-info">
                {author.photo && <img src={author.photo} alt="Author" />}
                <div className="author-name">
                  {author.firstName} {author.lastName}
                </div>
              </div>
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDeleteAuthor(author._id)}
            >
              X
            </button>
            <button
              className="create-book-button"
              onClick={() => handleCreateBook(author._id)}
            >
              Crear libro
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditAuthor(author._id)}
            >
              Editar Autor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsList;
