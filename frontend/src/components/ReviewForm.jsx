import React, { useState } from "react";
import { createReview } from "../services/api";

const ReviewForm = ({ coffeeShopId, onReviewSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
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
      setRating(5);

      if (onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Write a Review</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.ratingContainer}>
          <label style={styles.label}>Your Rating:</label>
          <div style={styles.starRating}>
            {[5, 4, 3, 2, 1].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  ...styles.star,
                  color: rating >= star ? "#e7bb41" : "#d4d4d4",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div style={styles.textareaContainer}>
          <label htmlFor="reviewText" style={styles.label}>
            Your Review:
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={styles.textarea}
            placeholder="What did you think about this coffee shop?"
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit Review
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "25px",
    maxWidth: "600px",
  },
  title: {
    color: "#6f4e37",
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  label: {
    marginBottom: "8px",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
  },
  starRating: {
    display: "flex",
    flexDirection: "row-reverse", // Makes it easier to select ratings
    justifyContent: "flex-end",
  },
  star: {
    fontSize: "32px",
    cursor: "pointer",
    marginRight: "5px",
    transition: "color 0.2s ease",
  },
  textareaContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  textarea: {
    minHeight: "120px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#6f4e37",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    alignSelf: "flex-start",
  },
  error: {
    color: "#e74c3c",
    marginTop: "10px",
  },
  success: {
    color: "#2ecc71",
    marginTop: "10px",
  },
};

export default ReviewForm;
