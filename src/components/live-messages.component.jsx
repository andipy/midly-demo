import { useEffect, useState, useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom'
// import { mockSongsThasup, mockSongsArtie5ive } from '../mock-data/songs'

import { CurrentFanContext } from '../contexts/currentFan.context'

import ContainerDefault from '../layout/container-default.layout'
import LiveMessage from './live-message.component'
import Countdown from './countdown.component'
import Textbar from './textbar.component'
import NavbarCommentsModal from './navbar-comments-modal.component'
import CountdownFlashLeaderboards from './countdown-flash-leaderboards.component'

const LiveMessages = ({leaderboard}) => {

    const { currentFan, setCurrentFan} = useContext(CurrentFanContext)

    const { pathname } = useLocation()

    const colors = [
        { id: 1, text: 'color-01', icon: 'color-fill-01' },
        { id: 2, text: 'color-02', icon: 'color-fill-02' },
        { id: 3, text: 'color-03', icon: 'color-fill-03' },
        { id: 4, text: 'color-04', icon: 'color-fill-04' },
        { id: 5, text: 'color-05', icon: 'color-fill-05' },
    ]

    const [color, setColor] = useState({})

    // let mockSongs
    // const mockSongsDefiner = () => {
    //     if ( pathname.includes('thasup') || pathname.includes('/artist-app/') ) {
    //         mockSongs = mockSongsThasup
    //     }
    //     if ( pathname.includes('artie-5ive') ) {
    //         mockSongs = mockSongsArtie5ive
    //     }
    // }
    // useEffect(() => {
    //     mockSongsDefiner()
    // }, [])

    // const wordsToCensor = ['negro', 'negra', 'negr', 'fuck', 'coglione', 'cogliona', 'coglion', 'cazzo', 'cazz', 'caz', 'idiota', 'idioto', 'idiot', 'scemo', 'scema', 'scem', 'bastardo', 'bastarda', 'bastard', 'stronza', 'stronzo', 'stronz', 'puttana', 'puttano', 'puttan', 'putta', 'putt', 'troia', 'troi', 'bagascia', 'bagascio', 'bagasc', 'baldracca', 'baldracc', 'baldrac', 'nigga', 'bitch', 'bitc', 'muori', 'devi morire', 'devi morir', 'devi mori', 'devi mor', 'devi mo', 'testa di cazzo', 'testa di cazz', 'testa di caz', 'testa di ca', 'merda', 'merdo', 'merd', 'schifo', 'schifa', 'schif', 'cagare', 'cagara', 'cagaro', 'cagar', 'caga'];
    // const censorString = (input, wordsToCensor) => {
    //     let originalMessage = input
    //     let toCheckString = input.toLowerCase()
        
    //     wordsToCensor.forEach(word => {
    //         if ( toCheckString.includes(word) ) {
    //             const censor = '*'.repeat(word.length)
    //             toCheckString = toCheckString.split(word).join('*')
    //         } else {
    //             return originalMessage
    //         }
    //     })

    //     return toCheckString
    // }

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

            // const censoredContent = censorString(currentComment.content, wordsToCensor);
            // const censoredComment = { ...currentComment, content: censoredContent };

            if ( currentComment.user_type == 'fan' ) {
                setComments(prev => 
                    [...prev, {
                        ...currentComment,
                        timestamp: Date.now(),
                        id: Math.floor(Math.random() * 123456789)
                    }]
                )
                
                // messageRecentlySent.current = true
                // setTimeout(() => {
                //     messageRecentlySent.current = false
                // }, 2500)
            }
            
            if ( currentComment.user_type == 'artist' ) {
                setArtistMessages(prev =>
                    [...prev, {
                        ...currentComment,
                        timestamp: Date.now(),
                        id: Math.floor(Math.random() * 123456789)
                    }]
                )
            }
        }
        setCurrentComment({
            type: 'COMMENT',
            user_type: 'fan',
            username: currentFan.username,
            content: '',
            timestamp: undefined,
            id: undefined
        })

        // when a message is sent, the related useRef declared above turns true, and immediately after, it start a timeout that resets it to false after 2.5 seconds
    }

    // this 'currentComment' state and 'handleCurrentComment' function just handle the comment that the user is currently typing
    const [currentComment, setCurrentComment] = useState({
        type: 'COMMENT',
        user_type: undefined,
        username: '',
        content: '',
        timestamp: undefined,
        id: undefined
    })
    const handleCurrentComment = (e) => {
        setCurrentComment(prev => ({
            type: 'COMMENT',
            user_type: prev.user_type,
            username: currentFan.username,
            content: e.target.value,
            timestamp: undefined,
            id: undefined
        }))
    }

    // this 'songs' and useEffect simulate the whole list of songs coming back from the websocket, so basically it stores every single song that the backend returns throught the websocket, without number limitation
    // const [songs, setSongs] = useState([])
    // useEffect(() => {
    //     for (let i = 1; i <= 100000; i++) {
    //       setTimeout(() => setSongs(prev => [...prev, 
    //         {
    //             type: 'SONG',
    //             content: mockSongs[Math.floor(Math.random() * mockSongs.length)].content,
    //             timestamp: Date.now(),
    //             id: Math.floor(Math.random() * 123456789)
    //         }
    //     ]), 800 * i);
    //     }
    // }, [])

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
            
            // if ( !messageRecentlySent.current ) {
            //     setLiveMessages(prev => [...prev, songs.slice(-1)[0]])
            // }
        
            if ( liveMessages.length > 20 ) {
                setLiveMessages(prev => prev.slice(1))
            }
        }

        //this leverages the first useRef declared above and it is just to avoid this entire useEffect to run on first render of the page
        if ( !pageHasRendered.current ) {
            let i = Math.floor(Math.random() * colors.length)
            setColor(colors[i])
            pageHasRendered.current = true
        }
        
    }, [comments])

    // this useEffect has the only objective of cutting to one
    useEffect(() => {
        if ( artistMessages.length > 1 ) {
            setArtistMessages(prev => prev.slice(1))
        }
    },[artistMessages])

    useEffect(() => {
        pathname.includes('/artist-app') ?
            setCurrentComment(prev => ({
                ...prev,
                user_type: 'artist'
            }))
        : setCurrentComment(prev => ({
            ...prev,
            user_type: 'fan'
        }))

    }, [])

    const [chatOpen, setChatOpen] = useState(true)
    const closeModal = () => {
        setChatOpen(false)
    }

    return (
        <div className={`position-fixed bg-dark-soft bottom-0 w-100 z-index-5 border-radius-top-08 shadow-dark-750`}>
            <div className={`${chatOpen ? 'd-xs-block' : 'd-none'}`}>
                <NavbarCommentsModal closeModal={closeModal} title='Chat' />

                {artistMessages.length >= 1 &&
                    <ContainerDefault style={`${chatOpen ? 'd-flex-column j-c-end pt-xs-2 pb-xs-2' : 'd-none'}`}>
                        {/* thel following div is there to contain the messages sent to by the ARTIST, so they are divided by the flow of songs and messages sent by the fans */}
                        {artistMessages.length > 0 &&
                            <div className='d-flex-column grow-1 gap-0_5em mb-xs-2 bg-dark-overlay-header-3'>
                            {artistMessages.map((message, key) => {
                                if ( message.user_type == 'artist' )
                                    return <LiveMessage key={key} message={message} />
                            })}
                        </div>
                        }
                    </ContainerDefault>
                }
                
                {liveMessages.length >= 1 &&
                    <div className={`overflow-auto h-max-30vh ${chatOpen ? 'd-xs-block pb-xs-2' : 'd-none'}`}>
                        <ContainerDefault style='d-flex-column j-c-end overflow-auto'>
                            {/* the following div is there to contain the messages sent to by the FANS, they are merged in the flow of the songs and divided by the artist's messages */}
                            {liveMessages.length > 0 && 
                                <div className='d-flex-column grow-1 gap-0_5em'>
                                    {liveMessages.map((message, key) => {
                                        if ( message.user_type == 'fan' || message.user_type == null )
                                            return <LiveMessage key={key} message={message} color={color} />
                                    })}
                                </div>
                            }
                        </ContainerDefault>
                    </div>
                }

                {(liveMessages.length < 1 && artistMessages.length < 1) &&
                    <div className='d-flex-row j-c-center pt-xs-4 pb-xs-8'>
                        {pathname.includes('/artist-app') &&
                            <p className='fsize-xs-2 grey-200'>Lascia un messaggio ai tuoi fan</p>
                        }
                        {!pathname.includes('/artist-app') &&
                            <p className='fsize-xs-2 grey-200'>Chatta con gli altri fan e con l'artista</p>
                        }
                    </div>
                }

                <ContainerDefault style={`position-relative ${chatOpen ? 'd-flex-column j-c-end' : 'd-none'}`}>
                    {leaderboard && (
                        <CountdownFlashLeaderboards 
                            announceStartDate={leaderboard.announceStartDate} 
                            rankStartDate={leaderboard.rankStartDate} 
                            rankEndDate={leaderboard.rankEndDate} 
                        />
                    )}
                    {/* <span
                        onClick={() => setChatOpen(false)}
                        className='position-absolute bottom-0 right-0 fsize-xs-2 f-w-600 lime-400 mb-xs-4 mt-xs-4 mr-xs-2 z-index-5'
                    >
                        Nascondi chat
                    </span> */}
                </ContainerDefault>
            </div>

            <Textbar
                onClick={() => setChatOpen(true)}
                currentComment={currentComment}
                handleCurrentComment={handleCurrentComment}
                handleSubmitComment={handleSubmitComment}
            />

        </div>
    )
}

export default LiveMessages