import React from "react";

const CoffeeShopDetail = ({ coffeeShop }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{coffeeShop.name}</h1>
      <div style={styles.location}>
        <h3>Location</h3>
        <p>
          {coffeeShop.location.address}, {coffeeShop.location.city},{" "}
          {coffeeShop.location.state}
        </p>
      </div>
      <div style={styles.stats}>
        <div style={styles.stat}>
          <h3>Rating</h3>
          <p>{coffeeShop.rating}</p>
        </div>
        <div style={styles.stat}>
          <h3>Reviews</h3>
          <p>{coffeeShop.review_count}</p>
        </div>
      </div>
      <div style={styles.features}>
        <h3>Features</h3>
        <ul style={styles.featureList}>
          {coffeeShop.features.map((feature, index) => (
            <li key={index} style={styles.feature}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "15px",
    color: "#6f4e37",
  },
  location: {
    marginBottom: "20px",
  },
  stats: {
    display: "flex",
    gap: "40px",
    marginBottom: "20px",
  },
  stat: {
    textAlign: "center",
  },
  features: {
    marginBottom: "20px",
  },
  featureList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    listStyleType: "none",
    padding: 0,
  },
  feature: {
    backgroundColor: "#f0e6dd",
    borderRadius: "16px",
    padding: "8px 15px",
    color: "#6f4e37",
  },
};

export default CoffeeShopDetail;
