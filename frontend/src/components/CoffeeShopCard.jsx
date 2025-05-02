import React from "react";
import { useNavigate } from "react-router-dom";

const CoffeeShopCard = ({ coffeeShop }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/coffee-shop/${coffeeShop._id}`);
  };

  return (
    <div
      className="coffee-shop-card"
      onClick={handleCardClick}
      style={styles.card}
    >
      <h2 style={styles.name}>{coffeeShop.name}</h2>
      <div style={styles.addressBlock}>
        <p style={styles.address}>
          {coffeeShop.location.address}, {coffeeShop.location.city},{" "}
          {coffeeShop.location.state}
        </p>
      </div>
      <div style={styles.ratingBlock}>
        <span style={styles.rating}>{coffeeShop.rating}</span>
        <span style={styles.reviewCount}>
          ({coffeeShop.review_count} reviews)
        </span>
      </div>
      <div style={styles.featuresSection}>
        <ul style={styles.featureList}>
          {coffeeShop.features.slice(0, 3).map((feature, index) => (
            <li key={index} style={styles.feature}>
              {feature}
            </li>
          ))}
          {coffeeShop.features.length > 3 && (
            <li style={styles.moreFeatures}>
              +{coffeeShop.features.length - 3} more
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
  },
  name: {
    margin: "0 0 10px 0",
    color: "#6f4e37",
    fontSize: "1.4rem",
  },
  addressBlock: {
    marginBottom: "12px",
  },
  address: {
    margin: "0",
    color: "#666",
    fontSize: "0.95rem",
  },
  ratingBlock: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
  },
  rating: {
    backgroundColor: "#6f4e37",
    color: "white",
    padding: "3px 8px",
    borderRadius: "4px",
    marginRight: "8px",
    fontWeight: "bold",
  },
  reviewCount: {
    color: "#666",
    fontSize: "0.9rem",
  },
  featuresSection: {
    marginTop: "auto",
    paddingTop: "12px",
  },
  featureList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  feature: {
    backgroundColor: "#f0e6dd",
    borderRadius: "16px",
    padding: "4px 10px",
    fontSize: "0.8rem",
    color: "#6f4e37",
  },
  moreFeatures: {
    backgroundColor: "#e8e8e8",
    borderRadius: "16px",
    padding: "4px 10px",
    fontSize: "0.8rem",
    color: "#666",
  },
};

export default CoffeeShopCard;
