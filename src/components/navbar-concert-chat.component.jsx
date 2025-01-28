import { useEffect, useState, useContext } from 'react'

import { ArtistsContext } from '../contexts/artists.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import IconArrowLeft from '../images/icons/icon-arrowleft.svg'
import IconVerifiedArtist from '../images/icons/icon-verified-artist.svg'
import { useLocation, useNavigate } from 'react-router-dom'

function NavbarConcertChat({id, concertId, dateId, from}) {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { artists } = useContext(ArtistsContext)
    const { fanclubs } = useContext(FanclubsContext)
    const [scrolled, setScrolled] = useState(false)
    const [verified, setVerified] = useState(false)

    const [artist, setArtist] = useState()
    useEffect(() =>{
        const foundArtist = artists.find(artist => artist.id === id)
        setArtist(foundArtist)
    }, [id])

    const [concert, setConcert] = useState()
    useEffect(() =>{
        const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artist?.id)
        const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === concertId)
        setConcert(foundConcert)
    })

    const [date, setDate] = useState()
    useEffect(() =>{
        if (dateId) {
            const foundFanclub = fanclubs?.find(fanclub => fanclub?.artistId === artist?.id)
        const foundConcert = foundFanclub?.concerts.find(concert => concert?.id === concertId)
            const foundDate = foundConcert?.dates.find(date => date?.id === dateId)
            setDate(foundDate)
        }
        
    })

    useEffect(() => {
        setVerified(artist?.verified)
    }, [artist])

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 165) {
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
        <nav className='top-bar-area-overlay-fixed bg-dark d-flex-row align-items-center j-c-start white z-index-1000 top-0'>
            <div className='container d-flex-row align-items-center j-c-space-between w-100 gap-1em'>
                { date ?
                    <>
                    {!pathname.includes('/artist-app/') &&
                        <div className='avatar-28' onClick={() =>  navigate(-1, { state: { artistId: concert?.artistId, id: concert?.id } })}>
                            <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                        </div>
                    }
                    {pathname.includes('/artist-app/') &&
                        <div className='avatar-28' onClick={() =>  navigate(-1, { state: { artistId: concert?.artistId, id: concert?.id } })}>
                            <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                        </div>
                    }
                    </>
                :
                    <>
                    {!pathname.includes('/artist-app/') &&
                        <div className='avatar-28' onClick={() =>  navigate(from, { state : {artist: artist} })}>
                            <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                        </div>
                    }
                    {pathname.includes('/artist-app/') &&
                        <div className='avatar-28' onClick={() =>  navigate(`/artist-app/fanclub`, { state : {artist: artist} })}>
                            <img className='avatar-28 bg-dark-soft-transp75 border-radius-100' src={IconArrowLeft} alt='Back' />
                        </div>
                    }
                    </>
                }
                <div className='d-flex-row align-items-center j-c-center gap-0_25em w-100'>
                    {/* <div className='avatar-36 position-relative mr-xs-4'>
                        <img className='avatar-36 border-radius-100' src={artist?.image} alt='Artist' />
                        {verified && 
                            <img
                            className="artist-avatar-verified-icon avatar-12"
                            src={IconVerifiedArtist}
                            alt="Verified"
                            />
                        }                   
                    </div> */}
                    <div className='avatar-36 position-relative mr-xs-4'>
                        {
                            date ?
                            <img className='avatar-36 border-radius-100' src={concert?.cover.url} alt='cover' /> 
                            :
                            <img className='avatar-36 border-radius-100' src={concert?.cover.url} alt='cover' /> 

                        }              
                    </div>
                    <div className='d-flex-column j-c-center align-items-start'>
                        <h2 className='f-w-600 fsize-xs-3 letter-spacing-1'>
                            {concert?.name.length > 15 ? concert?.name.substring(0, 15) + '...' : concert?.name}
                        </h2>
                        {
                            date ? 
                            <h2 className='f-w-400 grey-200 fsize-xs-0 no-shrink'>
                                {date?.mainPlace}
                            </h2>
                            :
                            <h2 className='f-w-400 grey-200 fsize-xs-0 no-shrink'>
                                {concert?.participants.length + ' ' + `${concert?.participants.length === 1 ? 'partecipante' : 'partecipanti'}`} 
                            </h2>
                        }
                        
                    </div>
                </div>

                <div className='avatar-28'></div>
            </div>
        </nav>
    )
}

export default NavbarConcertChat