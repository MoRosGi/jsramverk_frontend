// Change import from react-router to react-router-dom - 
// better optimization for web applications
// Add import of CSS module
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
    const navigate = useNavigate();

    // Change handleSubmit to handleLogout for clarity
    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    };

    // Remove form, change onSubmit to onClick, change handleSubmit 
    // to handleLogout, add className for styling
    return (
        <button className={styles.button} onClick={handleLogout}>
            Log out
        </button>
    );
};

export default LogoutButton;
