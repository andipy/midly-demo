import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import Navbar from '../components/navbar.component.artist'
import NavbarCommentsModal from '../components/navbar-comments-modal.component'
import TextbarComments from '../components/textbar-comments.component'
import Post from '../components/post.component'
import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'
import CommentModalLayout from '../layout/comments-modal.layout'

import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'
import IllustrationsFanclubEmpty from '../images/illustrations/illustration-fanclub-empty.svg'

const FanclubRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [commentsOpen, setCommentsOpen] = useState(false)
    const [commentsInFocus, setCommentsInFocus] = useState(null)
    const openComments = (id) => {
        setCommentsOpen(true)
        setCommentsInFocus(id)
    }
    const closeComments = () => {
        setCommentsOpen(false)
        setCommentsInFocus(null)
    }
    const [currentComment, setCurrentComment] = useState({
        id: undefined,
        artistId: undefined,
        userType: undefined,
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
            artistId: currentArtist.id,
            userType: currentArtist.type,
            createdAt: date,
            comment: e.target.value
        }))
    }

    const handleSubmitComment = (e) => {
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
                                    comments: [...post.comments, currentComment]
                                }
                            }
                            return post;
                        })
                    }
                }
                return fanclub;
            })
        )
        setCurrentComment({
            id: undefined,
            artistId: undefined,
            userType: undefined,
            createdAt: undefined,
            comment: '',
            likes: 0,
            comments: []
        })
    }
    

    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        fetchThisFanclub()
    }, [fanclubs])

    return (
        <>
            <Navbar fanclub={fanclub} />

            {fanclub?.isActive ?
                <>
                    <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                        <h1>Fanclub</h1>
                    </ContainerDefault>
                    
                    {fanclub.posts.length === 0 ?
                        <FullPageCenter>
                            <img className='w-35' src={IllustrationsFanclubEmpty} alt="" />
                            <h1 className='fsize-xs-6 f-w-500 mb-xs-2 mt-xs-4'>Il tuo fanclub è attivo!</h1>
                            <p className='fsize-xs-4 f-w-200 grey-200 w-70 t-align-center mb-xs-4'>Puoi pubblicare contenuti per i tuoi fan 🎉</p>
                            <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Crea un contenuto' onClick={() => navigate('/artist-app/content-creation')} />

                        </FullPageCenter>
                    :
                        <ContainerDefault containerSpecificStyle={'pb-xs-appbar mt-xs-4'}>
                            {fanclub.posts.map(post =>
                                <Post
                                    post={post}
                                    openComments={() => openComments(post.id)}
                                    key={post.id}
                                />
                            )}
                        </ContainerDefault>
                    }
                </>
            :
                <FullPageCenter>
                    <ContainerDefault containerSpecificStyle='d-flex-column align-items-center j-c-center gap-1em'>
                        <div className='d-flex-column align-items-center j-c-center'>
                            <img className='avatar-48' src={IconFanclub} />
                            <h4 className='fsize-xs-3 mb-xs-8 letter-spacing-1 f-w-400 white t-align-center mt-xs-4'>Apri il tuo fanclub!</h4>
                        </div>
                        <p className='letter-spacing-1 grey-300 fsize-xs-2 t-align-center w-80'>Pubblica contenuti esclusivi per i tuoi fan in cambio di un abbonamento mensile:</p>
                        <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Attiva fanclub' onClick={() => navigate('/artist-app/fan-club/name')} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <CommentModalLayout
                commentsOpen={commentsOpen}
                closeComments={closeComments}
            >
                <NavbarCommentsModal
                    closeComments={closeComments}
                />
                <ContainerDefault containerSpecificStyle={'pt-xs-topbar'}>
                    {fanclub?.posts[commentsInFocus - 1]?.comments.map(comment => {
                        return (
                            <p key={comment.id}>{comment.comment}</p>
                        )
                    })}
                </ContainerDefault>

                <TextbarComments
                    handleCurrentComment={handleCurrentComment}
                    handleSubmitComment={handleSubmitComment}
                    currentComment={currentComment}
                    setCurrentComment={setCurrentComment}
                    className={'position-absolute bottom-0'}
                />

            </CommentModalLayout>

            <Appbar />
        </>
    )
}

export default FanclubRoute