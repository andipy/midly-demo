import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import NavbarBackOnly from "../components/navbar-back-only.component"
import ContainerDefault from "../layout/container-default.layout"
import BadgeMonthly from "../components/badge-monthly.component"
import TextTitle from "../components/text-title.component"
import BadgeMonthlyMiniature from "../components/badge-monthly-miniature.component"
import Carousel from "../layout/carousel.layout"

const BadgesRoute = () => {

    const navigate = useNavigate()


    const {currentFan } = useContext(CurrentFanContext)
    const badges = currentFan.badges
    const sortedBadges = badges.monthly.sort((a, b) => {
        if (a.year === b.year) {
            return b.month - a.month
        }
        return b.year - a.year
    })
    const [selectedBadge, setSelectedBadge] = useState(sortedBadges[0])


    const selectBadge = (badge) => {
        setSelectedBadge(badge)
    }

    return (
        <>
            <NavbarBackOnly onClick={() => navigate(-1)}/>
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
                <TextTitle title={'Selected badge'} />
                <div className="mt-xs-4 d-flex-column">
                    <BadgeMonthly badge={selectedBadge}/>
                </div>
                <TextTitle title={'I tuoi badge'} />
                <div className="mt-xs-4 d-flex-row">
                    <Carousel>
                        {sortedBadges?.map(badge => <BadgeMonthlyMiniature badge={badge} onClick={() => selectBadge(badge)} selected={selectedBadge?.month === badge.month && selectedBadge?.year === badge.year && selectedBadge?.artistName === badge.artistName} />)}
                    </Carousel>
                </div>
            </ContainerDefault>
        </>
        
    )
}

export default BadgesRoute