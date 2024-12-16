import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'
import { isCursorAtEnd } from '@testing-library/user-event/dist/utils'

const FanclubPaymentInfoRoute = () => {

    const navigate = useNavigate()

    const { currentArtist, setCurrentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [filledMandatory, setFilledMandatory] = useState(false)
    const [beneficiary, setBeneficiary] = useState()
    const [iban, setIban] = useState()

    const handleBeneficiary = (e) => {
        e.preventDefault()
        setBeneficiary(e.target.value)
    }
    const handleIban = (e) => {
        e.preventDefault()
        setIban(e.target.value)
    }

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? {
                        ...fanclub,
                        beneficiary: beneficiary,
                        iban: iban
                    }
                    : fanclub
            )
        )
    }

    useEffect(() => {
        if (beneficiary !== undefined || iban !== undefined ) {
            updateThisFanclub()
        }
        
        setFilledMandatory(!!beneficiary && !!iban)
    }, [beneficiary, iban])

    useEffect(() => {
        if (currentArtist?.beneficiary !== '') {
            setBeneficiary(currentArtist?.beneficiary)
        }
        if (currentArtist?.iban !== '') {
            setIban(currentArtist?.iban)
        }
    }, [currentArtist])

    const handleSubmit = () => {
        if (beneficiary) {
            setCurrentArtist(prevArtist => ({
                ...prevArtist,
                beneficiary,
            }))
        }
        if (iban) {
            setCurrentArtist(prevArtist => ({
                ...prevArtist,
                iban,
            }))
        }

        navigate(-1)
    }

    return (
        <>
            <NavbarMultistep stepNumber={4} totalStepNumber={4} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault style='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500 white'>Dati di pagamento</h3>

                <p className='fsize-xs-3 grey-200 mt-xs-4'>Dove vuoi ricevere i tuoi ricavi.</p>
                
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder={`${currentArtist?.beneficiary === '' ? 'Immetti il nome del beneficiario' : currentArtist?.beneficiary}`} value={beneficiary} onChange={handleBeneficiary} />

                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder={`${currentArtist?.iban === '' ? "Immetti l' IBAN" : currentArtist?.iban}`} value={iban} onChange={handleIban} />

                <ContainerDefault style='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Salva'
                        onClick={() => handleSubmit()}
                    />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubPaymentInfoRoute