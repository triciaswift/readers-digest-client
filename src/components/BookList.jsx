/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const BookList = ({ books, fetchBooks }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const displayBooks = () => {
    if (books && books.length) {
      return books.map((book) => (
        <div
          key={`key-${book.id}`}
          className="basis-1/4 flex flex-col items-center justify-start border rounded-md border-cyan-800 py-3 bg-cyan-600/50"
        >
          <div className="p-4">
            <div className="font-bold text-lg text-center">{book.title}</div>
            <div className="text-center">written by {book.author}</div>
          </div>
          <div>
            <img
              src={book.cover_image}
              alt={`${book.title} cover image`}
              className="image border border-black shadow-lg shadow-gray-400 opacity-75 hover:opacity-100 cursor-pointer"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            />
          </div>
        </div>
      ));
    }
  };

  return (
    <main>
      <h1 className="text-4xl text-center mb-6">Book List</h1>
      <div className="flex flex-wrap gap-x-3 gap-y-8 justify-around">
        {displayBooks()}
      </div>
    </main>
  );
};
