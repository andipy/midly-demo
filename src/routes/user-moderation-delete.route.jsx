import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { FansContext } from '../contexts/fans.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import FullPageCenter from '../layout/full-page-center.layout'
import Container from '../layout/container.layout'
import Button from '../components/button.component'

const UserModerationDeleteRoute = () => {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const userId = location.state?.userId
    const postId = location.state?.postId
    const fanclubId = location.state?.fanclubId
    const commentId = location.state?.commentId
    const replyId = location.state?.replyId
    const type= location.state?.type
    const deleted = location.state?.deleted

    const { fans } = useContext(FansContext)
    const {fanclubs, setFanclubs} = useContext(FanclubsContext)

    const [ userFound, setUserFound] = useState()
    useEffect(() => {
        const matchedFan = fans?.find((fan) => fan?.id === userId)
        setUserFound(matchedFan)
    }, [userId])

    const deleteComment = (commentId, postId) => {
        console.log('commento')
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
                fanclub.id === fanclubId
                    ? {
                        ...fanclub,
                        posts: fanclub.posts.map(post =>
                            post.id === postId
                                ? { ...post,commentsCount: post.commentsCount-1, comments: post.comments.filter(comment => comment.id !== commentId) }
                                : post
                        ),
                        
                    }
                    : fanclub
            )
        )
        navigate('.', { state: { userId: userId, deleted: true } })
    }
    const deleteReply = (commentId, postId, replyId) => {
        console.log('risposta')
        setFanclubs(prevFanclubs =>
            prevFanclubs.map(fanclub =>
                fanclub.id === fanclubId
                    ? {
                        ...fanclub,
                        posts: fanclub.posts.map(post =>
                            post.id === postId
                                ? {
                                    ...post,
                                    commentsCount: post.commentsCount-1,
                                    comments: post.comments.map(comment =>
                                        comment.id === commentId
                                            ? {
                                                ...comment,
                                                comments: comment.comments.filter(reply => reply.id !== replyId) // Rimuovi la risposta
                                            }
                                            : comment
                                    )
                                }
                                : post
                        )
                    }
                    : fanclub
            )
        );
        navigate('.', { state: { userId: userId, deleted: true } })
    }
  return (
    <FullPageCenter style='z-index-1200 bg-black-transp70'>
            <Container style='centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'>
                <div className='d-flex-row j-c-start align-items-center mb-xs-4 gap-0_5em'>
                    {userFound?.image ?
                        <img className='avatar-40 border-radius-100 ' src={userFound?.image}/>
                    :
                        <div className='avatar-40 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-40 border-radius-100 bg-purple-400'>
                                <h5 className='f-w-500 fsize-xs-3'>{userFound?.username.charAt(0).toUpperCase()}</h5>
                            </div>
                        </div>
                    }
                    <p className='fsize-xs-3 f-w-500 no-shrink'>{userFound?.username}</p>
                </div>
                {deleted ?
                    <div>
                        <p className='fsize-xs-3 f-w-400 t-align-center mb-xs-4'>Hai appena eliminato il commento di questo profilo e tutte le sue risposte.</p>
                        <Button
                            disabled={false}
                            style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime black  border-radius-04'
                            label='Chiudi'
                            onClick={() => navigate(-2)}
                        />
                    </div>
                :
                    <div>
                        {
                            <p className='fsize-xs-3 f-w-400 t-align-center mb-xs-4'>Stai per eliminare il commento di questo profilo: verranno eliminate anche tutte le risposte a questo commento, l'operazione è irreversibile.</p>

                        }
                        <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                                label='Elimina'
                                onClick={() => type === "REPLY" 
                                    ? deleteReply(commentId, postId, replyId) 
                                    : deleteComment(commentId, postId)}
                            />
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-300 letter-spacing-1 bg-dark-soft-2 lime-400 border-lime border-radius-04'
                                label='Indietro'
                                onClick={() => navigate(-1, {state: { userId: userId }})}
                            />
                        </div>
                    </div>
                }
            </Container>
        </FullPageCenter>
  )
}

export default UserModerationDeleteRoute