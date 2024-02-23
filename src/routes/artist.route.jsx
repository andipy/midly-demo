import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'
import NavbarArtistPage from '../components/navbar-artist-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import Tab from '../components/tab.component'
import MessageFlashLeaderboard from '../components/message-flash-leaderboard.component'

import Fan8 from '../images/pictures/fan-8.jpg'

const ArtistRoute = () => {

    const { state } = useLocation();

    const [spotifyConnected, setSpotifyConnected] = useState(true)
    const connectSpotify = () => {
        setSpotifyConnected(prev => !prev)
    }

    const [flashLeaderboard, setFlashLeaderboard] = useState(false)
    useEffect(() => {
        if ( state.artName === 'thasup' ) {
            setFlashLeaderboard(true)
        }
    }, [])

    return (
        <>
            <NavbarArtistPage smallTitle={state.artName} avatarImage={state.image} />
            <CoverArtistPage artName={state.artName} image={state.image} flashLeaderboard={flashLeaderboard} />

            <ContainerDefault containerSpecificStyle={''}>
                <div className="mt-avatar-header position-sticky top-navbar z-index-max bg-dark">
                    {flashLeaderboard && <MessageFlashLeaderboard state={state} />}
                    <Tab flashLeaderboard={flashLeaderboard} />
                    {spotifyConnected ?
                        <CardLeaderboardYourPosition currentFanPoints={467} currentFanPosition={8} currentFanImage={Fan8} onClick={connectSpotify} flashLeaderboard={flashLeaderboard} />
                            :
                        <Button style={'bg-green-spotify white letter-spacing-1 f-w-500 mt-xs-4'} label={'CONNETTI SPOTIFY E COMPETI'} onClick={connectSpotify} />
                    }
                </div>
                <Outlet />
            </ContainerDefault>
        </>
    )
}

export default ArtistRoute;