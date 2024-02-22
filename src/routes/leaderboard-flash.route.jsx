import { useState } from "react"
import { useLocation } from "react-router-dom"

import ContainerDefault from "../layout/container-default.layout"
import NavbarLeaderboardFlashPage from "../components/navbar-leaderboard-flash-page.component"
import CoverArtistPage from "../components/cover-artist-page.component"
import CardLeaderboardYourPosition from "../components/card-leaderboard-your-position.component"
import Button from '../components/button.component'
import Leaderboard from './leaderboard.route'
import LiveMessages from "../components/live-messages.component"
import LiveMusicProduct from "../components/live-music-product.component"

import Fan3 from "../images/pictures/fan-14.jpg"


const LeaderboardFlashRoute = () => {

    const { state } = useLocation()

    const [spotifyConnected, setSpotifyConnected] = useState(true)
    const connectSpotify = () => {
        setSpotifyConnected(prev => !prev)
    }

    return (
        <>
            <NavbarLeaderboardFlashPage smallTitle={state.artName} avatarImage={state.image} />
            <CoverArtistPage artName={state.artName} image={state.image} />

            <ContainerDefault containerSpecificStyle={'mt-avatar-header-2 pb-xs-24'}>
                <div className="d-flex-column position-sticky top-navbar z-index-max">
                    <LiveMusicProduct />
                    {spotifyConnected ?
                        <CardLeaderboardYourPosition currentFanPoints={1187} currentFanPosition={23} currentFanImage={Fan3} onClick={connectSpotify} />
                            :
                        <Button style={'bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4'} label={'CONNETTI SPOTIFY E COMPETI'} onClick={connectSpotify} />
                    }
                </div>
                <Leaderboard />
            </ContainerDefault>

            <LiveMessages />
        </>
    )
}

export default LeaderboardFlashRoute;