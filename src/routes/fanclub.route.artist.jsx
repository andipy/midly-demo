import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { FanclubsContext } from '../contexts/fanclubs.context'

import Appbar from '../components/appbar.component.artist'
import Button from '../components/button.component'
import Navbar from '../components/navbar.component.artist'
import ContainerDefault from '../layout/container-default.layout'
import FullPageCenter from '../layout/full-page-center.layout'

import IconFanclub from '../images/icons/icon-fanclub-inactive.svg'

const FanclubRoute = () => {

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
            <Navbar fanclub={fanclub} />

            {fanclub?.isActive ?
                <>
                    <ContainerDefault containerSpecificStyle='pt-xs-topbar'>
                        <h1>Fanclub</h1>
                    </ContainerDefault>
                    
                    {fanclub.posts.length === 0 ?
                        <FullPageCenter>
                            <h1 className='fsize-xs-6 f-w-500 mb-xs-2'>Il tuo fanclub è attivo!</h1>
                            <p className='fsize-xs-4 f-w-200 grey-200 w-70 t-align-center mb-xs-4'>Puoi pubblicare contenuti per i tuoi fan 🎉</p>
                            <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Crea un contenuto' onClick={() => navigate('/artist-app/content-creation')} />

                        </FullPageCenter>
                        :
                        fanclub.posts.map(post => <div>post</div>)
                    }
                </>
            :
                <FullPageCenter>
                    <ContainerDefault containerSpecificStyle='d-flex-column align-items-center j-c-center gap-1em'>
                        <div className='d-flex-column align-items-center j-c-center'>
                            <img className='avatar-48' src={IconFanclub} />
                            <h4 className='fsize-xs-3 mb-xs-8 letter-spacing-1 f-w-400 white t-align-center mt-xs-4'>Apri il tuo fanclub!</h4>
                        </div>
                        <p className='letter-spacing-1 grey-300 fsize-xs-2 t-align-center w-80'>Pubblica contenuti esclusivi per i tuoi fan in cambio di un abbonamento mensile:</p>
                        <Button style='bg-acid-lime fsize-xs-3 f-w-500 black w-70' label='Attiva fanclub' onClick={() => navigate('/artist-app/fan-club/name')} />
                    </ContainerDefault>
                </FullPageCenter>
            }

            <Appbar />
        </>
    )
}

export default FanclubRoute