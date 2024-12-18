import { useContext, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { FansContext } from '../contexts/fans.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Container from "../layout/container.layout"
import Button from './button.component'
const UserModeration = ({modalUserModeration, user, post, fanclub, comment}) => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { fans } = useContext(FansContext)
    const { fanclubs } = useContext(FanclubsContext)

    const [ userFound, setUserFound] = useState()
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



  return (
    <Container style={`centered-popup  position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>             
        <div className='d-flex-column align-items-center j-c-start w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2' >
            <p className="fsize-xs-3 f-w-500">Gestisci il profilo di:</p>
            <div className='d-flex-column j-c-center align-items-center mt-xs-8'>
                {userFound?.image ?
                    <img className='avatar-80 border-radius-100 ' src={userFound?.image}></img>
                :
                    <div className='avatar-80 position-relative'>
                            <div className='d-flex-row j-c-center align-items-center avatar-36 border-radius-100 bg-purple-400'>
                                <h5 className='f-w-500 fsize-xs-3'>
                                    {userFound?.username.charAt(0).toUpperCase()}
                                </h5>
                            </div>
                    </div>
                }
                <p className="fsize-xs-1 f-w-300 mt-xs-4">{userFound?.username}</p>
                
            </div>

            <div className='w-100 d-flex-column mt-xs-8'>
            {pathname.includes('/artist-app/') &&
                <Button
                    disabled={false}
                    style={`fsize-xs-3 f-w-300 letter-spacing-1 bg-red-400-transp10 red-300 border-radius-01 mb-xs-2`} 
                    label='Blocca utente'
                    onClick={() => navigate('block',{state: { userId: user, blocked:false }})}
                />
            }
                <Button
                    disabled={false}
                    style={`fsize-xs-3 f-w-300 letter-spacing-1 bg-red-400-transp10 red-300 border-radius-01 mt-xs-2`} 
                    label='Segnala utente'
                    onClick={() => navigate('report',{state: { userId: user, commentId: comment, fanclubId: fanclub, postId: post, artistId: artistId, reported:false }})}

                />
                <Button
                    disabled={false}
                    style={`fsize-xs-3 f-w-300 letter-spacing-1 bg-grey-500 white border-radius-01 mt-xs-8`} 
                    label='Annulla'
                    onClick={modalUserModeration}
                />
            </div>
        </div>
    </Container>
  )
}

export default UserModeration