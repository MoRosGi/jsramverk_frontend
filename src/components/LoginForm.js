import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [formLogin, setFormLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin)
            });
    
            const result = await response.json();
            // console.log('Success:', result);
            // console.log('Token:', result.data.token);
            const token = result.data.token;
            sessionStorage.setItem('token', token);
            
            // sessionStorage.setItem('email', email);
            // Handle redirect depending on token or no token
            navigate('/userdocuments');

        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Add checks for valid email and password length min 6 chars
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <div>
                <label htmlFor='email'>Email:</label>
            </div>
            <input
                type="email"
                name="email"
                id="email"
                value={formLogin.email}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <div>
                <label htmlFor='password'>Lösenord:</label>
            </div>
            <input
                type="password"
                name="password"
                id="password"
                value={formLogin.password}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Logga in</button>
            <Link to="/register"><button type="button">Registrera</button></Link>
        </form>
    );
};

export default LoginForm;
