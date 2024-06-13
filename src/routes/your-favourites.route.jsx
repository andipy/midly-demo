import { useState, useContext, useEffect } from 'react';

import { ArtistsContext } from '../contexts/artists.context'
import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import Carousel from '../layout/carousel.layout'

import CardFollowedArtist from '../components/card-followed-artist.component'
import NavbarDefault from '../components/navbar-default.component'
import ButtonFollowMoreArtists from '../components/button-follow-more-artists.components'
import CardQuiz from '../components/card-quiz.component'
import CardSanremo from '../components/card-sanremo.component'
import Appbar from '../components/appbar.component'

import TextTitle from '../components/text-title.component'

const YourFavouritesRoute = () => {

    const { artists } = useContext(ArtistsContext)
    const { currentFan } = useContext(CurrentFanContext)
    
    const [favourites, setFavourites] = useState([])
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

            <Appbar />
        </>
    )
}

export default YourFavouritesRoute;