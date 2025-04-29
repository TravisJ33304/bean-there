import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import api from "../services/api";

const CoffeeShopDetail = () => {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await api.get(`/coffee_shops/${id}`);
        setCoffeeShop(response.data);
      } catch (err) {
        setError("Error fetching coffee shop details");
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShop();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{coffeeShop.name}</h1>
      <p>
        Location: {coffeeShop.location.address}, {coffeeShop.location.area},
        Milwaukee, WI
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
      {/* Here you can add a component to display reviews */}
    </div>
  );
};

export default CoffeeShopDetail;
