import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookEdit() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/books/${id}`);
      setBook(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setImage(response.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8010/books/${id}`, {
        name: name,
        description: description,
        image: image,
      });

       setSuccessMessage("Book updated successfully");
       setName("");
       setDescription("");
       setImage("");

      // Agrega cualquier lógica adicional que necesites después de editar el libro
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Edit Book</h1>
      <div className="container">
        {successMessage && <div>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" value={id} readOnly />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button type="submit">Update Book</button>
        </form>
      </div>
    </>
  );
}

export default BookEdit;
