import { useNavigate, useLocation } from 'react-router-dom'


import HeaderSpotify from '../components/header-spotify.component'
import ContainerDefault from '../layout/container-default.layout'
import Button from '../components/button.component'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { useContext } from 'react'

import SpotiyUserImage from '../images/pictures/spotify-profile-pic.jpg'

const SpotifyAcceptRoute = () => {

    const { currentFan, setCurrentFan} = useContext(CurrentFanContext)
    const navigate = useNavigate()
    const pageFrom = localStorage.getItem('pageFrom')

    /* const handleSpotifyConnect = () => {
        //modulo connection spotify da gestire
        if (currentFan.actions.some(action => action.type === 'SPOTIFY_ADDED')) {
            setCurrentFan((prev) => ({
                ...prev,
                hasSpotify: true,
            }))
        } else {
            setCurrentFan((prev) => ({
                ...prev,
                hasSpotify: true,
                whiteLabelPoints: Number(prev.whiteLabelPoints) + 10,
                actions: [...prev.actions, { type: 'SPOTIFY_ADDED', value: true, createdAt: new Date().toISOString().replace('T', ' ').split('.')[0] }]
            }))
            setShowMessageWhitePoints(true)
            setWhitePoints(10)
            setMessage('Aggiungi Spotify')

        }
    } */

  return (
    <>
    <HeaderSpotify />
    <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-20'}>
        <div className='d-flex-column j-c-center align-items-center t-align-center'> 
            <h2 className='fsize-xs-3'>Consenti a spotify di connettersi a:</h2>
            <h4 className='fsize-xs-8 mt-xs-2 f-w-800'>Midly</h4>
            <div className='d-flex-row j-c-center align-items-center gap-0_5em mt-xs-4'>
                <img className='avatar-24 border-radius-100' src={SpotiyUserImage}></img>
                <h2 className='fsize-xs-1 f-w-500'>found-user-spotify</h2>
            </div>
            <a className='fsize-xs-1 mt-xs-2 green-spotify letter-spacing-1' onClick={() => navigate('/spotify-login')}>
                Non sei tu?
            </a>
        </div>

        <div className='d-flex-column j-c-start align-items-start t-align-start mt-xs-8 ml-xs-2'>
            <h2 className='fsize-xs-3 f-w-500'>Accetti che Midly sarà in grado di:</h2>
            <div className='d-flex-column mt-xs-2'>
                <div className='d-flex-row'>
                    <h2 className='fsize-xs-3 f-w-500'>Visualizza i dati del tuo account Spotify</h2>
                </div>
                <ul>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>La tua e-mail</h2>
                    </li>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>Il tuo abbonamento Spotify, il paee del'account e le impostazioni per il filtro dei contenuti espliciti</h2>
                    </li>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>Il tuo nome proprio, il nome utente, l'immagine del profilo, i follower SPotify e le playlist pubbliche</h2>
                    </li>
                </ul>
            </div>
            <div className='d-flex-column mt-xs-2'>
                <div className='d-flex-row'>
                    <h2 className='fsize-xs-3 f-w-500'>Visualizza la tua attività su Spotify</h2>
                </div>
                <ul>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>Contenuto che hai riprodotto di recente</h2>
                    </li>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>Il contenuto che stai riproducendo</h2>
                    </li>
                    <li className='d-flex-row align-items-start mb-xs-2'>
                        <span className='fsize-xs-5 mr-xs-2'>•</span>
                        <h2 className='fsize-xs-3 f-w-500'>I tuoi artisti e i contenuti preferiti</h2>
                    </li>
                </ul>
            </div>
            <Button style='fsize-xs-3 f-w-600 bg-green-spotify border-radius-2 mt-xs-4' label='Accetto' onClick={() => navigate(`${pageFrom}`, { state: { returningFromSpotify: true} })} />
            <div className='d-flex-row j-c-center align-items-center w-100 mt-xs-4'>
                <a className='j-c-center align-items-center' onClick={() => navigate( `${pageFrom}`, { state: { returningFromSpotify: false } })}><p className='grey-300 letter-spacing-1 fsize-xs-3 f-w-800'>Annulla</p></a>
            </div>
            <div className='d-flex-column mt-xs-4'>
                <p className='fsize-xs-1 f-w-500'>
                Puoi rimuovere l'accesso in qualsiasi momento nelle impostazioni del tuo account.
                </p>
                <p className='fsize-xs-1 f-w-500'>
                Per ulteriori informazioni su come Midly utilizza i tuoi dati personali, vedi l'Informativa sulla privacy di Midly.
                </p>
            </div>
        </div>

    </ContainerDefault>
    </>
  )
}

export default SpotifyAcceptRoute