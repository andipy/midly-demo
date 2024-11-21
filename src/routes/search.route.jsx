import {useState, useContext, useRef, useEffect} from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'

import { useNavigate } from 'react-router-dom'

import NavbarDefault from '../components/navbar-default.component'
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import SearchInput from '../components/search-input.component'
import Appbar from '../components/appbar.component'
import Carousel from '../layout/carousel.layout'
import CardArtist from '../components/card-search-artists.component'
import CardPreferredArtist from '../components/card-preferred-artist.component'
import CardArtistHighlight from '../components/card-search-artist-highlight.component'

const SearchRoute = () => {

    const navigate = useNavigate()

    const { currentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchBarHeight, setSearchBarHeight] = useState(0)
    const [highlightArtists, setHighlightArtists] = useState([])
    const [mostListenedArtists, setMostListenedArtists] = useState([])
    const [allOtherArtists, setAllOtherArtists] = useState([])

    const sortArtists = (a, b) => {
        if (b.importance !== a.importance) {
            return b.importance - a.importance
        }            
        return a.artistName.localeCompare(b.artistName)
    }
    const chunkArray = (array, chunkSize) => {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
        }
        return chunks
    }

    const fetchHighlightArtists = () => {
        const highlightArtists = artists
            .filter(artist => artist.highlight === true)
            .sort((a, b) => sortArtists(a, b))
        setHighlightArtists(highlightArtists)
    }
    const fetchMostListenedArtists = () => {
        const items = artists.filter(artist => 
            currentFan.mostListenedArtistsOnSpotify.some(mostListenedArtist => artist.id === mostListenedArtist.artistId))
        const sortItems = items.sort((a, b) => sortArtists(a, b))
        setMostListenedArtists(sortItems)
    }
    const fetchAllOtherArtists = () => {
        const sortItems = artists.sort((a, b) => sortArtists(a, b))

        if ( searchQuery === '' ) {
            if ( mostListenedArtists.length > 0 ) {
                const items = sortItems.filter(artist =>
                    !mostListenedArtists.some(mostListenedArtist => artist.id === mostListenedArtist.id))
                setAllOtherArtists(items)
            } else {
                setAllOtherArtists(sortItems)
            }
        } else {
            const searchedArtists = sortItems.filter(artist => artist.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
            setAllOtherArtists(searchedArtists)
        }
    }

    useEffect(() => {
        fetchHighlightArtists()
    }, [])
    useEffect(() => {
        if ( currentFan.hasSpotify ) {
            fetchMostListenedArtists()
        }
    }, [currentFan.hasSpotify])
    useEffect(() => {
        fetchAllOtherArtists()
    }, [mostListenedArtists, searchQuery])

    useEffect(() => {
        const searchBar = document.getElementById('search-bar')
        setSearchBarHeight(searchBar.offsetHeight - 1)
    }, [])

    const chunkMostListenedArtists = chunkArray(mostListenedArtists, 6)
    const chunkedItems = chunkArray(allOtherArtists, 6)

    return (
        <>
        <NavbarDefault />
        <ContainerDefault containerSpecificStyle={'pb-xs-appbar'}>
            <TextTitle title={'Artisti'} />
            <SearchInput
                value={searchQuery} 
                onChange={(e) => {
                    const newValue = e.target.value
                    setSearchQuery(newValue)  
                }}   
            />
            {!searchQuery && 
            <section id='highlight'>
            {/* <div
            className='position-sticky top-0 z-index-5 w-100vw ml-input-search-center bg-dark pt-xs-2 pb-xs-2'
            style={{ top: searchBarHeight }}
            >
                <div className='container'>
                    <h2 className='fsize-xs-5 f-w-600 position-sticky'>Artisti in evidenza</h2>
                </div>
            </div> */}
            <div className='mb-xs-8' key={''}>
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
            }
            
            {!currentFan.hasSpotify || !searchQuery && 
                <section id='preferred-artists'>
                    <div
                        className='position-sticky top-0 z-index-5 w-100vw ml-input-search-center bg-dark pt-xs-2 pb-xs-2'
                        style={{ top: searchBarHeight }}
                    >
                        <div className='container'>
                            <h2 className='fsize-xs-5 f-w-600 position-sticky'>I più ascoltati da te su Spotify</h2>
                        </div>
                    </div>
                    {chunkMostListenedArtists.length > 0 ?
                        <div className='d-flex-column mt-xs-2 mb-xs-0'>
                            {chunkMostListenedArtists.map((artists, index) => (
                                <div className='mb-xs-8' key={index}>
                                    <Carousel>
                                        {artists.map(artist => {                                            
                                            return (
                                                <CardPreferredArtist 
                                                    artist = {artist}
                                                    key = {artist.id}
                                                    onClick={() => navigate(`/artist/${artist?.slug}/leaderboard`, { state : artist })}
                                                />
                                            )
                                        })}
                                    </Carousel>
                                </div>
                            ))}
                        </div>
                    :
                        <div className='d-flex-column mt-xs-2 mb-xs-8'>
                            <h1 className='grey-400 fsize-xs-5 mt-xs-2 mt-xl-2 overflow-x'>Non hai ancora artisti tra i tuoi preferiti!</h1>
                        </div>
                    }
                </section>
            }

            

            <section id='more-artists' className='mt-xs-4'>
                {!searchQuery &&
                    <div
                        className='position-sticky top-0 z-index-5 w-100vw ml-input-search-center bg-dark pt-xs-2 pb-xs-2'
                        style={{ top: searchBarHeight }}
                    >
                        <div className='container'>
                            <h2 className='fsize-xs-5 f-w-600 position-sticky'>Altri artisti in MIDLY</h2>
                        </div>
                    </div>
                }
                {allOtherArtists.length > 0 ?
                <div className='d-flex-column mt-xs-2 mb-xs-0'>
                    {chunkedItems.map((chunk, index) => (
                        <div className='mb-xs-8' key={index}>
                            <Carousel>
                                {chunk.map(item => {
                                    const isFollowed = currentFan.followedArtists.some(
                                        (followed) => followed.artistId === item.id
                                    )
                                    return (
                                        <CardArtist 
                                            artist={item} 
                                            key={item.id} 
                                            isFollowed={isFollowed}
                                        />
                                    )
                                })}
                            </Carousel>
                        </div>
                    ))}
                    {/* <p className='fsize-xs-0 f-w-300 grey-400 mt-xs-6'> * in ordine alfabetico</p> */}
                </div>
            :
                <div className='d-flex-column mt-xs-2 mb-xs-0'>
                    <div className='d-flex-column mt-xs-2'>
                        <h1 className='grey-400 fsize-xs-5 mt-xs-2 mt-xl-2 overflow-x'>L'artista non c'è in Midly, o hai digitato male il suo nome!</h1>
                    </div>
                    <div className='d-flex-column j-c-center align-items-center gap-0_5em pt-xs-20'>
                        <img src='' alt='TELEGRAM CHANNEL' /> {/* MANCA!! */}
                        <p className='t-align-center grey-300'>Vorresti in Midly un artista che non hai trovato? Vieni nel canale Telegram e chiedicelo, accoglieremo la tua richiesta!</p>
                        <button className='fsize-xs-2 z-index-5 mb-xs-4 bg-acid-lime dark-900 f-w-600 top-navbar-more-1_5'>Vai al canale telegram</button>
                    </div>
                </div>
            } 
            </section>
        </ContainerDefault>
        <Appbar />
        </>
    )
}

export default SearchRoute