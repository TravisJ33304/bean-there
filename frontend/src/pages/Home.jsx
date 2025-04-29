import React, { useEffect, useState } from "react";
import axios from "axios";
import CoffeeShopCard from "../components/CoffeeShopCard";

const Home = () => {
    console.log("Rendering Home component");

    const [coffeeShops, setCoffeeShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dummyCoffeeShops = [
        {
            _id: "1",
            name: "The Grind House",
            location: {
                area: "Downtown",
                address: "123 Market Street, San Francisco, CA"
            },
            rating: 4.7,
            review_count: 238,
            features: ["Free WiFi", "Great Atmosphere", "Quality Coffee", "Study Friendly"]
        },
        {
            _id: "2",
            name: "Java Junction",
            location: {
                area: "Uptown",
                address: "456 Elm Street, Austin, TX"
            },
            rating: 4.3,
            review_count: 152,
            features: ["Tea Selection", "Outdoor Seating", "Friendly Service"]
        },
        {
            _id: "3",
            name: "Bean & Brew",
            location: {
                area: "Midtown",
                address: "789 Maple Avenue, Portland, OR"
            },
            rating: 4.9,
            review_count: 321,
            features: ["Pet Friendly", "Locally Owned", "Live Music", "Serves Alcohol"]
        },
        {
            _id: "4",
            name: "Roast Republic",
            location: {
                area: "Arts District",
                address: "101 Art Lane, Los Angeles, CA"
            },
            rating: 4.5,
            review_count: 195,
            features: ["Parking Available", "Comfortable Seating", "Reasonable Prices"]
        }
    ];

    useEffect(() => {
        // Simulate a fetch for testing (replace with your actual API later)
        // axios.get("/api/coffee-shops")  // Replace with actual API if available
        //     .then((res) => {
        //         setCoffeeShops(res.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setError("Failed to load coffee shops");
        //         setLoading(false);
        //     });

        // Alternatively, use mock data to test:
        setTimeout(() => {
          setCoffeeShops(dummyCoffeeShops);
          setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Welcome to Bean There</h1>
            <img
                src="../coffee.png"
                alt="Coffee shop banner"
                style={{width: "80%", maxWidth: "600px", margin: "20px 0", borderRadius: "8px"}}
            />
            <h2>Discover Your Favorite Coffee Shops</h2>
            <div className="coffee-shop-list">
                {coffeeShops.map((shop) => (
                    <CoffeeShopCard key={shop._id} coffeeShop={shop}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
