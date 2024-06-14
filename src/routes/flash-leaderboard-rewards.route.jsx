import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'
import BadgeSpecialPreview from '../components/badge-special-preview.component'

const FlashLeaderboardRewardsRoute = () => {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()

    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    const [leaderboard, setLeaderboard] = useState()
    const fetchThisLeaderboard = () => {
        const thisLeaderboard = flashLeaderboards.filter(elem => state.id === elem.artistId)
        setLeaderboard(thisLeaderboard[0])
    }

    useEffect(() => {
        if ( state ) {
            fetchThisLeaderboard()
        }
    }, [state])
    
    return (
        <FullScreenModalLayout>
            <NavbarBackOnly onClick={onClick} />
            <ContainerDefault>
                <h1 className='fsize-xs-4 grey-200 f-w-600 mb-xs-4'>
                    {!pathname.includes('artist-app') ?
                        'Vinci i badge di SUPER FAN'
                    :
                        'I badge in palio per i tuoi SUPER FAN'
                    }
                </h1>
                <Carousel>
                    {leaderboard?.badges.map((badge, key) => {
                        return (
                            <BadgeSpecialPreview badge={badge} leaderboard={leaderboard} key={key} />
                        )
                    })}
                </Carousel>
                <h3 className='fsize-xs-4 grey-200 f-w-600 mt-xs-10 mb-xs-4'>
                    {!pathname.includes('artist-app') ?
                        'Come guadagnare punti'
                    :
                        'Come i tuoi fan guadagnano punti'
                    }
                </h3>
                <div className='d-flex-row gap-0_5em'>
                    <span className='fsize-xs-4 f-w-600 grey-200'>x3</span>
                    {leaderboard?.song &&
                        <p className='fsize-xs-1 grey-300'>Ogni ascolto del brano {leaderboard?.song.title} vale 3 punti: ti permette di scalare la classifica FLASH più velocemente.</p>
                    }
                    {leaderboard?.album &&
                        <p className='fsize-xs-1 grey-300'>Ogni ascolto di ogni brano del disco {leaderboard?.album.title} vale 3 punti: ti permette di scalare la classifica FLASH più velocemente.</p>
                    }
                </div>
                <div className='d-flex-row gap-0_5em mt-xs-4'>
                    <span className='fsize-xs-4 f-w-600 grey-200'>x1</span>
                    <p className='fsize-xs-1 grey-300'>Ogni altro brano di {state.artistName} ti fa fare 1 punto.</p>
                </div>
            </ContainerDefault>
        </FullScreenModalLayout>
    )
}

export default FlashLeaderboardRewardsRoute