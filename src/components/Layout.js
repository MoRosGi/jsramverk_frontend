import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Log in/Register</Link>
                    </li>
                    <li>
                        <Link to="/userdocuments">My documents</Link>
                    </li>
                    <li>
                        <Link to="/documentform">New document</Link>
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
