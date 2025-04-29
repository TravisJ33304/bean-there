import React, { useState, useEffect } from "react";
import CoffeeShopCard from "../components/CoffeeShopCard";
import { fetchCoffeeShops } from "../services/api";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const allShops = await fetchCoffeeShops();
      const filtered = searchTerm
        ? allShops.filter((shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allShops;
      setCoffeeShops(filtered);
    } catch (error) {
      console.error("Error fetching coffee shops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setCoffeeShops([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Search for Coffee Shops</h1>
      <input
        type="text"
        placeholder="Enter coffee shop name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {coffeeShops.map((shop) => (
            <CoffeeShopCard key={shop._id} coffeeShop={shop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
