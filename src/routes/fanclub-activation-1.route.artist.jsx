
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import NavbarMultistep from '../components/navbar-multistep.component'
import ContainerDefault from '../layout/container-default.layout'
import Button from '../components/button.component'

import IconPlus from '../images/icons/icon-plus-lime.svg'
const FanclubActivation1Route = () => {
    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [name, setName] = useState('')
    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const [description, setDescription] = useState('')
    const handleDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        const selectedfile = e.target.files[0]
        if (selectedfile) {
            const imageUrl = URL.createObjectURL(selectedfile)
            setFile(imageUrl)
        }
    }

    const [filledMandatory, setFilledMandatory] = useState(false)
    useEffect(() => {
        if ( name !== '' || description !== '' || file !== '' ) {
            updateThisFanclub()
        }

        if (name === '' || description === '' || !file) {
            setFilledMandatory(false)
        } else {
            setFilledMandatory(true)
        }
    }, [name, description, file])

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? {
                        ...fanclub,
                        name: name,
                        description: description,
                        cover: file
                    }
                    : fanclub
            )
        )
    }

    const handleSubmit = () => {
        navigate('/artist-app/fanclub/activation/pricing')
    }
    const handleClick = () => {
        document.getElementById('fileInput').click()
    }

    

  return (
    <>
    <NavbarMultistep stepNumber={1} totalStepNumber={2} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />
    <ContainerDefault containerSpecificStyle={'pt-xs-topbar pb-xs-appbar'}>
        <div id='cover' className='bg-dark-soft d-flex-row align-items-center j-c-center overflow-all-hidden  border-radius-1 mt-xs-2 gap-0_5em' onClick={handleClick}>
            {
                file ?
                <img className='w-100 h-300px object-fit-cover' src={file} />
                : 
                <div className='bg-dark-soft d-flex-row align-items-center pt-xs-20 pb-xs-20 j-c-center '>
                    <div className='bg-acid-lime-op-10 d-flex-row j-c-center align-items-center pb-xs-2 pt-xs-2 pl-xs-2 pr-xs-2 border-radius-02'>
                        <img src={IconPlus}/>
                    </div>
                    <p className='fsize-xs-2 f-w-500 lime-400 no-shrink'>Aggiungi una cover</p>
                </div>
            }
            <input
                    id='fileInput'
                    type='file'
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                />
        </div>
        <input
            id={`input-name`}
            className='bg-dark-soft lime-400 fsize-xs-2 f-w-300 grey-400 mt-xs-4 input-lime'
            type='text'
            placeholder={`${'Dai un nome al tuo fanclub'}`}
            value={name}
            onChange={(e) => handleName(e)}
            
        />
        <textarea
            id={`input-name`}
            className='bg-dark-soft lime-400 fsize-xs-2 f-w-300 grey-400 mt-xs-4 input-lime'
            type='text'
            placeholder={`${'Scrivi una descrizione del tuo fanclub'}`}
            value={description}
            onChange={(e) => handleDescription(e)}
            rows={4}
            style={{ resize: 'none' }}
            
        />

        <ContainerDefault containerSpecificStyle='position-fixed bottom-5'>
            <Button
                disabled={filledMandatory ? false : true}
                style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Continua'
                onClick={() => handleSubmit()}
            />
        </ContainerDefault>

    </ContainerDefault>
    </>
    
  )
}

export default FanclubActivation1Route