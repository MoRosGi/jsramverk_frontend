import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import AuthWrapper from './AuthWrapper';
import CodeEditor from './CodeEditor';
import styles from './DocumentForm.module.css';

const SERVER_URL = 'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net';

const DocumentForm = () => {
    const [formDocument, setFormDocument] = useState({ title: '', content: '', isCode: false });
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        const newDocument = { ...formDocument, [field]: value};
        setFormDocument(newDocument);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${SERVER_URL}/documents`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': sessionStorage.getItem("token")
                    },
                    body: JSON.stringify(formDocument)
                }
            );

            const result = await response.json();
            console.log('Success:', result);
            navigate('/userdocuments');

        } catch (error) {
            toast(error);
            console.error('Error:', error);
        }
    };

    return (
        <AuthWrapper>
            <main>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="title">
                                Title:
                            </label>
                        </div>
                        <input
                            className={styles.input}
                            type="text"
                            name="title"
                            id="title"
                            value={formDocument.title}
                            onChange={(e) => handleChange ('title', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div>
                            <button onClick={() => 
                                handleChange ('isCode', !formDocument.isCode)}
                                className={styles.button}
                                type='button'
                            >
                                Switch to {formDocument.isCode ? "Text Mode" : "Code Mode"}
                            </button>
                        </div>

                        {formDocument.isCode ? (
                            <CodeEditor
                            content={formDocument.content}
                            setContent={(value) => handleChange('content', value)}
                            title={formDocument.title}
                        />
                        ) : (
                            <textarea
                                className={styles.textarea}
                                name="content"
                                id="content"
                                value={formDocument.content}
                                onChange={(e) => handleChange ('content', e.target.value)}
                                required
                            />
                        )}
                        <div>
                            <button
                                className={styles.button}
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </main>
            
        </AuthWrapper>
    );
};

export default DocumentForm;
