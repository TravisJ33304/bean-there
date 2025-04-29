import React, { useState } from "react";

const ReviewList = ({ reviews }) => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === "highest") return b.num_rating - a.num_rating;
    if (sortOrder === "lowest") return a.num_rating - b.num_rating;
    return b._id.localeCompare(a._id);
  });

  const filteredReviews =
    filterRating > 0
      ? sortedReviews.filter(
          (review) => Math.floor(review.num_rating) === filterRating
        )
      : sortedReviews;

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2 className="reviews-title">Reviews ({reviews.length})</h2>
        <div className="reviews-controls">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>

          <div className="filter-buttons">
            <button
              className={filterRating === 0 ? "active-filter" : ""}
              onClick={() => setFilterRating(0)}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={filterRating === rating ? "active-filter" : ""}
                onClick={() => setFilterRating(rating)}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <p className="no-reviews">No reviews match your criteria</p>
      ) : (
        <ul className="reviews-list">
          {filteredReviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="review-header">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= review.num_rating ? "star filled" : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="review-rating">
                  {review.num_rating.toFixed(1)}
                </span>
              </div>
              <p className="review-text">{review.review_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
