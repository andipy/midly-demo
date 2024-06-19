import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

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

    const fetchFavourites = () => {
        const favouriteArtistIds = currentFan.leaderboardsFollowed.map(artist => artist.artistId)

        const favouriteArtists = artists.filter(artist => favouriteArtistIds.includes(artist.id))

        setFavourites(favouriteArtists)
    }

    const [quizzes, setQuizzes] = useState([
        // {
        //     artistSlug: 'arctic-monkeys',
        //     artName: 'Arctic Monkeys',
        //     image: require('../images/pictures/arcticmonkeys.jpg'),
        //     quizAlreadyPlayed: false
        // },{
        //     artistSlug: 'thasup',
        //     artName: 'thasup',
        //     image: require('../images/pictures/thasup.jpg'),
        //     quizAlreadyPlayed: false
        // }
    ])

    const [sanremo, setSanremo] = useState(false)

    useEffect(() => {
        fetchFavourites()
    }, [])


    useEffect(() => {
        const handleMouseDown = () => {
            setClickCount(prevCount => prevCount + 1);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setClickCount(0);
            }, 400); // Reset the count if more than 1 second passes between clicks

            if (clickCount + 1 >= 6) {
                setShowComponent(true);
                setClickCount(0); // Reset the click count after triggering the action
                clearTimeout(timeoutRef.current);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            clearTimeout(timeoutRef.current);
        };
    }, [clickCount]);


    return (
        <>
            <NavbarDefault />
            <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
                {sanremo &&
                    <section className='mb-xs-8'>
                        <CardSanremo />
                    </section>
                }

                {quizzes.length > 0 &&
                    <section>
                        <TextTitle title={'Live quiz'} />
                        <Carousel>
                            {quizzes.map(quiz => <CardQuiz slug={quiz.slug} artName={quiz.artName} image={quiz.image} quizAlreadyPlayed={quiz.quizAlreadyPlayed} key={quiz.artName} />)}
                        </Carousel>
                    </section>
                }

                <section className={quizzes.length > 0 ? 'mt-xs-8' : ''}>
                    <TextTitle title={'Preferiti'} />
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
                <ContainerDefault containerSpecificStyle={'bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 w-80'}>
                    <h4 className='fsize-xs-5 grey-200 f-w-300'>Ehi, mi hai scoperto.</h4>
                    <p className='fsize-xs-3 grey-200 f-w-300 mt-xs-4'>Vuoi visitare la demo dell'app artisti?</p>
                    <Button style='bg-blue-600 dark-900 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Vai alla demo artisti' onClick={() => navigate('/artist-app/flash-leaderboards')} />
                    <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Rimani qui' onClick={() => setShowComponent(false)} />
                </ContainerDefault>
            </FullPageCenter>
            }

            <Appbar />
        </>
    )
}

export default YourFavouritesRoute