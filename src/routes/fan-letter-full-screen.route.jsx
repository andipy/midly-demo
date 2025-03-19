import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FansContext } from "../contexts/fans.context"

import FullPageCenter from "../layout/full-page-center.layout"
import SwipeCarouselFull from "../layout/swipe-carousel-full.layout"
import NavbarCloseOnly from "../components/navbar-close-only.component"
import Container from "../layout/container.layout"
const FanLetterFullScreenRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { letterId, fromPage, letters} = location.state || {}
    const initialIndex = letters?.findIndex(post => post.id === letterId)
    const [currentPostIndex, setCurrentPostIndex] = useState(initialIndex)

    const {fans} = useContext(FansContext)

    const [fan, setFan] = useState()
    useEffect(() => {
        if (letters && letters?.length > 0) {
            const currentPost = letters[currentPostIndex]

            const foundFan = fans.find(fan => fan.id === currentPost?.userId)
            setFan(foundFan)
        }
    }, [currentPostIndex])


    const [isDragging, setIsDragging] = useState(false)
    const trackRef = useRef(null)

    const startY = useRef(0)
    const startX = useRef(0)
    const currentTranslate = useRef(0)
    const prevTranslate = useRef(0)

    const handleDragStart = (event) => {
        if (letters.length === 1) return
        setIsDragging(true)
        startY.current = event.touches ? event.touches[0].clientY : event.clientY
        startX.current = event.touches ? event.touches[0].clientX : event.clientX // Salva la posizione X
        currentTranslate.current = prevTranslate.current
        trackRef.current.style.transition = 'none'
    
        // Impediamo il refresh della pagina
        event.preventDefault()
    }
    
    const handleDragMove = (event) => {
        if (!isDragging) return
    
        const currentY = event.touches ? event.touches[0].clientY : event.clientY
        const currentX = event.touches ? event.touches[0].clientX : event.clientX
    
        const diffY = currentY - startY.current // Differenza in pixel verticale
        const diffX = currentX - startX.current // Differenza in pixel orizzontale
    
        // Se il movimento orizzontale è maggiore di quello verticale, non fare nessun movimento verticale
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Movimento orizzontale maggiore, non fare movimento verticale
            return
        }
    
        // Converti la differenza in pixel a vh
        const diffVh = (diffY / window.innerHeight) * 100
    
        // Calcola la nuova posizione in vh
        currentTranslate.current = prevTranslate.current + diffVh
        trackRef.current.style.transform = `translateY(${currentTranslate.current}vh)` // Usa vh per la trasformazione
    
        // Preveniamo il comportamento di pull-to-refresh
        event.preventDefault()
    }
    
    const handleDragEnd = () => {
        if (!isDragging) return
        setIsDragging(false)
        
        const height = window.innerHeight
        const movedBy = currentTranslate.current - prevTranslate.current
        
        let newIndex = currentPostIndex
        const totalSlides = letters?.length
    
        // Se il movimento supera la soglia, cambia il post
        if (movedBy < -20 && currentPostIndex < totalSlides - 1) {
            newIndex = currentPostIndex + 1
        } else if (movedBy > 20 && currentPostIndex > 0) {
            newIndex = currentPostIndex - 1
        }
    
        setCurrentPostIndex(newIndex)
        setShowCaption(false)
    
        // Calcola la posizione finale in base all'indice
        prevTranslate.current = -newIndex * 100
        trackRef.current.style.transition = 'transform 0.3s ease-out'
        trackRef.current.style.transform = `translateY(${-newIndex * 100}vh)` // Usa la posizione in vh
    }

    // Aggiungi gli event listener con passive: false
    useEffect(() => {
        const trackElement = trackRef.current

        if (trackElement) {
            // Aggiungi l'evento per il touchstart (passive: false)
            trackElement.addEventListener('touchstart', handleDragStart, { passive: false })
            
            // Aggiungi l'evento per il touchmove (passive: false)
            trackElement.addEventListener('touchmove', handleDragMove, { passive: false })

            // Rimuovi gli eventi al termine
            return () => {
                trackElement.removeEventListener('touchstart', handleDragStart)
                trackElement.removeEventListener('touchmove', handleDragMove)
            }
        }
    }, [])

    useEffect(() => {
        if (letters && letters.length > 0 && initialIndex !== undefined) {
            setCurrentPostIndex(initialIndex)
        }
    }, [letters])

    useEffect(() => {
        if (currentPostIndex !== undefined && letters.length > 0) {
            prevTranslate.current = -currentPostIndex * 100
            trackRef.current.style.transform = `translateY(${-currentPostIndex * 100}vh)` // Mantieni la trasformazione in vh
        }
    }, [letters])
    const [showCaption, setShowCaption] = useState(false)
  return (
    <>
    <NavbarCloseOnly transparent={true} onClick={() => navigate(-1)}/>
    <FullPageCenter style='z-index-999'>
        <div
            className="d-flex-column j-c-center align-items-center overflow-all-hidden w-100vw"
            style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div
                ref={trackRef}
                className="posts-wrapper h-100vh"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {letters?.map((post, index) => (
                    <div
                        key={index}
                        className={`post`} 
                        style={{
                            width: '100vw',
                            height: '100vh', 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SwipeCarouselFull images={Array.isArray(post.media) ? post.media : [post.media]} text={''} />
                        
                    </div>
                ))}
            </div>
        </div>
        {/* {!hasUserSubscribed && !pathname.includes('/artist-app/') && posts[currentPostIndex]?.settings?.isPrivate &&
        <div className='position-absolute-x-y w-80 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06 z-index-1300'>
            <p className='t-align-center mb-xs-4'>Vuoi accedere ai contenuti esclusivi dell'artista?</p>
            <Button style='bg-acid-lime black f-w-500 fsize-xs-2' label='Abbonati' onClick={() => setModalSubscription(true)} />
        </div>
        } */}
    </FullPageCenter>
    <div 
        className='d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2 mt-xs-4 bg-color-none position-absolute-y top-5  z-index-1300 ml-xs-6 position-fixed'
        >
            <div className='d-flex-row j-c-center align-items-center gap-0_25em z-index-1100' >
                <img className='avatar-28 border-radius-100' src={fan?.image}/>
                <p className='fsize-xs-1 f-w-500'>{fan?.username}</p>
            </div>
    </div>
    <div className='bg-dark-soft-transp75 position-absolute-x bottom-0 w-100 pt-xs-4 pb-xs-4 z-index-1100 position-fixed'>
        <Container style='d-flex-column j-c-center gap-0_5em'>
            {letters[currentPostIndex]?.caption && 
                <div className='d-flex-column j-c-center w-100'>
                    {letters[currentPostIndex]?.caption !== '' &&
                        <p className='pre-wrap mb-xs-2 grey-100 f-w-400 fsize-xs-2'>
                            {letters[currentPostIndex]?.caption?.length > 95 ?
                            <>
                                {showCaption ?
                                    <>
                                        {letters[currentPostIndex]?.caption}
                                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(false)}> meno</span>
                                    </>
                                :
                                    <>
                                        {letters[currentPostIndex]?.caption.slice(0, 95)}...
                                        <span className='lime-400 f-w-500' onClick={() => setShowCaption(true)}> altro</span>
                                    </>
                                }
                            </>
                            :
                            letters[currentPostIndex]?.caption
                            }
                        </p>
                    }

                    {/* <p className='fsize-xs-1 f-w-100 grey-300 mt-xs-2'>
                        {days > 31 ?
                            <span>{formatDate()}</span>
                        : days > 0 ?
                            <span>{days} giorni fa</span>
                        : days <= 0 ?
                        <>
                            {hours <= 0 ?
                            <>
                                    {minutes <= 0 ?
                                        <span>{seconds} secondi fa</span>
                                    :
                                        <span>{minutes} minuti fa</span>
                                    }
                            </>
                                :
                                    <span>{hours} ore fa</span>
                            }
                        </>
                        :
                            <span>{days} giorni fa</span>
                        }
                    </p> */}
                </div>
            
        }
        </Container>
    </div>
    </>
     
  )
}

export default FanLetterFullScreenRoute