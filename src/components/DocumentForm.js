import React, { useState } from 'react';

const DocumentForm = () => {
    const [formDocument, setFormDocument] = useState({ title: '', content: '' });
    
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDocument)
            });
    
            const result = await response.json();
            console.log('Success:', result);
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={formDocument.title}
                onChange={handleChange}
            />
            </div>
            <div>
            <label>Content:</label>
            <textarea
                name="content"
                value={formDocument.content}
                onChange={handleChange}
            />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default DocumentForm;
