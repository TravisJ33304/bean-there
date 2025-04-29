import React, { useState } from "react";
import {
  createUser,
  checkUsername,
  fetchUserById,
  fetchUserId,
} from "../services/api";
import { useUser } from "../contexts/UserContext";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const isAvailable = await checkUsername(username);

        if (isAvailable) {
          const newUser = await createUser({
            username,
            password,
            location: {},
            preferences: [],
          });
          login({ ...newUser, userId: newUser._id });
          onLogin(newUser, true);
        } else {
          const userId = await fetchUserId(username, password);
          const existingUser = await fetchUserById(userId);
          login({ ...existingUser, userId });
          onLogin(existingUser, false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        alert("Login failed. Please try again.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Welcome to Bean There ☕</h1>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Login / Sign Up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#6f4e37",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#6f4e37",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginPage;
