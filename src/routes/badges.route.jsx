import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentFanContext } from "../contexts/currentFan.context";
import NavbarBackOnly from "../components/navbar-back-only.component";
import ContainerDefault from "../layout/container-default.layout";
import BadgeMonthly from "../components/badge-monthly.component";

const BadgesRoute = () => {

    const navigate = useNavigate();

    const {currentFan } = useContext(CurrentFanContext)
    const badges = currentFan.badges
    return (
        <>
            <NavbarBackOnly onClick={() => navigate(-1)}/>
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
                {badges?.monthly.map(badge => <BadgeMonthly badge={badge} />)}
            </ContainerDefault>
        </>
        
    )
}

export default BadgesRoute