import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams, Link } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import styles from "./Document.module.css";

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
            <main className={styles.main}>
                <div className={styles.buttonBarWrapper}>
                    <InviteForm documentId={id} />
                    <Link to={`/documentupdate/${document?._id}`}className={styles.a}>
                        <button className={styles.button}>Update</button>
                    </Link>
                </div>
                <div className={styles.documentWrapper}>
                    {document ? (
                        document.error ? (
                            <p>{document.error}</p>
                        ) : (
                            <div>
                                <h1>{document.title}</h1>
                                <p dangerouslySetInnerHTML={{ __html: document.content }} />
                            </div>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>
        </AuthWrapper>
    );
};

export default Document;
