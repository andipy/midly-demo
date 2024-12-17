import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Container from '../layout/container.layout'

import NavbarMultistep from '../components/navbar-multistep.component'
import NavbarBackOnly from '../components/navbar-back-only.component'

import IconEdit from '../images/icons/icon-edit.svg'

const FanclubSettingsRoute = () => {

    const navigate = useNavigate()

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
            <NavbarBackOnly onClick={() => navigate('/artist-app/fanclub')}/>
            <Container style={''}>
                
                {/* <div id='fanclub-name' className='mb-xs-8'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-name'>
                        NOME
                    </label>
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        {fanclub?.name ? 
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{fanclub?.name}</h6>
                        : 
                            <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi il nome del tuo fanclub!</h6>
                        }
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'NAME' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>
                    </a>
                </div>
                <div id='fanclub-description' className='mb-xs-8'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-description'>
                        DESCRIZIONE
                    </label>
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        {fanclub?.description ? 
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{fanclub?.description}</h6>
                        : 
                            <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi una descrizione al tuo fanclub!</h6>
                        }
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'DESCRIPTION' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>
                    </a>
                </div> */}
                {/* <div id='fanclub-cover' className='mb-xs-8'>
                {fanclub?.cover ?
                <>
                    <div className='d-flex-row j-c-space-between w-100 align-items-center'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-cover'>
                            COVER
                        </label>
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'COVER' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>
                    </div>
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        <div className='position-relative w-100 h-300px mb-xs-4'>
                            <img className='h-inherit w-100 object-fit-cover border-radius-08' src={fanclub?.cover} />
                        </div>                        
                    </a>
                </>
                : 
                <>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-cover'>
                        COVER
                    </label>          
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi una cover per il tuo fanclub!</h6>
                        
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'COVER' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>  
                    </a>
                </>
                } 
                </div>*/}
                <div id='fanclub-pricing' className='mb-xs-8'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-price'>
                        PREZZO MENSILE
                    </label>
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        {fanclub?.pricing ? 
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>€{fanclub?.pricing}</h6>
                        : 
                            <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Aggiungi un prezzo al tuo fanclub!</h6>
                        }
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'PRICING' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>
                    </a>
                </div>
                <div id='fanclub-maxSubscribers' className='mb-xs-8'>
                    <label className='fsize-xs-1 grey-300 letter-spacing-3' for='input-maxSubscribers'>
                        LIMITE ISCRITTI
                    </label>
                    <a className='d-flex-row j-c-space-between mb-xs-3 w-100' href=''>
                        {fanclub?.maxSubscribers ? 
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{fanclub?.maxSubscribers}</h6>
                        : 
                            <h6 className='fsize-xs-2 f-w-300 grey-400 letter-spacing-1 mt-xs-2'>Limita gli utenti che possono iscriversi al tuo fanclub!</h6>
                        }
                        <Link to='/artist-app/fanclub/settings/edit' state={{ type: 'MAX_SUBSCRIBERS' }}>
                            <img className='avatar-28' src={IconEdit} alt='->'/>
                        </Link>
                    </a>
                </div>
                
            </Container>
        </>
    )
}

export default FanclubSettingsRoute