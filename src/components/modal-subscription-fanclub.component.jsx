import { useState, useEffect, useContext } from "react"
import { ArtistsContext } from "../contexts/artists.context"
import FullPageCenter from "../layout/full-page-center.layout"
import Container from "../layout/container.layout"
import Button from "./button.component"
import Carousel from "../layout/carousel.layout"
import IconExit from '../images/icons/icon-exit.svg'

const ModalSubscriptionFanclub = ({closeModal, fanclub}) => {
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
    console.log(artist)
  return (
        <FullPageCenter style='z-index-1000 bg-black-transp70'>
            <Container style={`centered-popup ${isExitingSettings ? 'fade-out' : ''} position-absolute d-flex-row align-items-center`}>
                <Carousel>
                    {/* MESE */}
                    <div className="bg-dark artist-card-highlight-multiple position-relative  overflow-clip border-radius-08 no-shrink pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4  d-flex-column j-c-center align-items-center">
                        <div className="w-100 d-flex-row j-c-end align-items-center" onClick={() => setIsExitingSettings(true)}>
                            <div className="avatar-28 border-radius-100 bg-dark-gradient d-flex-row j-c-center align-items-center"><img src={IconExit} /></div>
                        </div>
                        <h1 className="fsize-xs-5 f-w-600 letter-spacing-1">Fanclub di {artist?.artistName}</h1>
                        <div className="d-flex-column j-c-center align-items-center pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 border-lime-1 border-radius-08 mt-xs-4 position-relative overflow-all-hidden">
                            <p className="fsize-xs-3 f-w-300">€<span className="fsize-xs-5 f-w-600">40.99</span>/anno</p>
                            <p className="fsize-xs-1 f-w-300">(€2.99 /mese)</p>
                            <div 
                            className="position-absolute bg-red-400 top-18 right-neg15 pr-xs-10 pl-xs-8"
                            style={{
                                transform: "rotate(45deg)",
                              }}
                            >
                                <p className="fsize-xs-0 f-w-300 white">Save 20%</p>
                            </div>
                        </div>
                        <div id="" className="d-flex-column j-c-start align-items-start t-align-start mt-xs-4 mb-xs-4">
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>

                        </div>
                        <Button 
                            style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                            label='Abbonati'
                        />
                    </div>
                    {/* ANNO */}
                    <div className="bg-dark artist-card-highlight-multiple position-relative  overflow-clip border-radius-08 no-shrink  pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4  d-flex-column j-c-center align-items-center">
                        <div className="w-100 d-flex-row j-c-end align-items-center" onClick={() => setIsExitingSettings(true)}>
                            <div className="avatar-28 border-radius-100 bg-dark-gradient d-flex-row j-c-center align-items-center"><img src={IconExit} /></div>
                        </div>
                        <h1 className="fsize-xs-5 f-w-600 letter-spacing-1">Fanclub di {artist?.artistName}</h1>
                        <div className="d-flex-column j-c-center align-items-center pt-xs-2 pb-xs-2 pl-xs-4 pr-xs-4 border-lime-1 border-radius-08 mt-xs-4 position-relative overflow-all-hidden">
                            <p className="fsize-xs-3 f-w-300">€<span className="fsize-xs-5 f-w-600">40.99</span>/anno</p>
                            <p className="fsize-xs-1 f-w-300">(€2.99 /mese)</p>
                            <div 
                            className="position-absolute bg-red-400 top-18 right-neg15 pr-xs-10 pl-xs-8"
                            style={{
                                transform: "rotate(45deg)",
                              }}
                            >
                                <p className="fsize-xs-0 f-w-300 white">Save 20%</p>
                            </div>
                        </div>
                        <div id="" className="d-flex-column j-c-start align-items-start t-align-start mt-xs-4 mb-xs-4">
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>
                            <div className="d-flex-row j-c-start align-items-start gap-0_5em mt-xs-2">
                                <div className="avatar-28 bg-black border-radius-100"/>
                                <div className="d-flex-column j-c-center align-items-start">
                                    <p className="fsize-xs-2 f-w-500">Contenuti esclusivi</p>
                                    <p className="fsize-xs-1 f-w-300">Visualizza i post privati condivisi dall'artistsa con i suoi fan più affezionati</p>
                                </div>
                            </div>

                        </div>
                        <Button 
                            style='bg-acid-lime fsize-xs-3 f-w-500 black mt-xs-2'
                            label='Abbonati'
                        />
                    </div>
                   
                    
                </Carousel>
            </Container>
        </FullPageCenter>
  )
}

export default ModalSubscriptionFanclub