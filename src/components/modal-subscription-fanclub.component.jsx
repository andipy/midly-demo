import { useState, useEffect, useContext } from 'react'
import { ArtistsContext } from '../contexts/artists.context'
import FullPageCenter from '../layout/full-page-center.layout'
import Container from '../layout/container.layout'
import Button from './button.component'
import Carousel from '../layout/carousel.layout'
import IconExit from '../images/icons/icon-exit.svg'
import IconThunder from '../images/icons/icon-thunder.svg'
import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'
import IconLock from '../images/icons/icon-lock.svg'
import IconRocket from '../images/icons/icon-rocket.svg'

const ModalSubscriptionFanclub = ({closeModal, fanclub, handleSubscription}) => {
    const { artists } = useContext(ArtistsContext)
    const [isExitingSettings, setIsExitingSettings] = useState(false)
    useEffect(() => {
        if (isExitingSettings) {
            const endDelay = setTimeout(() => {
                closeModal()
                setIsExitingSettings(false)

            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExitingSettings])
    const [artist, setArtist] = useState()
    useEffect(() => {
        const matchedArtist = artists.find(a => a.id === fanclub.artistId)
        if (matchedArtist) {
            setArtist(matchedArtist)
        }
    }, [fanclub])
  return (
        <FullPageCenter style='z-index-1200 bg-black-transp80'>
            <Container style={`centered-popup ${isExitingSettings ? 'fade-out' : ''}`}>
                <Carousel>
                    {/* ANNO */}
                    <div className='d-flex-row bg-brand-gradient pt-xs-04 pb-xs-04 pl-xs-04 pr-xs-04 border-radius-08'>
                        <div className='bg-dark-gradient artist-card-highlight-multiple position-relative overflow-x border-radius-08 no-shrink pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4 d-flex-column j-c-space-between align-items-center h-min-100'>
                            <div className='d-flex-column j-c-start align-items-center'>
                                <div className='w-100 d-flex-row j-c-end align-items-center' onClick={() => setIsExitingSettings(true)}>
                                    <div className='avatar-28 border-radius-100 d-flex-row j-c-center align-items-center'><img src={IconExit} /></div>
                                </div>
                                <h1 className='fsize-xs-5 f-w-600 letter-spacing-1'>Fanclub di {artist?.artistName}</h1>
                                <div className='d-flex-column j-c-center align-items-center pt-xs-2 pb-xs-2 w-65 border-lime-1 border-radius-08 mt-xs-4 position-relative overflow-all-hidden'>
                                    <p className='fsize-xs-3 f-w-300'>€<span className='fsize-xs-5 f-w-600'>47.90</span>/anno</p>
                                    <p className='fsize-xs-1 f-w-300'>(€3.99 /mese)</p>
                                    <div 
                                    className='position-absolute bg-red-400 top-18 right-neg15 pr-xs-10 pl-xs-8'
                                    style={{
                                        transform: 'rotate(45deg)',
                                    }}
                                    >
                                        <p className='fsize-xs-0 f-w-300 white'>Save 20%</p>
                                    </div>
                                </div>
                                <div className='d-flex-column j-c-start align-items-start t-align-start mt-xs-4 mb-xs-4'>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconRocket} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <div className='d-flex-row j-c-start align-items-center w-100 gap-0_5em'>
                                                <p className='fsize-xs-2 f-w-500 lime-400'>Biglietto gratuito</p>
                                                <div className='bg-red-400 pr-xs-4 pl-xs-4'>
                                                    <p className='fsize-xs-0 f-w-300'>Hit</p>
                                                </div>
                                            </div>
                                            
                                            <p className='fsize-xs-1 f-w-300 lime-400'>Per un concerto di {artist?.artistName} quest'anno.</p>
                                        </div>
                                    </div>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconLock} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Contenuti esclusivi</p>
                                            <p className='fsize-xs-1 f-w-300'>Visualizza i post privati condivisi dall'artista con i suoi fan più affezionati.</p>
                                        </div>
                                    </div>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconThunder} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Accesso anticipato</p>
                                            <p className='fsize-xs-1 f-w-300'>Partecipa a eventi privati per la community di {artist?.artistName} e sii il primo ad avere accesso ai biglietti per tour e date.</p>
                                        </div>
                                    </div>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconFanclub} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Funzioni social</p>
                                            <p className='fsize-xs-1 f-w-300'>Condividi esperienze e fai amicizia con tutti i fan di {artist?.artistName} come te.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Button 
                                style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                                label='Abbonati'
                                onClick={() => {handleSubscription('YEAR'); setIsExitingSettings(true)}}
                            />
                        </div>
                    </div>

                    {/* MESE */}
                    <div className='d-flex-row bg-brand-gradient pt-xs-04 pb-xs-04 pl-xs-04 pr-xs-04 border-radius-08'>
                        <div className='bg-dark-gradient  border-brand-gradient artist-card-highlight-multiple position-relative  overflow-clip border-radius-08 no-shrink pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4  d-flex-column j-c-space-between align-items-center h-min-100'>
                            <div className='d-flex-column j-c-start align-items-center'>
                                <div className='w-100 d-flex-row j-c-end align-items-center' onClick={() => setIsExitingSettings(true)}>
                                    <div className='avatar-28 border-radius-100 d-flex-row j-c-center align-items-center'><img src={IconExit} /></div>
                                </div>
                                <h1 className='fsize-xs-5 f-w-600 letter-spacing-1'>Fanclub di {artist?.artistName}</h1>
                                <div className='d-flex-column j-c-center align-items-center pt-xs-6 pb-xs-6 w-65 border-lime-1 border-radius-08 mt-xs-4 position-relative overflow-all-hidden'>
                                    <p className='fsize-xs-3 f-w-300'>€<span className='fsize-xs-5 f-w-600'>4.99</span>/mese</p>
                                </div>
                                <div className='d-flex-column j-c-start align-items-start t-align-start mt-xs-4 mb-xs-4'>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconLock} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Contenuti esclusivi</p>
                                            <p className='fsize-xs-1 f-w-300'>Visualizza i post privati condivisi dall'artista con i suoi fan più affezionati.</p>
                                        </div>
                                    </div>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28  border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconThunder} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Accesso anticipato</p>
                                            <p className='fsize-xs-1 f-w-300'>Partecipa a eventi privati per la community di {artist?.artistName} e sii il primo ad avere accesso ai biglietti per tour e date.</p>
                                        </div>
                                    </div>
                                    <div className='d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2'>
                                        <div className='avatar-28 border-radius-100 d-flex-row j-c-center align-items-center'>
                                            <img src={IconFanclub} />
                                        </div>
                                        <div className='d-flex-column j-c-start align-items-start'>
                                            <p className='fsize-xs-2 f-w-500'>Funzioni social</p>
                                            <p className='fsize-xs-1 f-w-300'>Condividi esperienze e fai amicizia con tutti i fan di {artist?.artistName} come te.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            <Button 
                                style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                                label='Abbonati'
                                onClick={() => {handleSubscription('MONTH'); setIsExitingSettings(true)}}
                            />
                            
                        </div>
                    </div>  
                </Carousel>
            </Container>
        </FullPageCenter>
  )
}

export default ModalSubscriptionFanclub