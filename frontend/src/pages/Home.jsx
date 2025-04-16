import React, { useEffect, useState } from "react";
import axios from "axios";
import CoffeeShopCard from "../components/CoffeeShopCard";

const Home = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get("/api/coffee_shops");
        setCoffeeShops(response.data);
      } catch (err) {
        setError("Failed to fetch coffee shops");
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome to Bean There</h1>
      <h2>Discover Your Favorite Coffee Shops</h2>
      <div className="coffee-shop-list">
        {coffeeShops.map((shop) => (
          <CoffeeShopCard key={shop._id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default Home;
