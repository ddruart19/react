import { PropsWithChildren } from "react"
import HeaderNotConnected from "./HeaderNotConnected"
import SignInForm from "./SignInForm"

const NotConnectedLayout = ({children} : PropsWithChildren) => {
    return (
        <>
            <HeaderNotConnected/>
            <main><SignInForm/></main>
        </>
    )
}
export default NotConnectedLayout