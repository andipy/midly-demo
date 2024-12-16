import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import Container from '../layout/container.layout'

const FanclubNameRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [name, setName] = useState()
    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? { ...fanclub, name: name }
                    : fanclub
            )
        )
    }

    useEffect(() => {
        if (name !== undefined) {
            updateThisFanclub()
        }
    }, [name])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.name ) {
                    setName(fanclub.name)
                }
            }
        })
    }, [])

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={3} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <Container style='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500'>Dai un nome al tuo fanclub</h3>
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Scrivi qui il nome" value={name} onChange={handleName} />

                <Container style='position-absolute bottom-5'>
                    <Button style='bg-acid-lime fsize-xs-3 f-w-600 dark-900 letter-spacing-1' label='Next' onClick={() => navigate('/artist-app/fanclub/cover')} />
                </Container>
            </Container>
        </>
    )
}

export default FanclubNameRoute