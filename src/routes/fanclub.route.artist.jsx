import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import Navbar from '../components/navbar.component.artist'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import TextbarComments from '../components/textbar-comments.component'
import Comment from '../components/comment.component'
import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'
import Post from '../components/post.component'

import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'
import IllustrationsFanclubEmpty from '../images/illustrations/illustration-fanclub-empty.svg'

const FanclubRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [showComponent, setShowComponent] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const timeoutRef = useRef(null)

    const [modalOpen, setModalOpen] = useState(false)
    const [commentsInFocus, setCommentsInFocus] = useState(null)
    const inputRef = useRef(null)
    const openComments = (id) => {
        setModalOpen(true)
        setCommentsInFocus(id)
    }
    const closeModal = () => {
        setModalOpen(false)
        setCommentsInFocus(null)
        setCommentInFocus(null)
    }
    const [commentInFocus, setCommentInFocus] = useState(null)
    const spotCommentToReply = (id) => {
        setCommentInFocus(id)
        inputRef.current.focus()
    }
    const [currentComment, setCurrentComment] = useState({
        id: undefined,
        userId: undefined,
        userType: undefined,
        userImage: undefined,
        username: undefined,
        createdAt: undefined,
        comment: '',
        likes: 0,
        comments: []
    })
    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                fanclub.posts.map(post => {
                    if ( post.id === commentsInFocus ) {
                        commentsNumber = post.comments.length + 1
                    }
                })
            }
        })

        setCurrentComment(prev => ({
            ...prev,
            id: commentsNumber,
            userId: currentArtist.id,
            userType: currentArtist.type,
            userImage: currentArtist.image,
            username: currentArtist.artistName,
            createdAt: date,
            comment: e.target.value
        }))
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if ( commentInFocus ) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === currentArtist.id) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === commentsInFocus) {
                                    return {
                                        ...post,
                                        comments: post.comments.map(comment => {
                                            if (comment.id === commentInFocus) {
                                                return {
                                                    ...comment,
                                                    comments: [...comment.comments, currentComment]
                                                }
                                            }
                                            return comment
                                        })
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
            setCommentInFocus(null)
        } else if ( !commentInFocus ) {
            setFanclubs(prevFanclubs =>
                prevFanclubs.map(fanclub => {
                    if (fanclub.artistId === currentArtist.id) {
                        return {
                            ...fanclub,
                            posts: fanclub.posts.map(post => {
                                if (post.id === commentsInFocus) {
                                    return {
                                        ...post,
                                        comments: [...post.comments, currentComment]
                                    }
                                }
                                return post
                            })
                        }
                    }
                    return fanclub
                })
            )
        }
        
        setCurrentComment({
            id: undefined,
            userId: undefined,
            userType: undefined,
            userImage: undefined,
            username: undefined,
            createdAt: undefined,
            comment: '',
            likes: 0,
            comments: []
        })
    }

    const handleSubmitReply = (e) => {
        e.preventDefault()
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub => {
                if (fanclub.artistId === currentArtist.id) {
                    return {
                        ...fanclub,
                        posts: fanclub.posts.map(post => {
                            if (post.id === commentsInFocus) {
                                return {
                                    ...post,
                                    comments: post.comments.map(comment => {
                                        if ( comment.id === commentInFocus ) {
                                            return (
                                                [...comment.comments, currentComment]
                                            )
                                        }
                                    })
                                }
                            }
                            return post
                        })
                    }
                }
                return fanclub
            })
        )
        setCurrentComment({
            id: undefined,
            userId: undefined,
            userType: undefined,
            userImage: undefined,
            username: undefined,
            createdAt: undefined,
            comment: '',
            likes: 0,
            comments: []
        })
        
    }

    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        if (!fanclubs || !currentArtist) {
            console.warn("fanclubs or currentArtist is undefined")
            return
        }
    
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        if (fanclubs && currentArtist) {
            fetchThisFanclub()
        }
    }, [fanclubs, currentArtist])

    useEffect(() => {
        const handleMouseDown = () => {
            setClickCount(prevCount => {
                const newCount = prevCount + 1
                
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }

                timeoutRef.current = setTimeout(() => {
                    setClickCount(0)
                }, 400) // Reset the count if more than 1 second passes between clicks

                if (newCount >= 6) {
                    setShowComponent(true)
                    setClickCount(0) // Reset the click count after triggering the action
                    clearTimeout(timeoutRef.current)
                }

                return newCount
            })
        }

        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }



    return (
        <>
            <Navbar fanclub={fanclub} />

            {fanclub?.isActive ?
                <>
                    <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                        <h1>Fanclub</h1>
                    </ContainerDefault>
                    
                    {fanclub?.posts.length === 0 ?
                        <FullPageCenter>
                            <img className='w-35' src={IllustrationsFanclubEmpty} />
                            <h1 className='fsize-xs-6 f-w-500 mb-xs-2 mt-xs-4'>Il tuo fanclub è attivo!</h1>
                            <p className='fsize-xs-4 f-w-200 grey-200 w-70 t-align-center mb-xs-4'>Puoi pubblicare contenuti per i tuoi fan 🎉</p>
                            <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Crea un contenuto' onClick={() => navigate('/artist-app/content-creation')} />

                        </FullPageCenter>
                    :
                    <>
                        <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-4'}>
                            {fanclub?.posts.sort((a, b) => sortPosts(a,b)).map(post =>
                                <Post 
                                    artistId={fanclub?.artistId}
                                    post={post} 
                                    //userType={'ARTIST'}
                                    openComments={() => openComments(post.id)}
                                    key={post.id}
                                />
                            )}
                        </ContainerDefault>
                    </>
                    }
                </>
            :
                <FullPageCenter>
                    <ContainerDefault containerSpecificStyle='d-flex-column align-items-center j-c-center gap-1em'>
                        <div className='d-flex-column align-items-center j-c-center'>
                            <img className='avatar-48' src={IconFanclub} />
                            <h4 className='fsize-xs-5 letter-spacing-1 f-w-600 white t-align-center mt-xs-4 w-80'>Apri il tuo fan club su MIDLY</h4>
                        </div>
                        <p className='letter-spacing-1 grey-300 fsize-xs-3 t-align-center w-80'>Crea un’esperienza esclusiva per i tuoi Super Fan a cui possono accedere in cambio di un abbonamento mensile.</p>
                        <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Inizia' onClick={(event) => {event.preventDefault(); navigate(`activation/terms`, { state : {invokedModal: true}})}} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <CommentsModalLayout
                modalOpen={modalOpen}
                closeModal={closeModal}
            >
                <NavbarCommentsModal
                    closeModal={closeModal}
                />
                <ContainerDefault containerSpecificStyle={'pb-xs-12 pb-sm-2'}>
                    {fanclub?.posts[commentsInFocus - 1]?.comments.map(comment => {
                        return (
                            <Comment
                                comment={comment}
                                key={comment.id}
                                inputRef={inputRef}
                                spotCommentToReply={() => spotCommentToReply(comment.id)}
                            />
                        )
                    })}
                </ContainerDefault>

                <TextbarComments
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={handleSubmitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    modalOpen={modalOpen}
                    inputRef={inputRef}
                />

            </CommentsModalLayout>

            <Appbar />
            <Outlet />

            {showComponent &&
                <FullPageCenter className={'z-index-999 bg-black-transp70'}>
                    <ContainerDefault containerSpecificStyle={'centered-popup position-absolute bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <h4 className='fsize-xs-5 grey-200 f-w-300'>Ehi, mi hai scoperto.</h4>
                        <p className='fsize-xs-3 grey-200 f-w-300 mt-xs-4'>Vuoi visitare la demo dell'app fan?</p>
                        <Button style='bg-blue-600 dark-900 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Vai alla demo fan' onClick={() => navigate('/your-favourites')} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Rimani qui' onClick={() => setShowComponent(false)} />
                    </ContainerDefault>
                </FullPageCenter>
            }
        </>
    )
}

export default FanclubRoute