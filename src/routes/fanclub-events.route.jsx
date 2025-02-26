import { useContext, useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import { ArtistsContext } from '../contexts/artists.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import Container from "../layout/container.layout"
import PostConcert from "../components/post-concert.component"

import useFanclubSubscription from '../utils/get-fanclub-subscription.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useConcertParticipation from '../utils/handle-event-partecipation.hooks'
import useFanclubSubscriptionHandler from '../utils/handle-subscription.hook'
import Button from '../components/button.component'
const FanclubEventsRoute = () => {
    const {artist, focusPost} = useOutletContext()
    const {artists} = useContext(ArtistsContext)
    const {currentArtist} = useContext(CurrentArtistContext)
    const location = useLocation()

    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist

    const hasUserSubscribed = useFanclubSubscription(artistF?.id)
    const fanclub = useFanclub(artistF?.id)

    const { newParticipation } = useConcertParticipation()
    const { handleSubscription, err, isExiting } = useFanclubSubscriptionHandler()

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    const [modalSubscription, setModalSubscription] = useState(false)
    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.concerts.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])

  return (
    <div>
        {empty &&
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Il fanclub di {artistF?.artistName} è attivo, rimani sintonizzato per vedere i suoi prossimi live.</p>
                    {
                        !hasUserSubscribed &&
                        <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Abbonati' onClick={() => setModalSubscription(true)} />
                    }                
                </div>
            </div>
        }
        <Container style={'pb-xs-2 mt-xs-4'}>
            {
                fanclub?.concerts
                .sort((a,b) => sortPosts(a,b))
                .map(item => {   
                    return (
                        <>
                        {
                            <PostConcert 
                                concert={item}
                                newPartecipation={(concertId) => newParticipation(artistF?.id, concertId)}
                                hasUserSubscribed={hasUserSubscribed}
                                handleSubscription={() => setModalSubscription(true)}
                                slug={artistF?.slug}
                            />
                        }
                        </>  
                    )
                })
            }
        
        </Container>
        {
            modalSubscription &&
            <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={(period) => handleSubscription(artistF?.id, period)}/>
        }
        {err && 
            <FullPageCenter style='z-index-1300 bg-black-transp70'>
                <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                    <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                        <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclub?.artistId).artistName} è al completo</h2>
                    </div>
                </Container>
            </FullPageCenter>
        }
    </div>
  )
}

export default FanclubEventsRoute