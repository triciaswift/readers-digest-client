/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BookForm = ({ fetchBooks }) => {
  const initialBookState = {
    title: "",
    author: "",
    isbn_number: "",
    cover_image: "",
  };

  const [book, updateBookProps] = useState(initialBookState);
  const [chosenCategories, updateChosen] = useState(new Set());
  const [categories, changeCategories] = useState([
    { id: 1, name: "Fiction" },
    { id: 2, name: "Non-Fiction" },
  ]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
      },
    });
    const categories = await response.json();
    changeCategories(categories);
  };

  const shelveBook = async (evt) => {
    evt.preventDefault();

    await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...book,
        categories: Array.from(chosenCategories), // Add categories key to book object & changes the chosenCategories set to an array
      }),
    });

    await fetchBooks();

    navigate("/allbooks");
  };

  const handleUserInput = (e) => {
    updateBookProps({ ...book, [e.target.id]: e.target.value });
  };

  const formInput = (prop) => (
    <input
      id={prop}
      type="text"
      value={book.prop}
      className="form-control"
      onChange={handleUserInput}
    />
  );

  const handleCategoryChosen = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    updateChosen(copy);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="container--new_book">
      <section>
        <form className="form--new_book">
          <h1 className="text-3xl">Collect a Book</h1>
          <fieldset className="mt-4">
            <label htmlFor="title">Title:</label>
            {formInput("title")}
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="author">Author:</label>
            {formInput("author")}
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="isbn">Isbn:</label>
            {formInput("isbn_number")}
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="image">Cover:</label>
            {formInput("cover_image")}
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="category">
              <strong>Categories</strong>
            </label>
            <br />
            {categories.map((c) => (
              <div key={`category-${c.id}`}>
                <input
                  type="checkbox"
                  checked={chosenCategories.has(c.id)}
                  onChange={() => handleCategoryChosen(c)}
                />
                {c.name}
              </div>
            ))}
          </fieldset>
          <fieldset>
            <button
              type="submit"
              onClick={shelveBook}
              className="button rounded-md bg-gray-300 text-black p-1.5 mt-4"
            >
              Collect Book
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
