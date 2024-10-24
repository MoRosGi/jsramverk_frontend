import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const [formRegister, setFormRegister] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const inviteId = sessionStorage.getItem('inviteId');

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

            console.log('Token:', result.data.token);
            const token = result.data.token;
            sessionStorage.setItem('token', token);

            if (inviteId) {
                navigate(`/invite/${inviteId}`);
            }

            navigate('/');

        } catch (error) {
            toast(error);
            console.error('Error:', error);
        }
    };
    // Add checks for valid email and password length min 6 chars
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <div>
                <label htmlFor='email'>E-mail:</label>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
