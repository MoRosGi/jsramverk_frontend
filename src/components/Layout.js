import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Layout = () => {
    return (
        <>
        <nav>
            <ul>
            <li>
                <Link to="/">Log in</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/documentform">Create new document</Link>
            </li>
            </ul>
            <LogoutButton />
        </nav>
        <Outlet />
        </>
    )
};

export default Layout;
