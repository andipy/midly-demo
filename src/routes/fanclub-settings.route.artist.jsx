import { useContext, useState, useEffect } from 'react'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import ContainerDefault from '../layout/container-default.layout'

import NavbarMultistep from '../components/navbar-multistep.component'

const FanclubSettingsRoute = () => {

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs } = useContext(FanclubsContext)
    const [fanclub, setFanclub] = useState(null)
    const fetchThisFanclub = () => {
        const thisFanclub = fanclubs.find(elem => elem.artistId === currentArtist.id)
        setFanclub(thisFanclub)
    }
    useEffect(() => {
        fetchThisFanclub()
    }, [fanclubs])
    

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={1} dismissable={false} editable={true} editPath={'edit'} forcedBackPath={'/artist-app/fanclub'} />
            <ContainerDefault containerSpecificStyle={'pt-xs-topbar'}>
                <section className='mb-xs-4'>
                    <h3 className='fsize-xs-5 f-w-600'>Nome</h3>
                    <p>{fanclub?.name}</p>
                </section>

                <section className='mb-xs-4'>
                    <h3 className='fsize-xs-5 f-w-600'>Cover image</h3>
                    <img className='w-100 border-radius-06' src={fanclub?.image} />
                </section>

                <section className='mb-xs-4'>
                    <h3 className='fsize-xs-5 f-w-600'>Prezzo mensile</h3>
                    <p>{fanclub?.pricing}</p>
                </section>
            </ContainerDefault>
        </>
    )
}

export default FanclubSettingsRoute