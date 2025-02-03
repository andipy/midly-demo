import { useContext, useState, useEffect } from "react"
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'


import ForumTopic from "../components/forum-topic.component"
import Container from "../layout/container.layout"
import IconPlus from '../images/icons/icon-plus-black.svg'
import Snackbar from "../components/snackbar.component"
import FullPageCenter from "../layout/full-page-center.layout"
import Button from "../components/button.component"

import useFanclub from '../utils/get-fanclub.hooks'
import useShare from '../utils/handle-share.hook'
import useLikeTopic from "../utils/handle-like-topic.hook"
import useSaveTopic from "../utils/handle-save-topic.hook"
const FanclubForumRoute = () => {
    const {context} = useOutletContext()
    const navigate = useNavigate()

    const fanclub = useFanclub(context?.id)

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
        console.log(context?.id)
        share(post, context?.id)
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
        <div className="w-100 d-flex-column j-c-center align-items-center h-100 mt-xs-20 mb-xs-20">
            <div className=' w-70 bg-black-transp50 pt-xs-4 pb-xs-6 pl-xs-6 pr-xs-6 border-radius-06'>
                <p className='t-align-center mb-xs-4 letter-spacing-1 grey-200 f-w-400'>Sii il primo ad aprire un topic di discussione nel fanclub di {context?.artistName}.</p>
                <Button  style={`bg-acid-lime black f-w-500 fsize-xs-3`} label='Apri un topic' onClick={() => navigate('topic/creation', { state: {artist:context} })} />
            </div>
        </div>
        :
        <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center' onClick={() => navigate('topic/creation', { state: {artist:context} })}>
            <img className='' src={IconPlus}/>
        </div> 
    }
    
    <Container style={'pb-xs-2 mt-xs-4'}>             
        {topicWithMaxWeight && (
            <ForumTopic 
                key={topicWithMaxWeight.id} 
                topic={topicWithMaxWeight} 
                artistId={context.id}
                like={() => likeTopic(context.id, topicWithMaxWeight.id)} 
                save={() => saveTopic(context.id, topicWithMaxWeight.id)} 
                share={() => handleShare(topicWithMaxWeight)} 
                popular={true}
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
                artistId={context.id}
                like={() => likeTopic(context.id, topic.id)} 
                save={() => saveTopic(context.id, topic.id)} 
                share={() => handleShare(topic)} 
                popular={false}
            />
        ))}

        {artistTopicWithMaxWeight && artistTopicWithMaxWeight.id !== topicWithMaxWeight.id && (
            <ForumTopic 
                key={artistTopicWithMaxWeight.id} 
                topic={artistTopicWithMaxWeight} 
                artistId={context.id}
                like={() => likeTopic(context.id, artistTopicWithMaxWeight.id)} 
                save={() => saveTopic(context.id, artistTopicWithMaxWeight.id)} 
                share={() => handleShare(artistTopicWithMaxWeight)} 
                popular={false}
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
                    artistId={context.id}
                    like={() => likeTopic(context.id, topic.id)} 
                    save={() => saveTopic(context.id, topic.id)} 
                    share={() => handleShare(topic)} 
                    popular={false}
                />
            ))}
    </Container>
    <Snackbar message={messageSnackbar} triggered={triggered} />

    </>
    
  )
}

export default FanclubForumRoute