import { useContext, useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom'
import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import FullPageCenter from '../layout/full-page-center.layout'
import ModalSubscriptionFanclub from '../components/modal-subscription-fanclub.component'
import Snackbar from '../components/snackbar.component'
import Container from "../layout/container.layout"
import PostConcert from "../components/post-concert.component"
import Post from "../components/post.component"
const FanclubEventsRoute = () => {
    const navigate = useNavigate()
    const {context, focusPost} = useOutletContext()
    const {state } = useLocation()
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const {artists} = useContext(ArtistsContext)

    // fetch the fanclub
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        if ( context ) {
            fetchThisFanclub()
            checkFanclubSubscription()
        }
    }, [context, fanclubs, currentFan])

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    const newPartecipation = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        concerts: fanclub.concerts.map(concert => {
                            if (concert.id === id) {
                                const partecipate = concert.participants.some(p => p.userId === currentFan.id)
                                return {
                                    ...concert,
                                    participants: partecipate
                                        ? concert.participants.filter(c => c.userId !== currentFan.id) // Rimuove il like
                                        : [...concert.participants, { userId: currentFan.id }] // Aggiunge il like
                                }
                            }
                            return concert
                        })
                    }
                }
                return fanclub
            })
        )
    }
    const [err, setErr] = useState(false)
    const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
    const handleSubscription = () => {
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        if (hasUserSubscribed) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub =>
                    fanclub.artistId === context.id
                        ? { ...fanclub, subscribers: (fanclub.subscribers || 0) - 1 }
                        : fanclub
                )
            );
            setCurrentFan(prev => ({
                ...prev,
                fanclubsSubscribed: prev.fanclubsSubscribed.filter(fanclub => fanclub.artistId !== context.id),
                removedSubscriptions: [
                    ...prev.removedSubscriptions,
                    { artistId: context.id, createdAt: date }
                ]
            }))
        } else {
            if (fanclub?.maxSubscribers <= fanclub?.subscribers && fanclub?.maxSubscribers) {
                setErr(true)
                return
            } else {
                setFanclubs(prevFanclubs =>
                    prevFanclubs.map(fanclub =>
                        fanclub.artistId === context.id
                            ? { ...fanclub, subscribers: (fanclub.subscribers || 0) + 1 }
                            : fanclub
                    )
                )
                setCurrentFan(prev => ({
                    ...prev,
                    fanclubsSubscribed: [...prev.fanclubsSubscribed, { artistId: context.id, createdAt: date }],
                    removedSubscriptions: prev.removedSubscriptions.filter(fanclub => fanclub.artistId !== context.id)
                }))
            }  
        }
        
    }
    const checkFanclubSubscription = () => {
        let isSubscribed
        if ( currentFan.fanclubsSubscribed.find(sub => sub.artistId === context.id) ) {
            isSubscribed = true
        } else {
            isSubscribed = false
        }
        setHasUserSubscribed(isSubscribed)
    }

    const [modalSubscription, setModalSubscription] = useState(false)

    const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (err) {
            const exitDelay = setTimeout(() => {
                setIsExiting(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [err])

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setErr(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])
  return (
    <div>
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
                                newPartecipation={newPartecipation}
                                hasUserSubscribed={hasUserSubscribed}
                                handleSubscription={() => setModalSubscription(true)}
                                slug={context.slug}
                            />
                        }
                        </>  
                    )
                })
            }
        
        </Container>
        {
            modalSubscription &&
            <ModalSubscriptionFanclub closeModal={() => setModalSubscription(false)} fanclub={fanclub} handleSubscription={handleSubscription}/>
        }
        {err && 
            <FullPageCenter style='z-index-1100 bg-black-transp70'>
                <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                    <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                        <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il fanclub di {artists.find(artist => artist.id === fanclub?.artistId).artistName} è al completo</h2>
                    </div>
                </Container>
            </FullPageCenter>
        }
        <Snackbar message={messageSnackbar} triggered={triggered} />
    </div>
  )
}

export default FanclubEventsRoute