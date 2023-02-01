import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import './Header.css';
const Header = () => {
    return(   
        <Navbar fluid={true} rounded={true}>
            <nav>
                <ul className="navList">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">Create task</Link>
                    </li>
                    <li>
                        <Link to="/list">Show tasks</Link>
                    </li>
                </ul>
            </nav>
        </Navbar>
    )
}

export default Header