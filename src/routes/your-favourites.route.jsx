import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { LiveQuizContext } from '../contexts/live-quiz.context'

import Container from '../layout/container.layout'
import Carousel from '../layout/carousel.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import CardFollowedArtist from '../components/card-followed-artist.component'
import NavbarDefault from '../components/navbar-default.component'
import ButtonFollowMoreArtists from '../components/button-follow-more-artists.components'
import CardQuiz from '../components/card-quiz.component'
import CardSanremo from '../components/card-sanremo.component'
import Appbar from '../components/appbar.component'
import Button from '../components/button.component'
import CardArtist from '../components/card-search-artists.component'
import CardArtistHighlight from '../components/card-search-artist-highlight.component'
import TextTitle from '../components/text-title.component'

const YourFavouritesRoute = () => {

    const navigate = useNavigate()

    const { artists } = useContext(ArtistsContext)
    const { currentFan } = useContext(CurrentFanContext)

    // const [topBarHeight, setTopBarHeight] = useState(0)
    // useEffect(() => {
    //     const topBar = document.getElementById('top-bar')
    //     setTopBarHeight(topBar.offsetHeight - 1)
    // }, [])
    
    const [subscribed, setSubscribed] = useState([])
    const [showComponent, setShowComponent] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [highlightArtists, setHighlightArtists] = useState([])
    const timeoutRef = useRef(null)

    const sortArtists = (a, b) => {
        const statusOrder = {
            'ONGOING': 1,
            'PENDING': 2,
            'CLOSED_VISIBLE': 3,
            'NONE': 4 
        }

        return (statusOrder[a.flashLeaderboard.status] || 5) - (statusOrder[b.flashLeaderboard.status] || 5)
    }

    const sortHighlightedArtists = (a, b) => {
        if (b.importance !== a.importance) {
            return b.importance - a.importance
        }            
        return a.artistName.localeCompare(b.artistName)
    }

    const sortQuizzes = (a,b) => {
        const aHasFanResponse = a.responses.some(response => response.userId === currentFan.id)
        const bHasFanResponse = b.responses.some(response => response.userId === currentFan.id)
        if (aHasFanResponse && !bHasFanResponse) return 1
        if (!aHasFanResponse && bHasFanResponse) return -1
        return 0
    }

    const fetchHighlightArtists = () => {
        const highlightArtists = artists
            .filter(artist => artist.highlight === true)
            .sort((a, b) => sortHighlightedArtists(a, b))
        setHighlightArtists(highlightArtists)
    }

    const fetchFavourites = () => {
        const favouriteArtistIds = currentFan.fanclubsSubscribed.map(artist => artist.artistId)
        const favouriteArtists = artists
            .filter(artist => favouriteArtistIds.includes(artist.id))
            .sort((a,b) => sortArtists(a,b))
        setSubscribed(favouriteArtists)
    }

    const { quizzes } = useContext(LiveQuizContext)

    const orderedQuizzes = quizzes
    .filter(quiz => {
        const isFollowed = currentFan.followedArtists.some(
            followed => String(followed.artistId) === String(quiz.artistId)
        )

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const quizDate = new Date(quiz.playDate)
        const isToday = quizDate >= today && quizDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)

        return isFollowed && isToday
    })
    .sort((a, b) => sortQuizzes(a,b))

    const [sanremo, setSanremo] = useState(false)

    useEffect(() => {
        fetchFavourites()
    }, [artists, currentFan])

    useEffect(() => {
        const handleMouseDown = () => {
            setClickCount(prevCount => {
                const newCount = prevCount + 1
                
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }

                timeoutRef.current = setTimeout(() => {
                    setClickCount(0)
                }, 400) // Reset the count if more than 1 second passes between clicks

                if (newCount >= 6) {
                    setShowComponent(true)
                    setClickCount(0) // Reset the click count after triggering the action
                    clearTimeout(timeoutRef.current)
                }

                return newCount
            })
        }

        document.addEventListener('mousedown', handleMouseDown)

        
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const sortAllArtists = (a, b) => {
        if (b.importance !== a.importance) {
            return b.importance - a.importance
        }            
        return a.artistName.localeCompare(b.artistName)
    }

    const sortedArtists = artists.sort((a, b) => sortAllArtists(a,b))

    const chunkArray = (array, chunkSize) => {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
        }
        return chunks
    }
    
    const chunkedItems = chunkArray(sortedArtists, 6)

    useEffect(() => {
        fetchHighlightArtists()
    }, [])


    return (
        <>
            <NavbarDefault />
            <Container style={'pb-xs-appbar'} >
            
            <div
                className='position-sticky top-0 z-index-5 w-100vw ml-input-search-center bg-dark pt-xs-2 pb-xs-2'
                style={{ top: 0 }}
            >
                <Container>
                    <h2 className='fsize-xs-5 f-w-600 position-sticky'>I miei club</h2>
                </Container>
            </div>

            {currentFan.hasSpotify && currentFan.followedArtists.length > 0  ?
                <>
                {sanremo &&
                    <section className='mb-xs-8'>
                        <CardSanremo />
                    </section>
                }

                {orderedQuizzes.length > 0 &&
                    <section id='quiz' className='mt-xs-4 mb-xs-12'>
                        <h2 className='fsize-xs-5 f-w-600'>Gioca ai quiz</h2>
                        <p className='fsize-xs-2 f-w-400 grey-300'>Gioca ai quiz e ottieni punti nelle classifiche mensili.</p>
                        <Carousel>
                            {orderedQuizzes.map(quiz => {
                                const hasPlayed = quiz.responses.some(play => play.userId === currentFan.id)
                                return (
                                    <CardQuiz
                                        slug={quiz.artistSlug}
                                        artName={quiz.artistName}
                                        image={quiz.image}
                                        quizAlreadyPlayed={hasPlayed}
                                        isToday={true}
                                        key={quiz.id} 
                                        id={quiz.id}
                                    />
                                )
                            })}
                        </Carousel>
                    </section>
                }

                <section className={quizzes.length > 0 ? 'mt-xs-2' : ''}>
                    {subscribed.map(favourite =>
                        <CardFollowedArtist artist={favourite} key={favourite.id} />
                    )}
                    {/* <ButtonFollowMoreArtists /> */}
                </section>
                                

                {/* <section className='mt-xs-16 mt-lg-8 mb-xs-8'>
                    <h4 className='fsize-xs-5 mb-xs-1 letter-spacing-1 f-w-500'>Domande frequenti</h4>
                    <p className='fsize-xs-2 f-w-200 grey-200'>Vuoi sapere di più su come funziona Midly? Vai alle <a className='text-underline blue-300 f-w-400' href='/faq'>FAQ</a> e troverai tutte le risposte alle tue domande!</p>
                </section> */}
                </>
            :
                <div>
                    <section id='followe-artists-empty-state' className='mt-xs-24 w-70 mx-xs-auto'>
                        <h4 className='fsize-xs-5 mb-xs-4 letter-spacing-2 f-w-500 t-align-center'>
                            Cerca e segui i tuoi artisti preferiti
                        </h4>
                        
                    </section>
                    
                    <section id='highlight'>
                        <div className='mb-xs-8 mt-xs-24' key={''}>
                            <Carousel>
                                {highlightArtists.map(item => {
                                    const isFollowed = currentFan.followedArtists.some(
                                        (followed) => followed.artistId === item.id
                                    )
                                    return (
                                        <CardArtistHighlight 
                                            artist={item} 
                                            key={item.id} 
                                            isFollowed={isFollowed}
                                            length={highlightArtists.length}
                                        />
                                    )
                                })}
                            </Carousel>
                        </div>
                    </section>
                    <div className='container'>
                        <h2 className='fsize-xs-5 f-w-600 position-sticky'>Altri artisti in MIDLY</h2>
                    </div>
                    <section className='mt-xs-2'>
                        <div className='d-flex-column mt-xs-2 mb-xs-0'>
                        {chunkedItems.map((chunk, index) => (
                            <div className='mb-xs-8' key={index}>
                                <Carousel>
                                    {chunk.map(item => {
                                        return (
                                            <CardArtist 
                                                artist={item} 
                                                key={item.id} 
                                                isFollowed={false}
                                            />
                                        )
                                    })}
                                </Carousel>
                            </div>
                        ))}
                        </div>
                    </section>   
                </div>
            }

            </Container>

            {showComponent &&
                <FullPageCenter style='z-index-999 bg-black-transp70'>
                    <Container style={'centered-popup position-absolute bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <h4 className='fsize-xs-5 grey-200 f-w-300'>Ehi, mi hai scoperto.</h4>
                        <p className='fsize-xs-3 grey-200 f-w-300 mt-xs-4'>Vuoi visitare la demo dell'app artisti?</p>
                        <Button style='bg-blue-600 dark-900 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Vai alla demo artisti' onClick={() => navigate('/artist-app/fanclub')} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Rimani qui' onClick={() => setShowComponent(false)} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Dashboard admin' onClick={() => navigate('/flash-leaderboards-admin')} />
                    </Container>
                </FullPageCenter>
            }

            <Appbar />
        </>
    )
}

export default YourFavouritesRoute