import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import useArtist from "../utils/get-artist.hook"
import useFanclub from "../utils/get-fanclub.hooks"
import NavbarPostFeed from "../components/navbar-post-feed.component"
import Carousel from "../layout/carousel.layout"
import CardConcertStop from "../components/card-concert-stop.component"
import Container from "../layout/container.layout"
import ConcertStop from "../components/concert-stop.component"
import CountdownConcert from "../components/countdown-concert.component"
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

    const [nextDate, setNextDate] = useState()
    useEffect(() => {
        const today = new Date();

        // Funzione per convertire "gg-mm-yyyy" in un oggetto Date
        const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day); // month è zero-indicizzato in JavaScript
        };

        // Filtra le date future
        const futureDates = tour?.dates.filter((event) => parseDate(event.date) > today);

        if (futureDates?.length > 0) {
        // Trova la data più vicina
        const closestDate = futureDates.reduce((closest, current) => {
            const closestDiff = Math.abs(parseDate(closest.date) - today);
            const currentDiff = Math.abs(parseDate(current.date) - today);

            return currentDiff < closestDiff ? current : closest;
        });

        setNextDate(closestDate);
        }
      }, [tour]);

      const [scrolled, setScrolled] = useState(false)
        useEffect(() => {
            const handleScroll = () => {
                if (window.pageYOffset >= 230) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            }

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }, [])


  return (
    <>
    <NavbarPostFeed artist={artist} type={tour?.name} from={from}/>
    <div className={`z-index-2 pt-xs-topbar position-relative`}>
        {tour?.cover.type === 'IMAGE' ?
            <img
                className='w-100 h-xs-27 object-fit-cover'
                src={tour?.cover.url && tour.cover.url}
            />
        : tour?.cover.type === 'VIDEO' &&
            <video className='w-100 h-xs-27 object-fit-cover' autoPlay playsInline loop muted>
                <source src={tour?.cover.url && tour.cover.url} type='video/mp4' />
            </video>
        }
        <div className="d-flex-row j-c-center align-items-center position-absolute-x bottom-2">
            <CountdownConcert date={nextDate?.date} />
        </div>
    </div>

    {
        scrolled &&
        <article className='position-sticky top-navbar z-index-999 bg-dark pb-xs-2 d-flex-row j-c-center align-items-center'>
            <CountdownConcert date={nextDate?.date} />
        </article>
    }
    
    <Container>
    {nextDate &&
        <section id='quiz' className={` mt-xs-2`}>
            <h2 className='fsize-xs-5 f-w-600 mb-xs-4'>Next stop:</h2>
            <div className="d-flex-column j-c-center align-items-center w-100">
                <ConcertStop concertId={nextDate?.id} tourId={tour.id} artistId={artistId}/>
            </div>
        </section>
    }
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