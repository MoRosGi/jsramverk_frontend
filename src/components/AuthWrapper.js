import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    
    if (!token) return null;

    return <>{ children }</>;
}

export default AuthWrapper;
