import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams, Link } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';

const Document = () => {
    const navigate = useNavigate();
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

                if (data.errors) {
                    toast(data.errors[0].detail);
                    navigate('/userdocuments');
                }

                setDocument(data.data);

            } catch (e) {
                toast(e);
                console.error(e);
            }
        };

        fetchData();

    }, [id, navigate]);

    return (
        <AuthWrapper>
            <InviteForm documentId={id} />
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
                <Link to={`/documentupdate/${document?._id}`}>
                    <button>Update</button>
                </Link>
            </main>
        </AuthWrapper>
    );
};

export default Document;
