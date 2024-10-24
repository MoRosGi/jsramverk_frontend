import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { useParams } from 'react-router';

const AcceptInvite = () => {
    // const [formLogin, setFormLogin] = useState({ email: '', password: '' });
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

                if (result.status === 200) {
                    navigate('/userdocuments');
                }

                console.log(result);

                // toast(result);
            } catch (error){
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
