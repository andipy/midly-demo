import { useLocation, Link } from "react-router-dom"

import IconFanclubInactive from "../images/icons/icon-fanclub-inactive.svg"
import IconFanclubActive from "../images/icons/icon-fanclub-active.svg"
import IconFlashLeaderboardInactive from "../images/icons/icon-flash-leaderboard-inactive.svg"
import IconFlashLeaderboardActive from "../images/icons/icon-flash-leaderboard-active.svg"
import IconStatsInactive from "../images/icons/icon-stats-inactive.svg"
import IconStatsActive from "../images/icons/icon-stats-active.svg"
import IconProfileInactive from "../images/icons/icon-profile-inactive.svg"
import IconProfileActive from "../images/icons/icon-profile-active.svg"

const Appbar = () => {

    const location = useLocation()

    return (
        <div className="app-bar-area d-flex-row j-c-center border-top-dark-01 z-index-max">            
            <div className="container d-flex-row align-items-center j-c-space-between">
                <Link to='/artist-app/fan-club'>
                    <div className="d-flex-column align-items-center">
                        <img className="mb-xs-8" src={location.pathname.includes('fan-club') ? IconFanclubActive : IconFanclubInactive} />
                        <span className={`${location.pathname.includes('fan-club') ? 'f-w-700 lime-400' : 'f-w-300 white'} fsize-xs-0 letter-spacing-1`}>Fanclub</span>
                    </div>                    
                </Link>
                <Link to='/artist-app/flash-leaderboards'>
                    <div className="d-flex-column align-items-center">
                        <img className="mb-xs-8" src={location.pathname.includes('flash-leaderboards') ? IconFlashLeaderboardActive : IconFlashLeaderboardInactive} />
                        <span className={`${location.pathname.includes('flash-leaderboards') ? 'f-w-700 lime-400' : 'f-w-300 white'} fsize-xs-0 letter-spacing-1`}>Classifica flash</span>
                    </div>                    
                </Link>
                <Link to='/artist-app/metrics'>
                    <div className="d-flex-column align-items-center">
                        <img className="mb-xs-8" src={location.pathname.includes('metrics') ? IconStatsActive : IconStatsInactive} />
                        <span className={`${location.pathname.includes('metrics') ? 'f-w-700 lime-400' : 'f-w-300 white'} fsize-xs-0 letter-spacing-1`}>Stats</span>
                    </div>
                </Link>
                <Link to='/artist-app//profile'>
                    <div className="d-flex-column align-items-center">
                        <img className="mb-xs-8" src={location.pathname.includes('profile') ? IconProfileActive : IconProfileInactive} alt="Profile" />
                        <span className={`${location.pathname.includes('profile') ? 'f-w-700 lime-400' : 'f-w-300 white'} fsize-xs-0 letter-spacing-1`}>Profilo</span>
                    </div>
                </Link>                
            </div>
        </div>

    )
}

export default Appbar;