import React, { useEffect, useState } from 'react';

const Add = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        try {
        fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/')
        .then(res => res.json())
        .then(res => setMessage(res.description));
        // .then(res => res);
        } catch (e) {
        console.error(e);
        }
        
    });

    return (
        <main>
            <h1>Add</h1>
            <p>{message}</p>
        </main>
    );
};

export default Add;