
import { useState, useEffect, useContext } from 'react'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'


import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'


const MessageSetPricing = ({ price, onClick, close }) => {

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)
    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        fetchThisFanclub()
    }, [fanclubs])

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const exitTimer = setTimeout(() => {
                close()
            }, 400)

            return () => clearTimeout(exitTimer)
        }
    }, [isExiting])

    const [nextMonthCalc, setNextMonthCalc] = useState()

    useEffect(() => {
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

        // Array dei nomi dei mesi
        const monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
        ];

        const nextMonthName = monthNames[nextMonth.getMonth()];
        setNextMonthCalc(nextMonthName)
    }, [])

  return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
		<ContainerDefault style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-center gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
            <div className='d-flex-column align-items-center gap-0_5em'>
                <p className='t-align-center w-80 grey-200'>
                    L'abbonamento mensile al tuo fanclub passerà da €{fanclub?.pricing ? fanclub?.pricing : '0.00'} a €{price} a partire dal 1 {nextMonthCalc}.
                    L'abbonamento dei tuoi Super Fan rimarrà attivo, ma verranno notificati del cambio di prezzo e potranno decidere se rimanere abbonati o disdire.
                </p>
            </div>

            <Button style={'bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Conferma'} onClick={() => onClick()}/>
            <Button style={'bg-dark-gradient lime-400 border-lime-1 black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Annulla'} onClick={() => setIsExiting(true)}/>
	    </ContainerDefault>
	</FullPageCenter>
  )
}

export default MessageSetPricing