import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Home from "../pages/Home";
import { Authorized } from "./Authorized";
import { useState } from "react";
import { BookForm } from "./BookForm";
import { BookList } from "./BookList";
import { BookDetails } from "./BookDetails";
import { ReviewForm } from "./ReviewForm";

export const ApplicationViews = () => {
  const [booksState, setBooksState] = useState([]);

  const fetchBooksFromAPI = async () => {
    let url = "http://localhost:8000/books";
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
      },
    });
    const books = await response.json();
    setBooksState(books);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route path="books">
            <Route
              path="all"
              element={
                <BookList books={booksState} fetchBooks={fetchBooksFromAPI} />
              }
            />
            <Route
              path="new"
              element={<BookForm fetchBooks={fetchBooksFromAPI} />}
            />
            <Route path=":bookId" element={<BookDetails />} />
            <Route path=":bookId/newReview" element={<ReviewForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
