import { useContext, useState, useEffect } from 'react'
import { CurrentArtistContext } from '../contexts/currentArtist.context'
import { useNavigate } from 'react-router-dom'

import WidgetEarningsSub from '../components/widget-earnings-sub.component'
import WidgetEarningsRevenueBill from '../components/widget-earnings-revenue-bill.component'
import Button from '../components/button.component'

function EarningsLastMonth() {
    const navigate = useNavigate()
    const { currentArtist } = useContext(CurrentArtistContext)
    const [currentMonth, setCurrentMonth] = useState(1)
    const [ subs, setSubs] = useState(0)

    const months = {
        1: 'Gennaio',
        2: 'Febbraio',
        3: 'Marzo',
        4: 'Aprile',
        5: 'Maggio',
        6: 'Giugno',
        7: 'Luglio',
        8: 'Agosto',
        9: 'Settembre',
        10: 'Ottobre',
        11: 'Novembre',
        12: 'Dicembre',
    }

    useEffect(() => {
        const today = new Date()
        const month = today.getMonth() + 1
        setCurrentMonth(month)

        const totalSubs = currentArtist.subsOverTime[0].dataSet
        .filter(({ date }) => {
            const dataDate = new Date(date)
            return dataDate.getMonth() + 1 <= month
        })
        .reduce((total, { value }) => total + value, 0)

        setSubs(totalSubs)

    }, [currentArtist])
  return (
    <>
        <section id='metrics' className='mt-xs-2 mr-xs-auto'>
            <div className='mt-xs-4'>
                <div className='d-flex-column j-c-start align-items-start'>  
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
                    :<></>
                    }
                    
                            <WidgetEarningsRevenueBill widgetLabel={`Il tuo guadagno di ${months[currentMonth-1]}:`} widgetValue={currentArtist?.lastMonthRevenue}/>
                            <WidgetEarningsSub widgetLabel={`Abbonamenti fino a  ${months[currentMonth-1]}:`} widgetValue={subs}/> 
                        </div>
                    </div>
                </section>
            </>
  )
}

export default EarningsLastMonth