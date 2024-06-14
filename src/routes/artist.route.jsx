import { useEffect, useState, useContext } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import NavbarArtistPage from '../components/navbar-artist-page.component'
import CoverArtistPage from '../components/cover-artist-page.component'
import CardLeaderboardYourPosition from '../components/card-leaderboard-your-position.component'
import Button from '../components/button.component'
import Tab from '../components/tab.component'
import MessageFlashLeaderboard from '../components/message-flash-leaderboard.component'
import CardInviteFriend from '../components/card-invite-friend.component'

const ArtistRoute = () => {

    const { state } = useLocation()

    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)

    const { artists } = useContext(ArtistsContext)
    const [artist, setArtist] = useState()
    const fetchThisArtist = () => {
        const thisArtist = artists.find(artist => state.id === artist.id)
        setArtist(thisArtist)
    }

    const [userCompeting, setUserCompeting] = useState(false)
    const fetchCompeting = () => {
        if ( currentFan.leaderboardsFollowed.length > 0 ) {
            const favouriteArtistIds = currentFan.leaderboardsFollowed.map(followed => followed.artistId)

            if (favouriteArtistIds.includes(artist.id)) {
                setUserCompeting(true)
            } else {
                setUserCompeting(false)
            }
        } else {
            setUserCompeting(false)
        }
    }
    
    const handleCompete = () => {
        if (userCompeting) {
            const newLeaderboardsFollowed = currentFan.leaderboardsFollowed.filter(leaderboard => leaderboard.artistId !== artist.id);
            setCurrentFan(prev => ({ ...prev, leaderboardsFollowed: newLeaderboardsFollowed }))
        } else {
            setCurrentFan(prev => ({
                ...prev,
                leaderboardsFollowed: [...prev.leaderboardsFollowed, { artistId: artist.id }]
            }))
        }
    }

    useEffect(() => {
        fetchThisArtist()
    }, [artists])

    useEffect(() => {
        if (artist) {
            fetchCompeting()
        }
    }, [currentFan, artist])

    return (
        <>
            <NavbarArtistPage artist={artist} />
            <CoverArtistPage artist={artist} userCompeting={userCompeting} handleCompete={handleCompete} currentFan={currentFan} />

            <ContainerDefault containerSpecificStyle={''}>
                <div className='mt-avatar-header position-sticky top-navbar z-index-max bg-dark'>
                    {artist?.flashLeaderboard.status === 'ONGOING' || artist?.flashLeaderboard.status === 'PENDING' ?
                        <MessageFlashLeaderboard artist={artist} /> : null
                    }
                    <Tab />
                    {!currentFan.hasSpotify &&
                        <Button style='bg-green-spotify fsize-xs-3 f-w-500 white mt-xs-4' label='Connetti spotify e competi' />
                    }
                    {currentFan.hasSpotify && !userCompeting &&
                        <Button style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-4' label='Competi nella classifica' onClick={handleCompete} />
                    }
                    {userCompeting && currentFan.hasSpotify &&
                        <CardLeaderboardYourPosition currentFan={currentFan} />
                    }
                </div>
                <Outlet />
            </ContainerDefault>
            
            <ContainerDefault containerSpecificStyle='position-sticky bottom-2 z-index-5'>
                <CardInviteFriend artist={artist} />
            </ContainerDefault>
        </>
    )
}

export default ArtistRoute