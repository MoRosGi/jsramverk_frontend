import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';

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
                toast(e);
                console.error(e);
            }
        };

        fetchData();

    }, [id]);

    // Change document._id to document?._id to prevent big red error screen if no documents/not logged in.
    return (
        <AuthWrapper>
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
                    <p>Loading...</p>
                )}
                <Link to={`/documentedit/${document?._id}`}>
                    <button>Edit</button>
                </Link>
                <InviteForm documentId={id} />
            </main>
        </AuthWrapper>
    );
};

export default Document;
