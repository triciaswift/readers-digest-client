import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDetails = () => {
  const [chosenBook, setBook] = useState({});

  const { bookId } = useParams();

  const fetchBookFromAPI = async () => {
    let url = `http://localhost:8000/books/${bookId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
      },
    });
    const book = await response.json();
    setBook(book);
  };

  useEffect(() => {
    fetchBookFromAPI();
  }, []);

  return (
    <main>
      <div className="flex flex-wrap flex-col content-center items-center">
        <h1 className="text-3xl">{chosenBook.title}</h1>
        <div className="text-xl">{chosenBook.author}</div>
        <div className="flex">
          <div className="pr-3 font-bold mb-5">Categories:</div>
          {chosenBook.categories?.map((category) => {
            return (
              <div key={`category-${category.id}`} className="pr-2">
                {category.name}
              </div>
            );
          })}
        </div>
        <img
          src={chosenBook.cover_image}
          alt={`${chosenBook.title} cover image`}
          className="image border border-black shadow-lg shadow-gray-400"
        />
      </div>
      <div className="mx-20">
        <h1 className="text-2xl pt-10 pb-3">Reviews:</h1>
        <div>
          {chosenBook.reviews?.map((review) => {
            return (
              <div
                key={`review-${review.id}`}
                className="border border-spacing-3 rounded-md border-indigo-900 p-10 mb-5"
              >
                <div className="flex justify-between">
                  <div>
                    {review.user.first_name} {review.user.last_name}
                  </div>
                  <div>{review.date_posted}</div>
                </div>
                <div>Rating: {review.rating}</div>
                <div>Comment: {review.comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
