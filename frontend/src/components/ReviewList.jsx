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
    <div style={styles.container}>
      <h2 style={styles.title}>Reviews ({reviews.length})</h2>

      <div style={styles.controls}>
        <div style={styles.sortContainer}>
          <label style={styles.label}>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={styles.select}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <div style={styles.filterContainer}>
          <label style={styles.label}>Filter by:</label>
          <div style={styles.filterButtons}>
            <button
              onClick={() => setFilterRating(0)}
              style={{
                ...styles.filterButton,
                ...(filterRating === 0 ? styles.activeFilter : {}),
              }}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                style={{
                  ...styles.filterButton,
                  ...(filterRating === rating ? styles.activeFilter : {}),
                }}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <p style={styles.noReviews}>No reviews match your criteria</p>
      ) : (
        <ul style={styles.reviewsList}>
          {filteredReviews.map((review) => (
            <li key={review._id} style={styles.reviewItem}>
              <div style={styles.reviewHeader}>
                <div style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        ...styles.star,
                        color:
                          star <= review.num_rating ? "#e7bb41" : "#d4d4d4",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={styles.reviewRating}>
                  {review.num_rating.toFixed(1)}
                </span>
              </div>
              <p style={styles.reviewText}>{review.review_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    maxWidth: "600px",
  },
  title: {
    color: "#6f4e37",
    marginBottom: "20px",
    fontSize: "24px",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "16px",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  filterButton: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  activeFilter: {
    backgroundColor: "#6f4e37",
    color: "white",
    border: "1px solid #6f4e37",
  },
  reviewsList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  reviewItem: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f5f1",
    border: "1px solid #f0e6dd",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  ratingStars: {
    display: "flex",
  },
  star: {
    fontSize: "16px",
    marginRight: "2px",
  },
  reviewRating: {
    fontWeight: "bold",
    backgroundColor: "#6f4e37",
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "14px",
  },
  reviewText: {
    margin: "0",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  noReviews: {
    textAlign: "center",
    color: "#888",
    padding: "20px 0",
    fontStyle: "italic",
  },
};

export default ReviewList;
