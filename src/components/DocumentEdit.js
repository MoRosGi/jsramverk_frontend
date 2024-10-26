import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';
import InviteForm from './InviteForm';
import AuthWrapper from './AuthWrapper';
import { toast } from 'react-toastify';

const DocumentEdit = () => {
    const { id } = useParams();
    const [documentEdit, setDocumentEdit] = useState({ title: '', content: '' });
    const navigate = useNavigate();

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
                setDocumentEdit(data.data);
            } catch (e) {
                toast(e);
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
            const response = await fetch(
                `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/documents/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': sessionStorage.getItem("token")
                    },
                    body: JSON.stringify(documentEdit)
                }
            );

            const result = await response.json();
            toast(result);
            console.log('Success:', result);
            navigate(`/${id}`);

        } catch (error) {
            toast(error);
            console.error('Error:', error);
            sessionStorage.clear();
            navigate('/login');
        }
    };

    return (
        <>
            <AuthWrapper>
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
                    <button type="submit">Submit</button>
                </form>
                <InviteForm documentId={id} />
            </AuthWrapper>
        </>
    );
};

export default DocumentEdit;
