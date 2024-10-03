import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';

const DocumentEdit = () => {
    const { id } = useParams();
    const [documentEdit, setDocumentEdit] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await fetch(`https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`);

            const data = await response.json();

            console.log(data);

            setDocumentEdit(data.data);
            // .then(res => res.json())
            // .then(res => setMessage(res.description));
            // .then(res => res);
            } catch (e) {
            console.error(e);
            }
        };

        fetchData();
        
    }, [id]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDocumentEdit({ ...documentEdit, [name]: value });
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documentEdit)
            });
    
            const result = await response.json();
            console.log('Success:', result);
            navigate('/');

        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <div>
                <label htmlFor='title'>Title:</label>
            </div>
            <input
                type="text"
                name="title"
                id="title"
                value={documentEdit.title}
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
                value={documentEdit.content}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Uppdatera</button>
        </form>
    );
};

export default DocumentEdit;
