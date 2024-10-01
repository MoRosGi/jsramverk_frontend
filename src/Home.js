import React, { useEffect, useState } from 'react';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/gets/66fa8ebaf7c5bf59b01b53ea');
                const data = await response.json();
                console.log(data);
                setMessage(JSON.stringify(data));
            } catch (e) {
                console.error(e);
                setMessage('Error fetching data');
            }
        };

        fetchData();
        // try {
        // fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/')
        // // .then(res => res.json())
        // // .then(res => setMessage(res.description));
        // // .then(res => res);
        // } catch (e) {
        // console.error(e);
        // }
        
    }, []);

    return (
        <main>
        <h1>Hem</h1>
        <p>{message}</p>
        </main>
    );
};

export default Home;