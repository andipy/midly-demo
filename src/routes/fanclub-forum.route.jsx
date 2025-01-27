import { useContext, useState, useEffect } from "react"
import { useOutletContext, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { FanclubsContext } from "../contexts/fanclubs.context"
import { CurrentFanContext } from '../contexts/currentFan.context'

import ForumTopic from "../components/forum-topic.component"
import Container from "../layout/container.layout"
import IconPlus from '../images/icons/icon-plus-black.svg'

const FanclubForumRoute = () => {
    const {context} = useOutletContext()
    const { currentFan, setCurrentFan } = useContext(CurrentFanContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const navigate = useNavigate()
    const [fanclub, setFanclub] = useState()
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === context?.id)
        setFanclub(thisFanclub)
    }


    useEffect(() => {
            if ( context ) {
                fetchThisFanclub()
            }
        }, [context, fanclubs, currentFan])

    const [triggered, setTriggered] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const triggerSnackbar = (message) => {
		setMessageSnackbar(message)
		setTriggered(true)
		setTimeout(() => {
			setTriggered(false)
		}, 2000)
	}

    //FORUM
    const likeTopic = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(topic => {
                            if (topic.id === id) {
                                const liked = topic.likes.some(p => p.userId === currentFan.id)
                                return {
                                    ...topic,
                                    likes: liked
                                        ? topic.likes.filter(c => c.userId !== currentFan.id) // Rimuove il like
                                        : [...topic.likes, { userId: currentFan.id }] // Aggiunge il like
                                }
                            }
                            return topic
                        })
                    }
                }
                return fanclub
            })
        )
    }

    const saveTopic = (id) => {
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === context.id) {
                    return {
                        ...fanclub,
                        forum: fanclub.forum.map(topic => {
                            if (topic.id === id) {
                                const saved = topic.saved.some(p => p.userId === currentFan.id)
                                return {
                                    ...topic,
                                    saved: saved
                                        ? topic.saved.filter(c => c.userId !== currentFan.id) // Rimuove il save
                                        : [...topic.saved, { userId: currentFan.id }] // Aggiunge il save
                                }
                            }
                            return topic
                        })
                    }
                }
                return fanclub
            })
        )
    }

    const shareTopic = () => {
    /*         triggerSnackbar('Link al post copiato negli appunti')
    */   
    console.log('share') 
    }

    const topicWithMaxWeight = fanclub?.forum.reduce((max, topic) => 
        topic.weight > max.weight ? topic : max, fanclub?.forum[0]);

    const artistTopicWithMaxWeight = fanclub?.forum
        .filter(topic => topic.publisher.type === 'ARTIST')
        .sort((a, b) => b.weight - a.weight)[0];

  return (
    <>
    <div className='bg-acid-lime avatar-40 border-radius-100 bottom-5 right-5 position-fixed z-index-999 d-flex-row j-c-center align-items-center' onClick={() => navigate('topic/creation', { state: {artist:context} })}>
        <img className='' src={IconPlus}/>
    </div> 
    <Container style={'pb-xs-2'}>             
        {topicWithMaxWeight && (
            <ForumTopic 
                key={topicWithMaxWeight.id} 
                topic={topicWithMaxWeight} 
                artistId={context.id}
                like={likeTopic} 
                save={saveTopic} 
                share={() => shareTopic()} 
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
                like={likeTopic} 
                save={saveTopic} 
                share={() => shareTopic()} 
                popular={false}
            />
        ))}

        {artistTopicWithMaxWeight && artistTopicWithMaxWeight.id !== topicWithMaxWeight.id && (
            <ForumTopic 
                key={artistTopicWithMaxWeight.id} 
                topic={artistTopicWithMaxWeight} 
                artistId={context.id}
                like={likeTopic} 
                save={saveTopic} 
                share={() => shareTopic()} 
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
                like={likeTopic} 
                save={saveTopic} 
                share={() => shareTopic()} 
                popular={false}
            />
        ))}
    </Container>
    </>
    
  )
}

export default FanclubForumRoute