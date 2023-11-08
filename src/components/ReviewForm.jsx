import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
  const { bookId } = useParams();

  const initialReviewState = {
    bookId: bookId,
    rating: 0,
    comment: "",
  };

  const [review, updateReviewProps] = useState(initialReviewState);

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    updateReviewProps({ ...review, [e.target.id]: e.target.value });
  };

  const saveReview = async (evt) => {
    evt.preventDefault();

    await fetch(`http://localhost:8000/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    navigate(-1);
  };

  return (
    <main className="container--new_review">
      <section>
        <form className="form--new_review">
          <h1 className="text-3xl">Write a Review</h1>
          <fieldset className="mt-4">
            <label htmlFor="rating">Rating:</label>
            <input
              id="rating"
              type="number"
              min="1"
              max="10"
              value={review.rating}
              className="form-control"
              onChange={handleUserInput}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="comment">Comment:</label>
            <input
              id="comment"
              type="text"
              value={review.comment}
              className="form-control"
              onChange={handleUserInput}
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              onClick={saveReview}
              className="button rounded-md bg-gray-300 text-black p-1.5 mt-4"
            >
              Save Review
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
