import React, { useState, useEffect } from "react";
import { useParams, userParams } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AuthorEdit.css";

function AuthorEdit() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8010/authors/${id}`)
      .then((response) => {
        const author = response.data;
        setFirstName(author.firstName);
        setLastName(author.lastName);
        setPhoto(author.photo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedAuthor = {
      firstName: firstName,
      lastName: lastName,
      photo: photo,
    };

    axios
      .put(`http://localhost:8010/authors/${id}`, updatedAuthor)
      .then((response) => {
        console.log("Author updated successfully:", response.data);
        setSuccessMessage("Author updated successfully!");
        // Perform any additional actions after updating the author
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  };

  return (
    <>
      <Nav />
      <h1>Edit Author</h1>
      <div className="containeru">
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              type="text"
              id="photo"
              value={photo}
              onChange={(event) => setPhoto(event.target.value)}
            />
          </div>
          <button type="submit">Update Author</button>
        </form>
      </div>
    </>
  );
}

export default AuthorEdit;
