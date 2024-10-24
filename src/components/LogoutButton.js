import { useNavigate } from "react-router";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Log out</button>
        </form>
    );
};

export default LogoutButton;
