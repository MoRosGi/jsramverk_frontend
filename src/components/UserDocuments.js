import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthWrapper from './AuthWrapper';
import styles from './UserDocuments.module.css';

const UserDocuments = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents',
                    {
                        method: 'GET',
                        headers: {
                            'x-access-token': sessionStorage.getItem("token")
                        }
                    }
                );

                const data = await response.json();
                setDocuments(data.data);

            } catch (e) {
                toast(e);
                console.error(e);
                setDocuments([{ error: 'Error fetching data'}]);
            }
        };

        fetchData();
    }, []);

    return (
        <AuthWrapper>
            <main>
                <h1>My documents</h1>
                {documents.length > 0 ? (
                    documents.map((document) => (
                        <div key={document._id}>
                            <h2><Link className={styles.Link} to={`/${document._id}`}>{document.title}</Link></h2>
                        </div>
                    ))
                ) : (
                    <p>{documents?.length > 0 ? (documents[0].error || 'Loading...') : 'No documents.'}</p>
                )}
                <button>
                    <Link to="/documentform">Create new document</Link>
                </button>
            </main>
        </AuthWrapper>
    );
};

export default UserDocuments;
