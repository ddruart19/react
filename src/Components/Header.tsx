import { Link } from "react-router-dom";
import './Header.css';
import Main from "../Routing/Main";
const Header = () => {
    return(   
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
    )
}

export default Header