import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams, Link } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import styles from "./Document.module.css";

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';

const Document = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [document, setDocument] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${SERVER_URL}/documents/${id}`,
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
            <main>
                <div className={styles.documentWrapper}>
                    <div className={styles.buttonBarWrapper}>
                        <InviteForm documentId={id} />
                        <Link to={`/documentupdate/${document?._id}`}className={styles.a}>
                            <button className={styles.buttonEdit}>
                                Edit document
                            </button>
                        </Link>
                    </div>
                    <div className={styles.documentWrapper}>
                        {document ? (
                            document.error ? (
                                <p>
                                    {document.error}
                                </p>
                            ) : (
                                <div>
                                    <h2>
                                        {document.title}
                                    </h2>
                                    <p 
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(document.content)}}
                                    />
                                </div>
                            )
                        ) : (
                            <p>
                                Loading...
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </AuthWrapper>
    );
};

export default Document;
