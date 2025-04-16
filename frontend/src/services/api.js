import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchCoffeeShops = async () => {
  try {
    const response = await axios.get(`${API_URL}/coffee_shops`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    throw error;
  }
};

export const fetchCoffeeShopById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/coffee_shops/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coffee shop with id ${id}:`, error);
    throw error;
  }
};

export const fetchReviewsByCoffeeShopId = async (coffeeShopId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${coffeeShopId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching reviews for coffee shop with id ${coffeeShopId}:`,
      error
    );
    throw error;
  }
};
