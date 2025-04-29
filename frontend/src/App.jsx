import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CoffeeShopPage from "./pages/CoffeeShopPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/Login";
import PreferencePage from "./pages/Preference";
import { useUser } from "./contexts/UserContext";

const App = () => {
  const { user, login } = useUser();
  const [preferencesCompleted, setPreferencesCompleted] = useState(false);

  useEffect(() => {
    if (user && user.preferences && user.preferences.length > 0) {
      setPreferencesCompleted(true);
    }
  }, [user]);

  if (!user) {
    return (
      <LoginPage
        onLogin={(userData, isNewUser) => {
          login(userData);
          if (!isNewUser) {
            setPreferencesCompleted(true);
          }
        }}
      />
    );
  }

  if (!preferencesCompleted) {
    return (
      <PreferencePage
        onSubmit={() => {
          setPreferencesCompleted(true);
        }}
      />
    );
  }

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
