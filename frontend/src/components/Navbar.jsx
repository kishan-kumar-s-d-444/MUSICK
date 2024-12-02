import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';
import About from './About';
import LoginSignup from './Login';

function Navbar() {
    const [username, setUsername] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div>
            <nav>
                <ul>
                    <li className="brand">
                        <img src="/images/logo.png" alt="MUSICK" />
                        <span className="brand-text">MUSICK</span>
                    </li>
                    <li className="nav-text">EMBRACE THE MUSIC</li>
                    <div className="nav-buttons">
                        <li><Link to="/" className="nav-button">Home</Link></li>
                        <li><Link to="/about" className="nav-button">About</Link></li>
                        {username ? (
                            <li className="nav-button" onClick={toggleDropdown}>
                                <FontAwesomeIcon icon={faUser} />
                                {dropdownVisible && (
                                    <ul className="dropdown">
                                        <li><button onClick={handleLogout} className="nav-button" id="logoutButton">Logout</button></li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li><Link to="/login" className="nav-button" id="loginButton">Login</Link></li>
                        )}
                    </div>
                </ul>
            </nav>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginSignup />} />
            </Routes>
        </div>
    );
}

export default Navbar;
