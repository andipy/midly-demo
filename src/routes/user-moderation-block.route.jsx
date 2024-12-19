import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { FansContext } from '../contexts/fans.context'
import { ModerationsContext } from '../contexts/moderations.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import FullPageCenter from '../layout/full-page-center.layout'
import Container from '../layout/container.layout'
import Button from '../components/button.component'

function UserModerationBlockRoute() {

    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const userId = location.state?.userId
    const postId = location.state?.postId
    const fanclubId = location.state?.fanclubId
    const commentId = location.state?.commentId
    const artistId = location.state?.artistId
    const isBlocked = location.state?.blocked


    const { fans } = useContext(FansContext)
    const { blocked, setBlocked, reports, setReports } = useContext(ModerationsContext)
    const { currentArtist } = useContext(CurrentArtistContext)
    const [ userFound, setUserFound] = useState()

    useEffect(() => {
        const matchedFan = fans?.find((fan) => fan?.id === userId)
        setUserFound(matchedFan)
    }, [userId])

    const blockUser = () => {
        if (pathname.includes('/artist-app/')) {
            const newBlock = {
                blockedUserId: userId,
                blockingUser: {
                    id: currentArtist.id,
                    userType: 'ARTIST'
                },
                postId: postId,
                commentId: commentId,
                fanclubId: fanclubId,
                fanclubArtistId: artistId,
                createdAt: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
            }
            const updatedReports = reports.map((report) => 
                report.reportedUserId === userId && report.fanclubId === fanclubId
                    ? { ...report, archived: true }
                    : report
            )

            setReports(updatedReports)
            setBlocked([...blocked, newBlock])
            navigate('/artist-app/fanclub/user-moderation/block',{state: { userId: userId, blocked: true }})
        }  
    }

    const unlockUser = () => {
        if (pathname.includes('/artist-app/')) {

            const updatedBlocked = blocked.filter(block => 
                !(block.blockedUserId === userId && block.blockingUser.id === currentArtist.id)
            )
            setBlocked(updatedBlocked)
            
            navigate('/artist-app/fanclub')
        }  
    }
    
    return (
        <FullPageCenter style='z-index-1100 bg-black-transp70'>
            <Container style='centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'>   
                <div className='d-flex-row j-c-start align-items-center mb-xs-4 gap-0_5em'>
                    {userFound?.image ?
                        <img className='avatar-40 border-radius-100' src={userFound?.image} />
                    :
                        <div className='avatar-40 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-40 border-radius-100 bg-purple-400'>
                                <h5 className='f-w-500 fsize-xs-3'>{userFound?.username.charAt(0).toUpperCase()}</h5>
                            </div>
                        </div>
                    }
                    <span className='fsize-xs-3 f-w-500 no-shrink'>{userFound?.username}</span>
                </div>
                {isBlocked ?
                    <div>
                        <p className='fsize-xs-3 f-w-400 t-align-center'>Hai appena bloccato questo profilo. Non potrà più commentare nè reagire ai tuoi contenuti, ma potrà continuare a visualizzarli.</p>
                        <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-400 letter-spacing-1 bg-dark-soft-2 lime-400 border-lime border-radius-04'
                                label='Sblocca'
                                onClick={() => unlockUser()}
                            />
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime black  border-radius-04'
                                label='Chiudi'
                                onClick={() => navigate(-3)}
                            />
                        </div>
                    </div>
                :
                    <div>
                        <p className='fsize-xs-3 f-w-400 t-align-center'>Stai per bloccare questo profilo: una volta bloccato, non potrà più commentare nè reagire ai tuoi contenuti, ma potrà continuare a visualizzarli.</p>
                        <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                                label='Blocca'
                                onClick={() => blockUser()}
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

export default UserModerationBlockRoute