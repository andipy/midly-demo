import { useNavigate, useLocation } from "react-router-dom";

import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import ContainerDefault from "../layout/container-default.layout"
import NavbarBackOnly from "../components/navbar-back-only.component";

const LeaderboardFlashRewardsRoute = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }
    
    return (
        <FullScreenModalLayout>
            <NavbarBackOnly onClick={onClick} />
            <ContainerDefault></ContainerDefault>
        </FullScreenModalLayout>
    )
}

export default LeaderboardFlashRewardsRoute;