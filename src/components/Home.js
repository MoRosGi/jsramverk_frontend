import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents');
                const data = await response.json();
                setDocuments(data.data);

            } catch (e) {
                console.error(e);
                setDocuments([{ error: 'Error fetching data'}]);
            }
        };

        fetchData();

    }, []);

    return (
        <main>
            <h1>Hem</h1>
            {documents.length > 0 ? (
                documents.map((document) => (
                    <div key={document._id}>
                        <h2><Link to={`/${document._id}`}>{document.title}</Link></h2>
                    </div>
                ))
            ) : (
                <p>{documents[0]?.error ? documents[0].error : 'Laddar...'}</p>
            )}
            <button>
                <Link to="/documentform">Nytt dokument</Link>
            </button>
        </main>
    );
};

export default Home;