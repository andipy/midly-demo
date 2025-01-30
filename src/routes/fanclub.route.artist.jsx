import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Container from '../layout/container.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import CommentsModalLayout from '../layout/comments-modal.layout'

import CoverFanclub from '../components/cover-fanclub.component.artist'
import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import Navbar from '../components/navbar.component.artist'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import TextbarComments from '../components/textbar-comments.component'
import Comment from '../components/comment.component'
import Post from '../components/post.component'
import SettingsArea from '../components/settings-area.component.artist'
import Snackbar from '../components/snackbar.component'

import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'
import IllustrationsFanclubEmpty from '../images/illustrations/illustration-fanclub-empty.svg'
import IconEdit from "../images/icons/icon-edit.svg"
import UserModeration from '../components/user-moderation.component'
import PostType from '../components/post-type-popup.component'
import PostConcert from '../components/post-concert.component'

import useSubmitComment from '../utils/handle-submit-comment.hook'
import useLikeComment from '../utils/handle-like-comment.hook'
import useLikeReply from '../utils/handle-like-reply-comment.hook'
import useFanclub from '../utils/get-fanclub.hooks'
import useModal from '../utils/handle-modal.hooks'
import useLikePost from '../utils/handle-like-post.hook'
import useShare from '../utils/handle-share.hook'
const FanclubRoute = () => {

    //utils

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const fanclub = useFanclub(currentArtist?.id)

    const { modalOpen, openModal, closeModal } = useModal()
    const { handleSubmitComment } = useSubmitComment()
    const {likePost} = useLikePost()
    const { likeComment } = useLikeComment()
    const { likeReply } = useLikeReply()
    const { share, messageSnackbar, triggered } = useShare()

    const [showComponent, setShowComponent] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const timeoutRef = useRef(null)
    const inputRef = useRef(null)

    //focus post

    const [postInFocus, setPostInFocus] = useState({
        id: undefined,
        action: undefined,
        post: undefined
    })


    const focusPost = (id, action) => {
        const thisPost = fanclub.posts.find(post => post.id === id)
        setPostInFocus({
            id: thisPost.id,
            action: action,
            post: thisPost
        })
    }

    useEffect(() => {
        if ( postInFocus.id ) {
            if ( postInFocus.action === 'OPEN_COMMENTS' ) {
                openComments(postInFocus.id)
            }
            if ( postInFocus.action === 'OPEN_SETTINGS' ) {
                navigate(`/artist-app/fanclub/edit-post/${postInFocus.post.id}`, { state: { ...postInFocus.post, invokedModal: true } })
            }
            if ( postInFocus.action === 'SHARE_POST' ) {
                handleShare(postInFocus.post)
            }
            if ( postInFocus.action === 'FULL_SCREEN_POST' ) {
                navigate(`/artist-app/fanclub/${postInFocus.post.id}`, {
                    state: { ...postInFocus.post }
                })
            }
        }
    }, [postInFocus])

    //Comment section
    
    const openComments = (id) => {
        openModal()
    }
    const closeComments = () => {
        closeModal()
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
        setCommentInFocus(null)
    }

    const [commentInFocus, setCommentInFocus] = useState(null)
    const [replyingUser, setReplyingUser] = useState(null)
    const spotCommentToReply = (id, username) => {
        setReplyingUser(username)
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
        likes: [],
        comments: [],
        repliedUsername: undefined
    })
    const handleCurrentComment = (e) => {
        e.preventDefault()
        let commentsNumber
        let currentDate = new Date()
        let date = currentDate.toISOString().split('T')[0]
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                fanclub.posts.map(post => {
                    if ( post.id === postInFocus.id ) {
                        commentsNumber = post?.commentsCount + 1
                    }
                })
            }
        })

        let replied
        if ( commentInFocus) {
            replied = replyingUser
        }

        setCurrentComment(prev => ({
            ...prev,
            id: commentsNumber,
            userId: currentArtist.id,
            userType: currentArtist.type,
            userImage: currentArtist.image,
            username: currentArtist.artistName,
            createdAt: date,
            comment: e.target.value,
            repliedUsername: replied
        }))
    }

    const submitComment = (e) => {
        e.preventDefault()
        handleSubmitComment(currentComment, postInFocus, commentInFocus, currentArtist.id)
        setCurrentComment({
            id: undefined,
            userId: undefined,
            userType: undefined,
            userImage: undefined,
            username: undefined,
            createdAt: undefined,
            comment: '',
            likes: [],
            comments: [],
            repliedUsername: undefined
        })
        setCommentInFocus(null)
        setReplyingUser(null)
    }

    //posts
    const [mixedPosts, setMixedPosts] = useState([])
    useEffect(() => {
        const concerts = Array.isArray(fanclub?.concerts) ? fanclub.concerts : []
        const posts = Array.isArray(fanclub?.posts) ? fanclub.posts : []
        const mixed = [
            ...concerts,
            ...posts
        ]
        const sortedMixed = mixed.sort((a, b) => sortPosts(a,b))
        setMixedPosts(sortedMixed)
    }, [fanclub])

    const sortPosts = (a, b) => {
        if (a.settings.isPinned !== b.settings.isPinned) {
            return b.settings.isPinned - a.settings.isPinned
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    }

    //share
    const handleShare = (post) => {
        share(post)
        setPostInFocus({
            id: undefined,
            action: undefined,
            post: undefined
        })
    }

    //various
    const openSettingsConcert = (concert) => {
        navigate(`/artist-app/fanclub/edit-post-concert/${concert.id}`, { state: { ...concert, invokedModal: true } })
    }

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

    //handle file change

    
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const fileInputRef = useRef(null)

    const handleIconClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const selectedfile = e.target.files[0]
        
        if (selectedfile) {
            let fileType = ''
            if (selectedfile.type.split("/")[0] === 'image') {
                fileType = 'IMAGE'
                updateCover(selectedfile, fileType)
            }
    
            if (selectedfile.type.split("/")[0] === 'video') {
                fileType = 'VIDEO'
                const video = document.createElement('video')
                video.preload = 'metadata'
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src)
                    const duration = video.duration
    

                    if (duration > 15) {
                       setErr(true)
                       setErrMsg('Il video deve essere lungo al massimo 5 secondi')
                        return
                    }
    
                    updateCover(selectedfile, fileType)
                }
    
                video.src = URL.createObjectURL(selectedfile)
            }
        }
    }

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (err) {
            const exitDelay = setTimeout(() => {
                setIsExiting(true)
            }, 1000)

            return () => clearTimeout(exitDelay)
        }
    }, [err])

    useEffect(() => {
        if (isExiting) {
            const endDelay = setTimeout(() => {
                setErr(false)
                setIsExiting(false)
            }, 400)

            return () => clearTimeout(endDelay)
        }
    }, [isExiting])

    const updateCover = (file, fileType) => {
        const imageUrl = URL.createObjectURL(file)
    
        const newCover = {
            id: 1,
            url: imageUrl, 
            type: fileType
        }
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { 
                        ...fanclub,  
                        cover: newCover
                    }
                    : fanclub
            )
        )
    }

    const [createContent, setCreateContent] = useState(false)

    
   
    return (
        <>
            <Navbar fanclub={fanclub} background={'transparent100'} create={() => setCreateContent(true)}/>
            {fanclub?.isActive &&
                <>
                    <div className='position-relative'>
                        <CoverFanclub fanclub={fanclub}  />
                        <div onClick={handleIconClick} className='avatar-32 position-absolute bottom-2 right-2  bg-black-transp50 border-radius-100 d-flex-row j-c-center align-items-center pl-xs-2 pr-xs-2'><img className='avatar-24' src={IconEdit}/><span className='fsize-xs-2'>Modifica</span></div>
                        <input
                            className='d-none'
                            type='file'
                            ref={fileInputRef}
                            accept='image/png, image/jpeg, image/jpg, video/mp4, video/mov'
                            onChange={handleFileChange} 
                        />
                    </div>
                    
                    <Container style={'mt-xs-2'}>
                        <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <h2 className='fsize-xs-5 f-w-600'>{fanclub.name}</h2>
                            <Link to='settings/edit' state={{ type: 'NAME_DESCRIPTION' }} ><div className='avatar-22 border-radius-100 d-flex-row j-c-center align-items-center'><img className='avatar-22 ' src={IconEdit} /></div></Link>
                        </div>
                        <div className='d-flex-row j-c-start align-items-center gap-0_5em'>
                            <p className='fsize-xs-2 f-w-200 grey-300'>{fanclub.description}</p>
                        </div>
                        <p className='fsize-xs-1 f-w-200 grey-300'>{fanclub.subscribers} {fanclub.subscribers !== 1 ? 'iscritti' : 'iscritto'}</p>
                    </Container>
                </>
            }

            {fanclub?.isActive &&
                <>
                    {fanclub?.posts.length === 0 && fanclub?.concerts.length === 0 ?
                        <Container style={'d-flex-column align-items-center mt-xs-20'}>
                            <h2 className='fsize-xs-5 f-w-600 grey-200 mb-xs-3'>Il tuo fanclub è attivo!</h2>
                            <p className='fsize-xs-3 f-w-400 grey-300 w-70 t-align-center mb-xs-4'>Pubblica contenuti a pagamento per i tuoi fan.</p>
                            <Button
                                style='bg-dark lime-400 border-lime fsize-xs-3 f-w-600 black w-70'
                                label='Crea un contenuto'
                                onClick={() => /* navigate('/artist-app/content-creation') */ setCreateContent(true)}
                            />
                        </Container >
                    :   
                        <Container style={'pb-xs-appbar mt-xs-4'}>
                            {
                               mixedPosts.map(item => {
                                if (item.type === 'CONCERT' || item.type === 'TOUR' ) {
                                  return (
                                    <PostConcert 
                                        concert={item}
                                        openSettings={openSettingsConcert}
                                    />
                                  );
                                } else {
                                  return (
                                    <Post
                                        key={item.id}
                                        artistId={fanclub?.artistId}
                                        post={item}
                                        focusPost={focusPost}
                                        likePost={(postId) => likePost(currentArtist?.id, postId)}
                                    />
                                  );
                                }
                                })
                            }
                        </Container>
                    }
                </>
            }

            {!fanclub?.isActive &&
                <FullPageCenter>
                    <Container style='d-flex-column align-items-center j-c-center gap-1em'>
                        <div className='d-flex-column align-items-center j-c-center'>
                            <img className='avatar-48' src={IconFanclub} />
                            <h4 className='fsize-xs-5 letter-spacing-1 f-w-600 white t-align-center mt-xs-4 w-80'>Apri il tuo fan club su MIDLY</h4>
                        </div>
                        <p className='letter-spacing-1 grey-300 fsize-xs-3 t-align-center w-80'>Crea un’esperienza esclusiva per i tuoi Super Fan a cui possono accedere in cambio di un abbonamento mensile.</p>
                        <Button style='bg-acid-lime fsize-xs-3 f-w-600 black w-70' label='Inizia' onClick={(event) => {event.preventDefault(); navigate(`activation/terms`, { state : {invokedModal: true}})}} />
                    </Container>
                </FullPageCenter>
            }

            <CommentsModalLayout
                modalOpen={modalOpen}
                closeModal={closeModal}
            >
                <NavbarCommentsModal closeModal={closeComments} />
                <Container style={'pb-xs-12 pb-sm-2'}>
                    {fanclub?.posts.map(post => {
                        if ( post.id ===  postInFocus.id) {
                            return post.comments.map(comment => {
                                return (
                                    <Comment
                                        comment={comment}
                                        key={comment.id}
                                        inputRef={inputRef}
                                        spotCommentToReply={spotCommentToReply}
                                        modalUserModeration={() => navigate('user-moderation', {state: { userId: comment.userId, commentId: comment.id, fanclubId: fanclub?.id, postId: post.id }})}
                                        likeComment = {() => likeComment(comment.id, post.id, currentArtist.id)}
                                        postId={post.id}
                                        likeReply={(replyId, commentId, postId) => likeReply(replyId, commentId, postId, currentArtist?.id)}
                                    />
                                )
                            })
                        }})
                    }
                </Container>

                <TextbarComments
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={submitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    modalOpen={modalOpen}
                    inputRef={inputRef}
                    replyingUser={replyingUser}
                />
            </CommentsModalLayout>

            <Appbar />
            <Outlet context={{ postInFocus, setPostInFocus }} />

            {err && 
                <FullPageCenter style='z-index-1100 bg-black-transp70'>
                    <Container style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-red-400 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
                        <div className='d-flex-column align-items-center j-c-center w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2'>
                            <h2 className='fsize-xs-2 f-w-300 t-align-center'>Il video non può superare i 15 secondi di durata</h2>
                        </div>
                    </Container>
	            </FullPageCenter>
            }

            {showComponent &&
                <FullPageCenter style='z-index-999 bg-black-transp70'>
                    <Container style={'centered-popup position-absolute bg-dark-soft-2 border-radius-04 pt-xs-6 pb-xs-6 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'}>
                        <h4 className='fsize-xs-5 grey-200 f-w-300'>Ehi, mi hai scoperto.</h4>
                        <p className='fsize-xs-3 grey-200 f-w-300 mt-xs-4'>Vuoi visitare la demo dell'app fan?</p>
                        <Button style='bg-blue-600 dark-900 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Vai alla demo fan' onClick={() => navigate('/your-favourites')} />
                        <Button style='bg-none border-blue-bright-600 blue-bright-600 border-radius-02 fsize-xs-3 f-w-500 mt-xs-4' label='Rimani qui' onClick={() => setShowComponent(false)} />
                    </Container>
                </FullPageCenter>
            }

            {createContent &&
                <PostType close={() => setCreateContent(false)} createPost={() => navigate('/artist-app/content-creation')} createConcert={() => navigate('/artist-app/concert-creation')}/>
            }

            <Snackbar message={messageSnackbar} triggered={triggered} />
        </>
    )
}

export default FanclubRoute