import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCoffeeShopById,
  fetchReviewsByCoffeeShopId,
} from "../services/api";

const CoffeeShopDetail = () => {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopData = await fetchCoffeeShopById(id);
        setCoffeeShop(shopData);

        const reviewsData = await fetchReviewsByCoffeeShopId(id);
        setReviews(reviewsData);
      } catch (err) {
        setError("Error fetching coffee shop details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{coffeeShop.name}</h1>
      <p>
        Location: {coffeeShop.location.address}, {coffeeShop.location.city},{" "}
        {coffeeShop.location.state}
      </p>
      <p>Average Rating: {coffeeShop.rating}</p>
      <p>Review Count: {coffeeShop.review_count}</p>
      <h2>Features</h2>
      <ul>
        {coffeeShop.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ReviewList reviews={reviews} />
      ) : (
        <p>No reviews found for this coffee shop.</p>
      )}
    </div>
  );
};

export default CoffeeShopDetail;
