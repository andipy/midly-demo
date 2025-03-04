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
    
    const [selectedType, setSelectedType] = useState("")
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
    }

    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if (selectedType == '') {
            setFilledMandatory(false)
        } else {
            setFilledMandatory(true)
        }
    
        
    },[selectedType])
    useEffect(() => {
        if (item?.itemType) {
            setSelectedType(item?.itemType)
        }
    }, [item])

  return (
    <>
    <NavbarPostFeed artist={artist} type={'STORE_ITEM'} from={`/artist/${artist.slug}/store`}/>
    <div className="d-flex-column j-c-center align-items-center mt-xs-4 mb-xs-4 position-relative bg-dark pb-xs-2 position-sticky top-navbar z-index-999">
        <h1 className="fsize-xs-5 f-w-600 ">{item?.collectionName} - {artist?.artistName}</h1>
    </div>
    <Container style={'pb-xs-appbar pt-xs-8 mb-xs-12'}> 
        <div className="d-flex-column j-c-center align-items-center mb-xs-4">
            <p className="grey-400 fsize-xs-3 f-w-300">{item?.itemType}</p>
            <div className="d-flex-row j-c-center align-items-center gap-0_5em"> 
                <div className="border-lime-1 border-radius-08 d-flex-row align-items-center pl-xs-8 pr-xs-8" style={{ display: 'inline-block' }}>
                    <p className="fsize-xs-1 lime-400 f-w-300">Disponibile</p>  
                </div>
                {
                    item?.sale > 0 &&
                    <div className="bg-black border-red-1 pr-xs-8 pl-xs-8 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-1 red-400 f-w-300">%</p>
                    </div>

                }
                {
                    item?.newItem &&
                    <div className="bg-black border-blue-1 pr-xs-8 pl-xs-8 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-1 blue-400 f-w-300">New</p>
                    </div>

                }
                {
                    item?.limitedItem &&
                    <div className="bg-black border-red-1 pr-xs-8 pl-xs-8 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-1 red-400 f-w-300">Limited</p>
                    </div>

                }
            </div>
        </div>
        <StoreImages images={item?.images}/>
        <div className="w-100 d-flex-row j-c-center align-items-center mt-xs-4 mb-xs-4">
            <select
                className="fsize-xs-3 lime-400 border-lime-1 border-radius-08 p-xs-2 bg-black"
                value={selectedType} 
                onChange={handleTypeChange}
                style={{ width: '200px' }}
            >
                <option value="">Seleziona il tipo</option>
                {item?.itemType && (
                    <option value={item?.itemType}>{item?.itemType}</option>
                )}
            </select>
        </div>
        <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
            <p className="fsize-xs-3 grey-400 f-w-600">Prezzo:</p>
            <h1 className={`${item?.sale > 0 ? 'grey-400 f-w-300 ':'lime-400 f-w-600 '} fsize-xs-1 d-flex-row j-c-center align-items-center gap-0_25em ml-xs-2`}>{item?.price}€ <span className="red-400 fsize-xs-0">{item?.sale > 0 ? `-${item?.sale.toString()}%`:''}</span><span className="lime-400 f-w-600">{item?.sale > 0 ? `${parseFloat(item?.price) - (parseFloat(item?.price) * (parseFloat(item?.sale) / 100)).toFixed(2)}€`:''}</span></h1>

        </div>
        <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
            <p className="fsize-xs-3 grey-400 f-w-600">Colore:</p>
            <h1 className={`lime-400 f-w-600 fsize-xs-1 d-flex-row j-c-center align-items-center gap-0_25em ml-xs-2`}>Viola</h1>

        </div>
        <div className="w-100 d-flex-row j-c-start align-items-center mt-xs-4">
            <p className="fsize-xs-3 grey-400 f-w-600">Descrizione:</p>
        </div>
        <div className="w-100 d-flex-row j-c-center align-items-center ">
            <p className="fsize-xs-2 grey-400 f-w-300">
            Con X2VR Sfera Ebbasta torna alle origini proponendo il secondo attesissimo capitolo dell’album che lo ha reso celebre nel 2015, XDVR, un disco che ha lasciato un segno indelebile nella storia della trap e tra i suoi milioni di fan.
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