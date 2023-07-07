import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorsList from "./components/Author/AuthorsList";
import BooksList from "./components/BookList/BooksList";
import AuthorInfo from "./components/AuthorInfo/AuthorInfo";
import BookInfo from "./components/Book/BookInfo";
import AuthorCreate from "./components/AuthorCreate/AuthorCreate";
import AuthorEdit from "./components/AuthorEdit/AuthorEdit";
import BookCreate from "./components/BookCreate/BookCreate";
import BookEdit from "./components/BookEdit/BookEdit";
import BookCard from "./components/BookCard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthorsList />} />
          <Route path="/authors/:id" element={<AuthorInfo />} />
          <Route path="/authorcreate" element={<AuthorCreate />} />
          <Route path="/authoredit/:id" element={<AuthorEdit />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookInfo />} />
          <Route path="/bookcreate" element={<BookCreate />} />
          <Route path="/bookedit/:id/edit" element={<BookEdit />} />
          <Route path="/bookcard/:id" element={<BookCard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
