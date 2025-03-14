import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import useArtist from "../utils/get-artist.hook"
import useFanclub from "../utils/get-fanclub.hooks"
import NavbarPostFeed from "../components/navbar-post-feed.component"
import Carousel from "../layout/carousel.layout"
import CardConcertStop from "../components/card-concert-stop.component"
import Container from "../layout/container.layout"
import ConcertStop from "../components/concert-stop.component"
const TourDetailsRoute = () => {
    const location = useLocation()
    const pathname = location.pathname || null
    const {artistId, tourId, from} = location.state || null
    const artist = useArtist(artistId)
    const fanclub = useFanclub(artistId)
    const [tour, setTour] = useState()
    useEffect(() => {
        if (tourId) {
            const foundTour = fanclub?.concerts.find(concert => concert.id === tourId)
            if (foundTour) {
                setTour(foundTour)
            }
        }
    }, [tourId, fanclub])


  return (
    <>
    <NavbarPostFeed artist={artist} type={''} from={from}/>
    <div className={`z-index-2 `}>
        {tour?.cover.type === 'IMAGE' ?
            <img
                className='w-100 h-inherit object-fit-cover'
                src={tour?.cover.url && tour.cover.url}
            />
        : tour?.cover.type === 'VIDEO' &&
            <video className='w-100 h-inherit object-fit-cover' autoPlay playsInline loop muted>
                <source src={tour?.cover.url && tour.cover.url} type='video/mp4' />
            </video>
        }
    </div>
    <Container>
    {tour?.dates.length > 0 &&
        <section id='quiz' className={` mt-xs-2`}>
            <h2 className='fsize-xs-5 f-w-600 mb-xs-4'>Tutte le tappe del tour</h2>
            <div className="d-flex-column j-c-center align-items-center w-100">
                {tour?.dates
                .sort((a, b) => {
                    const dateA = new Date(a.date.split('-').reverse().join('-'))
                    const dateB = new Date(b.date.split('-').reverse().join('-'))
                    return dateA - dateB
                })
                .map(date => {
                    return (
                    <ConcertStop concertId={date.id} tourId={tour.id} artistId={artistId}/>
                    )
                })}
            </div>
        </section>
    }
    </Container>
    
    
    </>
    
  )
}

export default TourDetailsRoute