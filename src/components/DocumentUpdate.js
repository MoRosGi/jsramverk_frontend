import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import CodeEditor from './CodeEditor';
import styles from './DocumentUpdate.module.css';

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';
// const SERVER_URL ='http://localhost:1337';

const DocumentUpdate = () => {
    const { id: _id } = useParams()
    const [documentUpdate, setDocumentUpdate] = useState({ title: '', content: '' });
    const [isCodeMode, setIsCodeMode] = useState(() => {
        const savedMode = sessionStorage.getItem('isCodeMode');
        return savedMode === 'true';
    }); 
    const navigate = useNavigate();
    const socket = useRef(null);
    let toastId = useRef(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${_id}`,
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

        if (socket.current._opts.secure === false) {
            navigate(`/documentedit/${_id}`);
        }

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedDocument = { ...documentUpdate, [name]: value, isCode: false };
        setDocumentUpdate(updatedDocument);

        socket.current.emit("documentUpdate", {
            _id,
            title: updatedDocument.title,
            content: updatedDocument.content,
            isCode: updatedDocument.isCode
        });
    };

    const handleCodeChange = (value) => {
        // Update content in state when change in code editor,
        // set isCode to true
        const updatedDocument = { ...documentUpdate, content: value, isCode: true };
        setDocumentUpdate(updatedDocument);

        socket.current.emit("documentUpdate", {
            _id,
            title: updatedDocument.title,
            content: updatedDocument.content,
            isCode: updatedDocument.isCode
        });
    };

    const handleRunCode = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/run-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: documentUpdate.content }),
            });

            const result = await response.json();
            toast(result.output);
        } catch (e) {
            console.error("Error running code:", e);
        }
    };

    const toggleCodeMode = () => {
        setIsCodeMode(prevMode => {
            const newMode = !prevMode;
            sessionStorage.setItem('isCodeMode', newMode);
            return newMode;
        });
    };

    return (
        <>
            <AuthWrapper>
                <InviteForm _id={_id} />
                <div className={styles.updatewrapper}>
                    <div className={styles.editorwrapper}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={documentUpdate.title}
                            onChange={handleChange}
                        />
                        <button onClick={() => {
                            toggleCodeMode();
                            setDocumentUpdate(prev => ({
                                ...prev,
                                isCode: !isCodeMode
                            }));}
                        }>
                            Switch to {isCodeMode ? "Text Mode" : "Code Mode"}
                        </button>
                        {isCodeMode ? (
                            <CodeEditor
                            content={documentUpdate.content}
                            setContent={handleCodeChange}
                            title={documentUpdate.title}
                            socket={socket.current}
                            id={_id}
                        />
                        
                        ) : (
                            <textarea
                                name="content"
                                id="content"
                                value={documentUpdate.content}
                                onChange={handleChange}
                            />
                        )}
                        {isCodeMode && (
                            <button onClick={handleRunCode}>Run Code</button>
                        )}
                    </div>
                    <div className={styles.outputwrapper}>
                        <div id="output-container">
                            <h1>{documentUpdate.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: (documentUpdate.content) }}></div>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        </>
    );
};

export default DocumentUpdate;
