import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from "./InviteForm.module.css";

const InviteForm = ({ documentId }) => {
    // Add placeholder as default receiver to make it show on render
    const [inviteForm, setInviteForm] = useState({ receiver: '', documentId: documentId });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInviteForm({ ...inviteForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check select menu for placeholder, early return if no valid selection
        if (inviteForm.receiver === '') {
            toast('You must select a recipient to send an invite.');
            return;
        }

        console.log(inviteForm);
        console.log(typeof(inviteForm.documentId));

        try {
            const response = await fetch(
                'https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/invite',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': sessionStorage.getItem('token')
                    },
                    body: JSON.stringify(inviteForm)
                }
            );

            const result = await response.json();

            if (result.errors) {
                toast(result.errors[0].detail);
                return;
            }

            toast('Invitation sent.');
            console.log(result);

        } catch (error) {
            toast(error);
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={styles.label} htmlFor='email'>Add collaborator</label>
            </div>
            <select
                className={styles.select}
                name="receiver"
                value={inviteForm.receiver}
                onChange={handleChange}
                required
            >
                <option value="" disabled>Select a recipient</option>
                <option value="annie.v.gustafsson@gmail.com">Annie Gustafsson</option>
                <option value="morgane.rose.girard@gmail.com">Morgane Girard</option>
                <option value="angt23@student.bth.se">Annie Student</option>
                <option value="mogi23@student.bth.se">Morgane Student</option>
            </select>
            <button className={styles.button} type="submit">Send</button>
        </form>
    );
};

export default InviteForm;
