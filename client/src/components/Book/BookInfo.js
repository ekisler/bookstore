import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookInfo() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8010/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.name}</h1>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <p>ISBN: {book.image}</p>
        </div>
      ) : (
        <p>Loading book information...</p>
      )}
    </div>
  );
}

export default BookInfo;
