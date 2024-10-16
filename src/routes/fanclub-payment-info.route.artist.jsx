import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubPaymentInfoRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
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

    const saveThisFanclub = () => {
        navigate('/artist-app/fanclub/activated')
    }

    useEffect(() => {
        if (beneficiary !== undefined || iban !== undefined ) {
            updateThisFanclub()
        }

        // Check if all mandatory fields are filled
        if (beneficiary && iban) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
        }
    }, [beneficiary, iban])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.beneficiary ) {
                    setBeneficiary(fanclub.beneficiary)
                }
                if ( fanclub.iban ) {
                    setIban(fanclub.iban)
                }
            }
        })
    }, [fanclubs])

    return (
        <>
            <NavbarMultistep stepNumber={4} totalStepNumber={4} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500 white'>Dati di pagamento</h3>

                <p className='fsize-xs-3 grey-200 mt-xs-4'>Dove vuoi ricevere i tuoi ricavi.</p>
                
                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Immetti il nome del beneficiario" value={beneficiary} onChange={handleBeneficiary} />

                <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Immetti l'IBAN" value={iban} onChange={handleIban} />

                <ContainerDefault containerSpecificStyle='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`} label='Termina e salva'
                        onClick={saveThisFanclub}
                    />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubPaymentInfoRoute