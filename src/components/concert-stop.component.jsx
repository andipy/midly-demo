import { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CurrentFanContext } from "../contexts/currentFan.context"
import useFanclub from "../utils/get-fanclub.hooks"
import useConcertParticipation from "../utils/handle-event-partecipation.hooks"
import useArtist from "../utils/get-artist.hook"
import Container from "../layout/container.layout"
import IconGroup from '../images/icons/icon-group.svg'
import IconGroupBlack from '../images/icons/icon-group-black.svg'
import IconOkBlack from '../images/icons/icon-ok-black.svg'

const ConcertStop = ({concertId, tourId, artistId}) => {
    //manca da gestire se sono in artistApp
    const location = useLocation()
    const navigate = useNavigate()
    const pathname = location.pathname || null
    const {currentFan} = useContext(CurrentFanContext)
    const { newParticipation } = useConcertParticipation()
    const fanclub = useFanclub(artistId)
    const artist = useArtist(artistId)
    const [tour, setTour] = useState()
    useEffect(() => {
        if (tourId) {
            const foundTour = fanclub?.concerts.find(concert => concert.id === tourId)
            if (foundTour) {
                setTour(foundTour)
            }
        }
    }, [tourId, fanclub])

    const [concert, setConcert] = useState()
    useEffect(() => {
        if (tour) {
            const foundConcert = tour?.dates.find(date => date.id === concertId)
            if (foundConcert) {
                setConcert(foundConcert)
            }
        }
    }, [concertId, tour, fanclub])


    const [partecipate, setPartecipate] = useState(false)
    useEffect(() => {
        if (concert && concert.participants && !pathname.includes('/artist-app')) {
            const userParticipate = concert.participants.some(p => p.userId === currentFan.id)
            setPartecipate(userParticipate)
        }
    }, [concert, fanclub])

    const getDay = (date) => {
        if ( date ) {
            const [day] = date.split('-')
            return day.padStart(2, '0')
        }
    }

    const getMonth = (date) => {
        if ( date ) {
            const [, month] = date.split('-')
            const monthNames = [
                "GEN", "FEB", "MAR", "APR", "MAG", "GIU", 
                "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
            ]
            return monthNames[parseInt(month, 10) - 1]
        }
    }

    const getYear = (date) => {
        if ( date ) {
            const [, , year] = date.split('-')
            return year
        }
    }

    const isPastDate = concert && new Date(concert.date.split('-').reverse().join('-')) < new Date()
  return (
    <div className=" pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 bg-dark-gradient mb-xs-2 w-100vw position-relative">
        {isPastDate && (
            <div className="overlay-card-followed bg-black-transp50">
                <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                    <span className='fsize-xs-1'>Evento passato</span>
                </div>
            </div>
        )}
        <Container>
            <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                <p className='fsize-xs-9 line-height-1'>{getDay(concert?.date)}</p>
                <p className='fsize-xs-3 line-height-1'>{getMonth(concert?.date)}</p>
                <p className='fsize-xs-2 line-height-1'>{getYear(concert?.date)}</p>
            </div>
            <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                <p className="fsize-xs-2 lime-400">{concert?.province}</p>
                <p className="fsize-xs-3">{concert?.mainPlace}</p>
            </div>
            <div className="d-flex-row j-c-start align-items-center gap-0_25em">
                <p className="fsize-xs-1">{concert?.participants.length} partecipanti</p>
            </div>
            {!pathname.includes('/artist-app/') &&
                <div className='d-flex-row j-c-space-between align-items-center gap-0_5em mt-xs-2 mb-xs-2 w-100'>
                    {partecipate ? (
                        <>
                        <div className='bg-acid-lime-op-10 border-lime border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => newParticipation(artist.id, concert.id, tour.id)}> 
                            <div className='avatar-16 bg-acid-lime border-lime d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconOkBlack}></img>
                            </div>
                            <p className='lime-400 fsize-xs-2 f-w-500'>Parteciperò</p>
                        </div>
                        <div className='bg-acid-lime  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => navigate(`/artist/${artist.slug}/concert/chat`, { state: { artistId: artistId, id: tourId, dateId: concertId } })}> 
                            <div className='avatar-16  d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconGroupBlack}></img>
                            </div>
                            <p className='black fsize-xs-2 f-w-500'>Chat di gruppo</p>
                        </div>
                        </>
                        
                        
                    ) : (
                        <>
                        <div className='bg-dark-gradient border-lime border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  onClick={() => newParticipation(artist.id, concert.id, tour.id)}> 
                            <div className='avatar-16 bg-dark-gradient border-lime d-flex-row border-radius-100'></div>
                            <p className='lime-400 fsize-xs-2 f-w-500'>Parteciperò</p>
                        </div>
                        <div className='bg-dark-gradient  border-radius-02 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 d-flex-row j-c-start align-items-center gap-0_5em w-100'  > 
                            <div className='avatar-16 bg-dark-gradient  d-flex-row j-c-center align-items-center border-radius-100'>
                                <img src={IconGroup}></img>
                            </div>
                            <p className='grey-400 fsize-xs-2 f-w-500'>Chat di gruppo</p>
                        </div>
                        </>
                    )}
                </div>
            }
        </Container>
    
    </div>
  )
}

export default ConcertStop