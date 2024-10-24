import { useNavigate } from "react-router";
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const AcceptInvite = () => {
    const navigate = useNavigate();
    const { inviteId } = useParams();
    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (token) {

            try {
                const response = await fetch(`https://jsramverk-text-editor-beb8fuhxangpdqfh.northeurope-01.azurewebsites.net/invite/${inviteId}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-access-token': sessionStorage.getItem("token")
                        }
                    }
                );
                const result = await response.json();

                if (result.errors) {
                    toast(result.errors[0].detail);
    
                } else {
    
                    navigate('/userdocuments');
                }

                // if (result.status === 200) {
                //     navigate('/userdocuments');
                // }

                // if (result.errors) {
                //     toast(result.errors[0].detail);

                // }

                console.log(result);

            } catch (error){
                toast(error);
                console.error('Error:', error);
            }
        } else {
            sessionStorage.setItem('inviteId', inviteId);
            navigate('/');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Your e-mail address will be added to a shared document. Click OK to log in or register a new account.</p>
            <button type="submit">OK</button>
        </form>
    );
};

export default AcceptInvite;
