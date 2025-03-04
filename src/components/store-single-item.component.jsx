import { useLocation, useNavigate } from "react-router-dom"
import useArtist from "../utils/get-artist.hook"
const StoreSingleItem = ({item, hasUserSubscribed}) => {
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
    const navigate = useNavigate()
  return (
    <>
    <div className={` store-card-multiple-row bg-dark-gradient border-radius-06 position-relative overflow-all-hidden w-50`} 
    onClick={() => navigate('item', { state: { item: item } })}>
        <div className={`${(item?.private && !hasUserSubscribed && !pathname.includes('/artist-app/')) ? 'blur-50' : ''} store-card-multiple-row bg-dark-gradient border-radius-06 position-relative`} >
            <div className='banner-store-card  bg-dark-gradient border-radius-06 z-index-1 d-flex-column j-c-center align-items-center '>
                <h1 className="f-w-500 fsize-xs-1 white">{`
                    ${item?.collectionName}-${artist?.artistName}`.length > 16 
                    ? `${`${item?.collectionName}-${artist?.artistName}`.slice(0, 16)}...` 
                    : `${item?.collectionName}-${artist?.artistName}`}
                </h1>
                <p className="f-w-100 fsize-xs-0 white">{item?.itemType}</p>
                <h1 className={`${item?.sale > 0 ? 'grey-400 f-w-300 ' : 'white f-w-600 '} fsize-xs-1 d-flex-row j-c-center align-items-center gap-0_25em`}>
                    {item?.sale > 0 ? (
                        <del className="grey-400" style={{ textDecorationColor: '#DAEF64' }}>{item?.price}€</del>
                    ) : (
                        <span>{item?.price}€</span>
                    )}
                    <span className="lime-400 fsize-xs-0">{item?.sale > 0 ? `-${item?.sale.toString()}%` : ''}</span>
                    <span className="white f-w-600">
                        {item?.sale > 0 ? `${(parseFloat(item?.price) - (parseFloat(item?.price) * (parseFloat(item?.sale) / 100))).toFixed(2)}€` : ''}
                    </span>
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
                <div className="overlay-card-followed  bg-dark-overlay-card-strong border-radius-06 z-index-999 d-flec-row j-c-center align-items-center h-100">
                </div>
            }
            {
                item?.soldOut &&
                <div className="overlay-card-followed  bg-dark-soft-transp75 border-radius-06 z-index-999 d-flex-row j-c-center align-items-center h-100">
                    <div className='button-leave-leaderboard d-flex-row align-items-center j-c-center bg-dark-soft-2 border-radius-04 grey-300 pt-xs-2 pb-xs-2 pl-xs-2 pr-xs-2 w-auto gap-0_25em no-shrink position-absolute-x-y'>
                        <p className="fsize-xs-2 f-w-300">Esaurito</p>
                    </div>
                </div>
            }
        </div>
    </div>
    
    </>
  )
}

export default StoreSingleItem