import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FanclubsContext } from '../contexts/fanclubs.context'
import { CurrentArtistContext } from '../contexts/currentArtist.context'

import Button from '../components/button.component'
import NavbarMultistep from '../components/navbar-multistep.component'

import ContainerDefault from '../layout/container-default.layout'

const FanclubBillingInfoRoute = () => {

    const navigate = useNavigate()

    const { currentArtist } = useContext(CurrentArtistContext)
    const { fanclubs, setFanclubs } = useContext(FanclubsContext)

    const [filledMandatory, setFilledMandatory] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [fiscalCode, setFiscalCode] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [zipCode, setZipCode] = useState()
    const [city, setCity] = useState()
    const [province, setProvince] = useState()

    const handleFirstName = (e) => {
        e.preventDefault()
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        e.preventDefault()
        setLastName(e.target.value)
    }
    const handleFiscalCode = (e) => {
        e.preventDefault()
        setFiscalCode(e.target.value)
    }
    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handleAddress = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
    }
    const handleZipCode = (e) => {
        e.preventDefault()
        setZipCode(e.target.value)
    }
    const handleCity = (e) => {
        e.preventDefault()
        setCity(e.target.value)
    }
    const handleProvince = (e) => {
        e.preventDefault()
        setProvince(e.target.value)
    }

    const updateThisFanclub = () => {
        setFanclubs(prevFanclubs => 
            prevFanclubs.map(fanclub =>
                fanclub.artistId === currentArtist.id
                    ? {
                        ...fanclub,
                        firstName: firstName,
                        lastName: lastName,
                        fiscalCode: fiscalCode,
                        email: email,
                        address: address,
                        zipCode: zipCode,
                        city: city,
                        province: province,
                    }
                    : fanclub
            )
        )
    }

    useEffect(() => {
        if (firstName !== undefined || lastName !== undefined || fiscalCode !== undefined || email !== undefined || address !== undefined || zipCode !== undefined || city !== undefined || province !== undefined ) {
            updateThisFanclub()
        }

        if (firstName && lastName && fiscalCode && email && address && zipCode && city && province ) {
            setFilledMandatory(true)
        } else {
            setFilledMandatory(false)
        }
    }, [firstName, lastName, fiscalCode, email, address, zipCode, city, province])

    useEffect(() => {
        fanclubs.map(fanclub => {
            if ( fanclub.artistId === currentArtist.id ) {
                if ( fanclub.firstName ) {
                    setFirstName(fanclub.firstName)
                }
                if ( fanclub.lastName ) {
                    setLastName(fanclub.lastName)
                }
                if ( fanclub.fiscalCode ) {
                    setFiscalCode(fanclub.fiscalCode)
                }
                if ( fanclub.email ) {
                    setEmail(fanclub.email)
                }
                if ( fanclub.address ) {
                    setAddress(fanclub.address)
                }
                if ( fanclub.zipCode ) {
                    setZipCode(fanclub.zipCode)
                }
                if ( fanclub.city ) {
                    setCity(fanclub.city)
                }
                if ( fanclub.province ) {
                    setProvince(fanclub.province)
                }
            }
        })
    }, [fanclubs])

    return (
        <>
            <NavbarMultistep stepNumber={3} totalStepNumber={4} dismissable={true} forcedExitPath={'/artist-app/fanclub'} />

            <ContainerDefault style='pt-xs-topbar'>
                <h3 className='fsize-xs-6 f-w-500 white'>Dati di fatturazione</h3>

                <p className='fsize-xs-3 grey-200 mt-xs-4'>Ci servono per generare le tue fatture.</p>

                <div className='pb-xs-appbar'>
                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Nome anagrafico" value={firstName} onChange={handleFirstName} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Cognome anagrafico" value={lastName} onChange={handleLastName} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Codice fiscale" value={fiscalCode} onChange={handleFiscalCode} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Email di contatto" value={email} onChange={handleEmail} />

                    <h3 className='fsize-xs-4 f-w-500 white mt-xs-10'>Indirizzo di residenza</h3>
                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Via e numero" value={address} onChange={handleAddress} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="CAP" value={zipCode} onChange={handleZipCode} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4" type="text" placeholder="Comune" value={city} onChange={handleCity} />

                    <input className="bg-dark-soft white letter-spacing-1 border-radius-06 mt-xs-4 mb-xs-4" type="text" placeholder="Provincia" value={province} onChange={handleProvince} />
                </div>

                <ContainerDefault style='position-fixed bottom-5'>
                    <Button
                        disabled={filledMandatory ? false : true}
                        style={`${filledMandatory ? 'bg-acid-lime dark-900' : 'bg-dark-soft grey-400'} fsize-xs-3 f-w-600 letter-spacing-1`}
                        label='Continua'
                        onClick={() => navigate('/artist-app/fanclub/payment-info')}
                    />
                </ContainerDefault>
            </ContainerDefault>
        </>
    )
}

export default FanclubBillingInfoRoute