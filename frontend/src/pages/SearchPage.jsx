import React, { useState, useEffect } from "react";
import CoffeeShopCard from "../components/CoffeeShopCard";
import { fetchCoffeeShops } from "../services/api";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    features: [],
    city: "",
    state: "",
    minRating: "",
    maxRating: "",
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Available features for filtering
  const availableFeatures = [
    "Free WiFi",
    "Parking Available",
    "Food Options",
    "Great Atmosphere",
    "Reasonable Prices",
    "Comfortable Seating",
    "Tea Selection",
    "Extended Hours",
    "Locally Owned",
    "Friendly Service",
    "Serves Alcohol",
    "Study Friendly",
    "Quality Coffee",
    "Outdoor Seating",
    "Pet Friendly",
    "Live Music",
  ];

  // State list for dropdown
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Construct filter object
      const searchFilters = { ...filters };

      // If there's a search term, we'll filter by name on the client side
      const results = await fetchCoffeeShops(searchFilters);

      // Filter results by name if searchTerm exists
      const filtered = searchTerm
        ? results.filter((shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : results;

      setCoffeeShops(filtered);
    } catch (error) {
      console.error("Error fetching coffee shops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const toggleFeature = (feature) => {
    const updatedFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];

    handleFilterChange("features", updatedFeatures);
  };

  const resetFilters = () => {
    setFilters({
      features: [],
      city: "",
      state: "",
      minRating: "",
      maxRating: "",
      sortBy: "rating",
      sortOrder: "desc",
    });
    setSearchTerm("");
  };

  // Load all coffee shops when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Perfect Coffee Shop</h1>

      <div style={styles.searchContainer}>
        <div style={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Search
          </button>
        </div>

        <div style={styles.filterToggle}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={styles.filterToggleButton}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {(filters.features.length > 0 ||
            filters.city ||
            filters.state ||
            filters.minRating ||
            filters.maxRating) && (
            <button onClick={resetFilters} style={styles.resetButton}>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div style={styles.filtersContainer}>
          <div style={styles.filterSection}>
            <h3 style={styles.filterTitle}>Features</h3>
            <div style={styles.featuresGrid}>
              {availableFeatures.map((feature) => (
                <div
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  style={{
                    ...styles.featureItem,
                    backgroundColor: filters.features.includes(feature)
                      ? "#6f4e37"
                      : "#f0e6dd",
                    color: filters.features.includes(feature)
                      ? "white"
                      : "#6f4e37",
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.filterRow}>
            <div style={styles.filterItem}>
              <h3 style={styles.filterTitle}>City</h3>
              <input
                type="text"
                placeholder="Enter city"
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.filterItem}>
              <h3 style={styles.filterTitle}>State</h3>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                style={styles.select}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.filterRow}>
            <div style={styles.filterItem}>
              <h3 style={styles.filterTitle}>Rating</h3>
              <div style={styles.ratingRange}>
                <input
                  type="number"
                  placeholder="Min"
                  min="1"
                  max="5"
                  step="0.1"
                  value={filters.minRating}
                  onChange={(e) =>
                    handleFilterChange("minRating", e.target.value)
                  }
                  style={styles.ratingInput}
                />
                <span style={styles.ratingRangeSeparator}>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  min="1"
                  max="5"
                  step="0.1"
                  value={filters.maxRating}
                  onChange={(e) =>
                    handleFilterChange("maxRating", e.target.value)
                  }
                  style={styles.ratingInput}
                />
              </div>
            </div>

            <div style={styles.filterItem}>
              <h3 style={styles.filterTitle}>Sort By</h3>
              <div style={styles.sortContainer}>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="review_count">Review Count</option>
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) =>
                    handleFilterChange("sortOrder", e.target.value)
                  }
                  style={styles.sortOrderSelect}
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={styles.loadingContainer}>
          <p style={styles.loadingText}>Loading coffee shops...</p>
        </div>
      ) : (
        <>
          {coffeeShops.length === 0 ? (
            <div style={styles.noResults}>
              <p>No coffee shops match your search criteria.</p>
              <button onClick={resetFilters} style={styles.resetButtonLarge}>
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <p style={styles.resultCount}>
                Found {coffeeShops.length} coffee shops
              </p>
              <div style={styles.coffeeShopGrid}>
                {coffeeShops.map((shop) => (
                  <CoffeeShopCard key={shop._id} coffeeShop={shop} />
                ))}
              </div>
            </>
          )}
        </>
      )}
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
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  searchInputContainer: {
    display: "flex",
    width: "100%",
  },
  searchInput: {
    flex: 1,
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #ddd",
    borderRight: "none",
  },
  searchButton: {
    padding: "12px 20px",
    backgroundColor: "#6f4e37",
    color: "white",
    border: "none",
    borderRadius: "0 6px 6px 0",
    cursor: "pointer",
    fontSize: "16px",
  },
  filterToggle: {
    display: "flex",
    gap: "10px",
  },
  filterToggleButton: {
    padding: "8px 15px",
    backgroundColor: "#f0e6dd",
    color: "#6f4e37",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  resetButton: {
    padding: "8px 15px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  filtersContainer: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "25px",
    border: "1px solid #e0e0e0",
  },
  filterSection: {
    marginBottom: "20px",
  },
  filterRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  filterItem: {
    flex: 1,
  },
  filterTitle: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#333",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "10px",
  },
  featureItem: {
    padding: "8px 12px",
    borderRadius: "20px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  ratingRange: {
    display: "flex",
    alignItems: "center",
  },
  ratingInput: {
    width: "70px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  ratingRangeSeparator: {
    margin: "0 10px",
  },
  sortContainer: {
    display: "flex",
    gap: "10px",
  },
  sortSelect: {
    flex: 2,
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  sortOrderSelect: {
    flex: 1,
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "40px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#6f4e37",
  },
  noResults: {
    textAlign: "center",
    padding: "40px",
  },
  resetButtonLarge: {
    padding: "10px 20px",
    backgroundColor: "#6f4e37",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
  },
  resultCount: {
    marginBottom: "15px",
    color: "#666",
  },
  coffeeShopGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
};

export default SearchPage;
