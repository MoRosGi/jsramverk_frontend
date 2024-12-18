import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./LoginForm.module.css";

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';

const LoginForm = () => {
    const [formLogin, setFormLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const inviteId = sessionStorage.getItem('inviteId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${SERVER_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formLogin)
                }
            );

            const result = await response.json();

            if (result.errors) {
                toast(result.errors[0].detail);
            } else {
                const token = result.data.token;
                sessionStorage.setItem('token', token);

                if (inviteId) {
                    navigate(`/invite/${inviteId}`);
                    return;
                }
                console.log(sessionStorage.getItem('inviteId'));
                navigate('/userdocuments');
            }

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
                    value={formLogin.email}
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
                    value={formLogin.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button className={styles.button} type="submit">
                    Log in
                </button>
            </div>
            <div>
                <Link to="/register" className={styles.Link}>
                    Create new account
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
