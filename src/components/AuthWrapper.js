import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    if (!token) {
        navigate('/');
        return null;
    }

    return <>{ children }</>;
}

export default AuthWrapper;
