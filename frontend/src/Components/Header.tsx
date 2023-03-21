import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import authContext from "../Hooks/authContext";
// import './Header.css';



const Header = () => {
    // const location = useLocation();
    const { authenticated, setAuthenticated } = useContext(authContext);
    const router = useRouter()

    const activeLink = (link:string) => {
        return router.pathname == link ? "text-blue-700" : "hover:text-blue-700"
    }

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
            <Link href="/create">
                <Button color="success">
                    Create task
                </Button>
            </Link>
            <Button onClick={ () => {setAuthenticated(false); router.push('/')}}>
                Log out
            </Button>
            <Navbar.Toggle />
        </div>

        {/* Collapsable menu */}

        <Navbar.Collapse>

            <Link href="/" className={activeLink("/")}>
                Home
            </Link>
            <Link href="/list" className={activeLink("/list")}>
                Show tasks
            </Link>
            <Link href="/timeline" className={activeLink("/timeline")}>
                Show timeline
            </Link>
            <Link href="/calendar" className={activeLink("/calendar")}>
                Show Calendar
            </Link>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Header