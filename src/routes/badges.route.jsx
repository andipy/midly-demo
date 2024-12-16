import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import NavbarBackOnly from '../components/navbar-back-only.component'
import Container from '../layout/container.layout'
import BadgeMonthly from '../components/badge-monthly.component'
import TextTitle from '../components/text-title.component'
import BadgeMonthlyMiniature from '../components/badge-monthly-miniature.component'
import Carousel from '../layout/carousel.layout'

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
    const [transition, setTransition] = useState(false)


    const selectBadge = (badge) => {
        
        setTransition(true)
        setTimeout(() => {
            setTransition(false)
        }, 600)
        setTimeout(() => {
            setSelectedBadge(badge)
        }, 300)
        
    }

    return (
        <>
            <NavbarBackOnly onClick={() => navigate(-1)}/>
            <Container style={'pb-xs-8'}>
                {/* <TextTitle title={'In evidenza'} /> */}
                <div className='mt-xs-4 d-flex-column'>
                    <BadgeMonthly badge={selectedBadge} transition={transition} />
                </div>

                {/* <h2 className='fsize-xs-5 f-w-600'>Tutti i badge</h2> */}
                <div className='mt-xs-4 d-flex-row'>
                    <Carousel>
                        {sortedBadges?.map((badge, index) =>
                            <BadgeMonthlyMiniature
                                key={index}
                                badge={badge}
                                onClick={() => selectBadge(badge)}
                                selected={selectedBadge?.month === badge.month && selectedBadge?.year === badge.year && selectedBadge?.artistName === badge.artistName}
                            />
                        )}
                    </Carousel>
                </div>
            </Container>
        </>
        
    )
}

export default BadgesRoute