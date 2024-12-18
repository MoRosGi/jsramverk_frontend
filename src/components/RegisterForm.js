import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import styles from "./RegisterForm.module.css";

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';

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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formRegister.email)) {
            toast("Invalid email format.");
            return;
        }

        if (formRegister.password.length < 6) {
            toast("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await fetch(
                `${SERVER_URL}/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formRegister)
                }
            );

            const result = await response.json();
            console.log('Success:', result);

            const token = result.data.token;
            sessionStorage.setItem('token', token);

            if (inviteId) {
                navigate(`/invite/${inviteId}`);
            }
            navigate('/userdocuments');

        } catch (error) {
            toast(error);
            console.error('Error:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor='email'>
                        E-mail:
                    </label>
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
                    <label htmlFor='password'>
                        Password:
                    </label>
                </div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formRegister.password}
                    onChange={handleChange}
                />
            </div>
            <button className={styles.button} type="submit">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
