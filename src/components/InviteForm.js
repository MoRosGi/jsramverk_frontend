import React, { useState } from 'react';
import { toast } from 'react-toastify';

const InviteForm = ({ documentId }) => {

    const [inviteForm, setInviteForm,] = useState({ receiver: '', documentId: documentId });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInviteForm({ ...inviteForm, [name]: value });
        // setInviteForm(e.target.value);
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(inviteForm);
        console.log(typeof(inviteForm.documentId));

        try {
            const response = await fetch('https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(inviteForm)
            });
    
            const result = await response.json();

            toast(result);
            console.log(result);

        } catch (error) {
            toast(error);
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Add collaborator</label>
            </div>
            <select
                name="receiver"
                placeholder="Recipient's e-mail"
                value={inviteForm.receiver}
                onChange={handleChange}
                required
            >
                <option value="annie.v.gustafsson@gmail.com">Annie Gustafsson</option>
                <option value="morgane.rose.girard@gmail.com">Morgane Girard</option>
                <option value="angt23@student.bth.se">Annie Student</option>
                <option value="mogi23@student.bth.se">Morgane Student</option>
            </select>
            <input
                type="hidden"
                name="documentId"
                id="documentId"
                value={inviteForm.documentId}
                onChange={handleChange}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default InviteForm;
