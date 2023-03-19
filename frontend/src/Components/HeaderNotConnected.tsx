import { Button, Navbar } from "flowbite-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import authContext from "../Hooks/authContext";
// import './Header.css';



const HeaderNotConnected = () => {
    // const location = useLocation();
    // const { authenticated, setAuthenticated } = useContext(authContext);


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
        </Navbar>
    )
}

export default HeaderNotConnected