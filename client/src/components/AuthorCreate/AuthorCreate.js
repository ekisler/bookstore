import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AuthorCreate.css"


function AuthorCreate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAuthor = {
      firstName: firstName,
      lastName: lastName,
      photo: photo,
    };

    axios
      .post("http://localhost:8010/authors", newAuthor)
      .then((response) => {
        console.log("Author created successfully:", response.data);
        setSuccessMessage("Author created successfully!");
        // Perform any additional actions after creating the author
      })
      .catch((error) => {
        console.error("Error creating author:", error);
      });

    // Reset the fields after submitting the form
    setFirstName("");
    setLastName("");
    setPhoto("");
  };

  return (
    <div classname="container">
      <Nav />
      <h1>Create Author</h1>
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
        <button type="submit">Create Author</button>
      </form>
    </div>
  );
}

export default AuthorCreate;
