import { useRouter } from "next/router"
import React from "react"
import EditTask from '../../src/Components/EditTask'

const Edit: React.FC = () => {
    const router = useRouter()
    const { taskid } = router.query
    return (
        <>
            <EditTask taskId = {String(taskid)}/>
        </>
    )
}
export default Edit