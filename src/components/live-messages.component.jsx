import { useEffect, useState, useRef } from 'react'
import { mockSongs } from '../mock-data/songs'

import ContainerDefault from '../layout/container-default.layout'
import LiveMessage from './live-message.component'
import Countdown from './countdown.component'
import Textbar from './textbar.component'

const LiveMessages = () => {

    //this useRef has the only responsibility to keep track if the page has been rendered
    const pageHasRendered = useRef(false)
    
    // this useRef has the responsibility to store the information if a message was sent in the last 2.5 seconds. it's used in the useEffect to prioritize comments over songs
    const messageRecentlySent = useRef(false)

    //this 'liveMessages' state is the 5-position array, which is the MASTER array that has to contain both comments left by the users and songs, both queues coming from the two separate websockets. comments left by the users must always have highest priority to occupy the positions of the array, to the songs can have their spot in this array only if users are not sending messages for more than 5 seconds
    const [liveMessages, setLiveMessages] = useState([])
    
    // this state has the objective of containing only and only the messages sent by the ARTIST, so they don't get overwritten by the flow of songs or the messages of the fans, and they get rendered in their own html space
    const [artistMessages, setArtistMessages] = useState([])

    // this 'comments' state and the 'handleSubmitComment' function simulate the whole list of comments coming back from the websocket, so basically it stores every single comment that the user sends, without number limitation
    const [comments, setComments] = useState([])
    const handleSubmitComment = (e, currentComment) => {
        e.preventDefault()
        if ( currentComment.content.length > 0 ) {
            if ( currentComment.user_type == 'fan' ) {
                setComments(prev => [...prev, {...currentComment, timestamp: Date.now(), id: Math.floor(Math.random() * 123456789)}])
                messageRecentlySent.current = true
                setTimeout(() => {
                    messageRecentlySent.current = false
                }, 2500)
            }
            
            if ( currentComment.user_type == 'artist' ) {
                setArtistMessages(prev => [...prev, {...currentComment, timestamp: Date.now(), id: Math.floor(Math.random() * 123456789)}])
            }
        }
        setCurrentComment({
            type: 'COMMENT',
            user_type: 'artist',
            content: '',
            timestamp: undefined,
            id: undefined
        })

        // when a message is sent, the related useRef declared above turns true, and immediately after, it start a timeout that resets it to false after 2.5 seconds
    }

    // this 'currentComment' state and 'handleCurrentComment' function just handle the comment that the user is currently typing
    const [currentComment, setCurrentComment] = useState({
        type: 'COMMENT',
        user_type: 'artist',
        content: '',
        timestamp: undefined,
        id: undefined
    })
    const handleCurrentComment = (e) => {
        setCurrentComment({
            type: 'COMMENT',
            user_type: 'artist',
            content: e.target.value,
            timestamp: undefined,
            id: undefined
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
        ]), 800 * i);
        }
    }, [])

    // IMPORTANT: this useEffect should handle the MASTER state 'liveMessages', which is described above. this useEffect is finished up, but for sure it need to be redesigned according to real stream of data coming from the backend
    useEffect(() => {
        if ( pageHasRendered.current ) {

            if (comments.length > 0) {
                const lastComment = comments[comments.length - 1]
                const lastCommentExistsInLiveMessages = liveMessages.some(msg => msg.id === lastComment.id)
                if ( !lastCommentExistsInLiveMessages ) {
                    setLiveMessages(prev => [...prev, comments.slice(-1)[0]])
                    setComments(comments.filter(msg => msg.id !== lastComment.id))
                }
            }
            
            if ( !messageRecentlySent.current ) {
                setLiveMessages(prev => [...prev, songs.slice(-1)[0]])
            }
        
            if ( liveMessages.length >= 5 ) {
                setLiveMessages(prev => prev.slice(1))
            }
        
        }

        //this leverages the first useRef declared above and it is just to avoid this entire useEffect to run on first render of the page
        if ( !pageHasRendered.current ) {
            pageHasRendered.current = true
        }
        
    }, [comments, songs])

    // this useEffect has the only objective of cutting to one
    useEffect(() => {
        if ( artistMessages.length > 1 ) {
            setArtistMessages(prev => prev.slice(1))
        }
    },[artistMessages])

    return (
        <div className="position-fixed bottom-0 w-100 z-index-5">
            <div className="bg-dark-overlay-header">
                <ContainerDefault containerSpecificStyle={'position-relative h-inherit d-flex-column j-c-end'}>
                    {/* thel following div is there to contain the messages sent to by the ARTIST, so they are divided by the flow of songs and messages sent by the fans */}
                    <div className="d-flex-column grow-1 gap-0_5em mb-xs-2">
                        {artistMessages.map((message, key) => {
                            if ( message.user_type == 'artist' )
                                return <LiveMessage key={key} message={message} />
                        })}
                    </div>

                    {/* thel following div is there to contain the messages sent to by the FANS, they are merged in the flow of the songs and divided by the artist's messages */}
                    <div className="d-flex-column grow-1 gap-0_5em">
                        {liveMessages.map((message, key) => {
                            if ( message.user_type == 'fan' || message.user_type == null )
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