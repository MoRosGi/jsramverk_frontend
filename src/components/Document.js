import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InviteForm from './InviteForm';

const Document = () => {
    const { id } = useParams();
    const [document, setDocument] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await fetch(
                `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'x-access-token': sessionStorage.getItem("token")
                    }
                }
            );

            const data = await response.json();

            setDocument(data.data);
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
        <InviteForm documentId={id} />
        </main>
    );
};

export default Document;
