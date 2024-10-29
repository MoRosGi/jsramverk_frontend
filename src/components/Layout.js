import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <>
            <nav>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link to="/" className={styles.link}>Log in/Register</Link>
                    </li>
                    <li>
                        <Link to="/userdocuments"className={styles.link}>My documents</Link>
                    </li>
                    <li>
                        <Link to="/documentform"className={styles.link}>New document</Link>
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;
