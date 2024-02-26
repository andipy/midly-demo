import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'
import NavbarArtistPage from '../components/navbar-artist-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import Tab from '../components/tab.component'
import MessageFlashLeaderboard from '../components/message-flash-leaderboard.component'
import CardInviteFriend from '../components/card-invite-friend.component'

import Fan8 from '../images/pictures/fan-8.jpg'

const ArtistRoute = () => {

    const { state } = useLocation()

    const [spotifyConnected, setSpotifyConnected] = useState(true)
    const connectSpotify = () => {
        setSpotifyConnected(prev => !prev)
    }

    const [userCompeting, setUserCompeting] = useState(false)
    const handleCompete = () => {
        setUserCompeting(prev => !prev)
    }

    const [flashLeaderboard, setFlashLeaderboard] = useState(false)
    useEffect(() => {
        if ( state.artName === 'thasup' ) {
            setFlashLeaderboard(true)
            setUserCompeting(true)
        }
        if ( state.artName === 'Arctic Monkeys' ) {
            setFlashLeaderboard(true)
            setUserCompeting(false)
        }
    }, [])

    return (
        <>
            <NavbarArtistPage smallTitle={state.artName} avatarImage={state.image} />
            <CoverArtistPage artName={state.artName} image={state.image} flashLeaderboard={flashLeaderboard} userCompeting={userCompeting} handleCompete={handleCompete} />

            <ContainerDefault containerSpecificStyle={''}>
                <div className="mt-avatar-header position-sticky top-navbar z-index-max bg-dark">
                    {flashLeaderboard && <MessageFlashLeaderboard state={state} />}
                    <Tab />
                    {/* {!spotifyConnected &&
                        <Button style={'bg-green-spotify fsize-xs-3 f-w-500 white mt-xs-4'} label={'Connetti spotify e competi'} onClick={connectSpotify} />
                    } */}
                    {spotifyConnected && !userCompeting &&
                        <Button style={'bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-4'} label={'Competi nella classifica'} onClick={handleCompete} />
                    }
                    {state.currentUser.points > 0 &&
                        <CardLeaderboardYourPosition currentFanPoints={state.currentUser.points} currentFanPosition={state.currentUser.position} currentFanImage={Fan8} flashLeaderboard={flashLeaderboard} />
                    }
                </div>
                <Outlet />
            </ContainerDefault>
            
            <ContainerDefault containerSpecificStyle={'position-sticky bottom-2 z-index-5'}>
                <CardInviteFriend state={state} />
            </ContainerDefault>
        </>
    )
}

export default ArtistRoute;