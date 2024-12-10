
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'

import IconExit from '../images/icons/icon-exit.svg'
import IconPoints from '../images/icons/icon-points.svg'
const MessageSetPricing = ({ points, onClick, message }) => {

    const navigate = useNavigate()

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const exitTimer = setTimeout(() => {
                onClick()
            }, 400)

            return () => clearTimeout(exitTimer)
        }
    }, [isExiting])

  return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
		<ContainerDefault containerSpecificStyle={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
            <div className='d-flex-row align-items-center j-c-end w-100'>
				<img className='avatar-32 bg-black-transp50 border-radius-100' src={IconExit} onClick={() => setIsExiting(true)}></img>
			</div>

			<div id='points' className='d-flex-row t-align-center j-c-center align-items-center mt-xs-2 mb-xs-4'>
                <h4 className='t-align-center mb-xs-4 f-w-500 fsize-xs-10 mr-xs-4'>+{points}</h4>
                <img className='avatar-24' src={IconPoints} />
            </div>

            <div className='d-flex-column align-items-center gap-0_5em'>
                <h4 className='t-align-center f-w-500 fsize-xs-5'>Azione '{message}' completata!</h4>
                <p className='t-align-center w-80 grey-200'>
                    Hai ricevuto {points} punti che puoi assegnare nella classifica mensile di un artista che segui.
                </p>
            </div>

            <Button style={'bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Vai ai tuoi punti'} onClick={() => navigate('/personal-user-points')}/>
	    </ContainerDefault>
	</FullPageCenter>
  )
}

export default MessageSetPricing