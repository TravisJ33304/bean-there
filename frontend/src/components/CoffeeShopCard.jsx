import React from "react";

const CoffeeShopCard = ({ coffeeShop }) => {
  return (
    <div className="coffee-shop-card">
      <h2>{coffeeShop.name}</h2>
      <p>
        Location: {coffeeShop.location.area}, {coffeeShop.location.address}
      </p>
      <p>
        Rating: {coffeeShop.rating} ({coffeeShop.review_count} reviews)
      </p>
      <div className="features">
        <h4>Features:</h4>
        <ul>
          {coffeeShop.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoffeeShopCard;
