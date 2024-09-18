import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ContainerDefault from '../layout/container-default.layout'

import Button from './button.component'
import NavbarModalFlashLeaderboardAnnouncement from './navbar-modal-flash-leaderboard-announcement.component'

import IconRightDark from '../images/icons/icon-arrowright-dark.svg'
import IconThunderBlack from '../images/icons/icon-thunder-black.svg'
import IllustrationTrophy from '../images/illustrations/GENERIC.png'

const MessageFlashLeaderboardModal = ({ artist, modalOpen, toggleModalContent, upperModalCompressed, lowerModalCompressed }) => {

    const navigate = useNavigate()

    const [seconds, setSeconds] = useState(59)
    const [minutes, setMinutes] = useState(37)
    
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

    

    return (
        <>
        {artist &&
        <>
            {/* {artist.flashLeaderboard.status === 'ONGOING' &&
                <div className={`position-fixed bottom-hidden w-100 full-screen-modal bg-brand-gradient pb-xs-4 pt-xs-4 ${modalOpen && 'show-fl-message'}`} onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                    <ContainerDefault>
                        <p className='fsize-xs-5 f-w-600 black'>CLASSIFICA FLASH ATTIVA</p>

                        <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='ENTRA' />
                    </ContainerDefault>
                </div>
            } */}

            {artist.flashLeaderboard.status === 'PENDING' &&
                <div className={`position-fixed bottom-hidden w-100 full-screen-modal overflow-all-hidden ${modalOpen && 'show-fl-message'} ${lowerModalCompressed ? 'bg-dark-soft fl-modal-border pb-xs-6' : 'bg-brand-gradient'}`}>
                    {!upperModalCompressed &&
                        <NavbarModalFlashLeaderboardAnnouncement
                                upperModalCompressed={upperModalCompressed}
                                toggleModalContent={toggleModalContent}
                        />
                    }

                    <ContainerDefault containerSpecificStyle={`d-flex-column align-items-center j-c-center overflow-all-hidden ${upperModalCompressed ? 'compress-up' : 'expand-up'}`}>
                        <img className='w-25' src={IllustrationTrophy} />
                        <h4 className='fsize-xs-4 mb-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 w-80'>Sta per uscire il nuovo album di {artist.artistName}! In quel momento si aprirà anche la CLASSIFICA FLASH qui su MIDLY:</h4>
                        <div className='d-flex-row j-c-center gap-0_5em fsize-xs-2 no-shrink bg-brand-gradient pt-xs-4 pb-xs-4 border-radius-04 w-100'>
                            <span className='f-w-600 black fsize-xs-4'>MANCANO </span>
                            <span className='f-w-600 black fsize-xs-4'>8<span className='f-w-300'>h</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{minutes}<span className='f-w-300'>m</span></span>
                            <span className='f-w-600 black fsize-xs-4'>{seconds}<span className='f-w-300'>s</span></span>
                        </div>
                        <Button
                            style='bg-dark-soft border-lime lime-400 border-radius-04 fsize-xs-3 f-w-500 mt-xs-4 z-index-max'
                            label="COS'È UNA CLASSIFICA FLASH?"
                            onClick={() => navigate('/flash-leaderboard-explanation')}
                        />
                    </ContainerDefault>

                    

                    <div className={`bg-brand-gradient w-100 position-sticky bottom-0 z-index-max ${lowerModalCompressed ? 'compress-down' : 'expand-down pt-xs-3 pb-xs-3'}`} onClick={toggleModalContent}>
                        <ContainerDefault containerSpecificStyle={`d-flex-column align-items-center j-c-center overflow-all-hidden z-index-max ${lowerModalCompressed ? 'compress-down' : 'expand-down'}`}>
                            <h4 className='fsize-xs-3 f-w-500 black'>CLASSIFICA FLASH APRE TRA:</h4>
                            <div className='d-flex-row j-c-center gap-0_5em fsize-xs-3 no-shrink mt-xs-4 border-radius-04 w-100'>
                                <span className='f-w-600 black'> </span>
                                <span className='f-w-600 black'>8<span className='f-w-300'>h</span></span>
                                <span className='f-w-600 black'>{minutes}<span className='f-w-300'>m</span></span>
                                <span className='f-w-600 black'>{seconds}<span className='f-w-300'>s</span></span>
                            </div>
                        </ContainerDefault>
                    </div>
                </div>
            }

            {artist.flashLeaderboard.status === 'ONGOING' &&
                <div className={`position-fixed bottom-hidden w-100 full-screen-modal bg-dark-soft fl-modal-border overflow-all-hidden ${modalOpen && 'show-fl-message'}`}>
                    {!upperModalCompressed &&
                        <NavbarModalFlashLeaderboardAnnouncement
                            upperModalCompressed={upperModalCompressed}
                            toggleModalContent={toggleModalContent}
                        />
                    }

                    <ContainerDefault containerSpecificStyle={`d-flex-column align-items-center j-c-center overflow-all-hidden ${upperModalCompressed ? 'compress-up' : 'expand-up pb-xs-8'}`}>
                    <div className='modal-header w-100 position-absolute top-0'>
                        <img
                            className='position-absolute top-0 w-100 h-inherit object-fit-cover'
                            src={require('../images/pictures/artie-5ive-cover.jpg')}
                        />
                        </div>
                        <h4 className='pt-xs-modal-header fsize-xs-4 letter-spacing-1 f-w-300 line-height-140 white t-align-center mt-xs-4 mb-xs-4'>CLASSIFICA FLASH sull'album <span className='lime-400 f-w-500'>Nome dell'album</span> ATTIVA</h4>

                        <Button
                            style='bg-acid-lime black border-radius-04 fsize-xs-3 f-w-500 z-index-max mb-xs-4'
                            label="ENTRA NELLA CLASSIFICA FLASH →"
                            onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}
                        />

                        <div className='d-flex-row j-c-center gap-0_5em fsize-xs-3 no-shrink pt-xs-4 border-radius-04 w-100'>
                            <span className='f-w-600 white'>Termina tra: </span>
                            <span className='f-w-600 white'>8<span className='f-w-300'>h</span></span>
                            <span className='f-w-600 white'>{minutes}<span className='f-w-300'>m</span></span>
                            <span className='f-w-600 white'>{seconds}<span className='f-w-300'>s</span></span>
                        </div>
                    </ContainerDefault>

                    <div className={`bg-brand-gradient w-100 position-sticky bottom-0 z-index-max ${lowerModalCompressed ? 'compress-down' : 'expand-down pt-xs-6 pb-xs-6'}`} onClick={toggleModalContent}>
                        <ContainerDefault containerSpecificStyle={'d-flex-row align-items-center j-c-space-between'}>
                                <div className='d-flex-row align-items-center gap-0_5em'>
                                    <img src={IconThunderBlack} />
                                    <h4 className='fsize-xs-4 f-w-500 black'>CLASSIFICA FLASH ATTIVA</h4>
                                </div>
                                <img className='avatar-24 bg-white border-radius-100' src={IconRightDark} alt='GO!' />
                        </ContainerDefault>
                    </div>
                </div>
            }

            {/* {artist.flashLeaderboard.status === 'CLOSED_VISIBLE' &&
                <div className={`position-fixed bottom-hidden w-100 full-screen-modal bg-dark-soft fl-modal-border pb-xs-6 ${modalOpen && 'show-fl-message'}`}>
                    <ContainerDefault>
                        <div className='d-flex-row align-items-center j-c-space-between bg-dark-soft border-radius-100 border-lime-1 pl-xs-4 pr-xs-2 pt-xs-2 pb-xs-2 mb-xs-4' onClick={() => navigate(`/artist/${artist.slug}/flash-leaderboard`, { state: artist })}>
                            <p className='fsize-xs-2'>CLASSIFICA FLASH TERMINATAA</p>
                            <img className='avatar-24 bg-brand-gradient border-radius-100' src={IconRightDark} alt='GO!' />
                        </div>
                    </ContainerDefault>
                </div>
            } */}
            </>
        }
        </>
    )
}

export default MessageFlashLeaderboardModal