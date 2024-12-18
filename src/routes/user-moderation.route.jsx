import { useNavigate, useLocation } from "react-router-dom"

import FullPageCenter from "../layout/full-page-center.layout"
import UserModeration from "../components/user-moderation.component"
function UserModerationRoute() {

    const navigate = useNavigate()
    const location = useLocation()
    const userId = location.state?.userId

    return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
        <UserModeration modalUserModeration={() => navigate(-1)} user={userId}/> 
    </FullPageCenter>
  )
}

export default UserModerationRoute