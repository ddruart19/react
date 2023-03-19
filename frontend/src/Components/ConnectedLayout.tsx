import { PropsWithChildren } from "react"
import Header from "./Header"

const ConnectedLayout = ({children} : PropsWithChildren) => {
    return (
        <>
            <Header/>
            <main>{children}</main>
        </>
    )
}
export default ConnectedLayout