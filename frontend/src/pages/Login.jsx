// src/pages/LoginPage.jsx
import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you could add real login validation.
        if (username && password) {
            onLogin(); // Call the parent App's login handler
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
                    Login / Create Account
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
        height: "100vh", // full height of the viewport
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
