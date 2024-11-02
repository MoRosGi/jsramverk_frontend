import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <button className={styles.button} onClick={handleLogout}>
            Log out
        </button>
    );
};

export default LogoutButton;
