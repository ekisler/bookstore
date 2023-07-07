import React, { useState, useEffect } from "react";

function BookCard({ book }) {
   if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>Autor: {book.author}</p>
      <p>Descripción: {book.description}</p>
      <p>Género: {book.genre}</p>
      <p>Año de publicación: {book.year}</p>
      {/* Agrega más propiedades del libro aquí */}
    </div>
  );
}

export default BookCard;
