import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentFanContext } from '../contexts/currentFan.context'
import NavbarBackOnly from '../components/navbar-back-only.component'
import Container from '../layout/container.layout'
import BadgeMonthly from '../components/badge-monthly.component'
import BadgeFlash from '../components/badge-flash.component'
import TextTitle from '../components/text-title.component'
import BadgeMonthlyMiniature from '../components/badge-monthly-miniature.component'
import Carousel from '../layout/carousel.layout'

const BadgesRoute = () => {

    const navigate = useNavigate()

    const {currentFan } = useContext(CurrentFanContext)
    const badges = currentFan.badges

    // Generalized sorting function
    const sortBadges = (badgeArray) => {
        return [...badgeArray].sort((a, b) => {
            if (a.year === b.year) {
                return b.month - a.month;
            }
            return b.year - a.year;
        });
    };

    // Sorting flash and monthly badges separately
    const sortedFlashBadges = sortBadges(badges.flash || []);
    const sortedMonthlyBadges = sortBadges(badges.monthly || []);

    // Merging both arrays with flash badges first
    const combinedSortedBadges = [...sortedFlashBadges, ...sortedMonthlyBadges];

    // State to hold merged and sorted badges
    const [badgesList, setBadgesList] = useState(combinedSortedBadges);
    const [selectedBadge, setSelectedBadge] = useState(combinedSortedBadges[0] || null);
    const [transition, setTransition] = useState(false);

    const selectBadge = (badge) => {
        setTransition(true);
        setTimeout(() => setTransition(false), 600);
        setTimeout(() => setSelectedBadge(badge), 300);
    };

    return (
        <>
            <NavbarBackOnly onClick={() => navigate(-1)} />
            <Container style={'pb-xs-8'}>
                {/* Featured Badge */}
                <div className='mt-xs-4 d-flex-column align-items-center'>
                    {sortedMonthlyBadges.some(badge => 
                        badge.month === selectedBadge?.month &&
                        badge.year === selectedBadge?.year &&
                        badge.artistName === selectedBadge?.artistName
                    ) ? (
                        <BadgeMonthly badge={selectedBadge} transition={transition} />
                    ) : (
                        <BadgeFlash badge={selectedBadge} transition={transition} />
                    )}
                </div>
    
                {/* Badge Carousel */}
                <div className='mt-xs-4 d-flex-row'>
                    <Carousel>
                        {badgesList?.map((badge, index) => (
                            <BadgeMonthlyMiniature
                                key={index}
                                badge={badge}
                                onClick={() => selectBadge(badge)}
                                selected={selectedBadge?.month === badge.month && selectedBadge?.year === badge.year && selectedBadge?.artistName === badge.artistName}
                            />
                        ))}
                    </Carousel>
                </div>
            </Container>
        </>
    )    
}

export default BadgesRoute