import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconTrophy from '../images/icons/icon-flash-leaderboard-inactive.svg'

import Countdown from './countdown.component'
import Button from './button.component'

const CardFlashLeaderboard = ({ flashLeaderboard }) => {

    const navigate = useNavigate()

    return (
        <>
            {flashLeaderboard ?
                <div className='bg-dark-gradient d-flex-column align-items-center j-c-center border-radius-1 pt-xs-12 pb-xs-12'>
                    <img className='w-15' src={IconTrophy} />
                    <h4 className='fsize-xs-3 mb-xs-4 letter-spacing-1 f-w-400 white t-align-center mt-xs-4'>Classifica FLASH in corso:</h4>
                    <Button style='bg-acid-lime dark-900 border-radius-04 w-80 pl-xs-4 pr-xs-4 pt-xs-4 pb-xs-4 fsize-xs-3 f-w-600' label='Controlla la classifica' onClick={() => navigate('/artist-app/flash-leaderboard')} />
                    <div className='d-flex-column align-items-center j-c-center mt-xs-16'>
                        <h4 className='fsize-xs-2 mb-xs-4 letter-spacing-1 f-w-400 grey-300 t-align-center'>Classifica FLASH termina tra:</h4>
                        <Countdown />
                    </div>
                </div>
            :
                <div className='d-flex-column align-items-center j-c-center'>
                    <img className='avatar-48' src={IconTrophy} />
                    <h4 className='fsize-xs-3 mb-xs-8 letter-spacing-1 f-w-400 white t-align-center mt-xs-4 w-50'>Nessuna classifica flash al momento!</h4>
                    <div className='d-flex-column align-items-center j-c-center gap-1em'>
                        <p className='letter-spacing-1 grey-300 fsize-xs-2 t-align-center w-80'>Scrivi al team di MIDLY per attivare una classifica FLASH su un tuo brano o album:</p>
                        <a href='mailto:daniel@midly.it' className='fsize-xs-2 letter-spacing-1 f-w-400 blue-300 t-align-center'>daniel@midly.it</a>
                    </div>
                </div>
            }
        </>
    )
}

export default CardFlashLeaderboard