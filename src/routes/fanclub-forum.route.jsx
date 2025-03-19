import { useContext, useState, useEffect } from "react"
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { CurrentArtistContext } from "../contexts/currentArtist.context"

import ForumTopic from "../components/forum-topic.component"
import Container from "../layout/container.layout"
import IconPlus from '../images/icons/icon-plus-black.svg'
import Snackbar from "../components/snackbar.component"
import FullPageCenter from "../layout/full-page-center.layout"
import Button from "../components/button.component"
import IconSave from '../images/icons/icon-save-lime.svg'


import useFanclub from '../utils/get-fanclub.hooks'
import useShare from '../utils/handle-share.hook'
import useLikeTopic from "../utils/handle-like-topic.hook"
import useSaveTopic from "../utils/handle-save-topic.hook"
import useFanclubSubscription from "../utils/get-fanclub-subscription.hook"
import useArtist from "../utils/get-artist.hook"
import IconCreateContent from '../images/icons/icon-create-content.svg'

const FanclubForumRoute = () => {
    const {artist, handlePopUp} = useOutletContext()
    const navigate = useNavigate()
    const {currentArtist} = useContext(CurrentArtistContext)
    const location = useLocation()
    let artistF = location?.pathname.includes("/artist-app") ? currentArtist : artist
    const hasUserSubscribed = useFanclubSubscription(artistF?.id)


    const fanclub = useFanclub(artistF?.id)
    const artistCurrent = useArtist(artistF?.id)

    const { share, messageSnackbar, triggered } = useShare()
    const {likeTopic} = useLikeTopic()
    const { saveTopic} = useSaveTopic()

    const [empty, setEmpty] = useState(true)
    useEffect(() => {
        if (fanclub?.forum.length > 0) {
            setEmpty(false)
        }
    }, [fanclub])

    //share
    const handleShare = (post) => {
        share(post, artistF?.id)
    }

    const topicWithMaxWeight = fanclub?.forum.reduce((max, topic) => 
        topic.weight > max.weight ? topic : max, fanclub?.forum[0]);

    const artistTopicWithMaxWeight = fanclub?.forum
        .filter(topic => topic.publisher.type === 'ARTIST')
        .sort((a, b) => b.weight - a.weight)[0];

  return (
    <>
    {
        empty ?
        <>
            {
                location?.pathname.includes("/artist-app") ?
                    <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                        <div className='avatr-64'>
                            <img src={IconCreateContent}/>
                        </div>
                        <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                            <p className='fsize-xs-2 f-w-500 letter-spacing-1 t-align-center'>Sii il primo ad aprire un topic</p>
                        </div>
                        <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Crea topic' onClick={() =>navigate('topic/creation', { state: {artist:artistF} })} />
                    </div>
                :
                    <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20 gap-0_5em">
                        <div className='avatr-64'>
                            <img src={IconCreateContent}/>
                        </div>
                        
                        <div className='d-flex-row j-c-center align-items-center gap-0_5em'>
                            
                            <p className='fsize-xs-2 f-w-500 letter-spacing-1 t-align-center'>Sii il primo ad aprire un topic di discussione nel fanclub di {artist?.artistName}</p>
                        </div>
                        {/* <div className={`bg-acid-lime avatar-16 border-radius-100  d-flex-row j-c-center align-items-center`}
                            onClick={() => {
                                if (!hasUserSubscribed) {
                                    handlePopUp('POST-TOPIC')
                                } else {
                                    navigate('topic/creation', { state: { artist: artistF } });
                                }
                                }}
                        >
                            <img className='' src={IconPlus}/>
                        </div>  */}
                        <Button  style={`bg-acid-lime black f-w-500 fsize-xs-2`} label='Crea topic' onClick={() => {
                                if (!hasUserSubscribed) {
                                    handlePopUp('POST-TOPIC')
                                } else {
                                    navigate('topic/creation', { state: { artist: artistF } });
                                }
                                }}
                        />
                    </div>
            }
        </>
        
        :
        <>
            {
                location?.pathname.includes("/artist-app") ?
                    <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center mb-xs-16' onClick={() => navigate('topic/creation', { state: {artist:artistF} })}>
                        <img className='' src={IconPlus}/>
                    </div> 
                :
                    <div className={`${(artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING')  && !location.pathname.includes('sfera-ebbasta') ?  'bottom-12':'bottom-5'} right-5 position-fixed z-index-999 d-flex-column j-c-center align-items-center gap-0_5em`}>
                        <div className='bg-dark-soft-2 avatar-40 border-radius-100  d-flex-row j-c-center align-items-center' onClick={() => navigate('saved', { state: {artist:artistF, from: location.pathname} })}>
                            <img className='' src={IconSave}/>
                        </div> 
                        <div className='bg-acid-lime avatar-40 border-radius-100  d-flex-row j-c-center align-items-center' 
                            onClick={() => {
                            if (!hasUserSubscribed) {
                                handlePopUp('POST-TOPIC')
                            } else {
                                navigate('topic/creation', { state: { artist: artistF } });
                            }
                            }}
                        >
                            <img className='' src={IconPlus}/>
                        </div>
                    </div> 
            }
        </>
    }
    
    <Container style={`${artistCurrent?.flashLeaderboard.status === 'PENDING' || artistCurrent?.flashLeaderboard.status === 'ONGOING' && !location.pathname.includes('sfera-ebbasta') ? 'pb-xs-24' : 'pb-xs-4'} mt-xs-4`}>             
        {topicWithMaxWeight && (
            <ForumTopic 
                key={topicWithMaxWeight.id} 
                topic={topicWithMaxWeight} 
                artistId={artistF.id}
                like={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('LIKE-TOPIC')
                    } else {
                        likeTopic(artistF.id, topicWithMaxWeight.id)
                    }
                    }
                } 
                save={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('SAVE-TOPIC')
                    } else {
                        saveTopic(artistF.id, topicWithMaxWeight.id)                    }
                    }
                }  
                share={() => handleShare(topicWithMaxWeight)} 
                popular={true}
                handlePopUp={handlePopUp}
            />
        )}
        {fanclub?.forum
        .filter(topic => topic.id !== topicWithMaxWeight?.id && topic.id !== artistTopicWithMaxWeight?.id)
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 4)
        .map(topic => (
            <ForumTopic 
                key={topic.id} 
                topic={topic} 
                artistId={artistF.id}
                like={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('LIKE-TOPIC')
                    } else {
                        likeTopic(artistF.id, topic.id)
                    }
                    }
                } 
                save={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('SAVE-TOPIC')
                    } else {
                        saveTopic(artistF.id, topic.id)
                    }
                    }
                }  
                share={() => handleShare(topic)} 
                popular={false}
                handlePopUp={handlePopUp}
            />
        ))}

        {artistTopicWithMaxWeight && artistTopicWithMaxWeight.id !== topicWithMaxWeight.id && (
            <ForumTopic 
                key={artistTopicWithMaxWeight.id} 
                topic={artistTopicWithMaxWeight} 
                artistId={artistF.id}
                like={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('LIKE-TOPIC')
                    } else {
                        likeTopic(artistF.id, artistTopicWithMaxWeight.id)
                    }
                    }
                } 
                save={() =>
                    { 
                    if (!hasUserSubscribed) {
                        handlePopUp('SAVE-TOPIC')
                    } else {
                        saveTopic(artistF.id, artistTopicWithMaxWeight.id)
                    }
                    }
                }  
                share={() => handleShare(artistTopicWithMaxWeight)} 
                popular={false}
                handlePopUp={handlePopUp}
            />
        )}

        {fanclub?.forum
            .filter(topic => topic.id !== topicWithMaxWeight?.id && topic.id !== artistTopicWithMaxWeight?.id)
            .sort((a, b) => b.weight - a.weight)
            .slice(5)
            .map(topic => (
                <ForumTopic 
                    key={topic.id} 
                    topic={topic} 
                    artistId={artistF.id}
                    like={() =>
                        { 
                        if (!hasUserSubscribed) {
                            handlePopUp('LIKE-TOPIC')
                        } else {
                            likeTopic(artistF.id, topic.id)
                        }
                        }
                    }
                    save={() =>
                        { 
                        if (!hasUserSubscribed) {
                            handlePopUp('SAVE-TOPIC')
                        } else {
                            saveTopic(artistF.id, topic.id)
                        }
                        }
                    }  
                    share={() => handleShare(topic)} 
                    popular={false}
                    handlePopUp={handlePopUp}
                />
            ))}
    </Container>
    <Snackbar message={messageSnackbar} triggered={triggered} />

    </>
    
  )
}

export default FanclubForumRoute