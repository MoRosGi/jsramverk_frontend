import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Doc = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await fetch(`https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`);

            const data = await response.json();

            console.log(data);

            setMessage(data.data);
            // .then(res => res.json())
            // .then(res => setMessage(res.description));
            // .then(res => res);
            } catch (e) {
            console.error(e);
            }
        };

        fetchData();
        
    });

    return (
        <main>
        <h1>Doc</h1>
        {message ? (
            message.error ? (
                <p>{message.error}</p>
            ) : (
                <div>
                    <h2>{message.title}</h2>
                    <p>{message.content}</p>
                </div>
            )
        ) : (
            <p>Laddar...</p>
        )}
        </main>
    );
};

export default Doc;