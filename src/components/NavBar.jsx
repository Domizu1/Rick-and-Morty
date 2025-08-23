import { Link } from "react-router-dom";

function NavBar () {
    return(
        <nav className="navbar">
            <div className="navbar-click">
                <Link to ="/">Rick&Morty</Link>
            </div>
            <div className="navbar-links">
                <Link to = "/">Characters</Link>
                {/* <Link to = "/Episodes">Episodes</Link> */}
                {/* <Link to = "/Location">Location</Link> */}
                {/* <Link to = "/">Log Out</Link> */}
            </div>
        </nav>
    )
}

export default NavBar