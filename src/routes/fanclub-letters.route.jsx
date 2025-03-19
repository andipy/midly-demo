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
import IconCreateContent from '../images/icons/icon-create-content.svg'


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
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                    <div className='avatr-64'>
                        <img src={IconCreateContent}/>
                    </div>
                    
                    <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                        
                        <p className='fsize-xs-2 f-w-500 letter-spacing-1 t-align-center'>Sii il primo a postare un messaggio per {artistF?.artistName} direttamente nel suo fanclub</p>
                    </div>
                    {/* <div className={`bg-acid-lime avatar-16 border-radius-100  d-flex-row j-c-center align-items-center`}
                        onClick={() => {
                            if (!hasUserSubscribed) {
                                handlePopUp('POST-LETTER')
                            } else {
                                navigate('creation', { state: {artist:artistF} })
                            }
                            }}
                    >
                        <img className='' src={IconPlus}/>
                    </div>  */}
                    <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Pubblica messaggio' onClick={() => {
                            if (!hasUserSubscribed) {
                                handlePopUp('POST-LETTER')
                            } else {
                                navigate('creation', { state: {artist:artistF} })
                            }
                            }}
                    />

                </div>
                :
                <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                    <div className='avatr-64'>
                        <img src={IconCreateContent}/>
                    </div>
                    <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                        <p className='fsize-xs-2 f-w-500 letter-spacing-1 t-align-center'>I tuoi Superfan non hanno ancora pubblicato nulla</p>
                    </div>
                </div>
            }
            
            </>
            :
            <>
            {
                !location?.pathname.includes("/artist-app") &&
                <div className={`bg-acid-lime avatar-40 border-radius-100 ${(artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING') && !location.pathname.includes('sfera-ebbasta')  ?  'bottom-12':'bottom-5'} right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center`}
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
        <Container style={`${artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING' && !location.pathname.includes('sfera-ebbasta') ? 'pb-xs-24' : 'pb-xs-4'} mt-xs-4`}>
            <div className="d-flex-row j-c-space-between align-items-start w-100 gap-0_5em">
                <div className="d-flex-column j-c-start align-items-start w-50">
                {posts?.filter((_, index) => index % 2 === 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} goFull={() => navigate(`full`, {state:{letterId: post?.id, fromPage: location.pathname, letters: posts}})}/> 
                    )
                })}
                </div>
                <div className="d-flex-column j-c-start align-items-end w-50">
                {posts?.filter((_, index) => index % 2 !== 0).map(post => {
                    const fan = fans?.find(fan => fan?.id === post?.userId)
                    return (
                        <PostFanLetter post={post} fan={fan} goFull={() => navigate(`full`, {state:{letterId: post?.id, fromPage: location.pathname, letters: posts}})}/> 
                    )
                })}
                </div>

            </div>
        
        </Container>
    </>
  )
}

export default FanclubLettersRoute