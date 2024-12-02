import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/login.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

        const handleLogin = async (event) => {
            event.preventDefault();
            const phone = event.target.loginPhone.value;
            const password = event.target.loginPassword.value;
        
            try {
                const response = await axios.post('http://localhost:5000/auth/login', { phone, password });
                const { name } = response.data;
                alert(response.data.message);
                localStorage.setItem('username', name); // Store the name instead of phone
                navigate('/');
            } catch (err) {
                alert(err.response.data.error || 'Login failed');
            }
        };
        

    const handleSignup = async (event) => {
        event.preventDefault();
        const name = event.target.signupName.value;
        const phone = event.target.signupPhone.value;
        const password = event.target.signupPassword.value;

        try {
            const response = await axios.post('http://localhost:5000/auth/signup', { name, phone, password });
            alert(response.data.message);
            localStorage.setItem('username', name); // Store the name instead of phone
            navigate('/');
        } catch (err) {
            alert(err.response.data.error || 'Signup failed');
        }
    };

    return (
        <div className="logcontainer">
            <div className="form-container">
                {isLogin ? (
                    <form id="loginForm" className="form" onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input type="text" name="loginPhone" placeholder="Phone Number" required />
                        <input type="password" name="loginPassword" placeholder="Password" required />
                        <button type="submit">Login</button>
                        <p className='text-black'>Don't have an account? <span onClick={() => setIsLogin(false)} className="form-link">Sign up</span></p>
                    </form>
                ) : (
                    <form id="signupForm" className="form" onSubmit={handleSignup}>
                        <h2>Signup</h2>
                        <input type="text" name="signupName" placeholder="Name" required />
                        <input type="text" name="signupPhone" placeholder="Phone Number" required />
                        <input type="password" name="signupPassword" placeholder="Password" required />
                        <button type="submit">Signup</button>
                        <p className='text-black'>Already have an account? <span onClick={() => setIsLogin(true)} className="form-link">Login</span></p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
