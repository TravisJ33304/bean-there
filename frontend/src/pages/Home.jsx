import React, { useEffect, useState } from "react";
import CoffeeShopCard from "../components/CoffeeShopCard";
import { getRecommendations } from "../services/api";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  console.log("Rendering Home component");

  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const loadCoffeeShops = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations(user._id);
        setCoffeeShops(data);
      } catch (error) {
        setError("Failed to load coffee shops");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCoffeeShops();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome to Bean There</h1>
      <img
        src="../coffee.png"
        alt="Coffee shop banner"
        style={{
          width: "80%",
          maxWidth: "600px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      />
      <h2>Discover Your Favorite Coffee Shops</h2>
      <div className="coffee-shop-list">
        {coffeeShops.map((shop) => (
          <CoffeeShopCard key={shop._id} coffeeShop={shop} />
        ))}
      </div>
    </div>
  );
};

export default Home;
