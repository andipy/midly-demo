import { useEffect, useState, useRef } from 'react'
import { mockSongs } from '../mock-data/songs'

import ContainerDefault from '../layout/container-default.layout'
import LiveMessage from './live-message.component'
import Countdown from './countdown.component'
import Textbar from './textbar.component'

const LiveMessages = () => {

    //this useRef has the only responsibility to keep track if the page has been rendered
    const pageHasRendered = useRef(false)
    const messageRecentlySent = useRef(false)

    //this 'liveMessages' state is the 5-position array, which is the MASTER array that has to contain both comments left by the users and songs, both queues coming from the two separate websockets. comments left by the users must always have highest priority to occupy the positions of the array, to the songs can have their spot in this array only if users are not sending messages for more than 5 seconds
    const [liveMessages, setLiveMessages] = useState([])

    // this 'comments' state and the 'handleSubmitComment' function simulate the whole list of comments coming back from the websocket, so basically it stores every single comment that the user sends, without number limitation
    const [comments, setComments] = useState([])
    const handleSubmitComment = (e, currentComment) => {
        e.preventDefault()
        if ( currentComment.content.length > 0 ) {
            setComments(prev => [...prev, {...currentComment, timestamp: Date.now(), id: Math.floor(Math.random() * 123456789)}])
        }
        setCurrentComment({
            type: 'COMMENT',
            content: '',
            id: ''
        })
        messageRecentlySent.current = true
        setTimeout(() => {
            messageRecentlySent.current = false
        }, 5000)
    }

    // this 'currentComment' state and 'handleCurrentComment' function just handle the comment that the user is currently typing
    const [currentComment, setCurrentComment] = useState({
        type: 'COMMENT',
        content: '',
        id: ''
    })
    const handleCurrentComment = (e) => {
        setCurrentComment({
            type: 'COMMENT',
            content: e.target.value,
            id: ''
        })
    }

    // this 'songs' and useEffect simulate the whole list of songs coming back from the websocket, so basically it stores every single song that the backend returns throught the websocket, without number limitation
    const [songs, setSongs] = useState([])
    
    useEffect(() => {
        for (let i = 1; i <= 100000; i++) {
          setTimeout(() => setSongs(prev => [...prev, 
            {
                type: 'SONG',
                content: mockSongs[Math.floor(Math.random() * mockSongs.length)].content,
                timestamp: Date.now(),
                id: Math.floor(Math.random() * 123456789)
            }
        ]), 1500 * i);
        }
    }, [])

    // IMPORTANT: this useEffect should handle the MASTER state 'liveMessages', which is described above. all this useEffect is a WORK IN PROGRESS
    useEffect(() => {
        if ( pageHasRendered.current ) {

            if (comments.length > 0) {
                const lastComment = comments[comments.length - 1]
                const existsInLiveMessages = liveMessages.some(msg => msg.id === lastComment.id)
                if ( !existsInLiveMessages ) {
                    setLiveMessages(prev => [...prev, comments.slice(-1)[0]])
                }
            }
            
            if ( !messageRecentlySent.current ) {
                setLiveMessages(prev => [...prev, songs.slice(-1)[0]])
            }
        
            if ( liveMessages.length >= 5 ) {
                setLiveMessages(prev => prev.slice(1))
            }
        
        }

        //this is just to avoid this entire useEffect to run on first render of the page
        if ( !pageHasRendered.current ) {
            pageHasRendered.current = true
        }

        //console.log('messaggio inviato di recente?',messageRecentlySent.current)
        
    }, [comments, songs])

    

    return (
        <div className="position-fixed bottom-0 w-100 z-index-5">
            <div className="bg-dark-overlay-header">
                <ContainerDefault containerSpecificStyle={'position-relative h-inherit d-flex-column j-c-end'}>
                    <div className="d-flex-column grow-1 gap-0_5em">
                        {liveMessages.map((message, key) => {
                            return <LiveMessage key={key} message={message} />
                        })}
                    </div>
                    <Countdown />
                </ContainerDefault>
            </div>
            <Textbar currentComment={currentComment} handleCurrentComment={handleCurrentComment} handleSubmitComment={handleSubmitComment} />
        </div>
    )
}

export default LiveMessages;