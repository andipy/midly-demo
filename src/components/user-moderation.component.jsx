import { useContext, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { FansContext } from '../contexts/fans.context'
import { FanclubsContext } from '../contexts/fanclubs.context'
import { ModerationsContext } from '../contexts/moderations.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Container from '../layout/container.layout'
import Button from './button.component'

const UserModeration = ({ modalUserModeration, user, post, fanclub, comment }) => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { fans } = useContext(FansContext)
    const { fanclubs } = useContext(FanclubsContext)
    const { blocked } = useContext(ModerationsContext)
    const { currentArtist } = useContext(CurrentArtistContext)

    const [userFound, setUserFound] = useState()
    const [artistId, setArtistId] = useState()

    useEffect(() => {
        const matchedFan = fans?.find((fan) => fan.id === user)
        setUserFound(matchedFan)
    }, [user])

    useEffect(() => {
        const matchedFanclub = fanclubs?.find((fc) => fc.id === fanclub)
        if (matchedFanclub) {
            setArtistId(matchedFanclub.artistId)
        }
    }, [fanclub])

    const [isUserBlocked, setIsUserBlocked] = useState()

    useEffect(() => {
        if (pathname.includes('/artist-app/')) {
            const UserBlocked = blocked.some(block => 
                block.blockedUserId === user && block.blockingUser.id === currentArtist.id
            )
            setIsUserBlocked(UserBlocked)
        }
    }, [user])

    return (
        <Container style='centered-popup position-absolute d-flex-column align-items-center bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2'>             
            <p className='fsize-xs-3 f-w-500'>Gestisci il profilo di:</p>
            <div className='d-flex-column j-c-center align-items-center mt-xs-8'>
                {userFound?.image ?
                    <img className='avatar-80 border-radius-100 ' src={userFound?.image} />
                :
                    <div className='avatar-80 position-relative'>
                        <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400'>
                            <h5 className='f-w-500 fsize-xs-3'>{userFound?.username.charAt(0).toUpperCase()}</h5>
                        </div>
                    </div>
                }
                <p className='fsize-xs-2 f-w-500 mt-xs-4'>{userFound?.username}</p>
            </div>

            <div className='w-100 d-flex-column mt-xs-8 gap-0_5em'>
                {pathname.includes('/artist-app/') &&
                    <>
                        {isUserBlocked ?
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-500 letter-spacing-1 bg-black grey-500 border-radius-04'
                                label='Utente già bloccato'
                            />
                        :
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-500 letter-spacing-1 bg-red-400-transp10 red-300 border-radius-04'
                                label='Blocca utente'
                                onClick={() => navigate('block', { state: { userId: user, commentId: comment, fanclubId: fanclub, postId: post, artistId: artistId, blocked: false }})}
                            />
                        }
                    </>
                }
                <Button
                    disabled={false}
                    style='fsize-xs-3 f-w-500 letter-spacing-1 bg-red-400-transp10 red-300 border-radius-04'
                    label='Segnala utente'
                    onClick={() => navigate('report', { state: { userId: user, commentId: comment, fanclubId: fanclub, postId: post, artistId: artistId, reported: false }})}
                />
                <Button
                    disabled={false}
                    style='fsize-xs-3 f-w-400 letter-spacing-1 bg-grey-500 white border-radius-04 mt-xs-8'
                    label='Annulla'
                    onClick={modalUserModeration}
                />
            </div>
        </Container>
    )
}

export default UserModeration