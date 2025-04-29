import React, { useState } from "react";
import { createReview } from "../services/api";

const ReviewForm = ({ coffeeShopId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await createReview({
        coffee_shop_id: coffeeShopId,
        review_text: reviewText,
        num_rating: Number(rating),
      });
      setSuccess("Review submitted successfully!");
      setReviewText("");
      setRating(1);

      if (onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default ReviewForm;
