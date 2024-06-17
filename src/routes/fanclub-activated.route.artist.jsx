import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'

import ContainerDefault from '../layout/container-default.layout'

import CoverSuccess from '../images/pictures/cover-success.png'

const FanclubActivated = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    return (
        <>
            <img className='w-100' src={CoverSuccess} />
            <ContainerDefault containerSpecificStyle='mt-xs-4'>
                <h1 className='fsize-xs-8 f-w-500'>Fanclub attivo!</h1>
                <p className='fsize-xs-5 f-w-200 grey-200'>Puoi iniziare a pubblicare contenuti per i tuoi fan 🎉</p>

                <section className='d-flex-column gap-1em mt-xs-16'>
                    <h3 className='fsize-xs-5 f-w-500'>Pubblica il tuo primo contenuto:</h3>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Crea un contenuto' />
                    <Button style='bg-none border-lime lime-400 fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Lo faccio più tardi' onClick={() => navigate('/artist-app/fan-club')} />
                </section>

            </ContainerDefault>
        </>
    )
}

export default FanclubActivated