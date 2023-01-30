import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "../App";
import './Header.css';
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
                        <Link to="/show">Show tasks</Link>
                    </li>
                </ul>
            </nav>
    )
}

export default Header