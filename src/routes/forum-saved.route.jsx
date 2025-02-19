import { useContext, useState, useEffect } from "react"
import {useNavigate, useLocation } from 'react-router-dom'
import { CurrentFanContext } from "../contexts/currentFan.context"
import ForumTopic from "../components/forum-topic.component"
import Container from "../layout/container.layout"
import FullPageCenter from "../layout/full-page-center.layout"

import useFanclub from '../utils/get-fanclub.hooks'
import useShare from '../utils/handle-share.hook'
import useLikeTopic from "../utils/handle-like-topic.hook"
import useSaveTopic from "../utils/handle-save-topic.hook"
import useFanclubSubscription from "../utils/get-fanclub-subscription.hook"
import NavbarPostFeed from "../components/navbar-post-feed.component"
const ForumSavedRoute = () => {
    const location = useLocation()
    const { state } = location
    const { artist, from } = state || {}
    const hasUserSubscribed = useFanclubSubscription(artist?.id)
    const fanclub = useFanclub(artist?.id)
    const {currentFan} = useContext(CurrentFanContext)

    const { share, messageSnackbar, triggered } = useShare()
    const {likeTopic} = useLikeTopic()
    const { saveTopic} = useSaveTopic()
    const handleShare = (post) => {
        share(post, artist?.id)
    }
  return (
    <>
    <NavbarPostFeed artist={artist} type={'FORUM'} from={`/artist/${artist.slug}/forum`}/>
    <Container style={'pb-xs-2 pt-xs-topbar'}>             
        {fanclub?.forum
            .filter(topic => topic.saved?.some(save => save.userId === currentFan?.id))
            .sort((a, b) => b.weight - a.weight)
            .map(topic => (
                <ForumTopic 
                    key={topic.id} 
                    topic={topic} 
                    artistId={artist?.id}
                    like={() =>
                        { 
                        if (!hasUserSubscribed) {
                            /* handlePopUp('LIKE-TOPIC') */
                        } else {
                            likeTopic(artist?.id, topic.id)
                        }
                        }
                    }
                    save={() =>
                        { 
                        if (!hasUserSubscribed) {
                            /* handlePopUp('SAVE-TOPIC') */
                        } else {
                            saveTopic(artist?.id, topic.id)
                        }
                        }
                    }  
                    share={() => handleShare(topic)} 
                    popular={false}
                    /* handlePopUp={handlePopUp} */
                />
            ))}
    </Container>
    {
        fanclub?.forum
        .filter(topic => topic.saved?.some(save => save.userId === currentFan?.id)).length <= 0 &&
        <FullPageCenter>
            <h3 className='t-align-center grey-200 fsize-xs-6 f-w-400 w-80 line-height-140'>
                Salva il tuo primo topic!
            </h3>
        </FullPageCenter>
    }
    </>
    
  )
}

export default ForumSavedRoute