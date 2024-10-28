import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
// import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

// const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/';
const SERVER_URL ='http://localhost:3000';

const DocumentUpdate = () => {
    const documentId = useParams();
    const [documentUpdate, setDocumentUpdate] = useState({ title: '', content: '' });
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const navigate = useNavigate();
    console.log(documentId.id);
    // console.log(useParams());

    let socket;

    useEffect(() => {
        socket = io(SERVER_URL);

        socket.emit("joinDocument", documentId.id);
        // console.log(documentId);

        // socket.on("documentUpdate", (data) => {
        //     setContent(data);
        // });

        return () => {
            socket.disconnect();
        }
    }, [documentId]);

    // const handleChange = (e) => {
    //     const value = e.target;

    //     socket.emit("content", value);
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target);
        // console.log("Title:", content.title);
        setDocumentUpdate({ ...documentUpdate, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch(
    //             `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`,
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-access-token': sessionStorage.getItem("token")
    //                 },
    //                 body: JSON.stringify(documentUpdate)
    //             }
    //         );

    //         const result = await response.json();
    //         toast(result);
    //         console.log('Success:', result);
    //         navigate(`/${id}`);

    //     } catch (error) {
    //         toast(error);
    //         console.error('Error:', error);
    //         sessionStorage.clear();
    //         navigate('/login');
    //     }
    // };

    return (
        <>
            <AuthWrapper>
                <div>
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
                </div>
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
                <div id="output-container">
                    <h1>{documentUpdate.title}</h1>
                    <p>{documentUpdate.content}</p>
                </div>
                <InviteForm documentId={documentId} />
            </AuthWrapper>
        </>
    );
};

export default DocumentUpdate;
