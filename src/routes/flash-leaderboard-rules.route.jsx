import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import { FlashLeaderboardsContext } from '../contexts/flash-leaderboards.context'

import FullScreenModalLayout from '../layout/full-screen-modal.layout'
import Container from '../layout/container.layout'
import Carousel from '../layout/carousel.layout'
import NavbarBackOnly from '../components/navbar-back-only.component'
import BadgeSpecialPreview from '../components/badge-special-preview.component'
import Button from '../components/button.component'

const FlashLeaderboardRulesRoute = () => {

    const navigate = useNavigate()
    const { state, pathname } = useLocation()

    const onClick = () => {
        navigate(-1, { state : {...state, invokedModal: false}})
    }

    const { flashLeaderboards } = useContext(FlashLeaderboardsContext)
    const [leaderboard, setLeaderboard] = useState()
    const fetchThisLeaderboard = () => {
        const thisLeaderboard = flashLeaderboards.find(elem => state.id === elem.artistId)
        setLeaderboard(thisLeaderboard)
    }

    useEffect(() => {
        if ( state ) {
            fetchThisLeaderboard()
        }
    }, [state])
    
    return (
        <FullScreenModalLayout>
            <NavbarBackOnly onClick={onClick} />
            <Container>
                <h3 className='fsize-xs-4 grey-200 f-w-600 mb-xs-2'>C'è qualcosa che non va?</h3>
                <p className='fsize-xs-1 grey-300'>Scrivici per assitenza su telegram:</p>
                <Link to='https://t.me/midlyofficial'>
                    <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-2' label='Chiedi aiuto sul canale telegram' />
                </Link>

                <h1 className='fsize-xs-4 grey-200 f-w-600 mt-xs-10 mb-xs-4'>
                    {!pathname.includes('artist-app') ?
                        'Ottieni i badge di SUPER FAN'
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
                        <p className='fsize-xs-1 grey-300'>Ogni ascolto del brano {leaderboard?.song.title} vale 3 punti: ti permette di scalare la classifica FLASH più velocemente. Viene conteggiato massimo 10 volte al giorno.</p>
                    }
                    {leaderboard?.album &&
                        <p className='fsize-xs-1 grey-300'>Ogni ascolto di ogni brano dell'album {leaderboard?.album.title} vale 3 punti: ti permette di scalare la classifica FLASH più velocemente. Viene conteggiato massimo 10 volte al giorno.</p>
                    }
                </div>
                <div className='d-flex-row gap-0_5em mt-xs-4'>
                    <span className='fsize-xs-4 f-w-600 grey-200'>x1</span>
                    <p className='fsize-xs-1 grey-300'>Ogni altro brano di {state.artistName} ti fa fare 1 punto.</p>
                </div>
            </Container>
        </FullScreenModalLayout>
    )
}

export default FlashLeaderboardRulesRoute