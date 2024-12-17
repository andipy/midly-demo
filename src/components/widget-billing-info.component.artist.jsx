import { useNavigate } from 'react-router-dom'

import Button from './button.component'

const WidgetBillingInfo = ({ currentArtist }) => {

    const navigate = useNavigate()
    
    return (
        <div className='d-flex-column j-c-start align-items-start mt-xs-4'>  
            {currentArtist?.beneficiary === '' && currentArtist?.iban === '' ?
                <div className='d-flex-column j-c-center align-items-start bg-dark-gradient border-radius-08 w-100 pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4 '>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-2'>Ricevi gli incassi</h1>
                    <p className='fsize-xs-2 f-w-300 mb-xs-8'>Compila i dati per ricevere i tuoi incassi</p>
                    <Button
                        style={`bg-acid-lime dark-900 fsize-xs-3 f-w-600 letter-spacing-1`} label='Compila i dati'
                        onClick={() => navigate('/artist-app/fanclub/payment-info')}
                    />
                </div>
            : currentArtist?.beneficiary === '' || currentArtist?.iban ==='' ?
                <div className='d-flex-column j-c-center align-items-start bg-dark-gradient border-radius-08 w-100 pt-xs-4 pb-xs-4 pr-xs-4 pl-xs-4 '>
                    <h1 className='fsize-xs-5 f-w-600 mb-xs-2'>Ricevi gli incassi</h1>
                    <p className='fsize-xs-2 f-w-300 mb-xs-8'>Riceverai i tuoi incassi ai seguenti dati:</p>
                    <div className='mb-xs-2'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3'>{'NOME'}</label> 
                        {currentArtist?.beneficiary !== '' ?
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.beneficiary}</h6>
                        :
                            <div className='bg-red-400-transp10 red-500 d-flex-row j-c-center align-items-center border-radius-02 fsize-xs-2'>Nome mancante</div>
                        }
                    </div>
                    <div className='mt-xs-2 mb-xs-8'>
                        <label className='fsize-xs-1 grey-300 letter-spacing-3'>{'IBAN'}</label> 
                        {currentArtist?.iban !== '' ?
                            <h6 className='fsize-xs-2 f-w-300 grey-50 letter-spacing-1 mt-xs-2'>{currentArtist?.iban}</h6>
                        :
                            <div className='bg-red-400-transp10 red-500 d-flex-row j-c-center align-items-center fsize-xs-2'>IBAN mancante</div>
                        }          
                    </div>
                    <Button
                        style={`bg-dark-gradient border-lime-1  lime-400 fsize-xs-3 f-w-600 letter-spacing-1`} label='Compila i dati mancanti'
                        onClick={() => navigate('/artist-app/fanclub/payment-info')}
                    />
                </div>                        
            : null
            }
        </div>
    )
}

export default WidgetBillingInfo