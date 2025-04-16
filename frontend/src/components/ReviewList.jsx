import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ coffeeShopId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${coffeeShopId}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [coffeeShopId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews: {error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.user}</strong>: {review.review}
              </p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
