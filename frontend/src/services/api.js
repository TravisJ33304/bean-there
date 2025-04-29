import axios from "axios";

const API_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCoffeeShops = async () => {
  try {
    const response = await apiClient.get("/api/coffee_shops");
    return response.data;
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    throw error;
  }
};

export const fetchCoffeeShopById = async (id) => {
  try {
    const response = await apiClient.get(`/api/coffee_shops/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coffee shop with id ${id}:`, error);
    throw error;
  }
};

export const fetchReviewsByCoffeeShopId = async (coffeeShopId) => {
  try {
    const response = await apiClient.get(`/api/reviews/${coffeeShopId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching reviews for coffee shop with id ${coffeeShopId}:`,
      error
    );
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await apiClient.post("/api/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/api/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUserLocation = async (userId, locationData) => {
  try {
    const response = await apiClient.put(
      `/api/users/update_location/${userId}`,
      locationData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating location for user ${userId}:`, error);
    throw error;
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  try {
    const response = await apiClient.put(
      `/api/users/update_preferences/${userId}`,
      preferences
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating preferences for user ${userId}:`, error);
    throw error;
  }
};

export const checkUsername = async (username) => {
  try {
    const response = await apiClient.get(
      `/api/users/check_username/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error checking username ${username}:`, error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${userId}:`, error);
    throw error;
  }
};

export const getRecommendations = async (userId) => {
  try {
    const response = await apiClient.get(
      `/api/users/get_recommendations/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting recommendations for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserId = async (username, password) => {
  try {
    const response = await apiClient.post("/api/users/get_user_id", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
};

export default apiClient;
