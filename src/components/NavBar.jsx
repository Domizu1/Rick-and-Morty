import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext/index";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    return (
        <nav className="navbar">
            <div className="navbar-click">
                <Link to="/characters"><span className="spanRick">Rick</span>&<span className="spanMorty">Morty</span></Link>
            </div>
            <div className="navbar-links">
                <Link to="/characters">Characters</Link>
                <Link onClick={handleLogout}>Log Out</Link>
            </div>
        </nav>
    )
}

export default NavBar