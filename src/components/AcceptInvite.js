import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import styles from './AcceptInvite.module.css';

const AcceptInvite = () => {
    const navigate = useNavigate();
    const { inviteId } = useParams();
    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (token) {
            try {
                const response = await fetch(
                    `https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/invite/${inviteId}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-access-token': token
                        }
                    }
                );

                const result = await response.json();

                if (result.errors) {
                    toast(result.errors[0].detail);
                } else {
                    navigate('/userdocuments');
                }

                console.log(result);

            } catch (error){
                toast(error);
                console.error('Error:', error);
            }
        } else {
            sessionStorage.setItem('inviteId', inviteId);
            navigate('/');
        }
    };

    return (
        <main>
            <div className={styles.acceptWrapper}>
                <form onSubmit={handleSubmit}>
                    <p>Your e-mail address will be added to a shared document. Click OK to log in or register a new account.</p>
                    <button className={styles.button} type="submit">OK</button>
                </form>
            </div>
            
        </main>

    );
};

export default AcceptInvite;
