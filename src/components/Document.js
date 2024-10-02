import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Document = () => {
    const { id } = useParams();
    const [document, setDocument] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await fetch(`https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`);

            const data = await response.json();

            console.log(data);

            setDocument(data.data);
            // .then(res => res.json())
            // .then(res => setMessage(res.description));
            // .then(res => res);
            } catch (e) {
            console.error(e);
            }
        };

        fetchData();
        
    }, [id]);

    return (
        <main>
        {document ? (
            document.error ? (
                <p>{document.error}</p>
            ) : (
                <div>
                    <h1>{document.title}</h1>
                    <p>{document.content}</p>
                </div>
            )
        ) : (
            <p>Laddar...</p>
        )}
        <Link to={`/documentedit/${document._id}`}>
        <button>Redigera</button>
        </Link>
        </main>
    );
};

export default Document;
