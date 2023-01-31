import { Link } from "react-router-dom";
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
                        <Link to="/list">Show tasks</Link>
                    </li>
                </ul>
                <button>Log list</button>
            </nav>
    )
}

export default Header