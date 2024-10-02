import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <h1>Doc</h1>
        {document ? (
            document.error ? (
                <p>{document.error}</p>
            ) : (
                <div>
                    <h2>{document.title}</h2>
                    <p>{document.content}</p>
                </div>
            )
        ) : (
            <p>Laddar...</p>
        )}
        </main>
    );
};

export default Document;
