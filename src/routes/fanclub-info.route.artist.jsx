import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubInfoRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [filledMandatory, setFilledMandatory] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState('')

    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const handleDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setCover(imageUrl)
        }
    }

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? {
                        ...fanclub,
                        name: name,
                        description: description,
                        cover: cover
                    }
                    : fanclub
            )
        )
    }

    useEffect(() => {
        if ( name || description || cover ) {
            updateThisFanclub()
        }

        // Check if all mandatory fields are filled
        if (name && description && cover) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
        }
    }, [name, description, cover])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.name ) {
                    setName(fanclub.name)
                }
                if ( fanclub.description ) {
                    setDescription(fanclub.description)
                }
                if ( fanclub.cover ) {
                    setCover(fanclub.cover)
                }
            }
        })
    }, [fanclubs])

    return (
        <>
            <NavbarMultistep stepNumber={1} totalStepNumber={2} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500 white'>Info del tuo fanclub</h3>
                
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Dai un nome al tuo fanclub" value={name} onChange={handleName} />

                <textarea className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Scrivi una descrizione per il tuo fanclub" rows={5} value={description} onChange={handleDescription}></textarea>

                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="file" onChange={handleFileChange} />

                <img className='w-100' src={cover && cover} />

                <ContainerDefault containerSpecificStyle='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        label='Continua'
                        onClick={() => navigate('/artist-app/fanclub/pricing')}
                    />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubInfoRoute