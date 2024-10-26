import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast('You have to be logged in.');
            navigate('/');
        }
    }, [token, navigate]);
    
    if (!token) return null;

    return <>{ children }</>;
}

export default AuthWrapper;
