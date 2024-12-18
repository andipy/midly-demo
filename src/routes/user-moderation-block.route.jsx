import { useNavigate, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from "react"

import { FansContext } from "../contexts/fans.context"

import FullPageCenter from "../layout/full-page-center.layout"
import Container from "../layout/container.layout"
import Button from "../components/button.component"

function UserModerationBlockRoute() {

    const location = useLocation()
    const navigate = useNavigate()
    const userId = location.state?.userId
    const blocked = location.state?.blocked


    const { fans } = useContext(FansContext)

    const [ userFound, setUserFound] = useState()

    useEffect(() => {
        const matchedFan = fans?.find((fan) => fan?.id === userId)
        setUserFound(matchedFan)
    }, [userId])
  return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
        <Container style={`centered-popup  position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft-2 border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>   
        {
            blocked === true ?
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
                <p className="fsize-xs-2 f-w-300 t-align-center mb-xs-4">Hai appena bloccato questo profilo. Non potrà più commentare nè reagire ai tuoi contenuti, ma potrà continuare a visualizzarli.</p>
                <div className='w-100 d-flex-column mt-xs-8'>
                        <Button
                            disabled={false}
                            style={`fsize-xs-3 f-w-300 letter-spacing-1 bg-dark-soft-2 lime-400 border-lime-1 border-radius-01 mb-xs-4`} 
                            label='Sblocca'
                            onClick={() => navigate(-3)}
                        />
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
                <p className="fsize-xs-2 f-w-300 t-align-center mb-xs-4">Stai per bloccare questo profilo: una volta bloccato, non potrà più commentare nè reagire ai tuoi contenuti, ma potrà continuare a visualizzarli.</p>
                <div className='w-100 d-flex-column mt-xs-8'>
                    <Button
                        disabled={false}
                        style={`fsize-xs-3 f-w-600 letter-spacing-1 bg-red-300 black border-radius-01 mb-xs-4`} 
                        label='Blocca'
                        onClick={() => navigate('/artist-app/fanclub/user-moderation/block',{state: { userId: userId, blocked:true }})}
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

export default UserModerationBlockRoute