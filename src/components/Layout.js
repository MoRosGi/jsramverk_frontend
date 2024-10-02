import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
        <nav>
            <ul>
            <li>
                <Link to="/">Hem</Link>
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
