import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'
import { LiveQuizContext } from '../contexts/live-quiz.context'

import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import CardFollowedArtist from '../components/card-followed-artist.component'
import NavbarDefault from '../components/navbar-default.component'
import ButtonFollowMoreArtists from '../components/button-follow-more-artists.components'
import CardQuiz from '../components/card-quiz.component'
import CardSanremo from '../components/card-sanremo.component'
import Appbar from '../components/appbar.component'
import Button from '../components/button.component'

import TextTitle from '../components/text-title.component'

const YourFavouritesRoute = () => {

    const navigate = useNavigate()

    const { artists } = useContext(ArtistsContext)
    const { currentFan } = useContext(CurrentFanContext)
    
    const [favourites, setFavourites] = useState([])
    const [showComponent, setShowComponent] = useState(false)
    const [clickCount, setClickCount] = useState(0)
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

    const fetchFavourites = () => {
        const favouriteArtistIds = currentFan.leaderboardsFollowed.map(artist => artist.artistId)
        const favouriteArtists = artists.filter(artist => favouriteArtistIds.includes(artist.id)).sort((a,b) => sortArtists(a,b))
        setFavourites(favouriteArtists)
    }

    const { quizzes } = useContext(LiveQuizContext)

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
                    setClickCount(0);
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


    return (
        <>
            <NavbarDefault />
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <TextTitle title={'I tuoi preferiti'} />
                {sanremo &&
                    <section className='mb-xs-8'>
                        <CardSanremo />
                    </section>
                }

                {quizzes.length > 0 &&
                    <section id='quiz' className='mt-xs-4 mb-xs-12'>
                        <h2 className='fsize-xs-5 f-w-600'>Gioca ai quiz</h2>
                        <p className='fsize-xs-2 f-w-200 grey-300'>Gioca ai quiz e ottieni punti nelle classifiche mensili.</p>
                        <Carousel>
                            {quizzes.filter(quiz => currentFan.leaderboardsFollowed.some(followed => String(followed.artistId) === String(quiz.artistId))).map(quiz => {
                                const hasPlayed = quiz.responses.some(play => play.userId === currentFan.id);
                                return (
                                    <CardQuiz
                                        slug={quiz.artistSlug}
                                        artName={quiz.artistName}
                                        image={quiz.image}
                                        quizAlreadyPlayed={hasPlayed}
                                        key={quiz.quizId} 
                                        id={quiz.quizId}
                                    />
                                );
                            })}
                        </Carousel>
                    </section>
                }

                <section className={quizzes.length > 0 ? 'mt-xs-8' : ''}>
                    <section>
                        {favourites.map(favourite => <CardFollowedArtist artist={favourite} key={favourite.id} />
                        )}
                    </section>
                    <ButtonFollowMoreArtists />
                </section>

                <section className='mt-xs-16 mt-lg-8 mb-xs-8'>
                    <h4 className='fsize-xs-5 mb-xs-1 letter-spacing-1 f-w-500'>Domande frequenti</h4>
                    <p className='fsize-xs-2 f-w-200 grey-200'>Vuoi sapere di più su come funziona Midly? Vai alle <a className='text-underline blue-300 f-w-400'>FAQ</a> e troverai tutte le risposte alle tue domande!</p>
                </section>
            </ContainerDefault>

            {showComponent &&
                <FullPageCenter className={'z-index-max bg-black-transp70'}>
                    <ContainerDefault containerSpecificStyle={'centered-popup position-absolute bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <h4 className='fsize-xs-5 grey-200 f-w-300'>Ehi, mi hai scoperto.</h4>
                        <p className='fsize-xs-3 grey-200 f-w-300 mt-xs-4'>Vuoi visitare la demo dell'app artisti?</p>
                        <Button style='bg-blue-600 dark-900 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Vai alla demo artisti' onClick={() => navigate('/artist-app/fanclub')} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Rimani qui' onClick={() => setShowComponent(false)} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Dashboard admin' onClick={() => navigate('/flash-leaderboards-admin')} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <Appbar />
        </>
    )
}

export default YourFavouritesRoute