import { useLocation } from "react-router-dom"
import useArtist from "../utils/get-artist.hook"
const StoreCollection = ({item, hasUserSubscribed}) => {
    /* id: 1,
    artistId: 'artist13',
    image: require('../images/pictures/sfera-cd-1.webp'),
    collectionName: 'X2VR', //nome album
    itemType: 'CD', //CD, VINILE, BUNDLE, T-SHIRT...
    price: '24.99',
    newItem: true,
    limitedItem: false,
    collection: false,
    singleItems: [],
    private: true */
    const location = useLocation()
    const pathname = location.pathname || null
    const artist = useArtist(item?.artistId)
  return (
    <>
    <div className={`store-card-collection-multiple bg-dark-gradient border-radius-06 position-relative overflow-all-hidden`} >
        <div className={`${(item?.private && !hasUserSubscribed && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} store-card-collection-multiple bg-dark-gradient border-radius-06 position-relative`} >
            <div className='banner-store-card  bg-acid-lime border-radius-06 z-index-1 d-flex-column j-c-center align-items-center '>
                <h1 className="f-w-500 fsize-xs-1 black">{`
                    ${item?.collectionName}-${artist?.artistName}`.length > 35 
                    ? `${`${item?.collectionName}-${artist?.artistName}`.slice(0, 35)}` 
                    : `${item?.collectionName}-${artist?.artistName}`}
                </h1>
            </div>
            <img className='w-100 object-fit-cover border-radius-06 h-80' src={item.images[0].url} alt='' />
            <div className=" d-flex-row j-c-start align-items-center position-absolute-x left-2 top-2 w-100 ml-xs-2 gap-0_25em">
                {
                    item?.sale > 0 &&
                    <div className="bg-red-400 pr-xs-4 pl-xs-4 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-0 f-w-300">%</p>
                    </div>

                }
                {
                    item?.collection > 0 &&
                    <div className="bg-acid-lime pr-xs-4 pl-xs-4 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-0 f-w-300 black">Capsule collection</p>
                    </div>

                }
                {
                    item?.newItem &&
                    <div className="bg-blue-600 pr-xs-4 pl-xs-4 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-0 f-w-300">New</p>
                    </div>

                }
                {
                    item?.limitedItem &&
                    <div className="bg-red-400 pr-xs-4 pl-xs-4 border-radius-100 d-flex-row j-c-center align-items-center"> 
                        <p className="fsize-xs-0 f-w-300">Limited</p>
                    </div>

                }
            </div>
            {
                !hasUserSubscribed && item?.private &&
                <div className="store-card-collection-multiple  bg-dark-overlay-card-strong border-radius-06 z-index-999 d-flec-row j-c-center align-items-center h-100">
                </div>
            }
        </div>
    </div>
    
    </>
  )
}

export default StoreCollection