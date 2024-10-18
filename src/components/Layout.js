import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
        <nav>
            <ul>
            <li>
                <Link to="/">Logga in</Link>
            </li>
            <li>
                <Link to="/register">Registrera</Link>
            </li>
            <li>
                <Link to="/documentform">Nytt dokument</Link>
            </li>
            </ul>
        </nav>

        <Outlet />
        </>
    )
};

export default Layout;
