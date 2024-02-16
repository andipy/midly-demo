import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import ContainerDefault from "../layout/container-default.layout";
import NavbarLeaderboardFlashPage from "../components/navbar-leaderboard-flash-page.component";
import CoverArtistPage from "../components/cover-artist-page.component";
import CardLeaderboardYourPosition from "../components/card-leaderboard-your-position.component";
import Button from '../components/button.component'
import Leaderboard from './leaderboard.route'
import LiveListenings from "../components/live-listenings.component";

import Fan3 from "../images/pictures/fan-14.jpg";
import IconSpotifyWhite from '../images/icons/icon-spotify.svg'

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
                    <div className="d-flex-row align-items-center j-c-space-between gap-0_5em">
                        <div className="d-inline-flex-row align-items-center gap-0_5em bg-black-transp50 border-radius-100 border-red-dashed-1 pl-xs-4 pr-xs-4 pt-xs-3 pb-xs-3">
                            <div className="avatar-14 border-radius-100 bg-red-400 position-relative">
                                <div className="border-radius-100 bg-red-400 position-absolute-x-y flash-animation"></div>
                            </div>
                            <span className="fsize-xs-1 f-w-600">Titolo del brano co...</span>
                        </div>

                        <Link className="d-inline-flex-row align-items-center gap-0_5em bg-black-transp50 border-radius-100 border-green-spotify pl-xs-4 pr-xs-1 pt-xs-1 pb-xs-1" to='https://open.spotify.com/intl-it/track/5Hjy8lyZ4h99OjrW8jzPQ8' target='blank'>
                            <span className="fsize-xs-2 green-spotify f-w-600 grow-1">Ascoltalo su</span>
                            <img className="avatar-28 border-radius-100 bg-green-spotify" src={IconSpotifyWhite} />
                        </Link>
                    </div>

                    {spotifyConnected ?
                        <CardLeaderboardYourPosition currentFanPoints={1187} currentFanPosition={23} currentFanImage={Fan3} onClick={connectSpotify} />
                            :
                        <Button style={'bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4'} label={'CONNETTI SPOTIFY E COMPETI'} onClick={connectSpotify} />
                    }
                </div>
                <Leaderboard />
            </ContainerDefault>
            <LiveListenings />
        </>
    )
}

export default LeaderboardFlashRoute;