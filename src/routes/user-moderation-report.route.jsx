import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

import { FansContext } from '../contexts/fans.context'

import FullPageCenter from '../layout/full-page-center.layout'
import Container from '../layout/container.layout'
import Button from '../components/button.component'

import useReportUser from '../utils/handle-report-user.hook'

const UserModerationReportRoute = () => {

    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const userId = location.state?.userId
    const postId = location.state?.postId
    const fanclubId = location.state?.fanclubId
    const commentId = location.state?.commentId
    const artistId = location.state?.artistId
    const reported = location.state?.reported
    const type = location.state?.type
    const comment = location.state?.comment
    const replyId = location.state?.replyId
    const reply = location.state?.reply

    
    const { fans } = useContext(FansContext)

    const { reportUser } = useReportUser()

    const handleReport = () => {
        reportUser({
          userId,
          description,
          postId,
          commentId,
          fanclubId,
          artistId,
          type,
          comment,
          replyId,
          reply
        })
        navigate('.', { 
            state: {
                ...location.state, 
                userId,          
                reported: true   
            }
        });
      }

    
    const [ userFound, setUserFound] = useState()
    useEffect(() => {
        const matchedFan = fans?.find((fan) => fan?.id === userId)
        setUserFound(matchedFan)
    }, [userId])

    const [description, setDescription] = useState('')
    const handleDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
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
                {reported ?
                    <div>
                        <p className='fsize-xs-3 f-w-400 t-align-center mb-xs-4'>Hai appena segnalato questo profilo. Ecco la motivazione della tua segnalazione:</p>
                        <p className='fsize-xs-3 f-w-400 t-align-center font-italic mb-xs-4'>"{description}"</p>
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
                            type && type === 'COMMENT' &&
                            <p className='fsize-xs-3 f-w-400 t-align-center mb-xs-4'>Stai per segnalare questo commento. Scrivi il motivo della segnalazione:</p>

                        }
                        {
                            !type &&
                            <p className='fsize-xs-3 f-w-400 t-align-center mb-xs-4'>Stai per segnalare questo profilo. Scrivi il motivo della segnalazione:</p>

                        }
                        <textarea
                            className='bg-dark-gradient white fsize-xs-3 f-w-400 border-radius-04'
                            type='text'
                            placeholder={`${ type ? 'Perchè vuoi segnalare questo commento?' : 'Perchè vuoi segnalare questo profilo?'}`}
                            value={description}
                            onChange={(e) => handleDescription(e)}
                            rows={4}
                            style={{ resize: 'none' }}
                        />
                        <div className='w-100 d-flex-column mt-xs-4 gap-1em'>
                            <Button
                                disabled={false}
                                style='fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-04'
                                label='Segnala'
                                onClick={() => handleReport()}
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

export default UserModerationReportRoute