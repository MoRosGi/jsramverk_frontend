import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import CodeEditor from './CodeEditor';
import DOMPurify from 'dompurify';
import styles from './DocumentUpdate.module.css';

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';

const DocumentUpdate = () => {
    const { id: _id } = useParams()
    const [documentUpdate, setDocumentUpdate] = useState({ title: '', content: '', isCode: false });
    const navigate = useNavigate();
    const socket = useRef(null);
    let toastId = useRef(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${SERVER_URL}/documents/${_id}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-access-token': sessionStorage.getItem("token")
                        }
                    }
                );

                const data = await response.json();
                setDocumentUpdate(data.data);
            } catch (e) {
                toast(e);
                console.error(e);
            }
        };

        fetchData();
        socket.current = io(SERVER_URL, { query: {token: sessionStorage.getItem('token')}});
        console.log(socket.current);

        socket.current.emit("joinDocument", _id);

        socket.current.on("documentUpdate", (data) => {
            setDocumentUpdate(data);
        });

        socket.current.on("documentSaved", (data) => {

            if (!toastId.current) {
                toastId.current = toast(data.message, { autoClose: 5000});
            } else if (toast.isActive(toastId.current)) {
                toast.update(toastId.current, { render: data.message,  autoClose: 5000});
            } else {
                toastId.current = toast(data.message, { autoClose: 5000});
            }
        });

        return () => {
            socket.current.disconnect();
        }
    }, [_id, navigate]);

    const handleChange = (field, value) => {
        const updatedDocument = { ...documentUpdate, [field]: value};
        setDocumentUpdate(updatedDocument);

        socket.current.emit("documentUpdate", {
            _id,
            title: updatedDocument.title || "Untitled",
            content: updatedDocument.content,
            isCode: updatedDocument.isCode
        });
        console.log("Is it code", updatedDocument.isCode);
    };

    return (
        <>
            <AuthWrapper>
                <main>
                    <div className={styles.updateWrapper}>
                        <InviteForm documentId={_id} />
                        <div className={styles.updatewrapper}>
                            <div className={styles.editorwrapper}>
                                <label htmlFor="title">
                                    Title:
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={documentUpdate.title || "Untitled"}
                                    onChange={(e) => handleChange ('title', e.target.value)}
                                />
                                <button onClick={() => 
                                    handleChange ('isCode', !documentUpdate.isCode)}
                                    className={styles.button}
                                >
                                    Switch to {documentUpdate.isCode ? "Text Mode" : "Code Mode"}
                                </button>
                                {documentUpdate.isCode ? (
                                    <CodeEditor
                                    content={documentUpdate.content}
                                    setContent={(value) => handleChange('content', value)}
                                    title={documentUpdate.title}
                                    isCode={documentUpdate.isCode}
                                    socket={socket.current}
                                    id={_id}
                                />
                                ) : (
                                    <textarea
                                        className={styles.textarea}
                                        name="content"
                                        id="content"
                                        value={documentUpdate.content}
                                        onChange={(e) => handleChange ('content', e.target.value)}
                                    />
                                )}
                            </div>
                                {!documentUpdate.isCode && (
                                    <div className={styles.outputwrapper}>
                                        <div id="output-container">
                                            <h1>
                                                {documentUpdate.title}
                                            </h1>
                                            <p
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(documentUpdate.content)}}
                                            />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                    
                </main>
            </AuthWrapper>
        </>
    );
};

export default DocumentUpdate;
