import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserLocation, updateUserPreferences } from "../services/api";
import { useUser } from "../contexts/UserContext";

const PreferencePage = ({ onSubmit }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const preferences = [
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

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");

  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleFinish = async () => {
    try {
      const location = city ? { city } : {};
      await updateUserLocation(user._id, location);
      const formattedPreferences = selectedPreferences.map((pref) =>
        pref.trim()
      );
      await updateUserPreferences(user._id, formattedPreferences);

      onSubmit();
      navigate("/");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div style={styles.container}>
      {step === 1 && (
        <>
          <h2 style={styles.title}>Select Your Preferences</h2>
          <div style={styles.bubblesContainer}>
            {preferences.map((pref, index) => (
              <div
                key={index}
                onClick={() => togglePreference(pref)}
                style={{
                  ...styles.bubble,
                  backgroundColor: selectedPreferences.includes(pref)
                    ? "#6f4e37"
                    : "white",
                  color: selectedPreferences.includes(pref) ? "white" : "black",
                }}
              >
                {pref}
              </div>
            ))}
          </div>
          <button style={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={styles.title}>Almost Done!</h2>
          <p style={styles.subtitle}>Enter your city (optional)</p>
          <input
            type="text"
            placeholder="e.g., New York"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button style={styles.nextButton} onClick={handleFinish}>
            Finish
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    justifyContent: "flex-start",
    paddingTop: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    marginBottom: "10px",
    color: "#6f4e37",
    fontSize: "28px",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "18px",
    color: "#333",
    textAlign: "center",
  },
  bubblesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    maxWidth: "800px",
  },
  bubble: {
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "all 0.3s ease",
    textAlign: "center",
    minWidth: "120px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  nextButton: {
    padding: "10px 20px",
    backgroundColor: "#6f4e37",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default PreferencePage;
