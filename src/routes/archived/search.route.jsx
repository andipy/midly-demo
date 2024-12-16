import {useState, useContext} from 'react'

import { CurrentFanContext } from '../contexts/currentFan.context'
import { ArtistsContext } from '../contexts/artists.context'

import NavbarDefault from '../components/navbar-default.component'
import ContainerDefault from '../layout/container-default.layout'
import TextTitle from '../components/text-title.component'
import SearchInput from '../components/search-input.component'
import Appbar from '../components/appbar.component'
import Carousel from '../layout/carousel.layout'
import CardArtist from '../components/card-search-artists.component'

const SearchRoute = () => {

    const { currentFan } = useContext(CurrentFanContext)
    const { artists } = useContext(ArtistsContext)
    const [searchQuery, setSearchQuery] = useState('')

    const sortArtists = (a, b) => {
        if (b.importance !== a.importance) {
            return b.importance - a.importance
        }            
        return a.artistName.localeCompare(b.artistName)
    }

    const filteredItems = artists
        .filter(artist =>
            artist.artistName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => sortArtists(a, b))

    
    const chunkArray = (array, chunkSize) => {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize))
        }
        return chunks
    }

    const chunkedItems = chunkArray(filteredItems, 6)

    return (
        <>
        <NavbarDefault />
        <ContainerDefault style={'pb-xs-appbar'}>
            <TextTitle title={'Artisti'} />
            <SearchInput 
                value={searchQuery} 
                onChange={e => {
                    const newValue = e.target.value
                    setSearchQuery(newValue)  
                }}   
            />
            <section id='artists-list' className='mt-lg-2'>
                {filteredItems.length > 0 ?
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