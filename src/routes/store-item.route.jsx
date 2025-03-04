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
    
    const [selectedType, setSelectedType] = useState(null)

    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if (!item?.soldOut && (selectedType !== null || !item?.sizesAvaible)) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
        }
    
        
    },[selectedType])

  return (
    <>
    <NavbarPostFeed artist={artist} type={''} from={`/artist/${artist.slug}/store`}/>

    <Container style={'pb-xs-appbar pt-xs-topbar mb-xs-12'}> 
        
        <StoreImages images={item?.images}/>

        <div className="d-flex-row j-c-start align-items-center mt-xs-8 mb-xs-4 w-100 ">
            <h1 className="fsize-xs-5 f-w-600 w-100">
            {item?.collectionName}
            <span className="fsize-xs-3 f-w-300 grey-400 ml-xs-2">{item?.itemType}</span>
            </h1>
            
            
        </div>
        
        <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
            <p className="fsize-xs-3 white f-w-600">Prezzo:</p>
            <h1 className={`${item?.sale > 0 ? 'grey-400 f-w-300 ' : 'white f-w-600 '} fsize-xs-1 d-flex-row j-c-center align-items-center gap-0_25em ml-xs-2`}>
                {item?.sale > 0 ? (
                    <del className="grey-400" style={{ textDecorationColor: '#F64040' }}>{item?.price}€</del>
                ) : (
                    <span>{item?.price}€</span>
                )}
                <span className="red-400 fsize-xs-0">{item?.sale > 0 ? `-${item?.sale.toString()}%` : ''}</span>
                <span className="lime-400 f-w-600">
                    {item?.sale > 0 ? `${(parseFloat(item?.price) - (parseFloat(item?.price) * (parseFloat(item?.sale) / 100))).toFixed(2)}€` : ''}
                </span>
            </h1> 
            {
                item?.soldOut &&
                <div className="d-flex-row j-c-center align-items-center bg-red-400 pr-xs-2 pl-xs-2">
                    <p className="fsize-xs-1 f-w-600">Esaurito</p>
                </div>
            } 

        </div>
        {
            item?.colour &&
            <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
                <p className="fsize-xs-3 white f-w-600">Colore:</p>
                <h1 className={`lime-400 f-w-600 fsize-xs-1 d-flex-row j-c-center align-items-center gap-0_25em ml-xs-2`}>{item?.colour}</h1>

            </div>
        }
        {
            item?.sizesAvaible &&
            <>
                <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
                    <p className="fsize-xs-3 white f-w-600">Seleziona taglia:</p>
                </div>
                <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4 mb-xs-4 gap-0_25em">
                    {
                        item?.sizesAvaible.map((size, index) => (
                            <>
                            {
                                index === selectedType ?
                                
                                <div className="avatar-28 border-lime-1 bg-black d-flex-row j-c-center align-items-center" onClick={() => setSelectedType(index)}>
                                    <p className="fsize-xs-3 f-w-300 lime-400">{size}</p>
                                </div>
                                :
                                <div className="avatar-28 border-white-small bg-black d-flex-row j-c-center align-items-center" onClick={() => setSelectedType(index)}>
                                    <p className="fsize-xs-3 f-w-300 white">{size}</p>
                                </div>
                                
                            }
                            </>
                        ))
                    }
                </div>
            </>
            
        }
        <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
            <p className="fsize-xs-3 white f-w-600">Descrizione:</p>
        </div>
        <div className="w-100 d-flex-row j-c-center align-items-center ">
            <p className="fsize-xs-2 white f-w-300">
                {item?.description}
            </p>
        </div> 
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