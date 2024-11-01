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
                <div className={styles.myDocumentsWrapper}>
                    <div className={styles.myDocumentsHeader}>
                        <h2>My documents</h2>
                        <button className={styles.button}>
                            <Link to="/documentform">Create new document</Link>
                        </button>
                    </div>
                    {documents.length > 0 ? (
                        documents.map((document) => (
                            <div key={document._id}>
                                <h3><Link className={styles.Link} to={`/${document._id}`}>{document.title}</Link></h3>
                            </div>
                        ))
                    ) : (
                        <p>{documents?.length > 0 ? (documents[0].error || 'Loading...') : 'No documents.'}</p>
                    )}
                </div>
            </main>
        </AuthWrapper>
    );
};

export default UserDocuments;
