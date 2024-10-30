import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import styles from './DocumentUpdate.module.css';

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';
// const SERVER_URL ='http://localhost:1337';

const DocumentUpdate = () => {
    const { id: _id } = useParams()
    const [documentUpdate, setDocumentUpdate] = useState({ title: '', content: '' });
    const navigate = useNavigate();
    const socket = useRef(null);
    let toastId = useRef(null);
    let targetId = "";

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
        const updatedDocument = { ...documentUpdate, [name]: value };
        setDocumentUpdate(updatedDocument);

        socket.current.emit("documentUpdate", {
            _id,
            title: updatedDocument.title,
            content: updatedDocument.content
        });
    };

    const commentAlert = (e) => {
        e.preventDefault();
        console.log("hej");

        // From backend:
        // get document by _id
        // get comment by commentId
    }

    const handleSelection = (e) => {
        e.preventDefault();
        const contentInput = document.getElementById("content");
        
        contentInput.focus();
        // contentInput.setSelectionRange(0, 5)

        const selectionStart = contentInput.selectionStart;
        const selectionEnd = contentInput.selectionEnd;
        const selectedText = contentInput.value.substring(selectionStart, selectionEnd);

        console.log(selectedText);
        
        // const selectedText = window.getSelection();
        // const range = selectedText.getRangeAt(0);
        const commentId = Math.floor(Math.random() * 100000);
        // console.log(selectedText);
        const commentSelection = document.createElement('span')
        // let commentSelection = `<span className="comment-text" id="comment-id-${commentId}">${selectedText.toString()}</span>`
        commentSelection.className = "comment-text";
        commentSelection.id = `comment-id-${commentId}`;
        commentSelection.textContent = selectedText.toString();
        targetId = `comment-id-${commentId}`;

        console.log("targetId2", targetId);

        // console.log(commentSelection);
        // range.deleteContents();
        // range.insertNode(commentSelection);
        const contentBefore = contentInput.value.substring(0, selectionStart);
        const contentAfter = contentInput.value.substring(selectionEnd)
        console.log("Before:", contentBefore);
        console.log("After:", contentAfter);

        const commentSelectionSpan = commentSelection.outerHTML;
        const extractedIdArray = commentSelectionSpan.match(/id="([^"]+)"/);
        console.log(extractedIdArray[1]);

        const extractedId = extractedIdArray[1];
        console.log(extractedId);

        const contentInputValue = contentBefore + commentSelection.outerHTML + contentAfter;
        contentInput.value = contentInputValue;
        // contentInput.innerHTML = contentInputValue;
        console.log("Outer", commentSelection.outerHTML);

        const commentTarget = document.getElementById(extractedId);
        console.log("After id", extractedId);
        // commentTarget.addEventListener("click", commentAlert);
        console.log("Hej", commentSelection);
        console.log("The id", commentTarget);
    };

    const addClickToSpan = () => {
        const commentTarget = document.getElementById(targetId);
        if (commentTarget != null) {
            commentTarget.addEventListener("click", commentAlert);
        } else {
            console.log("TargetId", targetId);
        }
        
    };

    addClickToSpan();

    return (
        <>
            <AuthWrapper>
            <InviteForm _id={_id} />
                <div>
                    <div className={styles.updatewrapper}>
                        <div className={styles.editorwrapper}>
                            <div>
                                <label htmlFor='title'>Title:</label>
                            </div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={documentUpdate.title}
                                onChange={handleChange}
                            />
                            <div>
                                <div>
                                    <label htmlFor='content'>Content:</label>
                                </div>
                                <textarea
                                    name="content"
                                    id="content"
                                    value={documentUpdate.content}
                                    onChange={handleChange}
                                />
                            </div>
                            </div>
                            <div className={styles.outputwrapper}>
                                <div id="output-container">
                                    <h1>{documentUpdate.title}</h1>
                                    <p dangerouslySetInnerHTML={{__html: documentUpdate.content }}/>
                                </div>
                            </div>
                            <div className={styles.commentwrapper}>
                                
                                <button type="submit" onClick={handleSelection}>Add comment</button>
                                <textarea
                                    name="content"
                                    id="content"
                                    value={documentUpdate.content}
                                    onChange={handleChange}
                                />
                                <p dangerouslySetInnerHTML={{__html: documentUpdate.content }}/>
                            </div>
                        </div>
                    </div>
            </AuthWrapper>
        </>
    );
};

export default DocumentUpdate;
