// src/App.jsx
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CoffeeShopPage from "./pages/CoffeeShopPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/Login";
import PreferencePage from "./pages/Preference";
import Preference from "./pages/Preference";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [preferencesCompleted, setPreferencesCompleted] = useState(false);

    if (!loggedIn) {
        return <LoginPage onLogin={() => setLoggedIn(true)} />;
    }

    if (!preferencesCompleted) {
        console.log("showing preferences");
        return <PreferencePage onSubmit={() => setPreferencesCompleted(true)} />;
    }

    console.log("preferences completed");

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coffee-shop/:id" element={<CoffeeShopPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/preference" element={<PreferencePage />} />
            </Routes>
        </>
    );
};


export default App;
