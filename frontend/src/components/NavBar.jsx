import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoText}>Bean There ☕</Link>
            </div>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.link}>Home</Link>
                </li>
                <li>
                    <Link to="/search" style={styles.link}>Search</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#6f4e37",
        padding: "10px 20px",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    logoText: {
        color: "white",
        textDecoration: "none",
    },
    navLinks: {
        display: "flex",
        listStyle: "none",
        gap: "20px",
        margin: 0,
        padding: 0,
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
    },
};

export default NavBar;
