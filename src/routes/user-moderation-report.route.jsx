import { useNavigate, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from "react"

import { FansContext } from "../contexts/fans.context"
import { ReportsContext } from '../contexts/reports.context'
import { CurrentArtistContext } from "../contexts/currentArtist.context"

import FullPageCenter from "../layout/full-page-center.layout"
import Container from "../layout/container.layout"
import Button from "../components/button.component"

function UserModerationReportRoute() {
    const location = useLocation()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const userId = location.state?.userId
    const postId = location.state?.postId
    const fanclubId = location.state?.fanclubId
    const commentId = location.state?.commentId
    const artistId = location.state?.artistId
    const reported = location.state?.reported

    
    const { fans } = useContext(FansContext)
    const { reports, setReports } = useContext(ReportsContext)
    const { currentArtist } = useContext(CurrentArtistContext)

    
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

    const reportUser = () => {
        if (pathname.includes('/artist-app/')) {
            const newReport = {
                reportedUserId: userId,
                reportingUser: {
                    id: currentArtist.id,
                    userType: 'ARTIST'
                },
                description: description,
                postId: postId,
                commentId: commentId,
                fanclubId: fanclubId,
                fanclubArtistId: artistId,
                createdAt: new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
            }
            setReports([...reports, newReport])
            navigate('/artist-app/fanclub/user-moderation/report',{state: { userId: userId, reported: true }})
        }

        
    }
    return (
        <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
            <Container style={`centered-popup  position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>   
            {
                reported === true ?
                <div className='d-flex-column align-items-center j-c-start w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2' >
                    <div className='d-flex-row j-c-start align-items-center mb-xs-4'>
                        {userFound?.image ?
                            <img className='avatar-32 border-radius-100 ' src={userFound?.image}></img>
                        :
                            <div className='avatar-32 position-relative'>
                                    <div className='d-flex-row j-c-center align-items-center avatar-32 border-radius-100 bg-purple-400'>
                                        <h5 className='f-w-500 fsize-xs-3'>
                                            {userFound?.username.charAt(0).toUpperCase()}
                                        </h5>
                                    </div>
                            </div>
                        }
                        <p className="fsize-xs-1 f-w-300 ml-xs-4">{userFound?.username}</p>
                    </div>
                    <p className="fsize-xs-2 f-w-300 t-align-center mb-xs-4">Hai appena segnalato questo profilo. Ecco la motivazione della tua segnalazione:</p>
                    <p className="fsize-xs-2 f-w-300 t-align-center mb-xs-4">"{description}"</p>
                    <div className='w-100 d-flex-column mt-xs-8'>
                        <Button
                            disabled={false}
                            style={`fsize-xs-3 f-w-600 letter-spacing-1 bg-acid-lime black  border-radius-01 `} 
                            label='Chiudi'
                            onClick={() => navigate(-3)}
                        />
                    </div>
                </div>
                :
                <div className='d-flex-column align-items-center j-c-start w-100 pt-xs-2 pb-xs-2 pr-xs-2 pl-xs-2' >
                    <div className='d-flex-row j-c-start align-items-center mb-xs-4'>
                        {userFound?.image ?
                            <img className='avatar-32 border-radius-100 ' src={userFound?.image}></img>
                        :
                            <div className='avatar-32 position-relative'>
                                    <div className='d-flex-row j-c-center align-items-center avatar-32 border-radius-100 bg-purple-400'>
                                        <h5 className='f-w-500 fsize-xs-3'>
                                            {userFound?.username.charAt(0).toUpperCase()}
                                        </h5>
                                    </div>
                            </div>
                        }
                        <p className="fsize-xs-1 f-w-300 ml-xs-4">{userFound?.username}</p>
                    </div>
                    <p className="fsize-xs-2 f-w-300 t-align-center mb-xs-4">Stai per segnalare questo profilo. Scrivi il motivo della segnalazione:</p>
                    <textarea
                        className='bg-dark-gradient white fsize-xs-1 f-w-400 border-radius-01'
                        type='text'
                        placeholder={`${'Perchè vuoi segnalare questo profilo?'}`}
                        value={description}
                        onChange={(e) => handleDescription(e)}
                        rows={4}
                        style={{ resize: 'none' }}
                    />
                    <div className='w-100 d-flex-column mt-xs-8'>
                        <Button
                            disabled={false}
                            style={`fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-01 mb-xs-4`} 
                            label='Segnala'
                            onClick={() => reportUser()}
                        />
                        <Button
                            disabled={false}
                            style={`fsize-xs-3 f-w-300 letter-spacing-1 bg-dark-soft-2 lime-400 border-lime-1 border-radius-01 `} 
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