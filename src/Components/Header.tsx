import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import './Header.css';
const Header = () => {
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
                <Button>
                    Create task
                </Button>
                <Navbar.Toggle />
            </div>

            {/* Collapsable menu */}

            <Navbar.Collapse>
                <Navbar.Link href="/">
                    Home
                </Navbar.Link>
                <Navbar.Link href="/list">
                    Show tasks
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header