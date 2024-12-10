
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'

import IconExit from '../images/icons/icon-exit.svg'
import IconPoints from '../images/icons/icon-points.svg'
const MessageSetPricing = ({ price, onClick, close }) => {

    const navigate = useNavigate()

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const exitTimer = setTimeout(() => {
                close()
            }, 400)

            return () => clearTimeout(exitTimer)
        }
    }, [isExiting])

  return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
		<ContainerDefault containerSpecificStyle={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
            <div className='d-flex-column align-items-center gap-0_5em'>
                <p className='t-align-center w-80 grey-200'>
                    L'abbonamento mensile al tuo fanclub passerà da xxx a {price} a partire dal xxx.
                    L'abbonamento dei tuoi Super Fan rimarrà attivo, ma verranno notificati del cambio di prezzo e potranno decidere se rimanere abbonati o disdire.
                </p>
            </div>

            <Button style={'bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Vai ai tuoi punti'} onClick={() => onClick()}/>
            <Button style={'bg-dark-gradient lime-400 border-lime-1 black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Vai ai tuoi punti'} onClick={() => setIsExiting(true)}/>
	    </ContainerDefault>
	</FullPageCenter>
  )
}

export default MessageSetPricing