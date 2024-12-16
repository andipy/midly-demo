import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '../../layout/container.layout'

import Button from './button.component'
import NavbarModalFLExplanation from './navbar-modal-flash-leaderboard-explanation.component'

import IconRightDark from '../images/icons/icon-arrowright-dark.svg'
import IllustrationTrophy from '../images/illustrations/GENERIC.png'

const MessageFlashLeaderboardNew = ({ artist }) => {

    const navigate = useNavigate()

    const [seconds, setSeconds] = useState(59)
    const [minutes, setMinutes] = useState(37)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalCompressed, setModalCompressed] = useState(false)

    const compressModal = () => {
        setModalCompressed(true)
    }
    const expandModal = () => {
        setModalCompressed(false)
    }
    
    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(prev => prev -1)
            } else {
                setSeconds(59)
            }
        }, 1000)    
    }, [seconds])
    
    useEffect(() => {
        setTimeout(() => {
            if (minutes < 0) {
                setMinutes(prev => prev -1)
            } else {
                setMinutes(59)
            }
        }, 60000)
    }, [minutes])

    useEffect(() => {
        setTimeout(() => {
            setModalOpen(true)
        }, 600) 
    }, [])

    return (
        <>
        {artist &&
        <>
            {artist.flashLeaderboard.status === 'ONGOING' &&
                <div className={`position-fixed bottom-hidden w-100 border-radius-top-08 z-index-1100 bg-dark-soft fl-modal-border pb-xs-6 ${modalOpen && 'show-fl-message'}`}>
                    <Container>
                        <NavbarModalFLExplanation
                            modalCompressed={modalCompressed}
                            compressModal={compressModal}
                            expandModal={expandModal}
                        />

                        <div className='d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-lime-1 pl-xs-4 pr-xs-1 pt-xs-1 pb-xs-1 mb-xs-4' onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist,  })}>
                            <div className='d-flex-row align-items-center gap-0_5em'>
                                <div className='avatar-14 border-radius-100 bg-acid-lime position-relative'>
                                    <div className='border-radius-100 bg-acid-lime position-absolute-x-y flash-animation'></div>
                                </div>
                                <p className='fsize-xs-1'>CLASSIFICA FLASH ATTIVA</p>
                            </div>

                            <Button style={'button-flash-leaderboard-live d-flex-row align-items-center j-c-center bg-acid-lime border-radius-100 black w-auto pl-xs-4 pr-xs-4 pt-xs-2 pb-xs-2 fsize-xs-1 f-w-600'} label='ENTRA' />
                        </div>
                    </Container>
                </div>
            }

            {artist.flashLeaderboard.status === 'PENDING' &&
                <div className='d-flex-column align-items-center j-c-center'>
                {modalOpen ?
                    <>
                        <img className='w-25' src={IllustrationTrophy} />
                        <h4 className='fsize-xs-4 mb-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 w-80'>Sta per uscire il nuovo brano di {artist.artistName}! In quel momento si aprirà anche la CLASSIFICA FLASH qui su MIDLY:</h4>
                        <div className='d-flex-row j-c-center gap-0_5em fsize-xs-2 no-shrink bg-brand-gradient pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 border-radius-04 w-100'>
                            <span className='f-w-600 black fsize-xs-4'>MANCANO </span>
                            <span className='f-w-600 black fsize-xs-4'>8<span className='f-w-300'>h</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{minutes}<span className='f-w-300'>m</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{seconds}<span className='f-w-300'>s</span></span>
                        </div>
                        <Button
                            style='bg-dark-soft border-lime lime-400 border-radius-04 fsize-xs-3 f-w-500 mt-xs-4 z-index-999'
                            label="COS'È UNA CLASSIFICA FLASH?"
                            onClick={() => navigate('/flash-leaderboard-explanation')}
                        />
                    </>
                :
                    <>
                        <h4 className='fsize-xs-4 mb-xs-4 letter-spacing-1 f-w-500 line-height-140 white t-align-center black'>CLASSIFICA FLASH</h4>
                        <div className='d-flex-row j-c-center gap-0_5em fsize-xs-2 no-shrink bg-white pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 border-radius-04 w-80'>
                            <span className='f-w-600 black fsize-xs-4'>APRE TRA </span>
                            <span className='f-w-600 black fsize-xs-4'>8<span className='f-w-300'>h</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{minutes}<span className='f-w-300'>m</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{seconds}<span className='f-w-300'>s</span></span>
                        </div>
                    </>
                }
                </div>
            }

            {artist.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
                <div className={`position-fixed bottom-hidden w-100 border-radius-top-08 z-index-1100 bg-dark-soft fl-modal-border pb-xs-6 ${modalOpen && 'show-fl-message'}`}>
                    <Container>
                        <div className='d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-lime-1 pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2 mb-xs-4' onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                            <p className='fsize-xs-2'>CLASSIFICA FLASH TERMINATAA</p>
                            <img className='avatar-24 bg-brand-gradient border-radius-100' src={IconRightDark} alt='GO!' />
                        </div>
                    </Container>
                </div>
            }
            </>
        }
        </>
    )
}

export default MessageFlashLeaderboardNew