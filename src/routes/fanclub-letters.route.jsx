import { useEffect, useState, useContext } from "react"
import { useOutletContext, useNavigate, useLocation } from "react-router-dom"
import { FansContext } from "../contexts/fans.context"
import { CurrentArtistContext } from "../contexts/currentArtist.context"
import useFanclub from "../utils/get-fanclub.hooks"
import Container from "../layout/container.layout"
import PostFanLetter from "../components/post-fan-letter.component"
import Button from "../components/button.component"
import IconPlus from '../images/icons/icon-plus-black.svg'
import useFanclubSubscription from "../utils/get-fanclub-subscription.hook"
import useArtist from "../utils/get-artist.hook"

const FanclubLettersRoute = () => {
    const {artist, handlePopUp} = useOutletContext()
    const {currentArtist} = useContext(CurrentArtistContext)
    const location = useLocation()
    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
    const navigate = useNavigate()
    const hasUserSubscribed = useFanclubSubscription(artistF?.id)

    const fanclub = useFanclub(artistF?.id)
    const artistCurrent = useArtist(artistF?.id)
    const {fans} = useContext(FansContext)
    

    const [posts, setPosts] = useState()
    useEffect(() => {
        if (fanclub) {
            setPosts(fanclub.fanLetters)
        }
    }, [fanclub])

    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.fanLetters.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])
  return (
    <>
        {
            empty ?
            <>
            {
                !location?.pathname.includes("/artist-app") ?
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                    <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>Sii il primo a postare un messaggio per {artistF?.artistName} direttamente nel suo fanclub.</p>
                        <Button  style={`bg-acid-lime black f-w-500 fsize-xs-3`} label='Posta un messaggio' 
                        onClick={() => {
                            if (!hasUserSubscribed) {
                                handlePopUp('POST-LETTER')
                            } else {
                                navigate('creation', { state: {artist:artistF} })
                            }
                            }}
                        />
                    </div>
                </div>
                :
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
                    <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                        <p className='t-align-center mb-xs-4 letter-spacing-1 grey-400 f-w-600'>I tuoi Superfan non hanno ancora pubblicato nulla.</p>
                    </div>
                </div>
            }
            
            </>
            :
            <>
            {
                !location?.pathname.includes("/artist-app") &&
                <div className={`bg-acid-lime avatar-40 border-radius-100 ${(artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING')  ?  'bottom-12':'bottom-5'} right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center`}
                    onClick={() => {
                    if (!hasUserSubscribed) {
                        handlePopUp('POST-LETTER')
                    } else {
                        navigate('creation', { state: {artist:artistF} })
                    }
                    }}
                >
                    <img className='' src={IconPlus}/>
                </div> 
            }
            </>
        }
        <Container style={`${artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING' ? 'pb-xs-24' : 'pb-xs-4'} mt-xs-4`}>
            <div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
                <div className="d-flex-column j-c-start align-items-start w-50">
                {posts?.filter((_, index) => index % 2 === 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} /> 
                    )
                })}
                </div>
                <div className="d-flex-column j-c-start align-items-end w-50">
                {posts?.filter((_, index) => index % 2 !== 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} /> 
                    )
                })}
                </div>

            </div>
        
        </Container>
    </>
  )
}

export default FanclubLettersRoute