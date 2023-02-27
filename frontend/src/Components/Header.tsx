import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import './Header.css';



const Header = () => {
    const location = useLocation();

    return(   
        <Navbar fluid={true} rounded={true}>
            {/* Logo */}
            <Navbar.Brand
                to="/navbars"
             >
                <img
                src="https://w7.pngwing.com/pngs/268/27/png-transparent-action-item-computer-icons-task-others-miscellaneous-angle-text-thumbnail.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    ToDo
                </span>
            </Navbar.Brand>



            {/* Create Task button */}
            <div className="flex md:order-2">
                <Link to="/create">
                    <Button color="success">
                        Create task
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button>
                        Sign Up
                    </Button>
                </Link>
                <Link to="/signin">
                    <Button>
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle />
            </div>

            {/* Collapsable menu */}

            <Navbar.Collapse>
                <Link to="/">
                    Home
                </Link>
                <Link to="/list">
                    Show tasks
                </Link>
                <Link to="/timeline">
                    Show timeline
                </Link>
                <Link to="/calendar">
                    Show Calendar
                </Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header