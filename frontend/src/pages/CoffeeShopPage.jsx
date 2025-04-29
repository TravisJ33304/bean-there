import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoffeeShopDetail from "../components/CoffeeShopDetail";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
// import { fetchCoffeeShop, fetchReviews } from "../services/api";

const CoffeeShopPage = () => {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getCoffeeShop = async () => {
      const shopData = await fetchCoffeeShop(id);
      setCoffeeShop(shopData);
    };

    const getReviews = async () => {
      const reviewData = await fetchReviews(id);
      setReviews(reviewData);
    };

    getCoffeeShop();
    getReviews();
  }, [id]);

  if (!coffeeShop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CoffeeShopDetail coffeeShop={coffeeShop} />
      <ReviewForm coffeeShopId={id} onReviewSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default CoffeeShopPage;
