import React, { useState } from 'react';
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const [formRegister, setFormRegister] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormRegister({ ...formRegister, [name]: value });
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formRegister)
            });
    
            const result = await response.json();
            console.log('Success:', result);
            // Handle redirect depending on token or no token
            navigate('/');

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
                value={formRegister.email}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <div>
                <label htmlFor='password'>Password:</label>
            </div>
            <input
                type="password"
                name="password"
                id="password"
                value={formRegister.password}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Skapa konto</button>
        </form>
    );
};

export default RegisterForm;
