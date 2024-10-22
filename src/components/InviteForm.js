import React, { useState } from 'react';

const InviteForm = ({ documentId }) => {

    const [inviteEmail, setInviteEmail] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInviteEmail({ ...inviteEmail, [name]: value });
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ documentId, inviteEmail })
            });
    
            const result = await response.json();

            console.log(result);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="inviteEmail"
                placeholder="Mottagarens e-postadress"
                value={inviteEmail}
                onChange={handleChange}
                required
            />
            <button type="submit">Skicka</button>
        </form>
    );
};

export default InviteForm;
