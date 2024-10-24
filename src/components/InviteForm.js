import React, { useState } from 'react';

const InviteForm = ({ documentId }) => {

    const [inviteEmail, setInviteEmail] = useState('');
    
    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setInviteEmail({ ...inviteEmail, [name]: value });
        setInviteEmail(e.target.value);
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(inviteEmail);

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
            <div>
                <label htmlFor='email'>Add collaborator</label>
            </div>
            <select
                name="inviteEmail"
                placeholder="Recipient's e-mail"
                value={inviteEmail}
                onChange={handleChange}
                required
            >
                <option value="annie.v.gustafsson@gmail.com">Annie Gustafsson</option>
                <option value="morgane.rose.girard@gmail.com">Morgane Girard</option>
                <option value="angt23@student.bth.se">Annie Student</option>
                <option value="mogi23@student.bth.se">Morgane Student</option>
            </select>
            <button type="submit">Send</button>
        </form>
    );
};

export default InviteForm;
