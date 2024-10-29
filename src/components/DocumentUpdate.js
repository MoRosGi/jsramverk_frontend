import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

// const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';
const SERVER_URL ='http://localhost:1337';
// let socket; // Move let socket outside function to make it last

const DocumentUpdate = () => {
    const { id: _id } = useParams()
    // const titleRef = useRef('');
    const [documentUpdate, setDocumentUpdate] = useState({ title: '', content: '' });
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const navigate = useNavigate();
    // console.log("First", _id);
    // console.log(useParams());
    const socket = useRef(null);

    useEffect(() => {

        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(
        //             `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${_id}`,
        //             {
        //                 method: 'GET',
        //                 headers: {
        //                     'x-access-token': sessionStorage.getItem("token")
        //                 }
        //             }
        //         );

        //         const data = await response.json();
        //         setDocumentUpdate(data.data);
        //     } catch (e) {
        //         toast(e);
        //         console.error(e);
        //     }
        // };

        // fetchData();
        // socket.current = io(SERVER_URL);
        socket.current = io(SERVER_URL, { query: {token: sessionStorage.getItem('token')}});
        console.log("Token:", sessionStorage.getItem('token'));

        socket.current.emit("joinDocument", _id);
        // console.log("After join room", _id);

        // socket.current.on(`userInfo`, (data) => {
        //     console.log(`userInfo`, data.user);
        // })

        socket.current.on("documentUpdate", (data) => {
            setDocumentUpdate(data);
            // console.log("Update data:", data);
        });

        socket.current.on("documentSaved", (data) => {
            toast(data.message);
        });

        return () => {
            socket.current.disconnect();
        }
    }, [_id]);

    // const handleChange = (e) => {
    //     const value = e.target;

    //     socket.emit("content", value);
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedDocument = { ...documentUpdate, [name]: value };
        // console.log(e.target);
        // console.log("Title:", content.title);
        setDocumentUpdate(updatedDocument);

        socket.current.emit("documentUpdate", {
            _id,
            title: updatedDocument.title,
            content: updatedDocument.content
        });
        // console.log("New title", updatedDocument.title);
    };

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
                <InviteForm _id={_id} />
            </AuthWrapper>
        </>
    );
};

export default DocumentUpdate;
