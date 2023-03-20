import { Button } from "flowbite-react"
import { PropsWithChildren, useContext, useEffect } from "react"
import authContext from "../Hooks/authContext"
import HeaderNotConnected from "./HeaderNotConnected"
import SignInForm from "./SignInForm"

const NotConnectedLayout = ({children} : PropsWithChildren) => {
    const { authenticated, setAuthenticated } = useContext(authContext);

    return (
        <>
            <HeaderNotConnected/>
            <main><SignInForm/></main>
        </>
    )
}

export default NotConnectedLayout