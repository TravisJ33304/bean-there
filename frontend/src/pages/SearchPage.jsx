import React, { useState, useEffect } from "react";
import axios from "axios";
import CoffeeShopCard from "../components/CoffeeShopCard";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/coffee_shops?search=${searchTerm}`
      );
      setCoffeeShops(response.data);
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
