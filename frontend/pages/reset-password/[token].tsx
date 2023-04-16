import { useRouter } from "next/router"
import React from "react"
import ResetPwdForm from "../../src/Components/ResetPwdForm"

const ResetPwd: React.FC = () => {
    const router = useRouter()
    const { token } = router.query
    return (
        <>
            <ResetPwdForm token={String(token)}/>
        </>
    )
}
export default ResetPwd