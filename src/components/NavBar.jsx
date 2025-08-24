import { Link } from "react-router-dom";

function NavBar () {
    return(
        <nav className="navbar">
            <div className="navbar-click">
                <Link to ="/"><span className="spanRick">Rick</span>&<span className="spanMorty">Morty</span></Link>
            </div>
            <div className="navbar-links">
                <Link to = "/">Characters</Link>
                <Link to = "/">Log Out</Link>
            </div>
        </nav>
    )
}

export default NavBar