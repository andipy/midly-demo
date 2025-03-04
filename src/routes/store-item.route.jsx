import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import useArtist from "../utils/get-artist.hook"
import NavbarPostFeed from "../components/navbar-post-feed.component"
import Container from "../layout/container.layout"
import SwipeCarousel from "../layout/swipe-carousel.layout"
import StoreImages from "../layout/store-images.layout"
import Button from "../components/button.component"
const StoreItemRoute = () => {
    const location = useLocation()
    const {item} = location.state || null
    const artist = useArtist(item?.artistId)
    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        setFilledMandatory(true)
    },[item])

  return (
    <>
    <NavbarPostFeed artist={artist} type={'STORE_ITEM'} from={`/artist/${artist.slug}/store`}/>
    <Container style={'pb-xs-appbar pt-xs-topbar mb-xs-12'}> 
        <div className="d-flex-column j-c-center align-items-center mt-xs-4 mb-xs-4">
            <h1 className="fsize-xs-5 f-w-600  position-sticky">{item?.collectionName} - {artist?.artistName}</h1>
            <p className="grey-400 fsize-xs-3 f-w-300">{item?.itemType}</p>
            <div className="border-lime-1 border-radius-08 d-flex-row align-items-center pl-xs-2 pr-xs-2" style={{ display: 'inline-block' }}>
                <p className="fsize-xs-1 lime-400 f-w-300">Disponibile</p>  
            </div>
        </div>
        <StoreImages images={item?.images}/> 
    </Container>
    <div className='position-fixed bottom-0 w-100 pt-xs-4 pb-xs-4 bg-dark z-index-999'>
        <Container>
            <Button
                disabled={filledMandatory ? false : true}
                style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                onClick={''} 
                label='Acquista ora'
            >
            </Button>
        </Container>
    </div> 
    </>
    
  )
}

export default StoreItemRoute