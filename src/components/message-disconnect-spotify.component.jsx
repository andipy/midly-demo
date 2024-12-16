
import { useState, useEffect, useContext } from 'react'



import FullPageCenter from '../layout/full-page-center.layout'
import ContainerDefault from '../layout/container-default.layout'
import Button from './button.component'


const MessageDisconnectSpotify = ({ onClick, close }) => {

    

    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (isExiting) {
            const exitTimer = setTimeout(() => {
                close()
            }, 400)

            return () => clearTimeout(exitTimer)
        }
    }, [isExiting])

    

  return (
    <FullPageCenter className={'z-index-1100 bg-black-transp70'}>
		<ContainerDefault style={`centered-popup ${isExiting ? 'fade-out' : ''} position-absolute d-flex-column align-items-start gap-0_5em bg-dark-soft border-radius-04 pt-xs-4 pb-xs-4 pl-xs-4 pr-xs-4 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 `}>
            <h1 className='t-align-center fsize-xs-5 f-w-600'>Vuoi disconnettere Spotify?</h1>
            <p className='fsize-xs-2 f-w-300'>Midly non sarà più in grado di tracciare i tuoi ascolti e farti fare punti in classifica</p>
            <Button style={'bg-acid-lime black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Conferma'} onClick={() => (onClick(), setIsExiting(true))}/>
            <Button style={'bg-dark-gradient lime-400 border-lime-1 black font-body fsize-xs-3 f-w-600 mt-xs-4'} label={'Annulla'} onClick={() => setIsExiting(true)}/>
	    </ContainerDefault>
	</FullPageCenter>
  )
}

export default MessageDisconnectSpotify