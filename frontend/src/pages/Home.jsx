import React, { useEffect, useState } from "react";
import CoffeeShopCard from "../components/CoffeeShopCard";
import { getRecommendations } from "../services/api";
import { useUser } from "../contexts/UserContext";
import coffeeImage from "../coffee.png";

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
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Bean There</h1>
      <img src={coffeeImage} alt="Coffee shop banner" style={styles.banner} />
      <h2 style={styles.subtitle}>Discover Your Favorite Coffee Shops</h2>
      <div style={styles.coffeeShopGrid}>
        {coffeeShops.map((shop) => (
          <CoffeeShopCard key={shop._id} coffeeShop={shop} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    color: "#6f4e37",
    textAlign: "center",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#6f4e37",
    textAlign: "center",
    marginBottom: "20px",
  },
  banner: {
    width: "100%",
    maxWidth: "15vw",
    margin: "20px auto",
    borderRadius: "8px",
    display: "block",
  },
  coffeeShopGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
};

export default Home;
