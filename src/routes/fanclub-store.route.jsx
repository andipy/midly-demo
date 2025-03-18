import { useContext, useState, useEffect } from "react"
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { CurrentArtistContext } from "../contexts/currentArtist.context"

import useFanclub from '../utils/get-fanclub.hooks'
import useFanclubSubscription from "../utils/get-fanclub-subscription.hook"
import useArtist from "../utils/get-artist.hook"
import Container from "../layout/container.layout"
import StoreSingleItem from "../components/store-single-item.component"
import Carousel from "../layout/carousel.layout"
import StoreCollection from "../components/store-collection.component"
import IconCreateContent from '../images/icons/icon-create-content.svg'

const FanclubStoreRoute = () => {
        const {artist, handlePopUp} = useOutletContext()
        const navigate = useNavigate()
        const {currentArtist} = useContext(CurrentArtistContext)
        const location = useLocation()
        let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
        const hasUserSubscribed = useFanclubSubscription(artistF?.id)
        const fanclub = useFanclub(artistF?.id)
        const artistCurrent = useArtist(artistF?.id)

        const [singleItems, setSingleItems] = useState()
        const [collection, setCollection] = useState()
        useEffect(() => {
            if (fanclub && fanclub?.storeItems) {
                setSingleItems(fanclub.storeItems
                    .filter(item => item.collection === false)
                    .sort((a, b) => {
                        if (a.soldOut !== b.soldOut) return a.soldOut ? 1 : -1;
                        return b.newItem - a.newItem;
                    })
                )
                /* setCollection(fanclub.storeItems
                    .filter(item => item.collection === true)
                    .sort((a, b) => b.newItem - a.newItem)
                ) */
            }
        }, [fanclub])

        const chunkArray = (array, chunkSize) => {
            const chunks = []
            for (let i = 0; i < array?.length; i += chunkSize) {
                chunks.push(array?.slice(i, i + chunkSize))
            }
            return chunks
        }
        
        const chunkedSingleItems = chunkArray(singleItems, 2)
  return (
    <>
        {
            fanclub?.storeItems?.length > 0 ?
            <Container style={`${artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING' && !location.pathname.includes('sfera-ebbasta') ? 'pb-xs-24' : 'pb-xs-4'} mt-xs-4 d-flex-column j-c-center align-items-center w-100`}>
                {/* {collection?.map((item, index) => (
                    <div className='w-100 mb-xs-2' key={index}>
                        <StoreCollection item={item} hasUserSubscribed={hasUserSubscribed}/>
                    </div>
                ))} */}
                {chunkedSingleItems?.map((chunk, chunkIndex) => (
                    <div className={` w-100 d-flex-row j-c-start align-items-center gap-0_5em mb-xs-2`} key={chunkIndex}>
                            {chunk.map((item, index) => (
                                <StoreSingleItem item={item} hasUserSubscribed={hasUserSubscribed}/>
                            ))}
                    </div>
                ))}
                
            </Container>
            :
            !location.pathname.includes('/artist-app') ?
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                    <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Non ci sono nuove item nel merch di {artistF?.artistName}.</p>
                </div>
            </div>
            :
            <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                <div className='avatr-64'>
                    <img src={IconCreateContent}/>
                </div>
                <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                    <p className='fsize-xs-2 f-w-500 letter-spacing-1'>Non ci sono nuove items nel tuo merch</p>
                </div>
            </div>
        }
    </>
  )
}

export default FanclubStoreRoute