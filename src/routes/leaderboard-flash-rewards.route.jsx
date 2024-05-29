import { useNavigate, useLocation } from "react-router-dom";

import FullScreenModalLayout from "../layout/full-screen-modal.layout"
import ContainerDefault from "../layout/container-default.layout"
import Carousel from "../layout/carousel.layout"
import NavbarBackOnly from "../components/navbar-back-only.component"
import BadgeSpecialPreview from "../components/badge-special-preview.component"

//import SpecialBadge1 from '../images/illustrations/special-badge-01.png'
// import SpecialBadge2 from '../images/illustrations/special-badge-02.png'
//import SpecialBadge3 from '../images/illustrations/special-badge-03.png'
import SpecialBadge1 from '../images/illustrations/GOLD.png'
import SpecialBadge2 from '../images/illustrations/SILVER.png'
import SpecialBadge3 from '../images/illustrations/BRONZE.png'

const LeaderboardFlashRewardsRoute = () => {

    const navigate = useNavigate()
    const { state } = useLocation()

    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }

    const specialBadges = [
        {
            position: 1,
            image: SpecialBadge1,
            musicProduct: {
                musicProductType: 'track',
                musicProductName: 'Titolo del brano'
            }
        },{
            position: 2,
            image: SpecialBadge2,
            musicProduct: {
                musicProductType: 'track',
                musicProductName: 'Titolo del brano'
            }
        },{
            position: 3,
            image: SpecialBadge3,
            musicProduct: {
                musicProductType: 'track',
                musicProductName: 'Titolo del brano'
            }
        }
    ]
    
    return (
        <FullScreenModalLayout>
            <NavbarBackOnly onClick={onClick} />
            <ContainerDefault>
                <h1 className="fsize-xs-4 grey-200 f-w-600 mb-xs-4">Vinci i badge di SUPER FAN</h1>
                <Carousel>
                    {specialBadges.map((badge, key) => {
                        return (
                            <BadgeSpecialPreview badge={badge} key={key} />
                        )
                    })}
                </Carousel>
                <h3 className="fsize-xs-4 grey-200 f-w-600 mt-xs-10 mb-xs-4">Come guadagnare punti</h3>
                <div className="d-flex-row gap-0_5em">
                    <span className="fsize-xs-4 f-w-600 grey-200">x3</span>
                    <p className="fsize-xs-1 grey-300">Ogni ascolto del brano “titolo del brano” vale 3 punti: ti permette di scalare la classifica più velocemente, ma viene conteggiato massimo 5 volte</p>
                </div>
                <div className="d-flex-row gap-0_5em mt-xs-4">
                    <span className="fsize-xs-4 f-w-600 grey-200">x1</span>
                    <p className="fsize-xs-1 grey-300">Ogni altro brano di thasup ti fa fare 1 punto, e viene conteggiato massimo 3 volte</p>
                </div>
            </ContainerDefault>
        </FullScreenModalLayout>
    )
}

export default LeaderboardFlashRewardsRoute;