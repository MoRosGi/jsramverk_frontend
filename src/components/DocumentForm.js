import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const DocumentForm = () => {
    const [formDocument, setFormDocument] = useState({ title: '', content: '' });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDocument({ ...formDocument, [name]: value });
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem("token")
            },
            body: JSON.stringify(formDocument)
            });
    
            const result = await response.json();
            console.log('Success:', result);
            navigate('/userdocuments');

        } catch (error) {
            toast(error);
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
                value={formDocument.title}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <div>
                <label htmlFor='content'>Content:</label>
            </div>
            <textarea
                name="content"
                id="content"
                value={formDocument.content}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Skapa</button>
        </form>
    );
};

export default DocumentForm;
